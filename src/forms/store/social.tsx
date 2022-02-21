import classNames from "classnames";
import * as yup from "yup";
import Box from "../../components/box";
import { useEffect } from "react";

import PJSTextInput from "../inputs/textinput";
import Loader from "../../components/loader";

import { useFieldArray, useFormContext } from "react-hook-form";

import { Icons } from "../../components/icons";
import Typo from "../../components/typo";
import { StoreData } from "../../components/store/types";

type Props = {
  className?: string;
  style?: {};
};

const SocialBlock: React.FC<Props> = ({ className }) => {
  const { control, watch } = useFormContext<StoreData>();

  const { fields, append } = useFieldArray<StoreData, "Contact_Details.Social">(
    {
      control,
      name: "Contact_Details.Social",
    }
  );

  const watchFieldArray = watch("Contact_Details.Social");
  const watchedFields =
    fields.length > 0
      ? fields.map((field, index) => {
          return {
            ...field,
            ...watchFieldArray[index],
          };
        })
      : [];

  return (
    <Box className="md:grid md:grid-cols-2 gap-5 mb-10">
      {watchedFields.length > 0 &&
        watchedFields.map((obj, ind) => {
          return (
            <Box
              className="px-8 pt-5 pb-2 border-grey border rounded-sm"
              key={obj.id}
            >
              <Typo className="pb-5" t="h5">
                Social Link {ind + 1}
              </Typo>
              <PJSTextInput
                name={`Contact_Details.Social.${ind}.Url` as const}
                label="Url"
                error="Please insert a Url"
                placeholder="Url"
              />
              <PJSTextInput
                name={`Contact_Details.Social.${ind}.Type` as const}
                label="Type"
                error="Please choose a type"
                placeholder="Social Platform"
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
          className="bg-grey w-24 h-24 rounded-full text-white text-4xl"
        >
          {Icons.plus}
        </Box>
      </Box>
    </Box>
  );
};

export default SocialBlock;
