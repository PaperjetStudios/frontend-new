import React from 'react';
import { styled } from '@mui/material/styles';
import { ApolloError, useQuery } from '@apollo/client';
import { Typography, Grid, Button } from '@mui/material';
import { default as MUIRating } from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import colors from '../../theme/colors';
import { all_reviews_by_filter } from './queries';
import Loader from '../loader';

/* 
   This component contains the calculations to display the ratings data properly. 
   I've left a commented out version of the component frontend without funtionality to
   reuse if this is implemented on the serverside instead

   Created a separate query instead of passing the props down from the product or store for
   reusability and because the paginated query won't return all the reviews we need to populate
   the summary

   TypeScript only partially implemented incase the functionality is removed or I've made errors
*/

type ReviewSummaryProps = {
	productSlug?: string;
	storeSlug?: string;
};

const CustomizedLinearProgress = styled(LinearProgress)`
	width: 70%;
	height: 13px;
	max-width: 300px;
	border-radius: 3px;
	background-color: #eeeeee;
	.MuiLinearProgress-bar {
		background-color: #feb53e;
	}
`;

// console.log('Review Summary Loaded');

const calcuated_average = (ratings: any, total?: number) => {
	// Holds the (1*n) + (2*n)...
	let average = 0;

	ratings.forEach((rating, index) => {
		// index starting at 1 up to 5 stars
		average += (index + 1) * rating;
	});

	// (1*n) + (2*n)... + (5*n) / amount of all ratings
	return average / total;
};

const get_occurence = (data: any[], rating: number) => {
	return data.reduce((increment, value) => (value.attributes.Rating === rating ? increment + 1 : increment), 0);
};

const get_percentages_and_average = (data: any) => {
	let ratingOccurences: any[] = [];

	// returns an array with the amount of times each of the same rating occurs from 1 to 5 stars
	for (let i = 1; i <= 5; i++) {
		ratingOccurences = [...ratingOccurences, get_occurence(data, i)];
	}

	// Get the total sum of all the occurences
	const sumOfRatings = ratingOccurences.reduce((sum, val) => sum + val, 0);

	//  Get the average
	const average = calcuated_average(ratingOccurences, sumOfRatings);

	// Calculate ratings as percentages to use in the progress bar
	let calculatedPercentages = ratingOccurences.map(rating => {
		let percentage = (rating * 100) / sumOfRatings;
		return Math.round(percentage);
	});

	// Returning the percentages and average so the calculations for average don't have to be repeated
	// Reversing instead of sorting in the query because the calculations are easier to understand when starting from 1
	return {
		calculatedPercentages: calculatedPercentages.reverse(),
		average: parseFloat(average.toFixed(1)),
	};
};

type ReviewBarProps = {
	star: string;
	value: number;
};

const ReviewBar: React.FC<ReviewBarProps> = ({ star, value }) => {
	return (
		<Grid container item gap={2} xs={12} flexDirection='row' alignItems='center'>
			<Grid item xs={12} sm={'auto'}>
				<Typography variant='body2'> {star} </Typography>
			</Grid>
			<CustomizedLinearProgress variant='determinate' value={value} />
			<Typography variant='body2'> {value}% </Typography>
		</Grid>
	);
};

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ productSlug = '', storeSlug = '' }) => {
	const { loading, data } = useQuery(all_reviews_by_filter(productSlug, storeSlug), {
		onCompleted: (data: any) => {
			// console.log('all_reviews_by_filter query', data);
		},
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	if (loading || data === undefined) {
		return <Loader />;
	}

	// console.log('REVIEW SUMMARY DATA:', data);

	const summaryCalculation = get_percentages_and_average(data.reviews.data);

	return (
		<Grid container gap={4} sx={{ my: 7 }}>
			<Grid container item gap={1.2} xs={12} md={6}>
				{summaryCalculation.calculatedPercentages.map((val, index) => {
					return <ReviewBar key={`review_bar_${index}`} star={`${5 - index} Star`} value={val} />;
				})}
			</Grid>
			<Grid container item gap={2} xs={12} md={3} sx={{ textAlign: 'center', order: { xs: -1, md: 0 } }}>
				<Grid item xs={12} sx={{ border: `1px solid ${colors['grey']}`, p: 2 }}>
					<Typography variant='body1'>{data.reviews.data.length} Reviews</Typography>
					<Typography variant='h6' sx={{ py: 1 }}>
						{summaryCalculation.average}
					</Typography>
					<MUIRating value={summaryCalculation.average} size='small' readOnly />
				</Grid>
				<Grid item xs={12}>
					<Button variant='contained' sx={{ width: '100%' }}>
						Write a Review
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ReviewSummary;

// const ReviewSummary: React.FC<ReviewSummaryProps> = ({ productId = '', storeSlug = '' }) => {
// 	const { loading, data } = useQuery(all_reviews_by_filter(productId, storeSlug), {
// 		onCompleted: (data: any) => {
// 			// console.log('all_reviews_by_filter query', data);
// 		},
// 		onError: (error: ApolloError) => {
// 			console.log(JSON.stringify(error));
// 		},
// 	});

// 	if (loading || data === undefined) {
// 		return <Loader />;
// 	}

// 	// console.log('REVIEW SUMMARY DATA:', data);
// 	calculate_percentages(data.reviews.data);

// 	return (
// 		<Grid container gap={4} sx={{ my: 7 }}>
// 			<Grid container item gap={1.2} xs={12} md={6}>
// 				<ReviewBar star='5 Star' value={60} />
// 				<ReviewBar star='4 Star' value={20} />
// 				<ReviewBar star='3 Star' value={10} />
// 				<ReviewBar star='2 Star' value={5} />
// 				<ReviewBar star='1 Star' value={5} />
// 			</Grid>
// 			<Grid container item gap={2} xs={12} md={3} sx={{ textAlign: 'center', order: { xs: -1, md: 0 } }}>
// 				<Grid item xs={12} sx={{ border: `1px solid ${colors['grey']}`, p: 2 }}>
// 					<Typography variant='body1'>20 Reviews</Typography>
// 					<Typography variant='h6' sx={{ py: 1 }}>
// 						4.8
// 					</Typography>
// 					<MUIRating value={4} size='small' readOnly />
// 				</Grid>
// 				<Grid item xs={12}>
// 					<Button variant='contained' sx={{ width: '100%' }}>
// 						Write a Review
// 					</Button>
// 				</Grid>
// 			</Grid>
// 		</Grid>
// 	);
// };
