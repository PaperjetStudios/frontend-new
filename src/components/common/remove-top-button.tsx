import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

import { ButtonBase, Icon } from "@mui/material";
import { Icons } from "../icons";
import colors from "../../theme/colors";

const RemoveButtonStyle = styled(ButtonBase)<ButtonProps>(({ theme }) => ({
  color: colors["dark"],

  backgroundColor: colors["grey-medium"],
  transition: "0.2s all",
  position: "absolute",
  right: -10,
  top: -10,
  background: "#fff",
  borderRadius: "100%",
  width: "40px !important",
  height: "40px !important",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  minWidth: "0",
  fontSize: 20,
  "&:hover": {
    background: "#ccc",
  },
}));
type Props = {};
const RemoveTopButton: React.FC<Props & ButtonProps> = ({
  startIcon = Icons.plus,
  ...props
}) => {
  return <RemoveButtonStyle {...props}>{Icons.close}</RemoveButtonStyle>;
};

export default RemoveTopButton;
