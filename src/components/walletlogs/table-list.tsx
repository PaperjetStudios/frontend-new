import * as React from "react";

import { Grid, Pagination } from "@mui/material";
import { ApolloError, useQuery } from "@apollo/client";

import Loader from "../loader";
import { paginated_wallet_logs } from "./queries";
import Box from "../box";
import Typo from "../typo";
import { WalletLogProps } from "./types";
import { DefaultPageSize } from "../../config/config";
import WalletTable from "./table-element";
import { moneyFormatter } from "../../config/util";
import useUser from "../../forms/user/useUser";

type Props = {
  page?: number;
  userId: number | string;
};

const BalanceBox: React.FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <Box className="text-center">
      <Typo bold uppercase t="h6">
        {name}
      </Typo>
      <Typo t="p">{moneyFormatter(value ? value : 0)}</Typo>
    </Box>
  );
};

const WalletTableList: React.FC<Props> = ({ page = 1, userId }) => {
  const [currentPage, setCurrentPage] = React.useState(page);

  const { loadingUser, userData } = useUser();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const { loading, data } = useQuery(paginated_wallet_logs(userId), {
    variables: {
      pageSize: DefaultPageSize,
      page: currentPage,
    },
    onError: (error: ApolloError) => {
      console.log(JSON.stringify(error));
    },
  });

  if (loading || loadingUser || data === undefined) {
    return <Loader />;
  }

  const available = userData.Wallet_Roundup.Available
    ? userData.Wallet_Roundup.Available
    : 0;
  const open = userData.Wallet_Roundup.Open ? userData.Wallet_Roundup.Open : 0;

  return (
    <Box className="w-full">
      <Box className="border border-grey p-5 grid grid-cols-3 mb-5">
        <BalanceBox name="Available" value={available} />
        <BalanceBox name="Open Orders" value={open} />
        <BalanceBox name="Balance" value={available + open} />
      </Box>

      <WalletTable data={data.walletLogs.data} />

      <Pagination
        count={data.walletLogs.meta.pagination.pageCount}
        size="small"
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  );
};

export default WalletTableList;
