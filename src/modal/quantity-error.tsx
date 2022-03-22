import { Box, Button } from "@mui/material";

import BaseModal from "./base-modal";

import { ModalProps } from "./types";

type QuantityErrorProps = {
  callback: () => void;
};

const QuantityErrorModal: React.FC<ModalProps & QuantityErrorProps> = ({
  showing,
  toggle,
  callback,
  children,
}) => {
  return (
    <BaseModal showing={showing} toggle={toggle} trigger={"quantity_error"}>
      {children}
      <Box sx={{ display: "flex", flex: 1, gap: "20px", mt: 3 }}>
        <Box>
          <Button
            onClick={() => {
              callback();
            }}
            variant="contained"
          >
            Continue Anyway
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => {
              toggle(false);
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

export default QuantityErrorModal;
