import { useState, useEffect } from "react";
import { ApolloError, useLazyQuery, gql } from "@apollo/client";

import { userState } from "../../state/user";
import { userData } from "./types";
import { BASE_STORE } from "../../components/store/queries";

import { axiosInstance } from "../../config/api";

function useUser() {
  const [userData, setUserData] = useState<userData | null>();
  // const [loadingUser, setLoadingUser] = useState(true);
  const user = userState.get();
  const [getUserData, { loading: loadingUser }] = useLazyQuery(
    gql`
      ${BASE_STORE}
      query User($id: ID) {
        usersPermissionsUser(id: $id) {
          data {
            attributes {
              FirstName
              LastName
              Phone
              blocked
              email
              username
              Address {
                Street_Address_1
                Street_Address_2
                Suburb
                City
                Country
                Zip_Code
              }
              Wallet_Roundup {
                Available
                Open
              }
              store {
                data {
                  id
                  attributes {
                    ...BASE_STORE
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        console.log("User Data Found: ", data);
        setUserData(data.usersPermissionsUser.data.attributes);
      },
      onError: (err: ApolloError) => {
        console.log("User Data NOT Found: ", err);
      },
    }
  );

  useEffect(() => {
    if (!user) {
      // setLoadingUser(false);
      setUserData(null);
    } else {
      if (!userData) {
        // axiosInstance()
        //   .get(`api/users/me`)
        //   .then((response) => {
        //     console.log("getting", response.data);
        //     setUserData(response.data);
        //     setLoadingUser(false);
        //   })
        //   .catch((error) => {
        //     console.log("An error occurred:", error.response);
        //     setLoadingUser(false);
        //   });
        getUserData({ variables: { id: user.id } });
      }
    }
  }, [userData, user]);

  const updateUser = async (data: any) => {
    if (user) {
      const { id } = user;
      // setLoadingUser(true);

      console.log(data);

      return axiosInstance()(`/api/users/${id}`, {
        method: "put",
        data: data,
      })
        .then((response) => {
          console.log(response);
          setUserData(response.data);
          // setLoadingUser(false);
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
          // setLoadingUser(false);
        });
    }
  };

  return {
    loadingUser: loadingUser,
    userData: userData,
    updateUser: updateUser,
    id: user.id,
  };
}

export default useUser;
