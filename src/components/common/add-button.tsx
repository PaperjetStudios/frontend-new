import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { ButtonBase, Icon } from "@mui/material";
import { Icons } from "../icons";
import colors from "../../theme/colors";

const AddButtonStyle = styled(ButtonBase)<ButtonProps>(({ theme }) => ({
  color: colors["light"],
  borderRadius: 10,
  backgroundColor: colors["grey-medium"],
  transition: "0.2s all",
  "&:hover": {
    backgroundColor: colors["grey-dark"],
  },
}));
type Props = {};
const AddButton: React.FC<Props & ButtonProps> = ({
  startIcon = Icons.plus,
  ...props
}) => {
  return <AddButtonStyle {...props}>{Icons.plus}</AddButtonStyle>;
};

export default AddButton;
