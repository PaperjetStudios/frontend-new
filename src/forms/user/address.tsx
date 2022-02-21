import classNames from "classnames";
import * as yup from "yup";
import Box from "../../components/box";
import { useEffect } from "react";

import PJSTextInput from "../inputs/textinput";
import Loader from "../../components/loader";

import useUser from "./useUser";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import colors from "../../theme/colors";
import { Icons } from "../../components/icons";
import Typo from "../../components/typo";

type Props = {
  className?: string;
  style?: {};
};

type FormType = {
  address: Address[];
};

type AddressBlockProps = {
  className?: string;
  style?: {};
};

type Address = {
  Street_Address_1: string;
  Street_Address_2: string;
  Suburb: string;
  City: string;
  Country: string;
  Zip_Code: string;
};

const emptyAddress = {
  Street_Address_1: "",
  Street_Address_2: "",
  Suburb: "",
  City: "",
  Country: "",
  Zip_Code: "",
};

const schema = yup.object().shape({}).required();

const AddressBlock: React.FC<AddressBlockProps> = ({ className }) => {
  const { control, watch } = useFormContext<FormType>();

  const { fields, append } = useFieldArray<FormType, "address">({
    control,
    name: "address",
  });

  const watchFieldArray = watch("address");
  const watchedFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  return (
    <Box className="md:grid md:grid-cols-2 gap-5 mb-10">
      {watchedFields.map((obj, ind) => {
        return (
          <Box
            className="px-8 pt-5 pb-2 border-grey border rounded-sm"
            key={obj.id}
          >
            <Typo className="pb-5" t="h5">
              Address {ind + 1}
            </Typo>
            <PJSTextInput
              name={`address.${ind}.Street_Address_1` as const}
              label="Street Address Line 1"
              error="Please insert a Street Address"
              placeholder="Street Address Line 1"
            />
            <PJSTextInput
              name={`address.${ind}.Street_Address_2` as const}
              label="Street Address Line 2"
              error="Please insert a Street Address"
              placeholder="Street Address Line 2"
            />
            <PJSTextInput
              name={`address.${ind}.Suburb` as const}
              label="Suburb"
              error="Please insert a Suburb"
              placeholder="Suburb"
            />
            <PJSTextInput
              name={`address.${ind}.City` as const}
              label="City"
              error="Please insert a City"
              placeholder="City"
            />
            <PJSTextInput
              name={`address.${ind}.Country` as const}
              label="Country"
              error="Please insert a Country"
              placeholder="Country"
            />
            <PJSTextInput
              name={`address.${ind}.Zip_Code` as const}
              label="Zip Code"
              error="Please insert a Zip Code"
              placeholder="Zip Code"
            />
          </Box>
        );
      })}
      <Box vcenter hcenter>
        <Box
          onClick={() => append(emptyAddress)}
          vcenter
          hcenter
          className="bg-grey w-24 h-24 rounded-full text-white text-4xl"
        >
          {Icons.plus}
        </Box>
      </Box>
    </Box>
  );
};

const AddressForm: React.FC<Props> = ({ children, className, style }) => {
  const { loadingUser, userData, updateUser } = useUser();

  const methods = useForm<FormType>({
    defaultValues: {
      address: [
        {
          Street_Address_1: "",
          Street_Address_2: "",
          City: "",
          Suburb: "",
          Country: "",
          Zip_Code: "",
        },
      ],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userData) {
      methods.reset({
        address: userData.Address,
      });
    }
    return null;
  }, [userData, methods]);

  if (loadingUser) {
    return <Loader />;
  }

  const submit: SubmitHandler<FormType> = (data) => {
    try {
      updateUser({
        Address: data.address,
      });
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
          <AddressBlock />

          <Button
            type="submit"
            sx={{ color: colors.light, backgroundColor: colors.primary }}
          >
            {loadingUser ? <Loader /> : "Submit"}
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddressForm;
