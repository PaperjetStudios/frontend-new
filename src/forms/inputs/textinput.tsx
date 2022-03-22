import styled from "@emotion/styled";
import { Alert, Button, InputBase, TextField } from "@mui/material";

import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";

import Box from "../../components/box";
import colors from "../../theme/colors";

import { FormInputProps } from "./types";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: colors["grey-dark"],
  },
  "& label": {
    fontSize: "14px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: colors["grey-dark"],
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "15px",

    "& input": {
      padding: "15px 15px 15px 15px",
    },
    "& fieldset": {
      border: "0",
      borderBottom: "1px solid",
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: colors["grey-medium"],
    },
    "&.Mui-focused fieldset": {
      borderColor: colors["grey-medium"],
    },
  },
});

type TextInputProps = FormInputProps & {
  placeholder: string;
  label?: string;
  password?: boolean;
  multiline?: boolean;
};

const PJSTextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  error,
  label,
  password,
  multiline,
}) => {
  const { control, formState } = useFormContext(); // retrieve all hook methods

  let errorElement = null;

  if (formState?.errors[name]) {
    errorElement = <Alert severity="warning">{error}</Alert>;
  }

  let extraParams = {};
  if (password) {
    extraParams = { type: "password", autoComplete: "current-password" };
  }

  return (
    <Box className="flex flex-col gap-3 mb-5">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CssTextField
            multiline={multiline}
            maxRows={4}
            label={label ? label : ""}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            {...extraParams}
          />
        )}
      />
      {errorElement}
    </Box>
  );
};

export default PJSTextInput;
