import { Typography } from "@mui/material";
import { useState } from "react";
import { checkoutState } from "../../../state/checkout";
import { StepBox } from "../../wizard/wizard-base";
import { StepElementProps } from "../types";
import Totals from "./common/totals";

const Step2Info: React.FC<StepElementProps> = ({ setup }) => {
  const [ticked, setTicked] = useState(false);
  const [checkout, setCheckout] = checkoutState.use();

  // Return promise
  const handleCurrentStep = () => {
    return new Promise<boolean>((resolve, reject) => {
      if (ticked) {
        resolve(true);
        if (checkout.unlockedSteps < 2) {
          setCheckout((prevState) => ({
            ...prevState,
            unlockedSteps: 2,
          }));
        }
      } else {
        reject("Not ticked");
      }
    });
  };

  return (
    <StepBox
      unlocked={checkout.unlockedSteps}
      stepSetup={setup}
      handleCurrentStep={handleCurrentStep}
      sidebar={<Totals />}
    >
      <Typography variant="h6">Step 2</Typography>
      <button onClick={() => setTicked(!ticked)}>
        Tick me {ticked ? "ticked" : "notTicked"}
      </button>
    </StepBox>
  );
};

export default Step2Info;
