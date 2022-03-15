import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "../../components/box";
import useCart from "../../components/cart/useCart";
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

type Props = {};

const Product: React.FC<Props> = ({ children }) => {
  const { product } = useParams();

  const {
    update: updateCart,
    loading: cartLoading,
    togglePreview,
    getStatus,
  } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [currentVariation, setVariation] = useState<number>(0);

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
    <Box wrapper hcenter className="mt-10">
      <Grid container>
        <Grid sm={12} md={6}>
          <ProductGallery product={data.product.data} />
        </Grid>
        <Grid sm={12} md={6}>
          <Box className="md:ml-8 md:mt-10">
            <Typography variant="h5">{Title}</Typography>
            <ReviewBase reviews={Reviews.data} rating={Rating} />
            <Box className="mt-5">
              <Typography sx={{ color: "#666" }} variant="subtitle2">
                {Description}
              </Typography>
            </Box>
            <Box className="mt-5 pt-5 border-t border-grey">
              <Typography variant="body1">
                {moneyFormatter(Variation[0].Price)}
              </Typography>
            </Box>
            <Box className="mt-5 flex gap-5 border-t border-grey pt-5">
              <Quantity
                value={quantity}
                setValue={setQuantity}
                max={Variation[0].Quantity}
              />

              <Button
                variant="contained"
                onClick={() => {
                  if (typeof updateCart !== "boolean" && !cartLoading) {
                    updateCart([
                      {
                        Product: data.product,
                        Quantity: quantity,
                        Extra: null,
                      },
                    ]);
                  }
                }}
              >
                <Box className="mr-2 text-lg">{Icons.shoppingcart}</Box>
                Add to Cart
                {cartLoading || (typeof updateCart === "boolean" && <Loader />)}
              </Button>

              <Button sx={{ fontSize: 20 }}>{Icons.heart}</Button>
            </Box>
            <Box className="mt-5 pt-5 border-t border-grey flex flex-col gap-2">
              <Typography sx={{ color: "#666" }} variant="body2">
                Categories:{" "}
                {Categories.data.map((obj: Category) => {
                  return (
                    <Link to={createCategoryLink(obj.id)}>
                      <Typography sx={{ color: "#666" }} variant="body2">
                        {obj.attributes.Title}
                      </Typography>
                    </Link>
                  );
                })}
              </Typography>

              <Box className="flex gap-2">
                <Typography sx={{ color: "#666" }} variant="body2">
                  Share On:{" "}
                </Typography>
                <SocialShare
                  providers={[
                    { provider: "facebook" },
                    { provider: "twitter" },
                  ]}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
