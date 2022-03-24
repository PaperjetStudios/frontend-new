import { gql } from "@apollo/client";

export const BASE_ORDER = gql`
  fragment BASE_ORDER on Order {
    Unique
    Items
    Status
    Total_Items
    Total_Delivery
    Total
    Total_After_Commission
    Commission
    Delivery_Address
    Buyer {
      data {
        id
      }
    }
    Store {
      data {
        id
        attributes {
          Title
          slug
          Seller {
            data {
              id
            }
          }
        }
      }
    }
    createdAt
  }
`;

export const paginated_orders = (userId, type = "seller") => {
  //BUILD FILTERS
  let filters = "";

  if (userId !== "" && type === "seller") {
    filters += `Store: { Seller: { id: { eq: ${userId} } } }`;
  }

  if (userId !== "" && type === "buyer") {
    filters += `Buyer: {id : {eq:${userId}}}`;
  }

  return gql`
  ${BASE_ORDER}
  query (
    $page: Int
    $pageSize: Int
    $status: String
  ) {
    orders(
      pagination: { page: $page, pageSize: $pageSize }
      filters: {
        Status: {
          eq: $status
        }
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
          ...BASE_ORDER
        }
      }
    }
  }
`;
};

export const GET_ORDER_BY_ID = gql`
  ${BASE_ORDER}
  query ($id: ID) {
    order(id: $id) {
      data {
        id
        attributes {
          ...BASE_ORDER
        }
      }
    }
  }
`;
