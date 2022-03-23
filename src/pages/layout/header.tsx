import { ApolloError, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import useLoggedIn from "../../components/auth/isLoggedIn";
import Box from "../../components/box";
import { Icons } from "../../components/icons";
import Loader from "../../components/loader";
import Menu from "../../components/menu/menu";
import Search from "../../components/search/searchbar";
import Typo from "../../components/typo";
import { currentApi } from "../../config/config";
import { options_query } from "../../config/queries";

import { Link } from "react-router-dom";
import BaseModal from "../../modal/base-modal";
import { useState } from "react";
import LoginModal from "../../modal/login-modal";

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ children }) => {
  const [loginModalOpen, loginModalToggle] = useState(false);

  const { loading, data: options } = useQuery(options_query, {
    onCompleted: (data) => {
      // console.log(data);
    },
    onError: (error: ApolloError) => {
      //toast(JSON.stringify(error));
      console.log(JSON.stringify(error));
    },
  });

  const loginStatus = useLoggedIn();

  if (loading) {
    return <Loader />;
  }

  const opt = options.option.data.attributes;
  const topMenuLinkStyle = {
    color: "#fff",
    fontSize: {
      xs: "14px",
      md: "11px",
    },
    lineHeight: {
      xs: "14px",
      md: "11px",
    },
    fontWeight: "400",
  };

  return (
    <>
      <LoginModal
        showing={loginModalOpen}
        toggle={(tog) => {
          loginModalToggle(tog);
        }}
        trigger="login_register"
      />
      <Box className="mb-6">
        {/* TOP BAR */}
        <Box className="w-full px-6 py-3 bg-grey-dark flex justify-between items-center text-light text-xs">
          <Box className="hidden md:block">
            <Typo t="small">{opt.Notice}</Typo>
          </Box>
          <Box className="w-full justify-between md:w-auto flex gap-3">
            <Button
              sx={{
                ...topMenuLinkStyle,
                borderColor: "#fff",
                borderRadius: "20px",
                padding: "0px 20px",
              }}
              variant="outlined"
            >
              Become a Seller
            </Button>
            {loginStatus.isLoggedIn !== null && !loginStatus.isLoggedIn && (
              <Button
                sx={{
                  ...topMenuLinkStyle,
                }}
                onClick={() => {
                  loginModalToggle(true);
                }}
                variant="text"
              >
                Log In / Sign Up
              </Button>
            )}
            {loginStatus.isLoggedIn !== null && loginStatus.isLoggedIn && (
              <Link to="/profile">
                <Button
                  sx={{
                    ...topMenuLinkStyle,
                  }}
                  variant="text"
                >
                  Profile
                </Button>
              </Link>
            )}
          </Box>
        </Box>

        {/* MENU BAR */}
        <Box className="w-full px-6 py-8 grid grid-cols-3">
          <Menu />
          <Box className="flex justify-center items-center">
            <Link to="/">
              <img
                className="w-16 h-auto"
                src={currentApi.url + opt.Logo.data.attributes.url}
                alt="logo"
              />
            </Link>
          </Box>
          <Box className="flex justify-end items-center gap-2">
            <Button
              style={{
                color: "#000",
                fontSize: "20px",
                padding: "0",
                minWidth: "30px",
              }}
            >
              {Icons.heart}
            </Button>
            <Button
              style={{
                color: "#000",
                fontSize: "20px",
                padding: "0",
                minWidth: "30px",
              }}
            >
              {Icons.shoppingcart}
            </Button>
          </Box>
        </Box>

        {/* SEARCH BAR */}
        <Box className="flex justify-center items-center">
          <Search />
        </Box>
      </Box>
    </>
  );
};
export default Header;
