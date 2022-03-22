import { Typography } from "@mui/material";
import { useEffect } from "react";

import LayoutContainer from "../components/layout-container";

import { resetCheckout } from "../state/checkout";
import BasePage from "./layout/base-page";

type Props = {};

const OrderDeclined: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    resetCheckout();
  }, []);

  return (
    <BasePage slug="order-failed">
      <LayoutContainer>
        <Typography>Order Declined</Typography>
      </LayoutContainer>
    </BasePage>
  );
};

export default OrderDeclined;
