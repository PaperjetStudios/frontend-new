import { Box } from "@mui/material";
import AddressFormSingle from "../forms/user/address/address-form-single";

import BaseModal from "./base-modal";

import { ModalProps } from "./types";

type AddAddressProps = {
  callback: () => void;
};

const AddAddressModal: React.FC<ModalProps & AddAddressProps> = ({
  showing,
  toggle,
  callback,
}) => {
  return (
    <BaseModal showing={showing} toggle={toggle} trigger={"add_address"}>
      <Box>
        <AddressFormSingle callback={callback} />
      </Box>
    </BaseModal>
  );
};

export default AddAddressModal;
