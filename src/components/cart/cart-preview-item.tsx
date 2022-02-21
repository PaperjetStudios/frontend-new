import { Button, Typography } from "@mui/material";
import { createProductLink, currentApi } from "../../config/config";
import { moneyFormatter } from "../../config/util";
import Box from "../box";
import useCart from "../../components/cart/useCart";
import { Icons } from "../icons";

import { CartItem } from "./types";
import { Link } from "react-router-dom";

const CartPreviewItem: React.FC<CartItem> = ({ Product, Quantity, Extra }) => {
  const { Title, Featured_Image, Variation, slug } = Product.data.attributes;

  const price = parseFloat(Variation[0].Price) * Quantity;
  const { update: updateCart, loading: cartLoading } = useCart();

  return (
    <Box className="p-5 border-b border-grey grid grid-cols-8 gap-5">
      <Link className="col-span-2" to={createProductLink(slug)}>
        <img
          src={currentApi.url + Featured_Image.data.attributes.url}
          alt={Title}
        />
      </Link>

      <Link
        className="col-span-5 flex justify-center flex-col"
        to={createProductLink(slug)}
      >
        <Typography variant="subtitle1">{Title}</Typography>
        <Typography variant="subtitle2" sx={{ display: "flex", gap: 1 }}>
          {moneyFormatter(price)}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#999" }}>
          x{Quantity}
        </Typography>
      </Link>

      <Box className="col-span-1 text-2xl flex justify-center items-center flex-col">
        <Button
          sx={{ color: "#A00" }}
          onClick={() => {
            updateCart([
              {
                Product: Product,
                Quantity: -1,
                Extra: null,
              },
            ]);
          }}
        >
          {Icons.trash}
        </Button>
      </Box>
    </Box>
  );
};

export default CartPreviewItem;
