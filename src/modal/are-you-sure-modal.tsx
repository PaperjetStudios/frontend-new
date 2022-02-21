import Box from "../components/box";

import { Button } from "@mui/material";

import BaseModal from "../modal/base-modal";

import { ModalProps } from "./types";

type AreYouSureProps = {
  yes: () => void;
};

const AreYouSureModal: React.FC<ModalProps & AreYouSureProps> = ({
  yes,
  showing,
  toggle,
}) => {
  return (
    <BaseModal showing={showing} toggle={toggle} trigger={"are_you_sure"}>
      <Box className="flex gap-5 mt-5">
        <Box>
          <Button
            onClick={() => {
              yes();
            }}
            variant="contained"
          >
            Yes
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => {
              toggle(false);
            }}
            variant="contained"
          >
            No
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

export default AreYouSureModal;
