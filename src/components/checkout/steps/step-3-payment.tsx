import { Typography } from "@mui/material";
import { useState } from "react";
import { checkoutState } from "../../../state/checkout";
import { StepBox } from "../../wizard/wizard-base";
import { StepElementProps } from "../types";

const Step3Checkout: React.FC<StepElementProps> = ({ setup }) => {
  const [ticked, setTicked] = useState(false);
  const [checkout, setCheckout] = checkoutState.use();
  // Return promise
  const handleCurrentStep = () => {
    return new Promise<boolean>((resolve, reject) => {
      if (ticked) {
        resolve(true);
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
    >
      <Typography variant="h6">Step 3</Typography>
      <button onClick={() => setTicked(!ticked)}>
        Tick me {ticked ? "ticked" : "notTicked"}
      </button>
    </StepBox>
  );
};

export default Step3Checkout;
