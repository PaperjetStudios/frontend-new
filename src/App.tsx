import React from "react";
import { Helmet } from "react-helmet";
import Box from "./components/box";
import { setup } from "./config/config";

import BaseRoutes from "./routing/router-base";

export default function App() {
  return (
    <>
      <Helmet>
        <html lang="en" className="h-full" />
        <title>{setup.title}</title>
        <meta name="description" content={setup.description} />
        <meta name="theme-color" content="#fff" />
        <body className="" />
      </Helmet>
      <Box className="site-main">
        <BaseRoutes />
      </Box>
    </>
  );
}
