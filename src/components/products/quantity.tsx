import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../../theme/colors";
import { Icons } from "../icons";

type Props = {
  max: number;
  value: number;
  size?: "normal" | "small";
  setValue: (newValue: number) => void;
};

const NormalButton = styled(Button)`
  height: 44px;
  color: ${colors["grey-medium"]};
  :hover {
    color: ${colors["dark"]};
    background-color: transparent;
  }
`;

const SmallButton = styled(Button)`
  height: 30px;
  color: ${colors["grey-medium"]};
  :hover {
    color: ${colors["dark"]};
    background-color: transparent;
  }
  font-size: 12px;
  min-width: 32px;
`;

const Quantity: React.FC<Props> = ({
  value,
  max,
  setValue,
  size = "normal",
}) => {
  const handleAdd = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const handleMinus = () => {
    if (value >= 2) {
      setValue(value - 1);
    }
  };

  const ButtonSized = size === "normal" ? NormalButton : SmallButton;

  return (
    <Box
      sx={{
        border: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: colors["grey-lighter"],
        width: size === "normal" ? "140px" : "100px",
      }}
    >
      <ButtonSized onClick={handleMinus}>{Icons.minus}</ButtonSized>
      <Box>
        <Typography variant={size === "normal" ? "subtitle1" : "small1"}>
          {value}
        </Typography>
      </Box>
      <ButtonSized onClick={handleAdd}>{Icons.plus}</ButtonSized>
    </Box>
  );
};

export default Quantity;
