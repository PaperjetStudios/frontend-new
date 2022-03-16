import React, { useState, useEffect } from "react";
import {
  ApolloError,
  useQuery,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
// Import Types
import { Product } from "../../components/products/types";
// Import Custom Hooks
import useStore from "../store/useStore";
// Import Queries
import {
  GET_TAGS,
  UPLOAD_MULTIPLE_PRODUCT_FILES,
  CREATE_PRODUCT,
  single_product_by_id,
} from "./queries";
import { GET_CATEGORIES } from "../categories/queries";

const useProduct = () => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState<Product>(null);
  const [loadingProductData, setLoadingProductData] = useState(true);
  const [error, setError] = useState(false);
  const [erroMessage, setErrorMessage] = useState(null);
  const { storeID, storeData } = useStore();

  const {
    loading: loadingGetTags,
    error: getTagsError,
    // data: getStoreData,
  } = useQuery(GET_TAGS, {
    onCompleted: (data) => {
      console.log("GetTags data", data);
      setTags(data.tags.data);
    },
    onError: (error: ApolloError) => {
      console.log(error);
      setTags(null);
    },
  });

  const [
    getSingleProductByID,
    {
      loading: loadingGetSingleProduct,
      error: getSingleProductError,
      // data: getStoreData,
    },
  ] = useLazyQuery(single_product_by_id, {
    onCompleted: (data) => {
      console.log("GetSingleProduct data", data);
      //   setTags(data.tags.data);
    },
    onError: (error: ApolloError) => {
      console.log(error);
      //   setTags(null);
    },
  });

  const {
    loading: loadingGetCategories,
    error: getCategoriesError,
    // data: getStoreData,
  } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      console.log("GetCategories data", data);
      setCategories(data.categories.data);
    },
    onError: (error: ApolloError) => {
      console.log(error);
      setCategories(null);
    },
  });

  // Define uploadFiles mutation
  const [uploadProductFiles, { loading: imageUploading }] = useMutation(
    UPLOAD_MULTIPLE_PRODUCT_FILES,
    {
      onCompleted: (data) => {},
      onError: (e) => {
        console.log("error", JSON.stringify(e));
      },
    }
  );

  // Define createProduct mutation
  const [createProduct, { loading: createProductLoading }] = useMutation(
    CREATE_PRODUCT,
    {
      onCompleted: (data) => {
        console.log("Created product: ", data);
        setProductData(data.createProduct.data);
      },
      onError: (e) => {
        console.log("error", JSON.stringify(e));
      },
    }
  );

  // set the loadingProduct state variable
  useEffect(() => {
    if (
      loadingGetCategories ||
      loadingGetTags ||
      imageUploading ||
      createProductLoading
    ) {
      if (!loadingProductData) {
        setLoadingProductData(true);
      }
    } else {
      if (loadingProductData) {
        setLoadingProductData(false);
      }
    }
  }, [loadingGetTags, loadingGetCategories]);

  return {
    tagOptions: tags,
    categoryOptions: categories,
    productData,
    loadingProductData,
    storeID,
    uploadProductFiles,
    createProduct,
    getSingleProductByID,
  };
};

export default useProduct;
