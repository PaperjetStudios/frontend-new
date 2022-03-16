import React, { useEffect } from "react";
import classNames from "classnames";
// Import Form Libraries
import { useFieldArray, useFormContext } from "react-hook-form";
// Import MaterialUI Components
import {
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
};

const SelectMultipleInput: React.FC<Props> = ({
  name,
  className = "",
  options,
}) => {
  const { control, watch, setValue, register } = useFormContext();

  const { fields, append, remove } = useFieldArray(
    //   <
    //     StoreData,
    //     "Contact_Details.Social"
    //   >
    {
      control,
      name: name,
    }
  );

  const watchedMultipleSelectValue = watch(name);
  // console.log("watchedMultipleSelectValue: ", {
  //   field: name,
  //   value: watchedMultipleSelectValue,
  // });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(name, value);
  };

  return (
    <Box className={classNames("text-left pb-5", className)}>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id={`multiple-${name.toLowerCase()}-label`}>
          {name}
        </InputLabel>
        <Select
          labelId={`multiple-${name.toLowerCase()}-label`}
          id={`multiple-${name.toLowerCase()}`}
          multiple
          value={watchedMultipleSelectValue}
          onChange={handleChange}
          {...register}
          input={
            <OutlinedInput
              id={`select-multiple-${name.toLowerCase()}`}
              label={name.toLowerCase()}
            />
          }
          renderValue={(selected) => (
            <BoxMUI sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={`select-multiple-${name}-chip-item-${value}`}
                  label={value}
                />
              ))}
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
    </Box>
  );
};

export default SelectMultipleInput;
