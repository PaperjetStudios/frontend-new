import React from "react";
import { Link } from "react-router-dom";
// Import Custom React Components
import Box from "../../components/box";
import Typo from "../../components/typo";
import { Icons } from "../../components/icons";

const NoProductsFound: React.FC = () => {
  return (
    <Box className="flex flex-col items-center space-y-2">
      <Box className="w-20 h-20 text-3xl rounded-full bg-grey" vcenter hcenter>
        {Icons.store}
      </Box>
      <Box>
        <Typo t="p">{"Your shop does not have any products yet"}</Typo>
        <Link to={"/profile/shop/products/create"}>
          <Typo t="p" className="text-gray-400 text-sm">
            {"Click here to add a product"}
          </Typo>
        </Link>
      </Box>
    </Box>
  );
};

export default NoProductsFound;
