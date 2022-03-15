import React from "react";
import classNames from "classnames";
// Import Form Libraries
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Import MaterialUI Components
import { Button } from "@mui/material";
// Import Custom React Components
import Box from "../../components/box";
import PJSTextInput from "../inputs/textinput";
import SelectInput from "../inputs/selectinput";
import ProductVariation from "./variation";

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
    Featured_Image: yup.array(),
    Gallery: yup.array(),
    Tags: yup.array().of(
      yup.object().shape({
        Title: yup.string().required("Please insert a title for the tag"),
      })
    ),
  })
  .required();

type ProductFormProps = {
  className?: string;
};

const ProductForm: React.FC<ProductFormProps> = ({ className = "" }) => {
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
          <SelectInput
            name={"Condition"}
            label={"Condition"}
            options={[
              { value: "New", displayText: "New" },
              { value: "Used", displayText: "Used" },
            ]}
            error={methods.formState?.errors?.Condition?.message}
          />

          <ProductVariation name={"Variation"} />
        </form>
      </FormProvider>
    </Box>
  );
};

export default ProductForm;
