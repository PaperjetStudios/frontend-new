import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ApolloError, gql, useQuery } from "@apollo/client";

import { GET_STORE_BY_ID } from "../../../store/queries";
import { StoreData } from "../../../store/types";

import Loader from "../../../loader";

import colors from "../../../../theme/colors";
import CartPreviewItem from "../../../cart/cart-preview-item";
import { CartItem } from "../../../cart/types";
import { useState } from "react";
import { moneyFormatter } from "../../../../config/util";
import { Box } from "@mui/system";
import DeliveryMethod from "./delivery-method";
import DeliveryMethodElement from "./delivery-method";
import PepWidget from "./pep";
import _ from "lodash";
import ShadowContainer from "../../../common/shadow-container";

export type StoreListProps = {
  storeList: CartItem[];
  storeId: number | string;
};

const StoreList: React.FC<StoreListProps> = ({ storeList, storeId }) => {
  const [storeData, setStoreData] = useState<StoreData>(null);
  const [value, setValue] = useState("");

  const { loading, data } = useQuery(GET_STORE_BY_ID, {
    variables: {
      id: storeId,
    },
    onCompleted: (data) => {
      console.log(data);
      setStoreData(data.store.data.attributes);
    },
    onError: (error: ApolloError) => {
      console.log(JSON.stringify(error));
    },
  });

  if (loading || storeData === null) {
    return <Loader />;
  }

  // sort by overall costing
  const sortedDeliveryMethods = _.sortBy(
    storeData.DeliveryMethods.data,
    (obj) => {
      return obj.attributes.Cost;
    }
  );

  return (
    <ShadowContainer sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="small2">From {storeData.Title}:</Typography>
        {storeList.map((obj: CartItem, ind: number) => {
          return (
            <CartPreviewItem
              {...obj}
              size="checkout"
              key={obj.Product.data.attributes.Title}
            />
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Stack sx={{ gap: 2, flexDirection: ["column", "column", "row"] }}>
            {sortedDeliveryMethods.map((obj) => {
              return (
                <DeliveryMethodElement
                  storeId={storeId}
                  id={obj.id}
                  {...obj.attributes}
                  key={obj.id}
                />
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </ShadowContainer>
  );
};

export default StoreList;
