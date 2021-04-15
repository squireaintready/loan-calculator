import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectRequiredValues,
  selectTotalLoanValue,
  selectInterestPaid,
} from "../redux/dataSlice";

import Chart from "./Chart";
// MATERIAL UI COMPONENTS
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function ResultsRight() {
  const reqVals = useSelector(selectRequiredValues);
  const totalLoanVal = useSelector(selectTotalLoanValue);
  const totalInterestPaid = useSelector(selectInterestPaid);
  const [unknownVal, setUnknownVal] = useState();

  useEffect(() => {
    const updateUnknownVal = () => {
      setUnknownVal(reqVals?.filter((val) => val?.known === false)[0]);
    };
    updateUnknownVal();
  }, [reqVals]);

  return (
    <ResultsRightContainer>
      <Grid container justify="center" alignItems="center" direction="column">
        <TitleContainer>
          <Typography variant="h5">{`Your ${unknownVal?.name} is`}</Typography>
        </TitleContainer>
        <Chart calculatedValue={unknownVal?.value} calculatedUnit={unknownVal?.unit} />
        <AdditionalInfoContainer>
          <Typography variant="body2">{`Total cost of loan is ${totalLoanVal?.value}`}</Typography>
          <Typography variant="body2">{`Total interest paid is ${totalInterestPaid?.value}`}</Typography>
        </AdditionalInfoContainer>
        <AdditionalOptionsContainer>
          <Typography variant="caption">{`Show amortization schedule`}</Typography>
          <Typography variant="caption">{`Add extra payments`}</Typography>
        </AdditionalOptionsContainer>
      </Grid>
    </ResultsRightContainer>
  );
}

export default ResultsRight;

const ResultsRightContainer = styled.div`
  flex-grow: 1;
  display: grid;
  place-items: center;
  border-radius: 5px;
  min-width: 20rem;
  min-height: 40rem;
  color: white;
  background-color: #bdd4e7;
  background-image: linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const TitleContainer = styled.div`
  > .MuiTypography-root {
    font-weight: 600;
  }
`;

const AdditionalInfoContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 1rem;
  > .MuiTypography-root {
    font-weight: 700;
    color: darkslategray;
  }
`;
const AdditionalOptionsContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 1.5rem;
  > .MuiTypography-root {
    font-weight: 550;
    color: darkslategray;
    line-height: 1.3;
  }
`;
