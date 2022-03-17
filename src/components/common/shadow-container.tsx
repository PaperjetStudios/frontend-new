import {
  Box,
  BoxProps,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  RadioGroup,
  Typography,
} from "@mui/material";
import colors from "../../theme/colors";

const ShadowContainer: React.FC<BoxProps> = (props) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        borderRadius: "10px",
        border: `1px solid ${colors["grey"]}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      {props.children}
    </Box>
  );
};

export default ShadowContainer;
