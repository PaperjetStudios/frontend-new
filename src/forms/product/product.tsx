import React, { FormEvent, useEffect, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import {
  ApolloError,
  useQuery,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
// Import Form Libraries
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Import Queries
import {
  GET_TAGS,
  UPLOAD_MULTIPLE_PRODUCT_FILES,
  CHECK_DUPLICATE_PRODUCT_FILES,
  CHECK_PRODUCT_TITLE,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  single_product_by_id,
  GET_PRODUCT_BY_SLUG,
} from "../../components/products/queries";
import { GET_CATEGORIES } from "../../components/categories/queries";
// Import Themes
import colors from "../../theme/colors";
// Import Utility Functions and Variables
import { compressImage } from "../../util/files";
import { currentApi } from "../../config/config";
// Import Types
import {
  Product,
  ProductData_SubmitType,
} from "../../components/products/types";
// Import Custom Hooks
import useStore from "../../components/store/useStore";
// Import MaterialUI Components
import { Button, Box as BoxMUI } from "@mui/material";
// Import Custom React Components
import Box from "../../components/box";
import PJSTextInput from "../inputs/textinput";
import SelectInput from "../inputs/selectinput";
import ProductVariation from "./variation";
import SelectMultipleInput from "../inputs/select-multiple-input";
import Typo from "../../components/typo";
import ImagesWidget from "../store/imagesWidget";
import Loader from "../../components/loader";

const schema = yup
  .object()
  .shape({
    Title: yup.string().required("Please insert a title"),
    Description: yup.string().required("Please insert a description"),
    has_variations: yup.boolean(),
    Condition: yup
      .string()
      .required("Please select the condition of the product"),
    Variation: yup.array().of(
      yup.object().shape({
        Quantity: yup.number().required("Please insert a quantity"),
        Price: yup.number().required("Please insert a price"),
        SKU: yup.string().required("Please insert SKU"),
      })
    ),
    Categories: yup
      .array(yup.string())
      .min(1, "Please select atleast one category")
      .required("required"),
    Tags: yup.array(yup.string()),
    Featured_Image: yup
      .array()
      .min(1, "Please select atleast one image")
      .required("required"),
    Gallery: yup
      .array()
      .min(1, "Please select atleast one image")
      .required("required"),
  })
  .required();

type ProductFormProps = {
  className?: string;
  slug?: string;
};

const ProductForm: React.FC<ProductFormProps> = ({ className = "", slug }) => {
  const { storeID } = useStore();
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState<Product>(null);
  const [loadingProductData, setLoadingProductData] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    slug ? "Loading product data" : "Loading form"
  );

  // ------------------------------------------------------------------------
  // Queries and Mutations
  // ------------------------------------------------------------------------

  // Get tags query
  const {
    loading: loadingGetTags,
    error: getTagsError,
    // data: tags,
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

  // Get categories query
  const {
    loading: loadingGetCategories,
    error: getCategoriesError,
    // data: categories,
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

  // Get product data query
  const { loading: loadingGetProductBySlug, data: getProductDataResult } =
    useQuery(GET_PRODUCT_BY_SLUG, {
      skip: slug ? false : true,
      variables: {
        slug: slug,
      },
      onCompleted: (data) => {
        // console.log("Get Product but slug data: ", data);
        if (data.products.data.length > 0) {
          delete data.products.data[0].Reviews;
          console.log("Get Product but slug: ", data.products.data[0]);
          setProductData(data.products.data[0]);
        }
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    });

  // Define uploadFiles mutation
  const [
    uploadProductFiles,
    { loading: imageUploading, error: imageUploadError },
  ] = useMutation(UPLOAD_MULTIPLE_PRODUCT_FILES, {
    onCompleted: (data) => {},
    onError: (e) => {
      console.log("error", JSON.stringify(e));

      setLoadingProductData(false);
    },
  });

  // Define checkDuplicateFiles mutation
  const [
    checkDuplicateFiles,
    { loading: checkingDuplicates, error: checkingDuplicatesError },
  ] = useMutation(CHECK_DUPLICATE_PRODUCT_FILES, {
    onCompleted: (data) => {},
    onError: (e) => {
      console.log("error", JSON.stringify(e));
    },
  });

  // Define checkProductTitle mutation
  const [
    checkProductTitle,
    { loading: checkingProductTitle, error: checkingProductTitleError },
  ] = useMutation(CHECK_PRODUCT_TITLE, {
    onCompleted: (data) => {},
    onError: (e) => {
      console.log("error", JSON.stringify(e));
    },
  });

  // Define createProduct mutation
  const [createProduct, { loading: createProductLoading }] = useMutation(
    CREATE_PRODUCT,
    {
      onCompleted: (data) => {
        console.log("Created product: ", data);
        setProductData(data.createProduct.data);
        if (data.createProduct.data) {
          // redirect the user back to the products list page
          navigate("/profile/shop/products");
        }
      },
      onError: (e) => {
        console.log("error", JSON.stringify(e));

        setLoadingProductData(false);
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

        setLoadingProductData(false);
      },
    }
  );

  // ------------------------------------------------------------------------
  // Handle loading state variable
  // ------------------------------------------------------------------------

  useEffect(() => {
    if (tags && categories && !slug) {
      // When the slug is undefined then the user wants to create a new
      // product
      setLoadingProductData(false);
    }
  }, [productData, tags, categories]);

  // ------------------------------------------------------------------------
  // Define form state handlers
  // ------------------------------------------------------------------------

  // Define handling methods
  const methods = useForm({
    defaultValues: {
      Title: productData ? productData.attributes.Title : "",
      Description: productData ? productData.attributes.Description : "",
      Condition: productData ? productData.attributes.Condition : "",
      Variation: productData
        ? productData.attributes.Variation
        : [
            {
              Quantity: 0,
              Price: "",
              SKU: "",
            },
          ],
      Categories: productData
        ? productData.attributes.Categories.data.map(
            (category) => category.attributes.Title
          )
        : [],
      Tags: productData
        ? productData.attributes.Tags.data.map((tag) => tag.id)
        : [],
      Featured_Image: productData
        ? [productData.attributes.Featured_Image.data]
        : [],
      Gallery: productData ? productData.attributes.Gallery.data : [],
      has_variations: true,
    },
    resolver: yupResolver(schema),
  });

  const setupLoadedDataImages = async (productData: any) => {
    const images: any[] = productData?.attributes?.Gallery?.data;
    const loadedImages: any[] = [];
    if (images?.length > 0) {
      for (let j = 0; j < images.length; j++) {
        if (images[j]) {
          // Create a file from the image to use it normally
          let response = await fetch(
            `${currentApi.url}${images[j]?.attributes?.url}`
          );
          let blobData = await response.blob();
          const fileName: string = images[j]?.attributes?.name;
          const file = new File([blobData], images[j]?.attributes?.name, {
            type: `image/${fileName.split(".")[1]}`,
          });

          loadedImages.push({ file: file });
        }
      }
    }

    let file = [];
    if (productData?.attributes?.Featured_Image?.data) {
      let response = await fetch(
        `${currentApi.url}${productData?.attributes?.Featured_Image?.data?.attributes?.url}`
      );
      let blobData = await response.blob();
      const fileName: string =
        productData?.attributes?.Featured_Image?.data?.attributes?.name;
      file = [
        {
          file: new File(
            [blobData],
            productData?.attributes?.Featured_Image?.data?.attributes?.name,
            {
              type: `image/${fileName.split(".")[1]}`,
            }
          ),
        },
      ];
    }

    return {
      featuredImage: file,
      gallery: loadedImages as FileList[],
    };
  };

  useEffect(() => {
    if (productData) {
      const setupImages = async () => {
        const images = await setupLoadedDataImages(productData).then(
          (data) => data
        );

        const newFormState = {
          Title: productData ? productData.attributes.Title : "",
          Description: productData ? productData.attributes.Description : "",
          Condition: productData ? productData.attributes.Condition : "",
          Variation: productData
            ? productData.attributes.Variation
            : [
                {
                  Quantity: 0,
                  Price: "",
                  SKU: "",
                },
              ],
          Categories: productData
            ? productData.attributes.Categories.data.map(
                (category) => category.id
              )
            : [],
          Tags: productData
            ? productData.attributes.Tags.data.map((tag) => tag.id)
            : [],
          has_variations: true,
          Featured_Image: images.featuredImage ? images.featuredImage : [],
          Gallery: images.gallery ? images.gallery : [],
        };

        methods.reset(newFormState);
        setLoadingProductData(false);
      };
      setupImages();
    }
  }, [productData]);

  // Define strapiUpload function
  const uploadFilesToStrapi = async (imagedata: any, field: string) => {
    let files: any = null;
    const compressedImages = [];
    if (imagedata?.length > 0) {
      // Compress images
      for (const item of imagedata) {
        //@ts-ignore
        compressedImages.push(await compressImage(item.file as File));
      }

      files = await uploadProductFiles({
        variables: {
          files: compressedImages,
          field: field,
          forProduct: true,
          productID: productData?.id,
        },
      });
    }

    if (imagedata?.length === 0) {
      files = await uploadProductFiles({
        variables: {
          files: imagedata,
          field: field,
          forProduct: true,
          productID: productData.id,
        },
      });
    }

    const uploadedImageIds =
      files !== null && files?.data?.multipleUpload !== null
        ? files?.data?.multipleUpload.map((img: any) => {
            console.log(img);
            return img.data.id;
          })
        : [];

    return uploadedImageIds;
  };

  // Define checkDuplicates function
  const checkDuplicates = async (
    imagedata: any,
    field: "Featured_Image" | "Gallery"
  ) => {
    let files: any = undefined;
    const compressedImages = [];
    if (imagedata?.length > 0) {
      // Compress images
      for (const item of imagedata) {
        //@ts-ignore
        compressedImages.push(await compressImage(item.file as File));
      }

      files = await checkDuplicateFiles({
        variables: {
          files: compressedImages,
          field: field,
          forProduct: true,
          productID: productData?.id,
        },
      });
    }

    if (imagedata?.length === 0) {
      files = await checkDuplicateFiles({
        variables: {
          files: imagedata,
          field: field,
          forProduct: true,
          productID: productData.id,
        },
      });
    }

    return files;
  };

  // Define submit handler
  const submit: SubmitHandler<ProductData_SubmitType> = async (data) => {
    // Check whether to update or create a store
    if (productData) {
      // Update product
      setLoadingMessage("Updating product data");
      setLoadingProductData(true);
      console.log("(Update) submit data: ", data);
      // Upload images to Strapi
      const Featured_Image = await uploadFilesToStrapi(
        data.Featured_Image,
        "Featured_Image"
      );
      const Gallery = await uploadFilesToStrapi(data.Gallery, "Gallery");

      // Return if there was an error with uploading the images
      if (imageUploadError) {
        return;
      }

      const submittedData = data;
      delete submittedData.Featured_Image;
      delete submittedData.Gallery;

      const variables = {
        id: productData.id,
        ...submittedData,
        Variation: submittedData.Variation.map((item, ind) => {
          //@ts-ignore
          delete item?.__typename;
          return item;
        }),
        Store: storeID,
        Featured_Image:
          Featured_Image && Featured_Image.length > 0
            ? Featured_Image[0]
            : undefined,
        Gallery: Gallery,
      };
      console.log("variables: ", variables);
      try {
        console.log("UpdateProduct mutation starts...");
        updateProduct({
          variables: variables,
        });
      } catch (e) {
        console.log("OnSubmit Update Product Error: ", e);
      }
    } else {
      // Create product
      setLoadingMessage("Creating product");
      setLoadingProductData(true);
      console.log("(Create) submit data: ", data);
      // Upload images to Strapi
      const Featured_Image = await uploadFilesToStrapi(
        data.Featured_Image,
        "Featured_Image"
      );
      const Gallery = await uploadFilesToStrapi(data.Gallery, "Gallery");

      const submittedData = data;
      delete submittedData.Featured_Image;
      delete submittedData.Gallery;

      const variables = {
        ...submittedData,
        Store: storeID,
        Featured_Image: Featured_Image.length > 0 ? Featured_Image[0] : null,
        Gallery: Gallery,
      };
      console.log("variables: ", variables);
      try {
        console.log("CreateProduct mutation starts...");
        createProduct({
          variables: variables,
        });
      } catch (e) {
        console.log("OnSubmit Create Store Error: ", e);
      }
    }
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Trigger form validation
    await methods.trigger();
    // Check if there are any form errors
    if (Object.keys(methods.formState?.errors).length > 0) {
      // There are form errors, don't submit form and return
      return false;
    }

    setLoadingMessage("Checking images");
    setLoadingProductData(true);

    console.log("Do your file uploads here");
    // Upload files to strapi
    const Featured_Image = await checkDuplicates(
      methods.getValues().Featured_Image,
      "Featured_Image"
    );
    const Gallery = await checkDuplicates(
      methods.getValues().Gallery,
      "Gallery"
    );

    console.log("Featured_Image duplicates: ", Featured_Image);
    console.log("Gallery duplicates: ", Gallery);

    if (Featured_Image?.errors || Gallery?.errors) {
      // If there was an error with uploading files set a form error
      console.log("Throw a form error");
      Featured_Image?.errors &&
        methods.setError("Featured_Image", {
          message: `Image name "${Featured_Image?.errors.message}" taken`,
        });
      Gallery?.errors &&
        methods.setError("Gallery", {
          message: `Image name "${Gallery?.errors.message}" taken`,
        });
      setLoadingProductData(false);
      return false;
    }

    let checkTitleVariables: any = { Title: methods.getValues().Title };
    if (productData) {
      checkTitleVariables["productID"] = productData.id;
    }

    // Check product Title
    setLoadingMessage("Checking product title");
    const Title = await checkProductTitle({
      variables: checkTitleVariables,
    });
    if (Title?.errors) {
      // If Title is taken, set an form error and return
      console.log("Throw a form error");
      Title?.errors &&
        methods.setError("Title", {
          message: `Title taken`,
        });
      setLoadingProductData(false);
      return false;
    }

    if (productData) {
      // The user is updating a store
      setLoadingMessage("Updating product data");
    } else {
      // The user is creating a store
      setLoadingMessage("Creating product");
    }
    // Submit the form to the backend
    console.log("Submit form data to backend");
    methods.handleSubmit(submit)(e);
  };

  // Render loading state
  if (loadingProductData) {
    return (
      <BoxMUI sx={{ minHeight: "15rem" }} className="text-4xl p-5">
        <Loader />
        <Typo t="p" className="text-sm">
          {loadingMessage}
        </Typo>
      </BoxMUI>
    );
  }

  // Render form
  return (
    <Box>
      <FormProvider {...methods}>
        <form
          onSubmit={formSubmit}
          className={classNames(
            className ? className : "",
            "flex flex-col p-5"
          )}
        >
          <PJSTextInput
            name={"Title"}
            label={"Title"}
            placeholder={"Title"}
            error={methods.formState?.errors?.Title?.message}
          />
          <PJSTextInput
            name={"Description"}
            label={"Description"}
            placeholder={"Description"}
            error={methods.formState?.errors?.Description?.message}
          />

          {/* Product Condition SelectInput */}
          <SelectInput
            name={"Condition"}
            label={"Condition"}
            options={[
              { value: "New", displayText: "New" },
              { value: "Used", displayText: "Used" },
            ]}
            error={methods.formState?.errors?.Condition?.message}
          />

          {/* Categories SelectMultipleInput */}
          <SelectMultipleInput
            key={"Categories"}
            name={"Categories"}
            options={categories.map((category) => {
              return {
                value: category.id,
                displayText: category.attributes.Title,
              };
            })}
            // I was having issues with using forState.errors for the
            // Categories field since yup validation does not work/recognise
            // the message field of the validation error for an array field
            // Solution for now is ignore the type error
            //@ts-ignore
            error={methods.formState?.errors?.Categories?.message}
          />

          {/* Tags SelectMultipleInput */}
          <SelectMultipleInput
            key={"Tags"}
            name={"Tags"}
            options={tags.map((tag) => {
              return {
                value: tag.id,
                displayText: tag.attributes.Title,
              };
            })}
          />

          {/* Product Variation Input */}
          <ProductVariation
            name={"Variation"}
            error={methods.formState?.errors?.Variation}
          />

          {/* Product Featured_Image ImageWidget */}
          <Box className="px-8 pt-5 pb-8 mb-10 border-grey border rounded-sm w-max">
            <Typo className="pb-5 text-left" t="h5">
              Product Image
            </Typo>
            <ImagesWidget name={"Featured_Image"} limit={1} />
          </Box>

          {/* Product Gallery ImageWidget */}
          <Box className="px-8 pt-5 pb-8 mb-10 border-grey border rounded-sm">
            <Typo className="pb-5 mt-5 text-left" t="h5">
              Product Gallery Images
            </Typo>
            <ImagesWidget name={"Gallery"} />
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            sx={{ color: colors.light, backgroundColor: colors.primary }}
          >
            {loadingProductData ? (
              <Loader />
            ) : productData ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ProductForm;
