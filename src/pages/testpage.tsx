import { forwardRef, useMemo } from "react";
import { Button } from "@mui/material";
import BasePage from "./layout/base-page";
import Box from "../components/box";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

import List from "@mui/material/List";

import { Icons } from "../components/icons";

import { ProfileLink, ProfileLinks, profileSlug } from "./profile/config";
import Typo from "../components/typo";
import colors from "../theme/colors";

type Props = {};

function ListItemLink(props: ProfileLink) {
  const { icon, to, title, current } = props;
  console.log(current);
  return (
    <RouterLink to={to}>
      <ListItem
        sx={{
          gap: "10px",
          backgroundColor: current ? colors.grey : "transparent",
        }}
      >
        <ListItemIcon
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: 30,
            padding: 0,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </RouterLink>
  );
}

const TestPage: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <BasePage slug="home">
      <Box className="w-full" wrapper hcenter>
        <Box className="w-1/6">
          <List sx={{ paddingTop: 0 }}>
            {ProfileLinks.map((link, index) => {
              let current =
                location.pathname.replace("/" + profileSlug, "") === link.to ||
                location.pathname.replace("/" + profileSlug + "/", "") ===
                  link.to;

              return <ListItemLink current={current} {...link} />;
            })}
          </List>
        </Box>
        <Box className="w-5/6">
          <Outlet />
        </Box>
      </Box>
    </BasePage>
  );
};

export default TestPage;
