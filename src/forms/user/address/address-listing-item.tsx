import { useState } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import { Address, FormType } from "./types";

import UpdateAddressModal from "../../../modal/update-address-modal";
import RemoveTopButton from "../../../components/common/remove-top-button";
import AreYouSureModal from "../../../modal/are-you-sure-modal";
import { ApolloError, useMutation } from "@apollo/client";
import { EDIT_USER_ADDRESS } from "./queries";
import { editAddresses } from "./state";

import { Icons } from "../../../components/icons";

type ListItemProps = {};

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <Box>
      <Typography variant="small1">{children}</Typography>
    </Box>
  );
};

type Props = {
  address: Address;
  ind: number;
  addresses: FormType;
  refetch: () => void;
};

const AddressListingItem: React.FC<Props> = ({
  address,
  ind,
  addresses,
  refetch,
}) => {
  const [updateAddressModal, setUpdateAddressModal] = useState<boolean>(false);
  const [removeAddressModal, setRemoveAddressModal] = useState<boolean>(false);

  const [updateUser] = useMutation(EDIT_USER_ADDRESS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data);
      refetch();
      console.log("refetch");
    },
    onError: (err: ApolloError) => {
      console.log(err);
    },
  });

  return (
    <>
      <Box>
        <RemoveTopButton
          onClick={() => {
            setRemoveAddressModal(true);
          }}
        />
        <Box sx={{ pb: 1 }}>
          <Typography variant="small2">{`Address ${ind + 1}`}</Typography>
          <IconButton
            sx={{
              fontSize: 10,
            }}
            onClick={() => {
              setUpdateAddressModal(true);
            }}
          >
            {Icons.pen}
          </IconButton>
        </Box>
        {Object.values(address).map((value, index) => {
          return <ListItem key={`${ind}+${value}+${index}`}>{value}</ListItem>;
        })}
      </Box>
      <UpdateAddressModal
        id={ind}
        callback={() => {
          setUpdateAddressModal(false);
          refetch();
        }}
        toggle={(toggle) => setUpdateAddressModal(toggle)}
        showing={updateAddressModal}
      ></UpdateAddressModal>
      <AreYouSureModal
        yes={() => {
          setRemoveAddressModal(false);
          const transformedState = editAddresses(addresses, address, ind, true);

          updateUser({
            variables: {
              addresses: transformedState.Address,
            },
          });
        }}
        toggle={setRemoveAddressModal}
        showing={removeAddressModal}
      ></AreYouSureModal>
    </>
  );
};

export default AddressListingItem;
