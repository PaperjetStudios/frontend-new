import * as React from "react";
// Import Custom React Components
import Box from "../box";
import StoreForm from "../../forms/store/store";

type Props = {
  disabled?: boolean;
  mode?: "create" | "edit";
};

const ShopSetup: React.FC<Props> = ({ disabled = false, mode }) => {
  return (
    <Box className="text-center">
      <StoreForm disabled={disabled} mode={mode} />
    </Box>
  );
};

export default ShopSetup;
