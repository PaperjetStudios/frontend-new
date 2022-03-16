import React from "react";
import classNames from "classnames";
// Import Form Libraries
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Import Themes
import colors from "../../theme/colors";
// Import Custom Hooks
import useProduct from "../../components/products/useProduct";
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

const schema = yup
  .object()
  .shape({
    Title: yup.string().required("Please insert a title"),
    Description: yup.string().required("Please insert a description"),
    has_variations: yup.boolean(),
    Condition: yup
      .string()
      .required("Please select a condition of the product"),
    Variation: yup.array().of(
      yup.object().shape({
        Quantity: yup.string().required("Please insert a description"),
        SKU: yup.string().required("Please insert SKU"),
        Price: yup.string().required("Please insert a price"),
      })
    ),
    Categories: yup.array().of(
      yup.object().shape({
        Title: yup.string(),
      })
    ),
    Tags: yup.array().of(
      yup.object().shape({
        Title: yup.string(),
      })
    ),
    Featured_Image: yup.array(),
    Gallery: yup.array(),
  })
  .required();

type ProductFormProps = {
  className?: string;
};

const ProductForm: React.FC<ProductFormProps> = ({ className = "" }) => {
  const { tagOptions, categoryOptions, loadingProductData, productData } =
    useProduct();
  const methods = useForm({
    defaultValues: {
      Title: "",
      Description: "",
      Condition: "",
      Variation: [
        {
          Quantity: "",
          Price: "",
          SKU: "",
        },
      ],
      Categories: [],
      Tags: [],
      Feature_Image: [],
      Gallery: [],
      has_variations: true,
    },
    resolver: yupResolver(schema),
  });

  // Define submit handler
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("Submit data: ", data);
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
                value: category.attributes.Title,
                displayText: category.attributes.Title,
              };
            })}
          />

          {/* Tags SelectMultipleInput */}
          <SelectMultipleInput
            key={"Tags"}
            name={"Tags"}
            options={tagOptions.map((tag) => {
              return {
                value: tag.attributes.Title,
                displayText: tag.attributes.Title,
              };
            })}
          />

          {/* Product Variation Input */}
          <ProductVariation name={"Variation"} />

          {/* Product Feature_Image ImageWidget */}
          <Box className="px-8 pt-5 pb-8 mb-10 border-grey border rounded-sm w-min">
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
