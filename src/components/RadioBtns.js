import React, { useState, useEffect } from "react";
import styled from "styled-components";
import uuid from "react-uuid";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";
import {
  selectRequiredValues,
  updateRequiredValues,
} from "../redux/dataSlice";

// MATERIAL UI
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function RadioBtns() {
  const dispatch = useDispatch();
  const reqVals = useSelector(selectRequiredValues);
  const [unknownVal, setUnknownVal] = useState(
    reqVals?.filter((val) => val.known === false)[0]
  );

  useEffect(() => {
    const updateUnknownVal = () => {
      setUnknownVal(reqVals?.filter((val) => val?.known === false)[0]);
    };
    updateUnknownVal();
  }, [reqVals]);

  const handleRadioChange = (e) => {
    // updateUnknownVal();
    let temp = [
      { ...reqVals[0], known: true, unit:"$" },
      { ...reqVals[1], known: true, unit:"yrs" },
      { ...reqVals[2], known: true, unit:"%" },
      { ...reqVals[3], known: true, unit:"$" },
    ];
    switch (e.target.value) {
      case "Loan Amount":
        temp = [
          { name: reqVals[0].name, value: reqVals[0].value, known: false, unit: "$" },
          temp[1],
          temp[2],
          temp[3],
        ];
        break;
      case "Loan Term":
        temp = [
          temp[0],
          { name: reqVals[1].name, value: reqVals[1].value, known: false, unit: "yrs" },
          temp[2],
          temp[3],
        ];
        break;
      case "Interest Rate":
        temp = [
          temp[0],
          temp[1],
          { name: reqVals[2].name, value: reqVals[2].value, known: false, unit: "%" },
          temp[3],
        ];
        break;
      case "Payments / month":
        temp = [
          temp[0],
          temp[1],
          temp[2],
          { name: reqVals[3].name, value: reqVals[3].value, known: false, unit: "$" },
        ];
        break;
      default:
    }
    dispatch(
      updateRequiredValues({
        requiredValues: temp,
      })
    );
  };

  return (
    <div>
      <FormControl component="fieldset" style={{ width: "90%" }}>
        <FormLabel component="legend" style={{ color: "white", lineHeight: "1.4" }}>
            Loan calculator with monthly compound interest.
           {/* Select what you're looking for to get started! */}
        </FormLabel>
        <RadioGroup row value={unknownVal?.name} onChange={handleRadioChange}>
          {/* RADIO OPTIONS */}
          <RadioOptionsContainer>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {reqVals?.map((val) => (
                <Grid item xs={6} lg={6} key={uuid()}>
                  <FormControlLabel
                    value={val?.name}
                    control={<Radio size="small" color="primary" />}
                    label={val?.name}
                    // key={uuid()}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioOptionsContainer>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioBtns;

const RadioOptionsContainer = styled.div`
  width: 18rem;
  margin-top:.5rem;
`;
