import React from "react";
import styled from "styled-components";

// CUSTOM COMPONENTS
import FormLeft from "./FormLeft";
import ResultsRight from "./ResultsRight";

// MATERIAL UI COMPONENTS
import Grid from "@material-ui/core/Grid";

function Content() {
  return (
    <ContentContainer>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <FormLeft />
        </Grid>
        {/* EMPTY SPACE */}
        <Grid item xs={false} sm={false} md={false} lg={1} xl={1}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
          <ResultsRight />
        </Grid>
      </Grid>
    </ContentContainer>
  );
}

export default Content;

const ContentContainer = styled.div`
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 10%;
  padding-right: 10%;
  min-height: 80vh;
  height: 90%;
  color: white;
  display: grid;
  place-items: center;
  @media only screen and (min-width: 390px) and (max-width: 767px) {
    padding-left: 3.5%;
    padding-right: 3.5%;
  }
`;
