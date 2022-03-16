import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { createProductLink, currentApi } from "../../config/config";
import { moneyFormatter } from "../../config/util";

//import useCart from "./useCart";
import { Icons } from "../icons";

import { CartItem } from "./types";
import { Link } from "react-router-dom";

import Quantity from "../products/quantity";
import { updateCart } from "../../state/cart";
import { Box } from "@mui/system";

type Props = {
  size?: "checkout" | "preview";
};

const CartPreviewItem: React.FC<CartItem & Props> = ({
  Product,
  Quantity: QuantityValue,
  Variation: VariationValue,
  size = "preview",
}) => {
  const { Title, Featured_Image, Variation, slug } = Product.data.attributes;

  const price = parseFloat(Variation[VariationValue].Price) * QuantityValue;

  return (
    <Grid container sx={{ gap: 2, justifyContent: "space-between" }}>
      <Grid item sm={6} md={size === "preview" ? 3 : 2}>
        <Link to={createProductLink(slug)}>
          <img
            src={currentApi.url + Featured_Image.data.attributes.url}
            alt={Title}
          />
        </Link>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        md={size === "preview" ? 7 : 8}
      >
        <Link to={createProductLink(slug)}>
          <Stack sx={{}}>
            <Typography sx={{ mb: 1 }} variant="subtitle1">
              {Title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ display: "flex", gap: 1, mb: 1 }}
            >
              {moneyFormatter(price)}
            </Typography>
          </Stack>
        </Link>
        <Quantity
          size="small"
          value={QuantityValue}
          setValue={(e) => {
            updateCart(Product, e, VariationValue, true);
          }}
          max={5}
        />
      </Grid>

      <Grid
        item
        md={size === "preview" ? 1 : 1}
        sx={{ display: "flex", justifyContent: "center", mt: 1 }}
      >
        <Box>
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ padding: 1 }}
            onClick={() => {
              updateCart(Product, -1, VariationValue);
            }}
          >
            {Icons.close}
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartPreviewItem;
