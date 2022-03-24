import React from "react";
import { Link } from "react-router-dom";
// Import Custom React Components
import Box from "../../components/box";
import Typo from "../../components/typo";
import { Icons } from "../../components/icons";

const NoOrdersFound: React.FC = () => {
  return (
    <Box className="flex flex-col items-center space-y-2">
      <Box className="w-20 h-20 text-3xl rounded-full bg-grey" vcenter hcenter>
        {Icons.shoppingcart}
      </Box>
      <Box>
        <Typo t="p">{"No orders found"}</Typo>
      </Box>
    </Box>
  );
};

export default NoOrdersFound;
