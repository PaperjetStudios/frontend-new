import * as React from "react";

import Box from "../box";
import StoreForm from "../../forms/store/store";

type Props = {};

const ShopSetup: React.FC<Props> = () => {
  return (
    <Box className="text-center">
      <StoreForm />
    </Box>
  );
};

export default ShopSetup;
