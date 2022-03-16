import { StepIconProps } from "@mui/material";
import { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";
import { checkoutState, resetCheckout } from "../../state/checkout";
import { Icons } from "../icons";
import LayoutContainer from "../layout-container";
import { StepIconRoot } from "../wizard/stepper";

import Step1Cart from "./steps/step-1-cart";
import Step2Info from "./steps/step-2-info";
import Step3Checkout from "./steps/step-3-payment";

const steps = ["Your Cart", "Your Info", "Payment"];

function StepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: Icons.shoppingcart,
    2: Icons.menu.user,
    3: Icons.dollar,
  };

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </StepIconRoot>
  );
}

type Props = {};

const CheckoutBase: React.FC<Props> = ({ children }) => {
  const [unlockedSteps, setUnlockedSteps] = useState(0);

  useEffect(() => {
    resetCheckout();

    return null;
  }, []);

  return (
    <LayoutContainer>
      <Wizard>
        <Step1Cart
          setup={{
            Icons: StepIcon,
            Steps: steps,
          }}
        />
        <Step2Info
          setup={{
            Icons: StepIcon,
            Steps: steps,
          }}
        />
        <Step3Checkout
          setup={{
            Icons: StepIcon,
            Steps: steps,
          }}
        />
      </Wizard>
    </LayoutContainer>
  );
};

export default CheckoutBase;
