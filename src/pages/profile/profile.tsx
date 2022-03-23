import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
// Import Utility Functions And Variables
import { checkRouteMatch } from "../../util/routes";
import { ProfileLink, ProfileLinks, profileSlug } from "./config";
import colors from "../../theme/colors";
// Import MaterialUI Components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// Import Custom React Components
import BasePage from "../layout/base-page";
import Box from "../../components/box";
import Authorized from "../../components/auth/authorized";

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
  const routeMatch = checkRouteMatch(
    ProfileLinks.map((link) => {
      return link.to;
    }),
    location.pathname
  );
  return (
    <Authorized redirect={"/login-register"}>
      <BasePage slug="profile">
        <Box className="w-full mt-10" wrapper hcenter>
          <Box className="w-1/6">
            <List sx={{ paddingTop: 0 }}>
              {ProfileLinks.map((link, index) => {
                if (!link.hidden) {
                  return (
                    <ListItemLink
                      key={`profile_link_${index}`}
                      current={routeMatch && routeMatch.pattern === link.to}
                      {...link}
                    />
                  );
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
