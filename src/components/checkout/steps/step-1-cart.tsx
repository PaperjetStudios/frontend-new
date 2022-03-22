import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import { useState } from "react";
import { string } from "yup/lib/locale";
import { moneyFormatter } from "../../../config/util";
import { CartItems, cartState } from "../../../state/cart";
import { checkoutState } from "../../../state/checkout";
import colors from "../../../theme/colors";
import CartPreviewItem from "../../cart/cart-preview-item";
import { CartItem } from "../../cart/types";
import { StepBox } from "../../wizard/wizard-base";
import { StepElementProps } from "../types";
import Totals from "./common/totals";
import StoreList from "./step1/store-list";

const Step1Cart: React.FC<StepElementProps> = ({ setup }) => {
  const [checkout, setCheckout] = checkoutState.use();
  const [cart, setCart] = cartState.use();

  // Return promise
  const handleCurrentStep = () => {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
      if (checkout.unlockedSteps < 1) {
        setCheckout((prevState) => ({
          ...prevState,
          unlockedSteps: 1,
        }));
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
      <Stack spacing={2}>
        {/* list by store type */}
        {cart.cart.map((key: CartItems, ind) => {
          return (
            <StoreList
              key={key.store}
              storeList={key.items}
              storeId={key.store}
            />
          );
        })}
      </Stack>
    </StepBox>
  );
};

export default Step1Cart;
