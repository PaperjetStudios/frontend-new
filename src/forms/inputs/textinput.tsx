import { Alert, TextField } from "@mui/material";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import Box from "../../components/box";

import { FormInputProps } from "./types";

type TextInputProps = FormInputProps & {
  placeholder: string;
  label?: string;
  password?: boolean;
  type?: string;
  multiline?: boolean;
};

const PJSTextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  error,
  label,
  password,
  type,
  multiline,
}) => {
  const { control } = useFormContext(); // retrieve all hook methods

  let errorElement = null;
  if (error) {
    errorElement = <Alert severity="warning">{error}</Alert>;
  }

  let extraParams = {};
  if (password) {
    extraParams = { type: "password", autoComplete: "current-password" };
  }

  return (
    <Box className="flex flex-col gap-3 mb-5">
      {errorElement}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              multiline={multiline}
              maxRows={4}
              type={type}
              label={label ? label : ""}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              {...extraParams}
            />
          );
        }}
      />
    </Box>
  );
};

export default PJSTextInput;
