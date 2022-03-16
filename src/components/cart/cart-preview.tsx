import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CartItems, cartState } from "../../state/cart";

import Box from "@mui/material/Box";
import { Icons } from "../icons";
import Loader from "../loader";
import CartPreviewItem from "./cart-preview-item";
import { CartItem } from "./types";

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
      <Box
        sx={{
          width: 450,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
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
        </Box>
        {cart.loading && <Loader />}
        {cart.cart.length > 0 && (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                mt: 1,
                px: 1,
                gap: "10px",
              }}
            >
              {cart?.cart?.map((item: CartItems) => {
                return item?.items?.map((obj: CartItem) => {
                  return (
                    <CartPreviewItem
                      {...obj}
                      key={obj.Product.data.attributes.Title}
                    />
                  );
                });
              })}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Link to="/checkout">
                <Button
                  fullWidth
                  sx={{
                    borderRadius: "0px",
                    fontSize: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                    display: "flex",
                    gap: 1,
                  }}
                  variant="contained"
                >
                  Checkout {Icons.shoppingcart}
                </Button>
              </Link>
            </Box>
          </>
        )}
        {cart.cart.length === 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              mt: 1,
              px: 1,
              gap: "10px",
            }}
          >
            <p>No items in your cart yet!</p>
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
};

export default CartPreview;
