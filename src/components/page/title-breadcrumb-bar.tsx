import { Breadcrumbs, Typography } from "@mui/material";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Box from "../box";

type Props = {
  className?: string;
  middleLink: {
    url: string;
    title: string;
  };
  title: string;
};

const TitleBreadcrumbBar: React.FC<Props> = ({
  middleLink,
  title,
  className,
}) => {
  return (
    <Box
      className={classNames(
        className ? className : "",
        "py-5 bg-cover flex justify-center items-center bg-dark"
      )}
    >
      <Breadcrumbs aria-label="breadcrumb" color="primary.light">
        <Link className="text-sm" color="primary.light" to="/">
          Home
        </Link>
        <Link className="text-sm" color="primary.light" to={middleLink.url}>
          {middleLink.title}
        </Link>
        <Typography fontSize={14} color="#aaa">
          {title}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default TitleBreadcrumbBar;
