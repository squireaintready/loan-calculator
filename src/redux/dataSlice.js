import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    requiredValues: [
      { name: "Loan Amount", value: 5000, known: true, unit: "$" },
      { name: "Loan Term", value: 5, known: true, unit: "yrs" },
      { name: "Interest Rate", value: 4.5, known: true, unit: "%" },
      { name: "Payments / month", value: 104.32, known: false, unit: "$" },
    ],
    interestPaid: { name: "Interest Paid", value: 1258.98 },
    totalLoanValue: { name: "Total Loan Value", value: 6258.98 },
  },
  reducers: {
    updateRequiredValues: (state, action) => {
      state.requiredValues = action.payload.requiredValues;
    },
    updateInterestPaid: (state, action) => {
      state.interestPaid = action.payload.interestPaid;
    },
    updateTotalLoanValue: (state, action) => {
      state.totalLoanValue = action.payload.totalLoanValue;
    },
  },
});

export const { updateRequiredValues, updateInterestPaid, updateTotalLoanValue} = dataSlice.actions;

export const selectRequiredValues = (state) => state.data.requiredValues;
export const selectInterestPaid = (state) => state.data.interestPaid;
export const selectTotalLoanValue = (state) => state.data.totalLoanValue;

export default dataSlice.reducer;
