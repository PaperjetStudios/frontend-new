import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuantityErrorModal from "../../../modal/quantity-error";
import { moneyFormatter } from "../../../config/util";
import { checkoutState } from "../../../state/checkout";
import { cartState, setWalletPayment } from "../../../state/cart";
import useLoggedIn from "../../auth/isLoggedIn";
import ShadowContainer from "../../common/shadow-container";
import { Icons } from "../../icons";
import { StepBox } from "../../wizard/wizard-base";
import { OrderGroup, StepElementProps } from "../types";
import useCheckout from "../useCheckout";
import NetcashForm from "./step3/netcash-form";
import CheckoutErrors from "./step3/order-errors";
import WalletPayment from "./step3/wallet-payment";

const Step3Checkout: React.FC<StepElementProps> = ({ setup }) => {
  const [checkout] = checkoutState.use();
  const [cart] = cartState.use();
  const [showErrors, setShowErrors] = useState<boolean>();
  const [orderErrors, setOrderErrors] = useState<any>();

  const [orderTotalString, setOrderTotalString] = useState<string>("");

  const [continueAnyway, setContinueAnyway] = useState<boolean>();
  const { isLoggedIn, userId } = useLoggedIn();

  const [orderGroup, setOrderGroup] = useState<OrderGroup>(null);

  const { createOrder, loading } = useCheckout();

  const createTheOrder = () => {
    createOrder(
      continueAnyway,
      getCurrentUserId(),
      (data) => {
        setOrderGroup(data.orderGroup);
      },
      (data) => {
        setOrderErrors(data);
        setShowErrors(true);
      }
    );
  };

  const getCurrentUserId = () => {
    // if a user is logged in, use that id
    if (userId) {
      return userId;
    }
    // if there was an error and the user has resubmitted, use that id
    if (orderErrors) {
      return orderErrors.user;
    }
    // else if all else fails return -1
    return -1;
  };

  useEffect(() => {
    if (continueAnyway === true) {
      createTheOrder();
    }
  }, [continueAnyway]);

  const parsedWallet =
    typeof cart.walletPayment === "string"
      ? parseFloat(cart.walletPayment)
      : cart.walletPayment
      ? cart.walletPayment
      : 0;

  useEffect(() => {
    let string = `Order Total: `;

    if (parsedWallet !== 0) {
      string = `Order Total:  ${moneyFormatter(
        cart.totals.total - parsedWallet
      )}`;
    } else {
      string = `Order Total: ${moneyFormatter(cart.totals.total)}`;
    }

    setOrderTotalString(string);
  }, [cart]);

  return (
    <>
      <StepBox unlocked={checkout.unlockedSteps} stepSetup={setup}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ShadowContainer sx={{ p: 3, width: ["100%", "60%"] }}>
            <Stack spacing={3}>
              <Alert severity="info">
                Please ensure your details are correct before payment.
              </Alert>
              <Typography variant="body1">
                You will be redirected to pay with Netcash
              </Typography>
              <Typography variant="body2">
                {orderTotalString} <br />{" "}
                {parsedWallet !== 0 && (
                  <>Paying with Wallet: {moneyFormatter(parsedWallet)}</>
                )}
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Button
                  disabled={loading}
                  startIcon={loading ? Icons.loading : null}
                  variant="contained"
                  onClick={() => {
                    createTheOrder();
                  }}
                  sx={{ flex: 1 }}
                >
                  Buy now
                </Button>
                {isLoggedIn && (
                  <WalletPayment
                    callback={(amount) => {
                      setWalletPayment(amount);
                    }}
                  />
                )}
              </Box>
              {orderGroup && <NetcashForm group={orderGroup} />}
            </Stack>
          </ShadowContainer>
        </Box>
      </StepBox>

      {orderErrors && (
        <QuantityErrorModal
          callback={() => {
            setShowErrors(false);
            setContinueAnyway(true);
          }}
          showing={showErrors}
          toggle={setShowErrors}
        >
          <CheckoutErrors errors={orderErrors.errors} />
        </QuantityErrorModal>
      )}
    </>
  );
};

export default Step3Checkout;
