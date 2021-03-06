import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { Button, Grid, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PJSTabs from "../../components/tabs";
import colors from "../../theme/colors";
import LayoutContainer from "../../components/layout-container";
//import useCart from '../../components/cart/useCart';
import { Category } from "../../components/categories/types";
import { Icons } from "../../components/icons";
import Loader from "../../components/loader";
import { ProductGallery } from "../../components/products/gallery";
import Quantity from "../../components/products/quantity";
import { BASE_PRODUCT } from "../../components/products/queries";
import SocialShare from "../../components/products/share";
import ReviewBase from "../../components/reviews/review-base";
import { createCategoryLink } from "../../config/config";
import { moneyFormatter } from "../../config/util";
import { updateCart } from "../../state/cart";

type Props = {};

const currentVariation = 0;

const Product: React.FC<Props> = ({ children }) => {
  const { product } = useParams();
  //const { update: updateCart, loading: cartLoading } = useCart();

  const [quantityValue, setQuantityValue] = useState<number>(1);

  const { loading, data } = useQuery(
    gql`
      ${BASE_PRODUCT}
      query ($id: ID) {
        product(id: $id) {
          data {
            id
            attributes {
              ...BASE_PRODUCT
            }
          }
        }
      }
    `,
    {
      variables: {
        id: product,
      },
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  if (loading) {
    return <Loader />;
  }

  const { Title, Rating, Reviews, Description, Variation, Categories } =
    data.product.data.attributes;

  return (
    <LayoutContainer>
      <Grid container sx={{ pt: 10 }}>
        <Grid sm={12} md={6}>
          <ProductGallery product={data.product.data} />
        </Grid>
        <Grid sm={12} md={6} sx={{ pt: { xs: 5, md: 0 } }}>
          <Box sx={{ ml: { md: 10 } }}>
            <Typography variant="h5">{Title}</Typography>
            <ReviewBase reviews={Reviews.data} rating={Rating} />
            <Box
              sx={{
                mt: 3,
                mb: 4,
                pb: 5,
                borderBottom: 1,
                borderColor: colors["grey"],
              }}
            >
              <Typography sx={{ color: "#666" }} variant="subtitle2">
                {Description}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                {moneyFormatter(Variation[currentVariation].Price)}
              </Typography>
            </Box>
            <Grid
              container
              sx={{
                gap: 1,
                borderTop: 1,
                borderBottom: 1,
                justifyContent: "flex-start",
                borderColor: colors["grey"],
                py: 4,
                my: 5,
              }}
            >
              <Grid item xs={12} lg={4} xl={3}>
                <Quantity
                  value={quantityValue}
                  setValue={setQuantityValue}
                  max={Variation[currentVariation].Quantity}
                />
              </Grid>
              <Grid item xs={12} lg={4} xl={3}>
                <Button
                  variant="contained"
                  disabled={Variation[currentVariation].Quantity === 0}
                  onClick={() => {
                    updateCart(data.product, quantityValue, 0, true);
                  }}
                >
                  <Box sx={{ mr: 1 }}>{Icons.shoppingcart}</Box>
                  Add to Cart{" "}
                </Button>
              </Grid>
              <Grid item xs={3} lg={1} xl={3}>
                <Button variant="iconBox">{Icons.heart}</Button>
              </Grid>
            </Grid>
            <Stack spacing={1.25}>
              <Typography variant="body2">
                Availability:{" "}
                {!Variation[currentVariation].Quantity
                  ? "Out of Stock"
                  : "In Stock"}
              </Typography>
              <Typography variant="body2">
                SKU: {Variation[currentVariation].SKU}
              </Typography>
              <Typography variant="body2">
                Categories:{" "}
                {Categories.data.map((obj: Category, index: number) => {
                  return (
                    <>
                      {index !== 0 && ", "}
                      <Link to={createCategoryLink(obj.attributes.slug)}>
                        <Typography variant="body2">
                          {obj.attributes.Title}
                        </Typography>
                      </Link>
                    </>
                  );
                })}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ mr: 1 }} variant="body2">
                  Share On:{" "}
                </Typography>
                <SocialShare
                  providers={[
                    { provider: "facebook" },
                    { provider: "twitter" },
                  ]}
                />
              </Box>
              <Box sx={{ pt: 0.75 }}>
                <Button color="secondary" variant="contained">
                  Contact Seller
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid sx={{ mt: 10 }}>
          <PJSTabs
            tabs={[
              {
                title: "Description",
                content: (
                  <Typography variant="subtitle2">{Description}</Typography>
                ),
              },
              {
                title: `Reviews (${Reviews.data.length})`,
                content: <ReviewBase reviews={Reviews.data} rating={Rating} />,
              },
              {
                title: "Additional information",
                content: (
                  <Typography variant="subtitle2">{Description}</Typography>
                ),
              },
            ]}
          />
        </Grid>
      </Grid>
    </LayoutContainer>
  );
};

export default Product;
