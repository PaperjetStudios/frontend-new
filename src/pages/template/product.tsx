import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { Button, Grid, Box, Stack, Typography } from '@mui/material';
import { default as MUIRating } from '@mui/material/Rating';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PJSTabs from '../../components/tabs';
import colors from '../../theme/colors';
import LayoutContainer from '../../components/layout-container';
import useCart from '../../components/cart/useCart';
import { Category } from '../../components/categories/types';
import { Icons } from '../../components/icons';
import Loader from '../../components/loader';
import { ProductGallery } from '../../components/products/gallery';
import Quantity from '../../components/products/quantity';
import { BASE_PRODUCT } from '../../components/products/queries';
import { single_product_by_slug } from '../../components/products/queries';
import SocialShare from '../../components/products/share';
import ReviewBase from '../../components/reviews/review-base';
import { createCategoryLink } from '../../config/config';
import { moneyFormatter } from '../../config/util';
import ProductCardList from '../../components/products/list';
/**
 * Need a custom query to query Product by slug, currently only allows querying by ID
 * Querying by Products returns a collection which causes an error in the cart because data returns an array instead of an object
 * Below will have to be refactored -> single_product_by_slug pulls all ...BASE_PRODUCT data for now
 */

type Props = {};

const Product: React.FC<Props> = ({ children }) => {
	const { product } = useParams();
	const { update: updateCart, loading: cartLoading } = useCart();

	const [quantity, setQuantity] = useState<number>(1);

<<<<<<< HEAD
	let productId = undefined;

	const productBySlug = useQuery(single_product_by_slug, {
		variables: {
			slug: product,
		},
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	productId = productBySlug.data?.products?.data[0]?.id;
=======
>>>>>>> 95ebac209c87dbe6082b6a701ba1bdf9668b4f73

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
				id: productId,
			},
			onError: (error: ApolloError) => {
				console.log(JSON.stringify(error));
			},
		}
	);

	if (loading || data === undefined) {
		return <Loader />;
	}

<<<<<<< HEAD
	const { Title, Reviews, Description, Variation, Categories, Tags, On_Sale, Store, Additional_Information } =
		data?.product?.data?.attributes;

=======
	const { Title, Rating, Reviews, Description, Variation, Categories } =
		data.product.data.attributes;
    
>>>>>>> 95ebac209c87dbe6082b6a701ba1bdf9668b4f73
	return (
		<LayoutContainer>
			<Grid container sx={{ pt: 10 }}>
				<Grid item sm={12} md={6}>
					<ProductGallery product={data?.product?.data} />
				</Grid>
				<Grid item sm={12} md={6} sx={{ pt: { xs: 5, md: 0 } }}>
					<Box sx={{ ml: { md: 10 } }}>
						<Typography variant='h5'>{Title}</Typography>
						<MUIRating value={4} size='small' sx={{ pt: 2, pb: 1.4 }} readOnly />
						<Box
							sx={{
								mb: 4,
								pb: 5,
								borderBottom: 1,
								borderColor: colors['grey'],
							}}>
							<Typography sx={{ color: '#666' }} variant='subtitle2'>
								{Description}
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', gap: 0.75 }}>
							<Typography
								gutterBottom
								variant='h6'
								component='div'
								sx={{
									fontWeight: 500,
									textDecoration: On_Sale ? 'line-through' : 'none',
								}}>
								{moneyFormatter(Variation[0].Price)}
							</Typography>
							{On_Sale && (
								<Typography
									gutterBottom
									variant='h6'
									component='div'
									sx={{
										fontWeight: 500,
									}}>
									{moneyFormatter(Variation[0].Sale_Price)}
								</Typography>
							)}
						</Box>
						<Grid
							container
							sx={{
								gap: 1,
								borderTop: 1,
								borderBottom: 1,
								justifyContent: 'flex-start',
								borderColor: colors['grey'],
								py: 4,
								my: 5,
							}}>
							<Grid item>
								<Quantity value={quantity} setValue={setQuantity} max={5} />
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									disabled={Variation[0].Quantity === 0}
									onClick={() => {
										if (typeof updateCart !== 'boolean' && !cartLoading) {
											updateCart([
												{
													Product: data?.product,
													// Product: data.products.data[0],
													Quantity: quantity,
													Extra: null,
												},
											]);
										}
									}}>
									<Box sx={{ mr: 1 }}>{Icons.shoppingcart}</Box>
									Add to Cart {cartLoading || (typeof updateCart === 'boolean' && <Loader />)}
								</Button>
							</Grid>
							<Grid item>
								<Button variant='iconBox'>{Icons.heart}</Button>
							</Grid>
						</Grid>
						<Stack spacing={1.25}>
							<Typography variant='body2'>Availability: {!Variation[0].Quantity ? 'Out of Stock' : 'In Stock'}</Typography>
							<Typography variant='body2'>SKU: {Variation[0].SKU}</Typography>
							<Typography sx={{ display: 'flex' }} variant='body2'>
								<Typography sx={{ mr: 0.5 }} variant='body2'>
									Categories:
								</Typography>
								{Categories.data.map((obj: Category, index: number) => {
									return (
										<Box key={`category_link_${index}`}>
											{index !== 0 && ', '}
											<Link to={createCategoryLink(obj.attributes.slug)}>
												<Typography variant='body2'>{obj.attributes.Title}</Typography>
											</Link>
										</Box>
									);
								})}
							</Typography>
							<Box sx={{ display: 'flex' }}>
								<Typography sx={{ mr: 1 }} variant='body2'>
									Share On:{' '}
								</Typography>
								<SocialShare providers={[{ provider: 'facebook' }, { provider: 'twitter' }]} />
							</Box>
							<Box sx={{ pt: 0.75 }}>
								<Button color='secondary' variant='contained'>
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
								title: 'Description',
								content: <Typography variant='subtitle2'>{Description}</Typography>,
							},
							{
								title: `Reviews (${Reviews.data.length})`,
								// content: <ReviewBase reviews={Reviews.data} />,
								content: <ReviewBase productSlug={product} />,
							},
							{
								title: 'Additional information',
								content: <Typography variant='subtitle2'>{Additional_Information}</Typography>,
							},
						]}
					/>
				</Grid>
				<Grid container sx={{ mt: 10 }}>
					<Box sx={{ textAlign: 'center', width: '100%', mb: 2 }}>
						<Typography variant='h4'>More From The Store</Typography>
					</Box>
					<ProductCardList storeSlug={Store.data.attributes.slug} page={1} pageSize={4} />
				</Grid>
			</Grid>
		</LayoutContainer>
	);

};

export default Product;
