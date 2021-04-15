import styled from "styled-components";
import InputLogic from "./InputLogic";
import RadioBtns from "./RadioBtns";

// MATERIAL UI
import Typography from "@material-ui/core/Typography";

function FormLeft() {
  return (
    <FormLeftContainer>
      <FormContainer>
        {/* FORM HEADER */}
        <Typography variant="h4">Personalize your loan</Typography>
        {/* RADIO SELECTIONS */}
        <RadioBtns />
        {/* INPUT FIELDS & LOGIC */}
        <InputLogic />
      </FormContainer>
    </FormLeftContainer>
  );
}

export default FormLeft;

const FormLeftContainer = styled.div`
  flex-grow: 1;
  display: grid;
  place-items: center;
  max-width: 40rem;
  padding: 15% 15%;
  background-color: #3bb78f;
  background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
  border-radius: 5px;
  margin-bottom: 2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  @media only screen and (min-width: 390px) and (max-width: 767px) {
    padding-left: 2%;
    padding-right: 2%;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 99;
  white-space: normal;
  text-align: left;
  > .MuiTypography-h4 {
    line-height: 1.2;
    font-weight: 800;
  }
`;
