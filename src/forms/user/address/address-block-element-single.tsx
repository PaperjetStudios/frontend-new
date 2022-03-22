import { Box } from "@mui/material";
import PJSTextInput from "../../inputs/textinput";

type AddressBlockElementSingleProps = {};

export const AddressBlockElementSingle: React.FC<
  AddressBlockElementSingleProps
> = () => {
  return (
    <Box>
      <PJSTextInput
        name="Street_Address_1"
        label="Street Address Line 1"
        error="Please insert a Street Address"
        placeholder="Street Address Line 1"
      />
      <PJSTextInput
        name="Street_Address_2"
        label="Street Address Line 2"
        error="Please insert a Street Address"
        placeholder="Street Address Line 2"
      />
      <PJSTextInput
        name="Suburb"
        label="Suburb"
        error="Please insert a Suburb"
        placeholder="Suburb"
      />
      <PJSTextInput
        name="City"
        label="City"
        error="Please insert a City"
        placeholder="City"
      />
      <PJSTextInput
        name="Country"
        label="Country"
        error="Please insert a Country"
        placeholder="Country"
      />
      <PJSTextInput
        name="Zip_Code"
        label="Zip Code"
        error="Please insert a Zip Code"
        placeholder="Zip Code"
      />
    </Box>
  );
};
