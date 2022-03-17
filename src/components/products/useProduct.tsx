import { useState, useEffect } from "react";
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
  UPDATE_PRODUCT,
  single_product_by_id,
  GET_PRODUCT_BY_SLUG,
} from "./queries";
import { GET_CATEGORIES } from "../categories/queries";

const useProduct = (slug?: string) => {
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

  const { loading: loadingGetProductBySlug, data } = useQuery(
    GET_PRODUCT_BY_SLUG,
    {
      skip: slug ? false : true,
      variables: {
        slug: slug,
      },
      onCompleted: (data) => {
        // console.log("Get Product but slug data: ", data);
        if (data.products.data.length > 0) {
          delete data.products.data[0].Reviews;
          //   console.log("Get Product but slug: ", data.products.data[0]);
          setProductData(data.products.data[0]);
        }
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

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

  // Define updateProduct mutation
  const [updateProduct, { loading: updateProductLoading }] = useMutation(
    UPDATE_PRODUCT,
    {
      onCompleted: (data) => {
        console.log("Created product: ", data);
        setProductData(data.updateProduct.data);
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
      loadingGetProductBySlug ||
      imageUploading ||
      createProductLoading ||
      updateProductLoading
    ) {
      if (!loadingProductData) {
        setLoadingProductData(true);
      }
    } else {
      if (loadingProductData) {
        setLoadingProductData(false);
      }
    }
  }, [
    loadingGetTags,
    loadingGetCategories,
    loadingGetProductBySlug,
    createProductLoading,
    updateProductLoading,
  ]);

  return {
    tagOptions: tags,
    categoryOptions: categories,
    productData,
    loadingProductData,
    storeID,
    uploadProductFiles,
    createProduct,
    updateProduct,
    getSingleProductByID,
  };
};

export default useProduct;
