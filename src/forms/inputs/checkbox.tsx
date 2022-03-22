import { Alert, Checkbox, FormControlLabel } from "@mui/material";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import Box from "../../components/box";

import { FormInputProps } from "./types";

type CheckBoxProps = FormInputProps & {
  label?: string;
};

const PJSCheckbox: React.FC<CheckBoxProps> = ({ name, error, label }) => {
  const { control, formState } = useFormContext(); // retrieve all hook methods

  let errorElement = null;

  if (formState?.errors[name]) {
    errorElement = <Alert severity="warning">{error}</Alert>;
  }

  return (
    <Box className="flex flex-col gap-3 mb-5">
      {errorElement}

      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              />
            )}
          />
        }
        label={label}
      />
    </Box>
  );
};

export default PJSCheckbox;
