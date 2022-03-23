import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ApolloError, useQuery } from "@apollo/client";
// Import GraphQL Queries
import { paginated_products } from "./queries";
import { GET_STORE_BY_USER_ID } from "../store/queries";
// Import Custom Hooks
import useUser from "../../forms/user/useUser";
// Import Custom React Components
import Box from "../box";
import ProductForm from "../../forms/product/product";
import ProductCardList from "./list";
import TabHeader from "../store/tabHeader";

type Props = {
  mode?: "create" | "edit";
};
const ProductSetup: React.FC<Props> = ({ mode }) => {
  const params = useParams();
  const { id } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: storeData } = useQuery(GET_STORE_BY_USER_ID, {
    skip: params?.slug ? true : false,
    variables: {
      id: id,
    },
    onCompleted: (data: any) => {
      // console.log(data);
    },
    onError: (err: ApolloError) => {
      // console.log(err);
    },
  });

  // ------------------------------------------------------------------------
  // Define the product setup TabHeader component actions
  // ------------------------------------------------------------------------

  const productBaseRoute = "/profile/shop/products";
  const productsActions: any = [];
  let tabHeader_title = "";
  if (productBaseRoute.length < pathname.length) {
    // if the current path is a sub-route of productBaseRoute, add an action
    // that will allow the user to navigate back up one level, i.e. back to
    // productBaseRoute

    tabHeader_title = !params.slug ? "Create product" : "Edit product";
    productsActions.push({
      title: `Back`,
      action: () => {
        navigate(productBaseRoute);
      },
    });
  } else if (productBaseRoute.length === pathname.length) {
    // If the active tab is the productBaseRoute tab add an action that
    // will allow the user to create or edit their store

    tabHeader_title = "Shop products";
    if (storeData !== undefined) {
      productsActions.push({
        title: params?.slug ? "Edit product" : "Create product",
        action: () => {
          navigate(
            params?.slug
              ? `${productBaseRoute}/edit`
              : `${productBaseRoute}/create`
          );
        },
      });
    }
  }

  // Determine whether to render the list of store products
  // or the product create/update form
  let returnElement;
  if (params?.slug && mode === "edit") {
    returnElement = (
      <>
        <TabHeader header_title={tabHeader_title} actions={productsActions} />
        <ProductForm slug={params.slug} />
      </>
    );
  } else if (mode === "create") {
    returnElement = (
      <>
        <TabHeader header_title={tabHeader_title} actions={productsActions} />
        <ProductForm />
      </>
    );
  } else {
    returnElement = (
      <>
        <TabHeader header_title={tabHeader_title} actions={productsActions} />
        <ProductCardList pageSize={5} page={1} userID={id} seller={true} />
      </>
    );
  }
  return <Box className="text-center">{returnElement}</Box>;
};

export default ProductSetup;
