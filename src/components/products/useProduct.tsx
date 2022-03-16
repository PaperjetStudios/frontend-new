import React, { useState, useEffect } from "react";
import {
  ApolloError,
  useQuery,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
// Import Queries
import { GET_TAGS } from "./queries";
import { GET_CATEGORIES } from "../categories/queries";

const useProduct = () => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productData, setProdunctData] = useState(null);
  const [loadingProductData, setLoadingProductData] = useState(true);
  const [error, setError] = useState(false);
  const [erroMessage, setErrorMessage] = useState(null);

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

  // set the loadingProduct state variable
  useEffect(() => {
    if (loadingGetCategories || loadingGetTags) {
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
  };
};

export default useProduct;
