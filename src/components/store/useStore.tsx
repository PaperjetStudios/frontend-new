import { ApolloError, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import useUser from "../../forms/user/useUser";

import { GET_STORE_BY_ID } from "./queries";
import { StoreData } from "./types";

function useStore() {
  const [storeData, setStoreData] = useState<StoreData | null>();
  const [loadingStore, setLoadingStore] = useState(true);
  const { id, userData, loadingUser } = useUser();

  const [getStore, { loading, error, data }] = useLazyQuery(GET_STORE_BY_ID, {
    onCompleted: (data) => {
      setLoadingStore(false);
      console.log("data", data);
      setStoreData(data.store.data.attributes);
    },
    onError: (error: ApolloError) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!id) {
      // the user is not logged in
      setLoadingStore(false);
      setStoreData(null);
    } else {
      if (!storeData && userData) {
        // user has a store assigned

        if (userData.store.id) {
          getStore({
            variables: {
              id: userData.store.id,
            },
          });
        }
      } else {
        setLoadingStore(false);
        setStoreData(null);
        // no store found
      }
    }
  }, [userData, storeData, getStore, id]);

  const updateStore = async (data: any) => {
    console.log(data);
  };

  return {
    loadingStore: loadingStore,
    storeData: storeData,
    updateStore: updateStore,
  };
}

export default useStore;
