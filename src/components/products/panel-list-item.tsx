import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Skeleton } from "@mui/material";
import { ApolloError, useQuery } from "@apollo/client";
import { single_product_by_id } from "./queries";
import { createProductLink, currentApi } from "../../config/config";
import colors from "../../theme/colors";
import { moneyFormatter } from "../../config/util";
import { useNavigate } from "react-router-dom";
import Box from "../box";
import Typo from "../typo";

type Props = {
  id: number;
  quantity: number;
};

const ProductPanelListItem: React.FC<Props> = ({ id, quantity }) => {
  let navigate = useNavigate();

  const { loading, data } = useQuery(single_product_by_id, {
    variables: {
      id: id,
    },
    onCompleted: (data) => {},
    onError: (error: ApolloError) => {
      console.log(JSON.stringify(error));
    },
  });

  if (loading || data === undefined) {
    return <Skeleton variant="rectangular" width={200} height={140} />;
  }

  const { Title, slug, Featured_Image, Variation } =
    data?.product?.data?.attributes;

  return (
    <Box className="flex items-center justify-between p-5">
      <Box className="flex items-center gap-10">
        <Box>
          <CardMedia
            component="img"
            sx={{ width: 100, border: "1px solid #ddd", borderRadius: "10px" }}
            image={`${currentApi.url}${Featured_Image.data.attributes.url}`}
            alt={slug}
          />
        </Box>
        <Box>
          <Typo t="h3">{Title}</Typo>
          <Typo t="small">SKU: {Variation[0].SKU}</Typo>
        </Box>
      </Box>
      <Box>
        <Typo t="p">
          {moneyFormatter(Variation[0].Price)} x {quantity}
        </Typo>
      </Box>
      <Box>
        <Typo t="p" bold>
          {moneyFormatter(Variation[0].Price * quantity)}
        </Typo>
      </Box>
    </Box>
  );
};

export default ProductPanelListItem;
