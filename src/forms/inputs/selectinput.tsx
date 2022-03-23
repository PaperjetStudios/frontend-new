import React, { useState } from "react";
// Import Form Libraries
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
// Import MaterialUI Components
import { Select, Alert, InputLabel, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
// Import Custom React Components
import Box from "../../components/box";

// import { size } from "./types";

/*
-----------------------------------------------
- TYPES
-----------------------------------------------
*/
type Props = {
  //   size?: size;
  name: string;
  label?: string;
  options: {
    value: string | number | readonly string[];
    displayText: string;
  }[];
  option_className?: string;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
};

/*
-----------------------------------------------
- DEFINE REACT COMPONENT
-----------------------------------------------
*/
const SelectInput: React.FC<Props> = ({
  //   size = "m",
  name,
  label,
  options,
  option_className = "",
  defaultValue = "",
  error = "",
  disabled = false,
}) => {
  const { control, watch } = useFormContext();

  //   const watchedCondition = watch(name);
  //   console.log("watchedCondition: ", watchedCondition);

  let errorElement = null;
  if (error) {
    errorElement = <Alert severity="warning">{error}</Alert>;
  }

  return (
    <Box className="flex flex-col gap-3 mb-5">
      {errorElement}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl className="w-full text-left">
            <InputLabel htmlFor="select-input">{label}</InputLabel>
            <Select
              id="select-input"
              label={label}
              onChange={onChange}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
            >
              {options &&
                options.map((option, ind) => {
                  // return <>option</>;
                  return (
                    <MenuItem
                      key={`select-input-${name}-menu-item-${ind}`}
                      value={option.value}
                      className={option_className}
                    >
                      {option.displayText}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default SelectInput;
