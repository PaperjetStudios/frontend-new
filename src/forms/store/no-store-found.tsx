import React from "react";
import { Link } from "react-router-dom";
// Import Custom React Components
import Box from "../../components/box";
import Typo from "../../components/typo";
import { Icons } from "../../components/icons";

const NoStoreFound: React.FC = () => {
  return (
    <Box className="flex flex-col items-center space-y-2">
      <Box className="w-20 h-20 text-3xl rounded-full bg-grey" vcenter hcenter>
        {Icons.store}
      </Box>
      <Box>
        <Typo t="p">{"You do not have a shop"}</Typo>
        <Link to={"/profile/shop/setup/create"}>
          <Typo t="p" className="text-gray-400 text-sm">
            {"Click here to setup your shop"}
          </Typo>
        </Link>
      </Box>
    </Box>
  );
};

export default NoStoreFound;
