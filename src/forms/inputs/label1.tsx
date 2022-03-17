import styled from "@emotion/styled";
import { FormControlLabel, FormControlLabelProps } from "@mui/material";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 12,
  height: 12,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "#000",

  "input:hover ~ &": {
    backgroundColor: "#30404d",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(57,75,89,.5)",
  },
}));

export const EcomLabel1 = (props: FormControlLabelProps) => {
  return (
    <FormControlLabel
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      {...props}
    />
  );
};
