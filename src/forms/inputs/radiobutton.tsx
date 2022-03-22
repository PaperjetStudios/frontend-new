import styled from "@emotion/styled";
import { Radio, RadioProps } from "@mui/material";

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

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#000",

  "&:before": {
    display: "block",
    width: 8,
    height: 8,
    borderRadius: "100%",
    background: "#fff",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

export const EcomRadio = (props: RadioProps) => {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
        padding: "8px 15px",
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};
