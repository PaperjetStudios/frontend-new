import { Input } from "@mui/material";
import classNames from "classnames";
import Box from "../box";

type Props = {
  className?: string;
  style?: {};
};

const Newsletter: React.FC<Props> = ({ children, className, style }) => {
  return (
    <Box style={style} className={classNames(className ? className : "")}>
      <Input
        placeholder="Enter your email"
        fullWidth
        sx={{ marginBottom: 1, fontSize: 16 }}
      />
    </Box>
  );
};

export default Newsletter;
