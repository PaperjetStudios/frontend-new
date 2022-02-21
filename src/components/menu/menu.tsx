import { useQuery } from "@apollo/client";
import { Button, Stack } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../icons";
import Loader from "../loader";
import { main_menu_query } from "./query";
import { MenuItems } from "./types";

type Props = {
  className?: string;
};

type MenuStackProps = {
  data: MenuItems[];
  direction: "row" | "column";
};

const MenuStack: React.FC<MenuStackProps> = ({ data, direction }) => {
  return (
    <Stack direction={direction} spacing={3.5}>
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
                letterSpacing: "0",
                padding: 0,
                minWidth: 0,
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

const Menu: React.FC<Props> = ({ children, className }) => {
  const { loading, data } = useQuery(main_menu_query);

  const [open, toggleOpen] = useState(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={classNames(className ? className : "", "hidden lg:block")}
      >
        <MenuStack data={data.menu.data.attributes.Item} direction="row" />
      </div>
      <div
        className={classNames(className ? className : "", "block lg:hidden")}
      >
        <Button
          onClick={() => {
            toggleOpen(!open);
          }}
          sx={{ fontSize: 30 }}
        >
          {Icons.menu.bars}
        </Button>
      </div>
    </>
  );
};

export default Menu;
