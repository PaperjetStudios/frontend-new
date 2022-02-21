import { Button, Stack } from "@mui/material";

import { Link } from "react-router-dom";
import colors from "../../theme/colors";

import { MenuItems } from "./types";

type FooterMenuProps = {
  data: MenuItems[];
};

const FooterMenu: React.FC<FooterMenuProps> = ({ data }) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={0}
    >
      {data.map((obj, ind) => {
        let link = "";

        // Make Link String

        // For Pages
        if (obj?.Page?.data?.attributes) {
          link = obj.Page.data.attributes.slug;
        }

        // For Categories
        if (obj?.Category?.data?.attributes) {
          link = "/category/" + obj.Category.data.attributes.slug;
        }

        // For Url
        if (obj?.Url) {
          link = obj.Url;
        }

        return (
          <Link key={`menuItem-${ind}`} to={link}>
            <Button
              sx={{
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize: 14,
                color: colors["grey-lighter"],
                minWidth: 0,
                letterSpacing: "0",
                padding: 0,
                "&:hover": { backgroundColor: "#fff", color: "#777" },
              }}
              variant="text"
            >
              {obj.Title}
            </Button>
          </Link>
        );
      })}
    </Stack>
  );
};

export default FooterMenu;
