import BaseProfilePage from "../layout/base-profile-page";
import Box from "../../components/box";
import { Icons } from "../../components/icons";
import OrderTable from "../../components/orders/table-element";
import OrderList from "../../components/orders/table-list";
import ShopSetup from "../../components/store/setup";
import ProductSetup from "../../components/products/product-setup";
import { Button, Tabs, Tab, Box as BoxMUI } from "@mui/material";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  Outlet,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { useState } from "react";

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

// -----------------------------------------------------------
const useRouteMatch = (patterns) => {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return { id: i, routeMatch: possibleMatch };
    }
  }

  return null;
};

const MyTabs: React.FC<{
  sections: ShopSections[];
}> = ({ sections }) => {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  // const routeMatch = useRouteMatch(["/inbox/:id", "/drafts", "/trash"]);
  const routeMatch = useRouteMatch(
    sections.map((section, ind) => {
      if (section.to) {
        return section.to;
      }
    })
  );
  const [activeTab, setActiveTab] = useState(`${routeMatch.id + 1}`);

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

const TabsRoute: React.FC<{ sections: ShopSections[] }> = ({ sections }) => {
  return (
    <BoxMUI sx={{ width: "100%" }}>
      <MyTabs sections={sections} />
      {/* <Routes>
        {sections.map((section, ind) => {
          return (
            <Route
              key={`tab-route-${ind}`}
              path={section.to}
              element={section.content}
            />
          );
        })}
      </Routes> */}
    </BoxMUI>
  );
};
// ----------------------------------------------------------------

type Props = {};

const Shop: React.FC<Props> = ({ children }) => {
  return (
    <>
      <TabsRoute sections={sections} />
      <Outlet />
    </>
  );
  // return (
  //   <BaseProfilePage
  //     title="Shop"
  //     sections={[
  //       {
  //         title: "Orders",
  //         content: <OrderList seller />,
  //         icon: Icons.shoppingcart,
  //       },
  //       {
  //         title: "Products",
  //         content: <ProductSetup />,
  //         icon: Icons.store,
  //       },
  //       {
  //         title: "Setup",
  //         content: <ShopSetup />,
  //         icon: Icons.store,
  //       },
  //       {
  //         title: "Banking Details",
  //         content: <Box></Box>,
  //         icon: Icons.dollar,
  //       },
  //     ]}
  //   >
  //     <Box>Shop</Box>
  //   </BaseProfilePage>
  // );
};

export default Shop;
