import { Typography } from "@mui/material";
import { useEffect } from "react";

import LayoutContainer from "../components/layout-container";

import { resetCart } from "../state/cart";
import { resetCheckout } from "../state/checkout";
import BasePage from "./layout/base-page";

type Props = {};

const OrderMade: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    resetCheckout();
    resetCart();
  }, []);

  return (
    <BasePage slug="order-confirmation">
      <LayoutContainer>
        <Typography>Order Made!</Typography>
      </LayoutContainer>
    </BasePage>
  );
};

export default OrderMade;
