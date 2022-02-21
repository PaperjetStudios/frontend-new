import { useParams, Outlet } from "react-router-dom";
import BaseCategory from "../layout/base-category";
import BasePage from "../layout/base-page";
import BaseProfilePage from "../layout/base-profile-page";

type Props = {};

const OrderHolder: React.FC<Props> = ({ children }) => {
  return (
    <BaseProfilePage title="Order">
      <Outlet />
    </BaseProfilePage>
  );
};

export default OrderHolder;
