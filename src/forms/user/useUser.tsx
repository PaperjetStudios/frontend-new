import { useState, useEffect } from "react";

import { userState } from "../../state/user";
import { userData } from "./types";

import { axiosInstance } from "../../config/api";

function useUser() {
  const [userData, setUserData] = useState<userData | null>();
  const [loadingUser, setLoadingUser] = useState(true);
  const user = userState.get();

  useEffect(() => {
    if (!user) {
      setLoadingUser(false);
      setUserData(null);
    } else {
      if (!userData) {
        axiosInstance()
          .get(`api/users/me`)
          .then((response) => {
            console.log("getting", response.data);
            setUserData(response.data);
            setLoadingUser(false);
          })
          .catch((error) => {
            console.log("An error occurred:", error.response);
            setLoadingUser(false);
          });
      }
    }
  }, [userData, user]);

  const updateUser = async (data: any) => {
    if (user) {
      const { id } = user;
      setLoadingUser(true);

      console.log(data);

      return axiosInstance()(`/api/users/${id}`, {
        method: "put",
        data: data,
      })
        .then((response) => {
          console.log(response);
          setUserData(response.data);
          setLoadingUser(false);
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
          setLoadingUser(false);
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
