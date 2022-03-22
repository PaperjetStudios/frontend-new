import { Box } from "@mui/material";
import AddressFormSingle from "../forms/user/address/address-form-single";

import BaseModal from "./base-modal";

import { ModalProps } from "./types";

type UpdateAddressModalProps = {
  callback: () => void;
  id: number | string;
};

const UpdateAddressModal: React.FC<ModalProps & UpdateAddressModalProps> = ({
  showing,
  toggle,
  callback,
  id,
}) => {
  return (
    <BaseModal showing={showing} toggle={toggle} trigger={"update_address"}>
      <Box>
        {id !== -1 && <AddressFormSingle id={id} callback={callback} />}
      </Box>
    </BaseModal>
  );
};

export default UpdateAddressModal;
