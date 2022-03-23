import * as React from "react";
import { ApolloError, useQuery } from "@apollo/client";
// Import MaterialUI Components
import { Grid, Pagination } from "@mui/material";
// Import GraphQL Queries
import { paginated_products } from "./queries";
import { GET_STORE_BY_USER_ID } from "../store/queries";
// Import Custom React Components
import Loader from "../loader";
import ProductCard from "./card";
import Box from "../box";
import NoStoreFound from "../../forms/store/no-store-found";
import NoProductsFound from "../../forms/product/no-products-found";

type Props = {
  pageSize: number;
  page: number;
  categorySlug?: string;
  tagsSlug?: string;
  storeSlug?: string;
  userID?: string | number;
  seller?: boolean;
};

const ProductCardList: React.FC<Props> = ({
  page = 1,
  pageSize = 5,
  categorySlug = "",
  tagsSlug = "",
  storeSlug = "",
  userID = "",
  seller = false,
}) => {
  const [currentPage, setCurrentPage] = React.useState(page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const {
    loading: storeDataLoading,
    data: storeData,
    error: storeError,
  } = useQuery(GET_STORE_BY_USER_ID, {
    skip: seller === false,
    variables: {
      id: userID,
    },
    onCompleted: (data: any) => {
      console.log(data);
    },
    onError: (err: ApolloError) => {
      console.log(err);
    },
  });

  const { loading, data } = useQuery(
    paginated_products(categorySlug, storeSlug, tagsSlug, userID),
    {
      variables: {
        pageSize: pageSize,
        page: currentPage,
      },
      onCompleted: (data: any) => {
        console.log(data);
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
      fetchPolicy: seller === true ? "network-only" : "cache-and-network",
    }
  );
  console.log("Product list data: ", data);

  if (loading || data === undefined) {
    return <Loader />;
  }

  if (seller === true && storeData === undefined) {
    // User has no store
    return <NoStoreFound />;
  }

  if (seller === true && storeData && data && data.products.data.length === 0) {
    // User has no products in their store
    return <NoProductsFound />;
  }

  return (
    <Box className="w-full">
      <Grid container spacing={2} className="mb-5">
        {data.products.data.map((obj: any, ind: number) => {
          return (
            <Grid key={`prod_${ind}`} item xs={6} md={2}>
              <ProductCard id={obj.id} seller={seller} />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        count={data.products.meta.pagination.pageCount}
        size="small"
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ProductCardList;
