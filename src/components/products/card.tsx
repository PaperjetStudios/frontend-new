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

type Props = {
  id: number;
};

const ProductCard: React.FC<Props> = ({ id }) => {
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
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "none",
        borderWidth: "1px",
        borderColor: colors["grey"],
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate(createProductLink(id.toString()));
        }}
        disableRipple
      >
        <CardMedia
          component="img"
          height="140"
          image={`${currentApi.url}${Featured_Image.data.attributes.url}`}
          alt={slug}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {Title}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            {moneyFormatter(Variation[0].Price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
