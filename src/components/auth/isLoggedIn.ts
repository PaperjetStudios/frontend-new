import { useState, useEffect } from "react";
import { ApolloError, gql, useQuery } from "@apollo/client";

type LoginStatus = {
  isLoggedIn: boolean | null;
  loading: boolean;
  userId?: number | string;
};

function useLoggedIn(): LoginStatus {
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);
  const { loading } = useQuery(
    gql`
      query ME {
        me {
          id
          username
          email
        }
      }
    `,
    {
      onCompleted: (data) => {
        setLoggedIn(true);
        setUserId(data.me.id);
      },
      onError: (err: ApolloError) => {
        setLoggedIn(false);
        setUserId(null);
      },
      fetchPolicy: "network-only",
    }
  );

  if (loading) {
    console.log("loading....");
  }

  return { isLoggedIn, loading, userId };
}

export default useLoggedIn;
