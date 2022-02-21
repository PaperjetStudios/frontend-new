import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Box from "../box";
import Loader from "../loader";
import { BASE_ORDER } from "../orders/queries";
import { OrderProps } from "../orders/types";
import OrderTable from "./order-table";

type Props = {};

const OrderList: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [
    getOrderQuery,
    { loading: getOrderLoading, error: getOrderError, data: getOrderData },
  ] = useLazyQuery(
    gql`
      ${BASE_ORDER}
      query {
        orders {
          data {
            id
            attributes {
              ...BASE_ORDER
            }
          }
        }
      }
    `,
    {
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  useEffect(() => {
    if (!loaded) {
      getOrderQuery();
    }
  }, [loaded]);

  if (getOrderLoading || getOrderData === undefined) {
    return <Loader />;
  }

  return (
    <Box className="">
      <OrderTable data={getOrderData.orders.data} />
    </Box>
  );
};

export default OrderList;
