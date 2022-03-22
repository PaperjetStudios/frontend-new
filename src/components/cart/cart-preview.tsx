import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cartState } from "../../state/cart";
import Box from "../box";

import { default as MatBox } from "@mui/material/Box";
import { Icons } from "../icons";
import Loader from "../loader";
import CartPreviewItem from "./cart-preview-item";
import { CartItem } from "./types";
import useCart from "./useCart";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";

type Props = {};

const CartPreview: React.FC = () => {
  const cart = cartState.useValue();

  useEffect(() => {}, [cart]);

  const togglePreview = (toggle: boolean) => {
    cartState.set((prevState) => ({
      ...prevState,
      showing: toggle,
    }));
  };

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={cart.showing}
      onClose={() => togglePreview(false)}
      onOpen={() => togglePreview(true)}
    >
      <MatBox
        sx={{
          width: 450,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <MatBox
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <Button
            onClick={() => {
              togglePreview(false);
            }}
            sx={{
              fontSize: 20,
              padding: 2,
              minWidth: 0,
            }}
          >
            {Icons.close}
          </Button>
        </MatBox>
        {cart.loading && <Loader />}
        {cart && (
          <>
            <Box className="border-t border-grey">
              {cart?.attributes?.CartItem.map((obj: CartItem) => {
                return (
                  <CartPreviewItem
                    {...obj}
                    key={obj.Product.data.attributes.Title}
                  />
                );
              })}
            </Box>
          </>
        )}
        {!cart && (
          <Box className="w-full h-full flex justify-center items-center">
            <p>No items in your cart yet</p>
          </Box>
        )}
        <Box className="w-full">
          <Link to="/checkout">
            <Button
              fullWidth
              sx={{
                borderRadius: "0px",
                fontSize: 16,
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                display: "flex",
                gap: 1,
              }}
              variant="contained"
            >
              Checkout {Icons.shoppingcart}
            </Button>
          </Link>
        </Box>
      </MatBox>
    </SwipeableDrawer>
  );
};

export default CartPreview;
