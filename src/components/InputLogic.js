import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRequiredValues,
  updateRequiredValues,
  updateInterestPaid,
  updateTotalLoanValue,
} from "../redux/dataSlice";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

function InputLogic() {
  const dispatch = useDispatch();
  const reqVals = useSelector(selectRequiredValues);
  const [newVals, setNewVals] = useState(reqVals);
  const [unknownVal, setUnknownVal] = useState();

  useEffect(() => {
    setNewVals(reqVals);
  }, [reqVals]);

  useEffect(() => {
    const updateUnknownVal = () => {
      setUnknownVal(reqVals?.filter((val) => val?.known === false)[0]);
    };

    updateUnknownVal();
  }, [reqVals]);

  const handleInputChange = (e, label) => {
    let newReqVals = newVals;
    switch (label) {
      case "Loan Amount":
        newReqVals = [
          {
            name: newVals[0].name,
            value: parseFloat(e.target.value),
            known: newVals[0].known,
            unit: "$",
          },
          newReqVals[1],
          newReqVals[2],
          newReqVals[3],
        ];
        break;
      case "Loan Term":
        newReqVals = [
          newReqVals[0],
          {
            name: newVals[1].name,
            value: parseFloat(e.target.value),
            known: newVals[1].known,
            unit: "yrs",
          },
          newReqVals[2],
          newReqVals[3],
        ];
        break;
      case "Interest Rate":
        newReqVals = [
          newReqVals[0],
          newReqVals[1],
          {
            name: newVals[2].name,
            value: parseFloat(e.target.value),
            known: newVals[2].known,
            unit: "%",
          },
          newReqVals[3],
        ];
        break;
      case "Payments / month":
        newReqVals = [
          newReqVals[0],
          newReqVals[1],
          newReqVals[2],
          {
            name: newVals[3].name,
            value: parseFloat(e.target.value),
            known: newVals[3].known,
            unit: "$",
          },
        ];
        break;
      default:
    }
    setNewVals(newReqVals);
  };

  const runCalculations = (e) => {
    e.preventDefault();
    let loanAmount = newVals[0].value;
    let loanTerm = newVals[1].value;
    let interestRate = newVals[2].value;
    let monthlyPayments = newVals[3].value;

    let temp = newVals;
    let totalLoanPaid = 0;
    let totalInterestPaid = 0;

    switch (unknownVal?.name) {
      case "Loan Amount":
        // PV = FV / ((1 + r) ^ n)
        totalLoanPaid = parseFloat(monthlyPayments * (loanTerm * 12)).toFixed(
          2
        );
        loanAmount = Math.round(
          totalLoanPaid / Math.pow(1 + interestRate / 1200, loanTerm * 12)
        );
        totalInterestPaid = parseFloat(totalLoanPaid - loanAmount).toFixed(2);
        temp = [
          {
            name: newVals[0].name,
            value: loanAmount,
            known: newVals[0].known,
            unit: "$",
          },
          newVals[1],
          newVals[2],
          newVals[3],
        ];
        break;
      case "Loan Term":
        // t = ln(A/P) / n(ln(1 + r/n))
        totalLoanPaid = parseFloat(monthlyPayments * (loanTerm * 12)).toFixed(
          2
        );
        totalInterestPaid = parseFloat(totalLoanPaid - loanAmount).toFixed(2);
        loanTerm = Math.round(
          Math.log(totalLoanPaid / loanAmount) /
            (12 * Math.log(1 + interestRate / 1200))
        );
        temp = [
          newVals[0],
          {
            name: newVals[1].name,
            value: loanTerm,
            known: newVals[1].known,
            unit: "yrs",
          },
          newVals[2],
          newVals[3],
        ];
        break;
      case "Interest Rate":
        // r = n((A/P)^ 1/(nt) - 1)
        totalLoanPaid = parseFloat(monthlyPayments * (loanTerm * 12)).toFixed(
          2
        );
        totalInterestPaid = parseFloat(totalLoanPaid - loanAmount).toFixed(2);
        interestRate = parseFloat(
          1200 * (Math.pow(totalLoanPaid / loanAmount, 1 / (loanTerm * 12)) - 1)
        ).toFixed(1);
        temp = [
          newVals[0],
          newVals[1],
          {
            name: newVals[2].name,
            value: interestRate,
            known: newVals[2].known,
            unit: "%",
          },
          newVals[3],
        ];
        break;
      case "Payments / month":
        // FV = PV(1 + i/n*100)^nt
        // payments = FV / (t * 12)
        totalLoanPaid = parseFloat(
          loanAmount * Math.pow(1 + interestRate / 1200, loanTerm * 12)
        ).toFixed(2);
        totalInterestPaid = parseFloat(totalLoanPaid - loanAmount).toFixed(2);
        monthlyPayments = parseFloat(totalLoanPaid / (loanTerm * 12)).toFixed(
          2
        );
        temp = [
          newVals[0],
          newVals[1],
          newVals[2],
          {
            name: newVals[3].name,
            value: monthlyPayments,
            known: newVals[3].known,
            unit: "$",
          },
        ];
        break;
      default:
    }
    dispatch(
      updateRequiredValues({
        requiredValues: temp,
      })
    );
    dispatch(
      updateInterestPaid({
        interestPaid: { value: totalInterestPaid },
      })
    );
    dispatch(
      updateTotalLoanValue({
        totalLoanValue: { value: totalLoanPaid },
      })
    );
  };

  return (
    <>
      <form onSubmit={runCalculations}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          {/* INPUT FIELDS */}
          {newVals?.map((val) =>
            val.known ? (
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} key={val.name}>
                <InputLabel>
                  <Typography variant="body1">{val.name}</Typography>
                </InputLabel>

                <InputFieldContainer>
                  <Input
                    required
                    type="number"
                    value={val.value || ""}
                    onChange={(e) => handleInputChange(e, val.name)}
                    inputProps={{
                      style: {
                        textAlign: "center",
                        color: "whitesmoke",
                        fontSize: "medium",
                        fontWeight: "800",
                      },
                    }}
                    key={val.name}
                  />
                  <Typography variant="subtitle1">{val.unit}</Typography>
                </InputFieldContainer>
              </Grid>
            ) : null
          )}
          {/* RUN CALCULATIONS BUTTON */}
          <CalcLoanBtn>
            <Button variant="contained" color="primary" type="submit">
              <Typography variant="body2">DETERMINE LOAN</Typography>
            </Button>
          </CalcLoanBtn>
        </Grid>
      </form>
    </>
  );
}

export default InputLogic;

const InputLabel = styled.div`
  margin-top: 1rem;
  min-width: 5rem;
  > .MuiTypography-root {
    font-weight: 700;
  }
`;

const InputFieldContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 6rem;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  > .MuiTypography-root {
    font-weight: 700;
    font-size: 0.85rem;
    width: max-content;
  }
`;

const CalcLoanBtn = styled.div`
  > .MuiButtonBase-root {
    width: min-content;
    background-color: #7f5a83;
    background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
    border-radius: 8px;
    > .MuiButton-label > .MuiTypography-root {
      white-space: none;
      font-size: smaller;
      color: #b8c6db;
      font-weight: 600;
    }
  }
`;
