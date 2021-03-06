import React, { useEffect } from "react";
import classNames from "classnames";
// Import Form Libraries
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
// Import MaterialUI Components
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  FormGroup,
  Switch,
  Box as BoxMUI,
} from "@mui/material";
// Import Custom Hooks
import useProduct from "../../components/products/useProduct";
// Import Custom React Components
import Box from "../../components/box";

type Props = {
  name: string;
  className?: string;
  options: {
    value: string;
    displayText: string;
  }[];
  error?: string;
};

const SelectMultipleInput: React.FC<Props> = ({
  name,
  className = "",
  options,
  error = "",
}) => {
  const { control, watch } = useFormContext();

  const watchedMultipleSelectValue = watch(name);
  // console.log("watchedMultipleSelectValue: ", {
  //   field: name,
  //   value: watchedMultipleSelectValue,
  // });

  let errorElement = null;
  if (error) {
    errorElement = <Alert severity="warning">{error}</Alert>;
  }

  return (
    <Box
      className={classNames("flex flex-col gap-3 mb-5 text-left", className)}
    >
      {errorElement}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl sx={{ width: 300 }}>
            <InputLabel id={`multiple-${name.toLowerCase()}-label`}>
              {name}
            </InputLabel>
            <Select
              labelId={`multiple-${name.toLowerCase()}-label`}
              id={`multiple-${name.toLowerCase()}`}
              multiple
              value={value}
              onChange={onChange}
              input={
                <OutlinedInput
                  id={`select-multiple-${name.toLowerCase()}`}
                  label={name.toLowerCase()}
                />
              }
              renderValue={(selected) => (
                <BoxMUI sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    // Here we ensure that the displayText of the selected value
                    // is displayed
                    let selectedLabel = options.find((option) => {
                      if (option.value === value) {
                        return true;
                      }
                    });
                    return (
                      <Chip
                        key={`select-multiple-${name}-chip-item-${value}`}
                        label={selectedLabel.displayText}
                      />
                    );
                  })}
                </BoxMUI>
              )}
            >
              {options.map((option, ind) => (
                <MenuItem
                  key={`select-multiple-${name}-menu-item-${ind}`}
                  value={option.value}
                >
                  {option.displayText}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default SelectMultipleInput;
