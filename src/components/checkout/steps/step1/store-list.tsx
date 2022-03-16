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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  console.log(storeData);

  return (
    <Stack
      spacing={3}
      sx={{ border: `1px solid ${colors["grey-light"]}`, p: 3 }}
    >
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
      <Stack>
        <FormControl>
          <FormLabel id={`deliveryMethod-${storeData.Title}`}>
            Delivery Method
          </FormLabel>
          <RadioGroup
            aria-labelledby={`deliveryMethod-${storeData.Title}`}
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {storeData.DeliveryMethods.data.map((obj) => {
              return (
                <FormControlLabel
                  value={obj.id}
                  control={<Radio />}
                  label={`${obj.attributes.Title} (${moneyFormatter(
                    obj.attributes.Cost
                  )})`}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default StoreList;
