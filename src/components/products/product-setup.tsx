import React from "react";
import { useParams } from "react-router-dom";
import useUser from "../../forms/user/useUser";

import Box from "../box";
import ProductForm from "../../forms/product/product";
import ProductCardList from "./list";

const ProductSetup = () => {
  const params = useParams();
  const { id } = useUser();

  // Determine whether to render the list of store products
  // or the product create/update form
  let returnElement;
  if (params?.slug) {
    returnElement = <ProductForm slug={params.slug} />;
  } else {
    returnElement = (
      <ProductCardList pageSize={5} page={1} userID={id} seller={true} />
    );
  }
  return <Box className="text-center">{returnElement}</Box>;
};

export default ProductSetup;
