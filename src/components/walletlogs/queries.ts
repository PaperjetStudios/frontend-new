import { gql } from "@apollo/client";

export const BASE_WALLET_LOG = gql`
  fragment BASE_WALLET_LOG on WalletLog {
    createdAt
    Unique
    Total
    Transaction
    Order {
      data {
        id
      }
    }
  }
`;

export const paginated_wallet_logs = (userId, type = null) => {
  //BUILD FILTERS
  let filters = "";

  if (userId !== "") {
    filters += `User:{id: {eq:${userId}}}`;
  }

  return gql`
  ${BASE_WALLET_LOG}
  query (
    $page: Int
    $pageSize: Int
  ) {
    walletLogs(
      pagination: { page: $page, pageSize: $pageSize }
      filters: {
       ${filters}
      }
    ) {
      meta {
        pagination {
          total
          pageCount
          pageSize
          page
        }
      }
      data {
        id
        attributes {
          ...BASE_WALLET_LOG
        }
      }
    }
  }
`;
};
