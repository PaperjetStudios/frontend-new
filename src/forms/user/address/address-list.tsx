import { useEffect, useState } from "react";
import Loader from "../../../components/loader";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";

import { Address } from "./types";
import { emptyAddressObject } from "./schema";
import { ApolloError, useQuery } from "@apollo/client";
import AddressListingItem from "./address-listing-item";
import { omit } from "lodash";
import { EcomRadio } from "../../inputs/radiobutton";
import { cartState, setAddress } from "../../../state/cart";
import ShadowContainer from "../../../components/common/shadow-container";
import AddButton from "../../../components/common/add-button";
import AddAddressModal from "../../../modal/add-address-modal";
import { GET_USER_ADDRESSES } from "./queries";

type Props = {
  className?: string;
  style?: {};
};

const AddressList: React.FC<Props> = ({ children, className, style }) => {
  const [userData, setUserData] = useState(emptyAddressObject);

  const [showAddAddress, toggleAddAddress] = useState<boolean>(false);

  const [cart] = cartState.use();

  const { loading: loadingUser, refetch } = useQuery(GET_USER_ADDRESSES, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setUserData(data?.findMyInfo?.data?.attributes);
    },
    onError: (err: ApolloError) => {
      console.log("User Data NOT Found: ", err);
    },
  });

  useEffect(() => {
    // if there are no addresses, set the selected address to null and -1
    if (userData.Address.length === 0) {
      setAddress(-1, null);
    } else {
      // if there are addresses, but nothing is selected, set the first one as selected
      if (cart.address.selectedId === -1) {
        setAddress(0, userData.Address[0]);
      }
    }
  }, [cart, userData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // When a user clicks on a delivery option, find the id from the delivery options
    const selectedId = (event.target as HTMLInputElement).value;
    setAddress(parseInt(selectedId), userData.Address[selectedId]);
  };

  if (loadingUser) {
    return <Loader />;
  }

  return (
    <>
      {userData.Address.length === 0 && (
        <ShadowContainer
          sx={{
            display: "flex",
            position: "relative",
            flex: 1,
            p: 4,
            gap: 2,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>You don't have any addresses yet! </Typography>
          <Button
            onClick={() => {
              toggleAddAddress(true);
            }}
            variant="contained"
          >
            Add One
          </Button>
        </ShadowContainer>
      )}
      {userData.Address.length > 0 && (
        <Box>
          <FormControl sx={{ flex: 1, width: "100%" }}>
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={cart.address?.selectedId ? cart.address.selectedId : 0}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",

                gap: "15px",
                marginTop: 1,
                flex: 1,
                width: "100%",
              }}
              onChange={(e) => handleChange(e)}
            >
              {userData.Address.map((address, ind) => {
                return (
                  <ShadowContainer position={"relative"} p={2} flex={0.25}>
                    <FormControlLabel
                      sx={{ alignItems: "start" }}
                      key={ind}
                      value={ind}
                      control={<EcomRadio />}
                      label={
                        <AddressListingItem
                          ind={ind}
                          refetch={refetch}
                          addresses={userData}
                          address={omit(address, ["__typename"]) as Address}
                        />
                      }
                    />
                  </ShadowContainer>
                );
              })}
              <AddButton
                onClick={() => toggleAddAddress(true)}
                sx={{ flex: 0.25 }}
              ></AddButton>
            </RadioGroup>
          </FormControl>
        </Box>
      )}
      <AddAddressModal
        callback={() => {
          toggleAddAddress(false);
          refetch();
        }}
        toggle={toggleAddAddress}
        showing={showAddAddress}
      ></AddAddressModal>
    </>
  );
};

export default AddressList;
