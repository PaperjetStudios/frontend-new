import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Icons } from '../icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea, Skeleton } from '@mui/material';
import { ApolloError, useQuery } from '@apollo/client';
import { single_product_by_id } from './queries';
import { createProductLink, currentApi } from '../../config/config';
import colors from '../../theme/colors';
import { moneyFormatter } from '../../config/util';
import { useNavigate } from 'react-router-dom';

type Props = {
	id: number;
};

const CustomizedCard = styled(Card)`
	border-radius: 0;
	box-shadow: none;
	transition: transform 0.25s;

	.wishlist-icon-card {
		z-index: 100;
		transition: opacity 0.5s;
		background-color: transparent;
	}

	:hover .wishlist-icon-card {
		opacity: 1;
	}

	:hover {
		transform: translateY(-5px);
	}
`;

const ProductCard: React.FC<Props> = ({ id }) => {
	let navigate = useNavigate();

	const { loading, data } = useQuery(single_product_by_id, {
		variables: {
			id: id,
		},
		onCompleted: data => {},
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	if (loading || data === undefined) {
		return <Skeleton variant='rectangular' width={270} height={270} />;
	}

	const { Title, slug, Featured_Image, Variation } =
		data?.product?.data?.attributes;

	// emulating sale styles to test layout - can't add this in Strapi
	const Sale_Price = 80;

	return (
		<CustomizedCard>
			<CardActionArea
				onClick={() => {
					navigate(createProductLink(id.toString()));
				}}
				// Move this to top
				sx={{
					'.MuiCardActionArea-focusHighlight': {
						backgroundColor: 'transparent',
					},
				}}
				disableRipple>
				<Box
					sx={{
						px: 2,
						top: 15,
						width: '100%',
						display: 'flex',
						position: 'absolute',
					}}>
					{Sale_Price > 0 && (
						<Typography
							variant='body3'
							sx={{
								py: 0.5,
								px: 1.5,
								color: '#fff',
								fontWeight: 500,
								backgroundColor: colors['secondary-light'],
							}}>
							SALE
						</Typography>
					)}
					<Box
						className='wishlist-icon-card'
						sx={{ position: 'absolute', right: '17px', opacity: 0 }}>
						<Button
							sx={{ padding: 0, width: 'auto', fontSize: 20, minWidth: 20 }}>
							{Icons.heart}
						</Button>
					</Box>
				</Box>
				<CardMedia
					component='img'
					height='140'
					image={`${currentApi.url}${Featured_Image.data.attributes.url}`}
					alt={slug}
					sx={{
						pb: 4,
						borderBottom: 1,
						borderColor: colors['grey'],
					}}
				/>
				<CardContent sx={{ px: 0, pt: 1 }}>
					<Typography gutterBottom variant='body3' component='div'>
						{Title}
					</Typography>
					<Box sx={{ display: 'flex', gap: 0.75 }}>
						{Sale_Price > 0 && (
							<Typography
								gutterBottom
								variant='body3'
								component='div'
								sx={{
									fontWeight: 500,
									textDecoration: 'line-through',
									color: colors['grey-dark'],
								}}>
								{moneyFormatter(Sale_Price)}
							</Typography>
						)}

						<Typography
							gutterBottom
							variant='body3'
							component='div'
							sx={{
								color: colors['grey-dark'],
								fontWeight: 500,
							}}>
							{moneyFormatter(Variation[0].Price)}
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</CustomizedCard>
	);
};

export default ProductCard;
