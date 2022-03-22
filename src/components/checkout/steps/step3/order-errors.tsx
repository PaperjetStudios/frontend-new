import { Alert, Box } from "@mui/material";

type ErrorProps = {
  errors: {
    message: string;
    data: {
      product: string;
      available: number;
      wanted: number;
    };
  }[];
};

const CheckoutErrors: React.FC<ErrorProps> = ({ errors }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2, gap: "10px" }}>
      {errors.map((obj) => {
        return (
          <Alert key={obj.data.product} severity="warning" sx={{ flex: 1 }}>
            {obj.data.product} - You wanted {obj.data.wanted} but there are{" "}
            {obj.data.available} available.
          </Alert>
        );
      })}
    </Box>
  );
};

export default CheckoutErrors;
