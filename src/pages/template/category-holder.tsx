import { useParams, Outlet } from "react-router-dom";
import BaseCategory from "../layout/base-category";

type Props = {};

const CategoryHolder: React.FC<Props> = ({ children }) => {
  const { cat } = useParams();

  return (
    <BaseCategory slug={cat}>
      <Outlet />
    </BaseCategory>
  );
};

export default CategoryHolder;
