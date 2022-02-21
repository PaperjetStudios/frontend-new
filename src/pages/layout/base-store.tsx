import { ApolloError, gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

import Box from "../../components/box";
import Loader from "../../components/loader";
import FeaturedImageTitle from "../../components/page/featured-image-title";
import Footer from "./footer";
import Header from "./header";

type Props = {
  className?: string;
  id?: string;
};

const BaseStore: React.FC<Props> = ({ children, id, className }) => {
  /*const { loading, data } = useQuery(
    gql`
      query ($id: ID) {
        product(id: $id) {
          data {
            attributes {
              slug
              Title
              Featured_Image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  if (loading) {
    return <Loader />;
  }*/

  //const { Featured_Image, Title } = data.product.data.attributes;

  return (
    <Box className={classNames(className ? className : "", "base-layout")}>
      <Header />
      <Box>
        <FeaturedImageTitle title={"store"} />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default BaseStore;
