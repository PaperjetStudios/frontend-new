import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import { useState } from "react";
import { CartItems, cartState } from "../../../state/cart";
import { checkoutState } from "../../../state/checkout";
import colors from "../../../theme/colors";
import CartPreviewItem from "../../cart/cart-preview-item";
import { CartItem } from "../../cart/types";
import { StepBox } from "../../wizard/wizard-base";
import { StepElementProps } from "../types";
import StoreList from "./step1/store-list";

const Step1Cart: React.FC<StepElementProps> = ({ setup }) => {
  const [ticked, setTicked] = useState(false);
  const [checkout, setCheckout] = checkoutState.use();
  const [cart, setCart] = cartState.use();

  // Return promise
  const handleCurrentStep = () => {
    return new Promise<boolean>((resolve, reject) => {
      if (ticked) {
        resolve(true);
        if (checkout.unlockedSteps < 1) {
          setCheckout((prevState) => ({
            ...prevState,
            unlockedSteps: 1,
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
    >
      <Grid
        container
        spacing={{
          xs: 2,
          md: 4,
          xl: 6,
        }}
        justifyContent="flex-start"
        sx={{
          pt: 4,
          pb: 3,
        }}
      >
        <Grid item sm={12} md={8} sx={{ pt: { xs: 5, md: 2 } }}>
          <Stack spacing={2}>
            {/* list by store type */}
            {cart.cart.map((key: CartItems, ind) => {
              return <StoreList storeList={key.items} storeId={key.store} />;
            })}
          </Stack>
        </Grid>
        <Grid item sm={12} md={4}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              border: `1px solid ${colors["grey-light"]}`,
            }}
          >
            <Typography variant="h5">Cart Total</Typography>
          </Box>
        </Grid>
      </Grid>
    </StepBox>
  );
};

export default Step1Cart;
