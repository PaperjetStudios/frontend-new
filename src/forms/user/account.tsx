import classNames from "classnames";
import * as yup from "yup";
import Box from "../../components/box";
import { useEffect } from "react";

import PJSTextInput from "../inputs/textinput";
import Loader from "../../components/loader";

import useUser from "./useUser";
import { axiosInstance } from "../../config/api";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import colors from "../../theme/colors";

type Props = {
  className?: string;
  style?: {};
};

type FormType = {
  email: string;
  Phone: string;
  LastName: string;
  FirstName: string;
};

const schema = yup
  .object()
  .shape({
    FirstName: yup.string().required(),
    LastName: yup.string().required(),
    email: yup
      .string()
      .email("Please insert a valid email address")
      .test(
        "Unique Email",
        "That email already exists, have you signed up before?",
        function (value) {
          return new Promise((resolve, reject) => {
            axiosInstance()
              .get(`api/users/me`)
              .then(async (response) => {
                if (response.data.email !== value) {
                  return await axiosInstance()
                    .get(`/utils/validEmail?email=${value}`)
                    .then((response: any) => {
                      resolve(response.data.isValid);
                    });
                } else {
                  console.log("here", response);
                  resolve(true);
                }
              })
              .catch((error) => {
                // Handle error.
                console.log("An error occurred:", error.response);
              });
          });
        }
      ),
  })
  .required();

const ProfileForm: React.FC<Props> = ({ children, className, style }) => {
  const { loadingUser, userData, updateUser } = useUser();

  const methods = useForm<FormType>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userData) {
      methods.reset(userData);
    }
    return null;
  }, [userData, methods]);

  if (loadingUser) {
    return <Loader />;
  }

  const submit: SubmitHandler<FormType> = (data) => {
    try {
      updateUser({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Phone: data.Phone,
        email: data.email,
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
          <Box className="md:grid md:grid-cols-2 gap-5">
            <PJSTextInput
              name="FirstName"
              label="First Name"
              error="Please insert your first name"
              placeholder="First Name"
            />
            <PJSTextInput
              name="LastName"
              label="Last Name"
              error="Please insert your last name"
              placeholder="Last Name"
            />
          </Box>
          <Box className="grid grid-cols-2 gap-5">
            <PJSTextInput
              name="Phone"
              label="Phone Number"
              error="Please insert your phone number"
              placeholder="Phone Number"
            />
            <PJSTextInput
              name="email"
              label="Email"
              error="This address has already been used or is not valid"
              placeholder="Email Address"
            />
          </Box>

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

export default ProfileForm;
