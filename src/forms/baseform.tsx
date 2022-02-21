import { Alert, Button } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Box from "../components/box";
import colors from "../theme/colors";
import Loader from "../components/loader";

type BaseFormElementProps = {
  onSubmit: (data: any) => void;
  className?: string;
  submitButtonText?: string;
  mainError?: string;
  loading?: boolean;
  methods?: any;
};

const BaseForm: React.FC<BaseFormElementProps> = ({
  onSubmit,
  className,
  submitButtonText,
  children,
  mainError = "",
  loading = false,
  methods,
}) => {
  return (
    <FormProvider {...methods}>
      {mainError !== "" && (
        <Box className="my-3">
          <Alert severity="error">{mainError}</Alert>
        </Box>
      )}
      <form
        className={classNames(className ? className : "", "flex flex-col p-5")}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
        <Button
          type="submit"
          sx={{ color: colors.light, backgroundColor: colors.primary }}
        >
          {loading ? (
            <Loader />
          ) : (
            <>{submitButtonText ? submitButtonText : "Submit"}</>
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default BaseForm;
