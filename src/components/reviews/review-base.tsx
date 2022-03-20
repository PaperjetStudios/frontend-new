import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { Typography, Box, Grid, Pagination } from '@mui/material';
import ReviewItem from './item';
import { paginated_reviews } from './queries';
import Loader from '../loader';
import ReviewSummary from './summary';
type Props = {
	page?: number;
	pageSize?: number;
	productId?: string;
	storeSlug?: string;
};

const ReviewBase: React.FC<Props> = ({ page = 1, pageSize = 5, productId = '', storeSlug = '' }) => {
	const [currentPage, setCurrentPage] = React.useState(page);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	const { loading, data } = useQuery(paginated_reviews(productId, storeSlug), {
		variables: {
			pageSize: pageSize,
			page: currentPage,
		},
		onCompleted: (data: any) => {
			// console.log('paginated_reviews query', data);
		},
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	if (loading || data === undefined) {
		return <Loader />;
	}

	if (!data.reviews.data.length) {
		return (
			<Box>
				<Typography variant='subtitle2' color='#aaa'>
					No Reviews Yet!
				</Typography>
			</Box>
		);
	}
	// console.log('DATA REVIEWS:',data.reviews.data);
	/* 
   Adding the productId/StoreSlug to query reviews in the ReviewSummary component instead of passing as prop:
      -> Because of pagination, can't pass down all reviews as prop
      -> Reusability
   */
	return (
		<Grid>
			<ReviewSummary productId={productId} />
			<Grid container gap={4}>
				{data.reviews.data.map((obj: any, index: number) => {
					return <ReviewItem key={`prod_review_${index}`} id={obj.id} />;
				})}
			</Grid>
			{data.reviews.meta.pagination.pageCount > 1 && (
				<Box sx={{ mt: 5 }}>
					<Pagination
						count={data.reviews.meta.pagination.pageCount}
						size='small'
						page={currentPage}
						onChange={handleChange}
						sx={{
							display: 'flex',
							justifyContent: {
								xs: 'center',
								md: 'flex-end',
							},
						}}
					/>
				</Box>
			)}
		</Grid>
	);
};

export default ReviewBase;

// If we're passing review data from the product itself without pagination

// const ReviewBase: React.FC<Props> = ({ reviews = [] }) => {
// 	console.log(reviews);
// 	if (reviews.length > 1) {
// 		return (
// 			<Grid container gap={4}>
// 				{reviews.map((review: any, index: number) => {
// 					return <ReviewItem key={`prod_review_${index}`} review={review} />;
// 				})}
// 			</Grid>
// 		);
// 	} else {
// 		return (
// 			<Box>
// 				<Typography variant='subtitle2' color='#aaa'>
// 					No Reviews Yet!
// 				</Typography>
// 			</Box>
// 		);
// 	}
// };

// export default ReviewBase;
