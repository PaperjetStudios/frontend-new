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
  slug?: string;
};

const BaseCategory: React.FC<Props> = ({ children, slug, className }) => {
  const { loading, data } = useQuery(
    gql`
      query ($slug: String) {
        categories(filters: { slug: { contains: $slug } }) {
          data {
            attributes {
              slug
              Title
              Image {
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
      skip: slug === "",
      variables: {
        slug: slug,
      },
      onCompleted: (data) => {
        // console.log(data);
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  if (loading) {
    return <Loader />;
  }

  const {
    Image,
    Title,
    //slug: pageSlug,
  } = data.categories.data[0].attributes;

  return (
    <Box className={classNames(className ? className : "", "base-layout")}>
      <Header />
      <Box>
        <FeaturedImageTitle
          title={Title}
          imageUrl={Image.data ? Image.data.attributes.url : null}
        />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default BaseCategory;
