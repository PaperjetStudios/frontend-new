import { useParams, Outlet } from "react-router-dom";

import BaseStore from "../layout/base-store";

type Props = {};

const StoreHolder: React.FC<Props> = ({ children }) => {
  const { store } = useParams();

  return (
    <BaseStore id={store}>
      <Outlet />
    </BaseStore>
  );
};

export default StoreHolder;
