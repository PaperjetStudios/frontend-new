import classNames from "classnames";
import * as yup from "yup";
import Box from "../../components/box";
import { useEffect } from "react";

import PJSTextInput from "../inputs/textinput";
import Loader from "../../components/loader";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import colors from "../../theme/colors";
import useStore from "../../components/store/useStore";
import { StoreData } from "../../components/store/types";

import StoreAddressBlock from "./address";
import SocialBlock from "./social";

type Props = {
  className?: string;
  style?: {};
};

const schema = yup
  .object()
  .shape({
    Title: yup.string().required(),
    Description: yup.string().required(),
  })
  .required();

const StoreForm: React.FC<Props> = ({ children, className, style }) => {
  const { loadingStore, storeData, updateStore } = useStore();

  const methods = useForm<StoreData>({
    defaultValues: {
      Contact_Details: {
        Social: [{ Type: "", Url: "" }],
      },
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (storeData) {
      methods.reset(storeData);
      console.log(storeData);
    }
    return null;
  }, [storeData, methods]);

  if (loadingStore) {
    return <Loader />;
  }

  const submit: SubmitHandler<StoreData> = (data) => {
    try {
      updateStore(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box style={style} className={classNames(className ? className : "")}>
      <FormProvider {...methods}>
        <form
          className={classNames(
            className ? className : "",
            "flex flex-col p-5"
          )}
          onSubmit={methods.handleSubmit(submit)}
        >
          <PJSTextInput
            name="Title"
            label="Title"
            error="Please insert a title"
            placeholder="Title"
          />

          <PJSTextInput
            name="Description"
            label="Description"
            multiline
            error="Please insert a description"
            placeholder="Description"
          />

          <Box className="md:grid md:grid-cols-3 gap-5">
            <PJSTextInput
              name="Contact_Details.Email"
              label="Contact Email"
              error="Please insert an email address"
              placeholder="Email Address"
            />
          </Box>

          <StoreAddressBlock />
          <SocialBlock />

          <Button
            type="submit"
            sx={{ color: colors.light, backgroundColor: colors.primary }}
          >
            {loadingStore ? <Loader /> : "Update"}
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default StoreForm;
