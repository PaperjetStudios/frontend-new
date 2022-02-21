import Box from "../../components/box";
import PJSTextInput from "../inputs/textinput";

import { useFormContext } from "react-hook-form";

import { StoreData } from "../../components/store/types";

const StoreAddressBlock: React.FC = () => {
  //const { control, watch } = useFormContext<StoreData>();

  //const watchAddress = watch("Contact_Details.Address");

  return (
    <Box className="md:grid md:grid-cols-2 gap-5 mb-10">
      <Box className="px-8 pt-5 pb-2 border-grey border rounded-sm">
        <PJSTextInput
          name={`Contact_Details.Address.Street_Address_1`}
          label="Street Address Line 1"
          error="Please insert a Street Address"
          placeholder="Street Address Line 1"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Street_Address_2`}
          label="Street Address Line 2"
          error="Please insert a Street Address"
          placeholder="Street Address Line 2"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Suburb`}
          label="Suburb"
          error="Please insert a Suburb"
          placeholder="Suburb"
        />
        <PJSTextInput
          name={`Contact_Details.Address.City`}
          label="City"
          error="Please insert a City"
          placeholder="City"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Country`}
          label="Country"
          error="Please insert a Country"
          placeholder="Country"
        />
        <PJSTextInput
          name={`Contact_Details.Address.Zip_Code`}
          label="Zip Code"
          error="Please insert a Zip Code"
          placeholder="Zip Code"
        />
      </Box>
    </Box>
  );
};

export default StoreAddressBlock;
