import React, { useState } from "react";
// Import Form Libraries
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
// Import MaterialUI Components
import { Select, Alert, InputLabel, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";

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
}) => {
  const { register } = useFormContext();

  let errorElement = null;

  if (error) {
    errorElement = <Alert severity="warning">{error}</Alert>;
  }

  return (
    <FormControl className="w-full text-left">
      {errorElement}
      <InputLabel htmlFor="select-input">{label}</InputLabel>
      <Select
        id="select-input"
        label={label}
        defaultValue={defaultValue}
        {...register(name)}
      >
        {options &&
          options.map((option) => {
            // return <>option</>;
            return (
              <MenuItem value={option.value} className={option_className}>
                {option.displayText}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
