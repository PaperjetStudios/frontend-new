import { useEffect, useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";

import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import ProfileFormElement from "./element";
import { empty, FormType } from "./types";
import Loader from "../../../components/loader";
import colors from "../../../theme/colors";
import { schema } from "./schema";

type Props = {
  className?: string;
  style?: {};
  buttonText?: string;
};

const ProfileForm: React.FC<Props> = ({
  children,
  className,
  style,
  buttonText = "update",
}) => {
  const [userData, setUserData] = useState(empty);

  const { loading: loadingUser } = useQuery(
    gql`
      query {
        findMyInfo {
          data {
            attributes {
              FirstName
              LastName
              email
              Phone
            }
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        setUserData(data?.findMyInfo?.data?.attributes);
      },
      onError: (err: ApolloError) => {
        console.log("User Data NOT Found: ", err);
      },
    }
  );

  const [updateUser, { loading: updateUserLoading }] = useMutation(
    gql`
      mutation (
        $FirstName: String
        $LastName: String
        $email: String
        $Phone: String
      ) {
        updateMyInfo(
          data: {
            FirstName: $FirstName
            LastName: $LastName
            email: $email
            Phone: $Phone
          }
        ) {
          data {
            attributes {
              FirstName
              LastName
              email
              Phone
            }
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        console.log("updated");
        setUserData(data?.updateMyInfo?.data?.attributes);
      },
      onError: (err: ApolloError) => {
        console.log(err);
      },
    }
  );

  const methods = useForm<FormType>({
    defaultValues: empty,
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
        variables: {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Phone: data.Phone,
          email: data.email,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <ProfileFormElement
          buttonEl={
            <Button
              type="submit"
              sx={{
                color: colors.light,
                px: 5,
                py: 1,
                backgroundColor: colors.primary,
              }}
            >
              {loadingUser || updateUserLoading ? <Loader /> : buttonText}
            </Button>
          }
          onSubmit={methods.handleSubmit(submit)}
        />
      </FormProvider>
    </Box>
  );
};

export default ProfileForm;
