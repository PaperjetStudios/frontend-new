import { Box, BoxProps } from "@mui/material";
import colors from "../../theme/colors";

type Props = BoxProps & {
  noRadius?: boolean;
  noBorder?: boolean;
};

const ShadowContainer: React.FC<Props> = ({
  noRadius = false,
  noBorder = false,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        borderRadius: noRadius ? "0" : "10px",
        border: noBorder ? "none" : `1px solid ${colors["grey"]}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      {props.children}
    </Box>
  );
};

export default ShadowContainer;
