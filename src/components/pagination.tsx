import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

type Props = {
  count: number;
};

// Separated pagination component so we can reuse it for other components as the functionality should remain the same

const PJSPagination: React.FC<Props> = ({ count }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  return (
    <Pagination
      page={page}
      count={count}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${location.pathname}${
            item.page === 1 ? "" : `?page=${item.page}`
          }`}
          {...item}
        />
      )}
      sx={{
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "flex-end",
        },
      }}
    />
  );
};

export default PJSPagination;
