import * as React from "react";

import { Grid, Pagination } from "@mui/material";
import { ApolloError, useQuery } from "@apollo/client";

import Loader from "../loader";
import { paginated_products } from "./queries";
import ProductCard from "./card";
import Box from "../box";

type Props = {
  pageSize: number;
  page: number;
  categorySlug?: string;
  tagsSlug?: string;
  storeSlug?: string;
};

const ProductCardList: React.FC<Props> = ({
  page = 1,
  pageSize = 5,
  categorySlug = "",
  tagsSlug = "",
  storeSlug = "",
}) => {
  const [currentPage, setCurrentPage] = React.useState(page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const { loading, data } = useQuery(
    paginated_products(categorySlug, storeSlug, tagsSlug),
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
    }
  );

  if (loading || data === undefined) {
    return <Loader />;
  }

  return (
    <Box className="w-full">
      <Grid container spacing={2} className="mb-5">
        {data.products.data.map((obj: any, ind: number) => {
          return (
            <Grid key={`prod_${ind}`} item xs={6} md={2}>
              <ProductCard id={obj.id} />
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
