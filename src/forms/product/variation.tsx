import React from "react";
// Import Form Libraries
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
// Import MaterialUI Components
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Box as BoxMUI,
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
  error?: any[];
};

const ProductVariation: React.FC<Props> = ({
  name,
  className = "",
  error = [],
}) => {
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
  //   console.log("Watched Product Variations: ", watchedVariations);
  const watchedHasVariation = watch("has_variations");

  //   let errorElement = null;
  //   if (error) {
  //     errorElement = <Alert severity="warning">{error}</Alert>;
  //   }

  return (
    <Box className="py-5 text-left">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl className="w-full px-4">
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
            <BoxMUI
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gridGap: "20px",
              }}
            >
              {watchedVariations?.length > 0 &&
                watchedVariations.map((variation, ind) => {
                  if (
                    (!watchedHasVariation && ind == 0) ||
                    (watchedHasVariation && ind >= 0)
                  ) {
                    return (
                      <Box
                        className="relative px-8 pt-5 pb-2 border-grey border rounded-sm"
                        key={variation.id}
                      >
                        {ind > 0 && (
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
                        )}

                        <Typo t="p" className="text-center">
                          Variation {watchedHasVariation && ind + 1}
                        </Typo>
                        <PJSTextInput
                          name={`${name}.${ind}.Quantity`}
                          label={"Quantity"}
                          placeholder={"Quantity"}
                          type={"number"}
                          error={error[ind]?.Quantity?.message}
                        />
                        <PJSTextInput
                          name={`${name}.${ind}.Price`}
                          label={"Price"}
                          placeholder={"Price"}
                          type={"number"}
                          error={error[ind]?.Price?.message}
                        />
                        <PJSTextInput
                          name={`${name}.${ind}.SKU`}
                          label={"SKU"}
                          placeholder={"SKU"}
                          // type={"number"}
                          error={error[ind]?.SKU?.message}
                        />
                      </Box>
                    );
                  }
                })}

              {watchedHasVariation && (
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
              )}
            </BoxMUI>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default ProductVariation;
