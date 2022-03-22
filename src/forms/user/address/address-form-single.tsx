import * as yup from "yup";

import { useEffect, useState } from "react";
import Loader from "../../../components/loader";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import colors from "../../../theme/colors";
import { Address } from "./types";

import { emptyAddress, emptyAddressObject } from "./schema";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { AddressBlockElementSingle } from "./address-block-element-single";

import { editAddresses } from "./state";
import { EDIT_USER_ADDRESS } from "./queries";

type Props = {
  id?: number | string;
  callback: () => void;
};

export type UpdateAddressType = {
  showing: boolean;
  addressId: number | string;
};

const schema = yup
  .object()
  .shape({
    Street_Address_1: yup.string().required(),
    Suburb: yup.string().required(),
    City: yup.string().required(),
    Country: yup.string().required(),
    Zip_Code: yup.string().required(),
  })

  .required();

const AddressFormSingle: React.FC<Props> = ({ callback, id = -1 }) => {
  const [userData, setUserData] = useState(emptyAddressObject);

  const { loading: loadingUser } = useQuery(
    gql`
      query {
        findMyInfo {
          data {
            attributes {
              Address {
                Street_Address_1
                Street_Address_2
                Suburb
                City
                Country
                Zip_Code
              }
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
    EDIT_USER_ADDRESS,
    {
      onCompleted: (data) => {
        const addresses = data?.updateMyInfo?.data?.attributes;
        setUserData(addresses);
        methods.reset(emptyAddress);
        callback();
      },
      onError: (err: ApolloError) => {
        console.log(err);
      },
    }
  );

  // FORM
  const methods = useForm<Address>({
    defaultValues: emptyAddress,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id > -1) {
      methods.reset(userData.Address[id]);
    }
  }, [id, userData, methods]);

  if (loadingUser) {
    return <Loader />;
  }

  const submit: SubmitHandler<Address> = (data) => {
    const transformedState = editAddresses(userData, data, id, false);

    try {
      if (transformedState !== null) {
        updateUser({
          variables: {
            addresses: transformedState.Address,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>
          <AddressBlockElementSingle />

          <Button
            type="submit"
            sx={{
              color: colors.light,
              width: "100%",
              backgroundColor: colors.primary,
            }}
          >
            {updateUserLoading ? (
              <Loader />
            ) : id ? (
              "Update Address"
            ) : (
              "Add Address"
            )}
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddressFormSingle;
