import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import useUser from "../../forms/user/useUser";

import {
  GET_STORE_BY_ID,
  GET_STORE_BY_USER_ID,
  CREATE_STORE,
  UPDATE_STORE,
  UPLOAD_MULTIPLE_FILES,
} from "./queries";
import { StoreData } from "./types";

function useStore() {
  const [storeData, setStoreData] = useState<StoreData | null>();
  const [loadingStore, setLoadingStore] = useState(true);
  const { id, userData, loadingUser } = useUser();

  const [getStore, { loading, error, data: getStoreData }] = useLazyQuery(
    GET_STORE_BY_USER_ID,
    {
      onCompleted: (data) => {
        setLoadingStore(false);
        console.log("GetStore data", data);
        setStoreData(data.findMyStore.data.attributes);
      },
      onError: (error: ApolloError) => {
        console.log(error);
        setStoreData(null);
        setLoadingStore(false);
      },
    }
  );

  useEffect(() => {
    if (!id) {
      // the user is not logged in
      setLoadingStore(false);
      setStoreData(null);
    }
  }, [userData, storeData, id]);

  const [createStore, { loading: createStoreLoading }] = useMutation(
    CREATE_STORE,
    {
      onCompleted: (data) => {
        setLoadingStore(false);
        console.log("Create Store Response Data", data);
        setStoreData(data.createStore.data.attributes);
      },
      onError: (err: ApolloError) => {
        console.log(err);
        setLoadingStore(false);
      },
    }
  );

  const [updateStore, { loading: updateStoreLoading }] = useMutation(
    UPDATE_STORE,
    {
      onCompleted: (data) => {
        setLoadingStore(false);
        console.log("Update Store Response Data", data);
        setStoreData(data.updateStore.data.attributes);
      },
      onError: (err: ApolloError) => {
        console.log("Update Store Error: ", err);
        setLoadingStore(false);
      },
    }
  );

  // Define uploadFiles mutation
  const [uploadFiles, { loading: imageUploading }] = useMutation(
    UPLOAD_MULTIPLE_FILES,
    {
      onCompleted: (data) => {},
      onError: (e) => {
        console.log("error", JSON.stringify(e));
      },
    }
  );

  useEffect(() => {
    if (loading || createStoreLoading || updateStoreLoading) {
      setLoadingStore(true);
    } else {
      console.log("Should stop loading: ", !storeData);
      if (!storeData) {
        setStoreData(getStoreData?.findMyStore?.data?.attributes);
        setLoadingStore(false);
      } else {
        setLoadingStore(false);
      }
    }
  }, [loading, createStoreLoading, updateStoreLoading]);

  return {
    loadingStore: loadingStore,
    storeData: storeData,
    getStore: getStore,
    createStore: createStore,
    updateStore: updateStore,
    uploadFiles: uploadFiles,
  };
}

export default useStore;
