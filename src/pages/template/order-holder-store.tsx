import { useParams, Outlet } from "react-router-dom";
import BaseCategory from "../layout/base-category";
import BaseProfilePage from "../layout/base-profile-page";

type Props = {};

const OrderHolderStore: React.FC<Props> = ({ children }) => {
  const { order } = useParams();

  return (
    <BaseProfilePage title="Order History">
      <Outlet />
    </BaseProfilePage>
  );
};

export default OrderHolderStore;
