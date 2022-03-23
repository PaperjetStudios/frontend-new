import { useFormContext } from "react-hook-form";
// Import Types
import { StoreData } from "../../components/store/types";
// Import Custom React Components
import Box from "../../components/box";
import Typo from "../../components/typo";
import PJSTextInput from "../inputs/textinput";

type Props = {
  disabled?: boolean;
};
const StoreAddressBlock: React.FC<Props> = ({ disabled = false }) => {
  const { formState } = useFormContext<StoreData>();

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
          disabled={disabled}
        />
        <PJSTextInput
          name={`Contact_Details.Address.Street_Address_2`}
          label="Street Address Line 2"
          error={
            formState?.errors?.Contact_Details?.Address?.Street_Address_2
              ?.message
          }
          placeholder="Street Address Line 2"
          disabled={disabled}
        />
        <PJSTextInput
          name={`Contact_Details.Address.Suburb`}
          label="Suburb"
          error={formState?.errors?.Contact_Details?.Address?.Suburb?.message}
          placeholder="Suburb"
          disabled={disabled}
        />
        <PJSTextInput
          name={`Contact_Details.Address.City`}
          label="City"
          error={formState?.errors?.Contact_Details?.Address?.City?.message}
          placeholder="City"
          disabled={disabled}
        />
        <PJSTextInput
          name={`Contact_Details.Address.Country`}
          label="Country"
          error={formState?.errors?.Contact_Details?.Address?.Country?.message}
          placeholder="Country"
          disabled={disabled}
        />
        <PJSTextInput
          name={`Contact_Details.Address.Zip_Code`}
          label="Zip Code"
          error={formState?.errors?.Contact_Details?.Address?.Zip_Code?.message}
          placeholder="Zip Code"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

export default StoreAddressBlock;
