import { Button, Typography } from "@mui/material";
import Box from "../box";
import { Icons } from "../icons";

type Props = {
  max: number;
  value: number;
  setValue: (newValue: number) => void;
};

const Quantity: React.FC<Props> = ({ value, max, setValue }) => {
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

  return (
    <Box className="flex h-12  items-stretch justify-between gap-2 border border-grey">
      <Button onClick={handleMinus}>{Icons.minus}</Button>
      <Box className="flex justify-center items-center">
        <Typography variant="subtitle1">{value}</Typography>
      </Box>
      <Button onClick={handleAdd}>{Icons.plus}</Button>
    </Box>
  );
};

export default Quantity;
