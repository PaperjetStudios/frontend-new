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

type Props = {
  className?: string;
  style?: {};
  onSubmit?: () => void;
};

type FormType = {
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Please insert your valid email address")
      .required("Please insert your valid email address"),
    password: yup
      .string()
      .min(6, "Password should have atleast 6 characters")
      .required("Please insert your password"),
  })
  .required();

const LoginForm: React.FC<Props> = ({
  children,
  onSubmit,
  className,
  style,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  console.log("State: ", userState.get());
  const [mutation_loginUser, { loading }] = useMutation(
    gql`
      mutation LoginUser($identifier: String!, $password: String!) {
        login(input: { identifier: $identifier, password: $password }) {
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
      onCompleted: ({ login }) => {
        console.log("LOGIN SUCCESSFUL: ", login);
        userState.set((prevState) => {
          return {
            ...prevState,
            jwt: login.jwt,
            id: login.user.id,
          };
        });
        onSubmit();
      },
      onError: (err: ApolloError) => {
        console.log("ERROR", JSON.stringify(err));
        if (err?.graphQLErrors) {
          setErrorMessage(
            "Oops, we couldn't find that user, please try again."
          );
        }
      },
    }
  );

  const methods = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <Box style={style} className={classNames(className ? className : "")}>
      <BaseForm
        onSubmit={async (data: any) => {
          try {
            await mutation_loginUser({
              variables: {
                identifier: data.email,
                password: data.password,
              },
            });
          } catch (e) {
            console.log(e);
          }
        }}
        submitButtonText="Login"
        mainError={errorMessage}
        loading={loading}
        methods={methods}
      >
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
      </BaseForm>
    </Box>
  );
};

export default LoginForm;
