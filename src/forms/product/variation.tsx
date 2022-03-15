import React from "react";
import classNames from "classnames";
// Import Form Libraries
import * as yup from "yup";
import { useFieldArray, useFormContext } from "react-hook-form";
// Import MaterialUI Components
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
// Import Custom React Components
import Box from "../../components/box";
import PJSTextInput from "../inputs/textinput";
import SelectInput from "../inputs/selectinput";
import Loader from "../../components/loader";
import { Icons } from "../../components/icons";
import Typo from "../../components/typo";

type Props = {
  name: string;
  className?: string;
};

const ProductVariation: React.FC<Props> = ({ name, className = "" }) => {
  const { formState, control, watch, getValues, register } = useFormContext();

  const { fields, append, remove } = useFieldArray(
    //   <
    //     StoreData,
    //     "Contact_Details.Social"
    //   >
    {
      control,
      name: name,
    }
  );

  const watchedVariations = watch(name);
  console.log("Watched Product Variations: ", watchedVariations);
  const watchedHasVariation = watch("has_variations");

  console.log("Fields: ", fields);

  return (
    <Box className="px-4 pt-5 pb-5 text-left">
      <FormControl>
        <FormGroup className="text-left w-max">
          <FormControlLabel
            control={
              <Switch
                defaultChecked={watchedHasVariation}
                {...register("has_variations")}
              />
            }
            label="Product has variations"
            labelPlacement="start"
          />
        </FormGroup>
        {watchedHasVariation && (
          <Box className="md:grid md:grid-cols-2 gap-5 mb-10">
            {watchedVariations?.length > 0 &&
              watchedVariations.map((variation, ind) => {
                return (
                  <Box
                    className="relative px-8 pt-5 pb-2 border-grey border rounded-sm"
                    key={variation.id}
                  >
                    <Button
                      sx={{
                        position: "absolute",
                        right: -10,
                        top: -10,
                        background: "#000",
                        color: "#fff",
                        borderRadius: "100%",
                        width: "40px !important",
                        height: "40px !important",
                        minWidth: "0",
                        fontSize: 20,
                        "&:hover": {
                          background: "#ccc",
                        },
                      }}
                      onClick={() => {
                        remove(ind);
                      }}
                    >
                      {Icons.close}
                    </Button>
                    <Typo t="p" className="text-center">
                      Variation {ind + 1}
                    </Typo>
                    <PJSTextInput
                      name={`${name}.${ind}.Quantity`}
                      label={"Quantity"}
                      placeholder={"Quantity"}
                      error={formState?.errors?.name?.ind?.Quantity?.message}
                    />
                    <PJSTextInput
                      name={`${name}.${ind}.Price`}
                      label={"Price"}
                      placeholder={"Price"}
                      // type={"number"}
                      error={formState?.errors?.name?.ind?.Price?.message}
                    />
                    <PJSTextInput
                      name={`${name}.${ind}.SKU`}
                      label={"SKU"}
                      placeholder={"SKU"}
                      // type={"number"}
                      error={formState?.errors?.name?.ind?.SKU?.message}
                    />
                  </Box>
                );
              })}

            <Box vcenter hcenter>
              <Box
                onClick={() =>
                  append({
                    Quantity: "",
                    Price: "",
                  })
                }
                vcenter
                hcenter
                className="bg-grey w-24 h-24 rounded-full text-white text-4xl cursor-pointer"
              >
                {Icons.plus}
              </Box>
            </Box>
          </Box>
        )}
      </FormControl>
    </Box>
  );
};

export default ProductVariation;
