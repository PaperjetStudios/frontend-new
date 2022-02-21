import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cartState } from "../../state/cart";
import Box from "../box";
import { Icons } from "../icons";
import Loader from "../loader";
import CartPreviewItem from "./cart-preview-item";
import { CartItem } from "./types";
import useCart from "./useCart";

type Props = {};

const CartPreview: React.FC = () => {
  const { update, togglePreview, showing, loading } = useCart();

  const cart = cartState.useValue();

  useEffect(() => {}, [cart]);

  if (!showing) {
    return <></>;
  }

  return (
    <Box className="base-layout fixed shadow-xl top-0 right-0 bottom-0 w-1/5 bg-white">
      <Box className="w-full flex justify-end p-5">
        <Button
          onClick={() => {
            togglePreview(false);
          }}
          sx={{
            fontSize: 20,
            padding: 0,
            minWidth: 0,
          }}
        >
          {Icons.close}
        </Button>
      </Box>
      {loading && <Loader />}
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
    </Box>
  );
};

export default CartPreview;
