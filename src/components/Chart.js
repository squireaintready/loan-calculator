import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import {
  selectRequiredValues,
  selectInterestPaid,
} from "../redux/dataSlice";

import { Doughnut } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";

function Chart({ calculatedValue, calculatedUnit }) {
  const reqVals = useSelector(selectRequiredValues);
  const interestPaid = useSelector(selectInterestPaid);

  const [chartData, setChartData] = useState({});
  const [loanAmount, setLoanAmount] = useState(
    reqVals?.filter((val) => val.name === "Loan Amount")[0]
  );

  useEffect(() => {
    const updateLoanAmount = () => {
      setLoanAmount(reqVals[0]);
    };

    const chart = () => {
      setChartData({
        responsive: true,
        labels: ["Loan Amount", "Interest Paid"],
        datasets: [
          {
            data: [loanAmount?.value, interestPaid?.value],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
        text: "HELLO CHART",
      });
    };
    updateLoanAmount()
    chart()
  }, [reqVals, interestPaid, loanAmount]);

  const chartDimensions = 250;
  return (
    <ChartContainer>
      <Doughnut
        data={chartData}
        height={chartDimensions}
        width={chartDimensions}
        legend={{ position: "bottom" }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          cutoutPercentage: 80,
          title: { test: "HOW MUCH DID YOU PAY", display: true },
          centerText: {
            display: true,
            text: `90%`,
          },
        }}
      />
      <CalculatedValueContainer>
        <Typography variant="h5">{calculatedValue}</Typography>
        <Typography variant="subtitle2">{calculatedUnit}</Typography>
      </CalculatedValueContainer>
    </ChartContainer>
  );
}

export default Chart;

const ChartContainer = styled.div`
  min-width: 20rem;
  display: grid;
  place-items: center;
  margin-top: -1rem;
`;
const CalculatedValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -20rem;
  > .MuiTypography-h5 {
    font-size: 3rem;
    color: darkslategray;
  }
  > .MuiTypography-subtitle2{
    color: black;
    opacity: .7;
  }
`;
