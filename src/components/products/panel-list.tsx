import * as React from "react";

import { Grid, Pagination } from "@mui/material";
import { ApolloError, useQuery } from "@apollo/client";

import Loader from "../loader";
import { paginated_products } from "./queries";
import ProductCard from "./card";
import Box from "../box";
import ProductPanelListItem from "./panel-list-item";

type Props = {
  list: any;
};

const ProductPanelList: React.FC<Props> = ({ list }) => {
  return (
    <Box className="w-full mt-3 border border-grey">
      {list.map((item, index) => {
        if (item.id !== "delivery") {
          return (
            <ProductPanelListItem
              key={`product_${index}`}
              id={item.id}
              quantity={item.quantity}
            />
          );
        }
      })}
    </Box>
  );
};

export default ProductPanelList;
