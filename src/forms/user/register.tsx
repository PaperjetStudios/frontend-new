import classNames from "classnames";
import BaseForm from "../baseform";
import * as yup from "yup";
import Box from "../../components/box";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { userState } from "../../state/user";
import PJSTextInput from "../inputs/textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  className?: string;
  style?: {};
  onSubmit?: () => void;
};

type FormType = {
  username: string;
  email: string;
  password: string;
  confirmed_password: string;
};

const schema = yup
  .object()
  .shape({
    username: yup.string().required("Please insert your username"),
    email: yup
      .string()
      .email("Please insert your valid email address")
      .required("Please insert your valid email address"),
    password: yup
      .string()
      .min(6, "Password should have atleast 6 characters")
      .required("Please insert your password"),
    confirmed_password: yup
      .string()
      .test("match", "Passwords do not match", (value, context) => {
        if (value && value !== context.parent.password) {
          return false;
        }
        return true;
      })
      .required("Please confirm your password"),
  })
  .required();

const RegisterForm: React.FC<Props> = ({
  children,
  onSubmit,
  className,
  style,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log("RegisterForm component loaction: ", pathname);

  const [mutation_loginUser, { loading }] = useMutation(
    gql`
      mutation RegisterUser(
        $username: String!
        $email: String!
        $password: String!
      ) {
        register(
          input: { username: $username, email: $email, password: $password }
        ) {
          jwt
          user {
            id
            username
            email
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        console.log(
          "USER ACCOUNT SUCCESSFULLY CREATED: ",
          JSON.stringify(data)
        );
        onSubmit();
        setSuccessMessage("User account successfully created");
      },
      onError: (err: ApolloError) => {
        console.log("ERROR", JSON.stringify(err));
        if (err?.graphQLErrors) setErrorMessage(err?.graphQLErrors[0]?.message);
      },
    }
  );

  const methods = useForm<FormType>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmed_password: "",
    },
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <Box style={style} className={classNames(className ? className : "")}>
      <BaseForm
        onSubmit={async (data: any) => {
          try {
            userState.set((prevState) => {
              return {
                ...prevState,
                jwt: undefined,
              };
            });
            await mutation_loginUser({
              variables: {
                username: data.username,
                email: data.email,
                password: data.password,
              },
            });
          } catch (e) {
            if (e) console.log(e);
          }
        }}
        submitButtonText="Register"
        mainError={errorMessage}
        mainSuccess={successMessage}
        loading={loading}
        methods={methods}
      >
        <PJSTextInput
          name="username"
          label="Username"
          error={methods.formState?.errors?.username?.message}
          placeholder="Username"
        />
        <PJSTextInput
          name="email"
          label="Email"
          error={methods.formState?.errors?.email?.message}
          placeholder="Email"
        />
        <PJSTextInput
          name="password"
          label="Password"
          error={methods.formState?.errors?.password?.message}
          placeholder="Password"
          password
        />
        <PJSTextInput
          name="confirmed_password"
          label="Confirm Password"
          error={methods.formState?.errors?.confirmed_password?.message}
          placeholder="Confirm Password"
          password
        />
      </BaseForm>
    </Box>
  );
};

export default RegisterForm;
