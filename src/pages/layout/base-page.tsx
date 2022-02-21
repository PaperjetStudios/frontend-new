import { ApolloError, gql, useQuery } from "@apollo/client";
import classNames from "classnames";

import Box from "../../components/box";
import Loader from "../../components/loader";
import FeaturedImageTitle from "../../components/page/featured-image-title";
import GalleryImageTitle from "../../components/page/gallery-image-title";
import Footer from "./footer";
import Header from "./header";

type Props = {
  className?: string;
  slug: string;
};

const BasePage: React.FC<Props> = ({ children, slug, className }) => {
  const { loading, data } = useQuery(
    gql`
      query ($slug: String) {
        pages(filters: { slug: { contains: $slug } }) {
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
              Gallery {
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
    Featured_Image,
    Title,
    Gallery,
    //slug: pageSlug,
  } = data.pages.data[0].attributes;

  return (
    <Box className={classNames(className ? className : "", "base-layout")}>
      <Header />
      <Box>
        {Featured_Image.data && (
          <FeaturedImageTitle
            title={Title}
            imageUrl={
              Featured_Image.data ? Featured_Image.data.attributes.url : null
            }
          />
        )}
        {Gallery.data.length > 0 && (
          <GalleryImageTitle gallery={Gallery.data} />
        )}
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default BasePage;
