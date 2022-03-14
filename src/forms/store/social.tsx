import { useEffect } from "react";
import classNames from "classnames";
// Import Form Libraries
import * as yup from "yup";
import { useFieldArray, useFormContext } from "react-hook-form";
// Import MaterialUI Components
import { Button } from "@mui/material";
// Import Custom React Components
import Box from "../../components/box";
import PJSTextInput from "../inputs/textinput";
import SelectInput from "../inputs/selectinput";
import Loader from "../../components/loader";
import { Icons } from "../../components/icons";
import Typo from "../../components/typo";
// Import Types
import { StoreData } from "../../components/store/types";

type Props = {
  className?: string;
  style?: {};
};

const SocialBlock: React.FC<Props> = ({ className }) => {
  const { formState, control, watch } = useFormContext<StoreData>();

  const { fields, append, remove } = useFieldArray<
    StoreData,
    "Contact_Details.Social"
  >({
    control,
    name: "Contact_Details.Social",
  });

  const watchFieldArray = watch("Contact_Details.Social");
  const watchedFields =
    fields.length > 0
      ? fields.map((field, index) => {
          // Delete the field "__typename" to avaoid graphQL Errors
          delete watchFieldArray[index]["__typename"];
          return {
            ...field,
            ...watchFieldArray[index],
          };
        })
      : [];

  console.log(`\n\n Watched Fields: \n`, watchFieldArray);

  return (
    <Box className="md:grid md:grid-cols-2 gap-5 mb-10">
      {watchedFields.length > 0 &&
        watchedFields.map((obj, ind) => {
          console.log("Watched field: ", obj);
          return (
            <Box
              className="relative px-8 pt-5 pb-2 border-grey border rounded-sm"
              key={obj.id}
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
              <Typo className="pb-5" t="h5">
                Social Link {ind + 1}
              </Typo>
              <PJSTextInput
                name={`Contact_Details.Social.${ind}.Url` as const}
                label="Url"
                error={
                  formState?.errors?.Contact_Details?.Social[ind]?.Url?.message
                }
                placeholder="Url"
              />
              {/* <PJSTextInput
                name={`Contact_Details.Social.${ind}.Type` as const}
                label="Type"
                error={
                  formState?.errors?.Contact_Details?.Social[ind]?.Type?.message
                }
                placeholder="Social Platform"
              /> */}

              <SelectInput
                name={`Contact_Details.Social.${ind}.Type` as const}
                label="Type"
                defaultValue={obj?.Type}
                options={[
                  { value: "Facebook", displayText: "Facebook" },
                  { value: "Twitter", displayText: "Twitter" },
                  { value: "Instagram", displayText: "Instagram" },
                ]}
                error={
                  formState?.errors?.Contact_Details?.Social[ind]?.Type?.message
                }
              />
            </Box>
          );
        })}
      <Box vcenter hcenter>
        <Box
          onClick={() =>
            append({
              Url: "",
              Type: "",
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
  );
};

export default SocialBlock;
