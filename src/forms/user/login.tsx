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
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm: React.FC<Props> = ({
  children,
  onSubmit,
  className,
  style,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [mutation_loginUser, { loading }] = useMutation(
    gql`
      mutation ($identifier: String!, $password: String!) {
        login(input: { identifier: $identifier, password: $password }) {
          jwt
          user {
            id
          }
        }
      }
    `,
    {
      onCompleted: ({ login }) => {
        userState.set({
          jwt: login.jwt,
          id: login.user.id,
        });
        onSubmit();
      },
      onError: (err: ApolloError) => {
        console.log("ERROR", JSON.stringify(err));
        setErrorMessage("Oops, we couldn't find that user, please try again.");
      },
    }
  );

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
        methods={useForm<FormType>({
          defaultValues: {
            email: "",
            password: "",
          },
          resolver: yupResolver(schema),
        })}
      >
        <PJSTextInput
          name="email"
          label="Email"
          error="Please insert your valid email address"
          placeholder="Email"
        />
        <PJSTextInput
          name="password"
          label="Password"
          error="Please insert your password"
          placeholder="Password"
          password
        />
      </BaseForm>
    </Box>
  );
};

export default LoginForm;
