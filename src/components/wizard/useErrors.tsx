import { Alert, AlertColor } from "@mui/material";
import produce from "immer";
import { findIndex } from "lodash";
import { useEffect, useState } from "react";
import { crud } from "../../state/crud";

export type NotifyError = {
  message: string;
  type: AlertColor;
};
export type NotifyErrors = {
  errors: NotifyError[];
};

const emptyErrors = { errors: [] };

export default function useErrors() {
  const [errorData, setErrorData] = useState<NotifyErrors>(emptyErrors);

  const addError = (
    error: string,
    clear: boolean = false,
    onlyOne: boolean = true
  ) => {
    const newError = {
      message: error,
      type: "error",
    };

    let newState = errorData;

    if (onlyOne) {
      if (crud.findIndex(errorData.errors, ["message"], error) === -1) {
        newState = crud.addItem(
          errorData,
          ["errors"],
          newError
        ) as NotifyErrors;
      }
    } else {
      newState = crud.addItem(errorData, ["errors"], newError) as NotifyErrors;
    }

    setErrorData(newState);
  };

  const clearErrors = () => {
    setErrorData(crud.clearCollection(errorData, ["errors"]));
  };

  const removeError = (message: string) => {
    const newState = crud.removeItem(
      errorData,
      ["errors", "message"],
      message
    ) as NotifyErrors;
    setErrorData(newState);
  };

  useEffect(() => {
    console.log(errorData);
  }, [errorData]);

  return {
    errorData,
    addError,
    removeError,
    clearErrors,
  };
}
