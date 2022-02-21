import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Box from "../box";
import Loader from "../loader";

import UserTable from "./order-table";

type Props = {};

const UserList: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [
    getUserQuery,
    { loading: getUserLoading, error: getUserError, data: getUserData },
  ] = useLazyQuery(
    gql`
      query {
        users {
          data {
            id
            attributes {
              
            }
          }
        }
      }
    `,
    {
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  useEffect(() => {
    if (!loaded) {
      getUserQuery();
    }
  }, [loaded]);

  if (getUserLoading || getUserData === undefined) {
    return <Loader />;
  }

  return (
    <Box className="">
      <UserTable data={getUserData.orders.data} />
    </Box>
  );
};

export default UserList;
