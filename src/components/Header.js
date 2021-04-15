import React from "react";
import styled from "styled-components";
import figlogo from "../media/fig-logo.png";

// MATERIAL UI COMPONENTS
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Header() {
  return (
    <HeaderContainer>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={2} sm={2} md={4} lg={4} xl={4}>
          <LeftContainer>
            <img src={figlogo} alt="" />
          </LeftContainer>
        </Grid>

        <Grid item xs={10} sm={10} md={6} lg={5} xl={5}>
          <RightContainer>
            <ul>
              <li>
                <Typography variant="body1">Mission</Typography>
              </li>
              <li>
                <Typography variant="body1">Products</Typography>
              </li>
              <li>
                <Typography variant="body1">Team</Typography>
              </li>
              <li>
                <Typography variant="body1">Press</Typography>
              </li>
              <li>
                <Typography variant="body1">Partners</Typography>
              </li>
              <li>
                <Typography variant="body1">Contact</Typography>
              </li>
              <li>
                <SearchIcon />
              </li>
            </ul>
          </RightContainer>
        </Grid>
      </Grid>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  flex-grow: 1;
  padding: .2% 5%;
  background-color: #63d471;
  background-image: linear-gradient(315deg, #233329 0%, #63d471 74%);
  height: 10%;
`;

// LOGO
const LeftContainer = styled.div`
  /* Figtech logo */
  > img {
    max-width: 2.5rem;
  }
`;

// HEADER ROUTES/OPTIONS
const RightContainer = styled.div`
  /* Figtech navbar options */
  > ul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
    > li > .MuiTypography-root {
      font-size: .8rem;
      color: white;
    }
    /* SEARCH ICON */
    > li > .MuiSvgIcon-root {
      font-size: 1rem;
      margin-top: 0.1rem;
      margin-left: 0.2rem;
      color: white;
    }
  }
  @media only screen and (min-width: 390px) and (max-width: 767px) {
    > ul > li > .MuiTypography-root {
      font-size: .5rem;
      color: white;
    }
  }
`;
