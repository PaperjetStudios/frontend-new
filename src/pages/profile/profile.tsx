import BasePage from "../layout/base-page";

import Box from "../../components/box";
import Authorized from "../../components/auth/authorized";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import List from "@mui/material/List";

import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { ProfileLink, ProfileLinks, profileSlug } from "./config";
import colors from "../../theme/colors";

type Props = {};

function ListItemLink(props: ProfileLink) {
  const { icon, to, title, current } = props;
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

const ProfilePage: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  return (
    <Authorized redirect={"/login-register"}>
      <BasePage slug="profile">
        <Box className="w-full mt-10" wrapper hcenter>
          <Box className="w-1/6">
            <List sx={{ paddingTop: 0 }}>
              {ProfileLinks.map((link, index) => {
                if (!link.hidden) {
                  let current =
                    location.pathname.replace("/" + profileSlug, "") ===
                      link.to ||
                    location.pathname.replace("/" + profileSlug + "/", "") ===
                      link.to;

                  return (
                    <ListItemLink
                      key={`profile_link_${index}`}
                      current={current}
                      {...link}
                    />
                  );
                } else {
                  return <></>;
                }
              })}
            </List>
          </Box>
          <Box className="w-5/6">
            <Outlet />
          </Box>
        </Box>
      </BasePage>
    </Authorized>
  );
};

export default ProfilePage;
