import BaseProfilePage from "../layout/base-profile-page";
import Box from "../../components/box";
import OrderList from "../../components/orders/table-list";

type Props = {};

const Orders: React.FC<Props> = ({ children }) => {
  return (
    <BaseProfilePage title="Order History">
      <OrderList seller={false} />
    </BaseProfilePage>
  );
};

export default Orders;
