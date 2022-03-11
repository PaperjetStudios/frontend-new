import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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

	return (
		<Card
			sx={{
				// maxWidth: 300,
				borderRadius: 0,
				boxShadow: 'none',
			}}>
			<CardActionArea
				onClick={() => {
					navigate(createProductLink(id.toString()));
				}}
				sx={{
					'.MuiCardActionArea-focusHighlight': {
						backgroundColor: 'transparent',
					},
				}}
				disableRipple>
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
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
