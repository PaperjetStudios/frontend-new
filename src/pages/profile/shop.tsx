import BaseProfilePage from "../layout/base-profile-page";
import Box from "../../components/box";
import { Icons } from "../../components/icons";
import OrderTable from "../../components/orders/table-element";
import OrderList from "../../components/orders/table-list";
import ShopSetup from "../../components/store/setup";

type Props = {};

const Shop: React.FC<Props> = ({ children }) => {
  return (
    <BaseProfilePage
      title="Shop"
      sections={[
        {
          title: "Orders",
          content: <OrderList seller />,
          icon: Icons.shoppingcart,
        },
        {
          title: "Setup",
          content: <ShopSetup />,
          icon: Icons.store,
        },
        {
          title: "Banking Details",
          content: <Box></Box>,
          icon: Icons.dollar,
        },
      ]}
    >
      <Box>Shop</Box>
    </BaseProfilePage>
  );
};

export default Shop;
