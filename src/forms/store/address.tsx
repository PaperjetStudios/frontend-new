import { useEffect } from "react";
import Box from "../../components/box";
import Typo from "../../components/typo";
import PJSTextInput from "../inputs/textinput";

import { useFormContext, Controller } from "react-hook-form";

import { StoreData } from "../../components/store/types";

const StoreAddressBlock: React.FC = () => {
  const { formState, watch } = useFormContext<StoreData>();

  // const watchAddress = watch("Contact_Details.Address");

  return (
    <Box className="md:grid md:grid-cols-2 gap-5 mb-10">
      <Box className="px-8 pt-5 pb-2 border-grey border rounded-sm">
        <Typo className="pb-5" t="h5">
          Store Address
        </Typo>
        <PJSTextInput
          name={`Contact_Details.Address.Street_Address_1`}
          label="Street Address Line 1"
          error={
            formState?.errors?.Contact_Details?.Address?.Street_Address_1
              ?.message
          }
          placeholder="Street Address Line 1"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Street_Address_2`}
          label="Street Address Line 2"
          error={
            formState?.errors?.Contact_Details?.Address?.Street_Address_2
              ?.message
          }
          placeholder="Street Address Line 2"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Suburb`}
          label="Suburb"
          error={formState?.errors?.Contact_Details?.Address?.Suburb?.message}
          placeholder="Suburb"
        />
        <PJSTextInput
          name={`Contact_Details.Address.City`}
          label="City"
          error={formState?.errors?.Contact_Details?.Address?.City?.message}
          placeholder="City"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Country`}
          label="Country"
          error={formState?.errors?.Contact_Details?.Address?.Country?.message}
          placeholder="Country"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Zip_Code`}
          label="Zip Code"
          error={formState?.errors?.Contact_Details?.Address?.Zip_Code?.message}
          placeholder="Zip Code"
        />
      </Box>
    </Box>
  );
};

export default StoreAddressBlock;
