import styled from "styled-components";
import Content from "./components/Content";
import Header from "./components/Header";

import Grid from "@material-ui/core/Grid";

// LOTTIE FILES
import Lottie from "react-lottie";
import moneyGrowthAnimation from "./media/moneyGrowth.json";
import handCardAnimation from "./media/handCard.json";

function App() {
  const moneyGrowthOptions = {
    loop: true,
    autoplay: true,
    animationData: moneyGrowthAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handCardOptions = {
    loop: false,
    autoplay: true,
    animationData: handCardAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const cashLotteDimensions = window.innerWidth / 4;
  const cardLotteDimensions = window.innerWidth / 6;

  return (
    <AppContainer>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Content />
        </Grid>
      </Grid>

      <CashLottie>
        <Lottie
          options={moneyGrowthOptions}
          height={cashLotteDimensions}
          width={cashLotteDimensions}
        />
      </CashLottie>
      <CardLottie>
        <Lottie
          options={handCardOptions}
          height={cardLotteDimensions}
          width={cardLotteDimensions}
        />
      </CardLottie>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
  max-height: max-content;
  @media only screen and (min-width: 390px) and (max-width: 767px) {
    width: 100vw;
    min-height: 100vh;
  }
`;

const CashLottie = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
`;

const CardLottie = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 0;
  margin-top: 4rem;
  transform: rotate(-90deg);
`;
