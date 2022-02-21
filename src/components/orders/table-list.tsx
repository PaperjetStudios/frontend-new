import { ApolloError, gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Box from "../box";
import Loader from "../loader";
import { BASE_ORDER, paginated_orders } from "./queries";
import { OrderProps } from "./types";
import OrderTable from "./table-element";
import useUser from "../../forms/user/useUser";
import { paginated_wallet_logs } from "../walletlogs/queries";
import { DefaultPageSize } from "../../config/config";
import { Pagination } from "@mui/material";

type Props = {
  seller?: boolean;
};

const OrderList: React.FC<Props> = ({ seller = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useUser();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const { loading, data } = useQuery(
    paginated_orders(id, seller ? "seller" : "buyer"),
    {
      variables: {
        pageSize: DefaultPageSize,
        page: currentPage,
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  if (loading || data === undefined) {
    return <Loader />;
  }

  return (
    <Box className="">
      <OrderTable data={data.orders.data} seller={seller} />

      <Pagination
        count={data.orders.meta.pagination.pageCount}
        size="small"
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  );
};

export default OrderList;
