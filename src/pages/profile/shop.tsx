import { useEffect, useState } from "react";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
// Import Utility Functions And Variables
import { checkRouteMatch } from "../../util/routes";
// Import MaterialUI Components
import { Button, Tabs, Tab, Box as BoxMUI } from "@mui/material";
// Import Custom React Components
import BaseProfilePage from "../layout/base-profile-page";
import Box from "../../components/box";
import { Icons } from "../../components/icons";
import OrderTable from "../../components/orders/table-element";
import OrderList from "../../components/orders/table-list";
import ShopSetup from "../../components/store/setup";
import ProductSetup from "../../components/products/product-setup";
import Typo from "../../components/typo";

const sections = [
  {
    title: "Orders",
    content: <OrderList seller />,
    icon: Icons.shoppingcart,
    to: "/profile/shop",
  },
  {
    title: "Setup",
    content: <ShopSetup />,
    icon: Icons.store,
    to: "/profile/shop/setup",
  },
  {
    title: "Products",
    content: <ProductSetup />,
    icon: Icons.store,
    to: "/profile/shop/products",
  },
  {
    title: "Banking Details",
    content: <Box></Box>,
    icon: Icons.dollar,
    to: "/profile/shop/banking_details",
  },
];

type ShopSections = {
  title: string;
  content: React.ReactNode;
  to: string;
  icon?: React.ReactElement;
};

type TablinksProps = {
  sections: ShopSections[];
};

const TabLinks: React.FC<TablinksProps> = ({ sections }) => {
  const { pathname } = useLocation();
  const routeMatch = checkRouteMatch(
    sections.map((section, ind) => {
      if (section.to) {
        return section.to;
      }
    }),
    pathname
  );
  const [activeTab, setActiveTab] = useState(`${routeMatch.id + 1}`);

  useEffect(() => {
    const routeMatch = checkRouteMatch(
      sections.map((section, ind) => {
        if (section.to) {
          return section.to;
        }
      }),
      pathname
    );
    setActiveTab(`${routeMatch.id + 1}`);
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setActiveTab(newValue);
  };
  return (
    <Box className="border-b border-grey">
      <Tabs value={activeTab} onChange={handleChange} aria-label="Account Tabs">
        {sections.map((section, ind) => {
          return (
            <Tab
              sx={{
                paddingX: 10,
                textTransform: "none",
                letterSpacing: "0",
                fontWeight: "400",
                minHeight: 50,
              }}
              key={`tablist_${ind}`}
              icon={section.icon ? section.icon : null}
              iconPosition="start"
              label={<Box>{section.title}</Box>}
              value={(ind + 1).toString()}
              to={section.to}
              component={Link}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
// ----------------------------------------------------------------

type Props = {};

const Shop: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const routeMatch = checkRouteMatch(
    sections.map((section, ind) => {
      if (section.to) {
        return section.to;
      }
    }),
    pathname
  );

  let shopActions: any = [];
  if (routeMatch && routeMatch.pattern.length < pathname.length) {
    // if the current path is a sub-route of routeMatch, add an action
    // that will allow the user to navigate back up one level

    shopActions.push({
      title: `Back to ${sections[routeMatch.id].title}`,
      action: () => {
        navigate(sections[routeMatch.id].to);
      },
    });
  }
  if (
    routeMatch &&
    routeMatch.pattern.length === pathname.length &&
    sections[routeMatch.id].title === "Products"
  ) {
    // If the active tab is the "Product" tab add an action that
    // will allow the user to create a product

    shopActions.push({
      title: `Create Product`,
      action: () => {
        navigate(`${sections[routeMatch.id].to}/create`);
      },
    });
  }
  return (
    <BaseProfilePage title="Shop">
      <BoxMUI sx={{ width: "100%" }}>
        <TabLinks sections={sections} />
      </BoxMUI>

      {/* Render child routes components */}
      <Outlet />
    </BaseProfilePage>
  );
};

export default Shop;
