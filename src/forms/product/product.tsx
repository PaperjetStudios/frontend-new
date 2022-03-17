import React, { useEffect } from "react";
import classNames from "classnames";
// Import Form Libraries
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Import Themes
import colors from "../../theme/colors";
// Import Utility Functions
import { compressImage } from "../../util/files";
// Import Types
import { ProductData_SubmitType } from "../../components/products/types";
// Import Custom Hooks
import useProduct from "../../components/products/useProduct";
import useStore from "../../components/store/useStore";
// Import MaterialUI Components
import { Button } from "@mui/material";
// Import Custom React Components
import Box from "../../components/box";
import PJSTextInput from "../inputs/textinput";
import SelectInput from "../inputs/selectinput";
import ProductVariation from "./variation";
import SelectMultipleInput from "../inputs/select-multiple-input";
import Typo from "../../components/typo";
import ImagesWidget from "../store/imagesWidget";
import Loader from "../../components/loader";
import {
  GET_STORE_PRODUCTS_BY_USER_ID,
  GET_PRODUCT_BY_SLUG,
} from "../../components/products/queries";
import { currentApi } from "../../config/config";

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
  slug: string;
};

const ProductForm: React.FC<ProductFormProps> = ({ className = "", slug }) => {
  const {
    tagOptions,
    categoryOptions,
    loadingProductData,
    productData,
    storeID,
    uploadProductFiles,
    createProduct,
    updateProduct,
  } = useProduct(slug);

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
      };
      setupImages();
    }
  }, [productData]);

  if (loadingProductData) {
    return <Loader />;
  }

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
        },
      });
    }

    if (imagedata?.length === 0) {
      files = await uploadProductFiles({
        variables: {
          files: imagedata,
          field: field,
          forProduct: true,
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

  // Define submit handler
  const onSubmit: SubmitHandler<ProductData_SubmitType> = async (data) => {
    // Check whether to update or create a store
    if (productData) {
      // Update product
      console.log("(Update) submit data: ", data);
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
        id: productData.id,
        ...submittedData,
        Variation: submittedData.Variation.map((item, ind) => {
          //@ts-ignore
          delete item?.__typename;
          return item;
        }),
        Store: storeID,
        Featured_Image: Featured_Image.length > 0 ? Featured_Image[0] : null,
        Gallery: Gallery,
      };
      console.log("variables: ", variables);
      try {
        console.log("CreateProduct mutation starts...");
        updateProduct({
          variables: variables,
        });
      } catch (e) {
        console.log("OnSubmit Create Store Error: ", e);
      }
    } else {
      // Create product
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

  return (
    <Box>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
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
            options={categoryOptions.map((category) => {
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
            options={tagOptions.map((tag) => {
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
