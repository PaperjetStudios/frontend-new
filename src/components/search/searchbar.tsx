import { Button, Input } from "@mui/material";
import classNames from "classnames";
import { Icons } from "../icons";

type Props = {
  className?: string;
};

type SearchProps = {};

const SearchInput: React.FC<SearchProps> = () => {
  return (
    <>
      <Input sx={{ fontSize: "14px" }} placeholder="Search" disableUnderline />
    </>
  );
};

const Search: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        className ? className : "",
        "bg-grey-light mx-2 lg:mx-0 rounded-full w-full lg:w-searchbar flex justify-between items-center py-1 pl-5  pr-2"
      )}
    >
      <SearchInput />
      <Button
        sx={{
          backgroundColor: "#000",
          borderRadius: "20px",
          color: "#fff",
          "&:hover": { backgroundColor: "#555" },
        }}
      >
        {Icons.search}
      </Button>
    </div>
  );
};

export default Search;
