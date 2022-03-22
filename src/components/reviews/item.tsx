import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { Grid, Typography, Avatar, Box, Skeleton } from '@mui/material';
import { default as MUIRating } from '@mui/material/Rating';
import colors from '../../theme/colors';
import { single_review_by_id } from './queries';
import { makeDate } from '../../config/util';

type Props = {
	id: number;
};

const ReviewItem: React.FC<Props> = ({ id }) => {
	const { loading, data } = useQuery(single_review_by_id, {
		variables: {
			id: id,
		},
		onCompleted: data => {
			// console.log('single_review_by_id query', data);
		},
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	if (loading || data === undefined) {
		return <Skeleton variant='rectangular' width={500} height={200} />;
	}

	// console.log('SINGLE REVIEW DATA',data);

	const { Title, Rating, Message, createdAt } = data.review.data.attributes;
	// Dummy data because I get a permission error when trying to query User model
	const { FirstName, LastName } = { FirstName: 'Eric', LastName: 'Cartman' };

	return (
		<Grid item container direction='row' alignItems='flex-start' sx={{ borderBottom: `1px solid ${colors['grey']}`, pb: 3 }}>
			<Grid item xs={1} sx={{ display: { xs: 'none', md: 'block' } }}>
				<Avatar>{FirstName.charAt(0)}</Avatar>
			</Grid>
			<Grid item container xs={11}>
				<Grid item xs={12} sx={{ mb: 1 }}>
					<Typography variant='body3'>
						{FirstName} {LastName}
					</Typography>
					<Typography variant='body3' sx={{ ml: 1 }} color={colors['grey-medium']}>
						at {makeDate(createdAt)}
					</Typography>
				</Grid>
				<Grid item container xs={12} direction='row' alignItems='center'>
					<MUIRating value={Rating} size='small' readOnly />
					<Typography variant='h6' sx={{ ml: 1 }}>
						{Title}
					</Typography>
				</Grid>
				<Box>
					<Typography variant='body2'>{Message}</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ReviewItem;

// If we're using reviews without pagination and using the product ID only

// type Props = {
// 	review?: any;
// };

// const ReviewItem: React.FC<Props> = ({ review }) => {
// 	const { Title, Rating, Message } = review.attributes;
// 	return (
// 		<Grid item container direction='row' alignItems='flex-start' sx={{ borderBottom: `1px solid ${colors['grey']}`, pb: 3 }}>
// 			<Grid item xs={1} sx={{ display: { xs: 'none', md: 'block' } }}>
// 				<Avatar>H</Avatar>
// 			</Grid>
// 			<Grid item container xs={11}>
// 				<Grid item xs={12} sx={{ mb: 1 }}>
// 					<Typography variant='body3'>Sam Lane</Typography>
// 					<Typography variant='body3' sx={{ ml: 1 }} color={colors['grey-medium']}>
// 						at 19 Jan 2018
// 					</Typography>
// 				</Grid>
// 				<Grid item container xs={12} direction='row' alignItems='center'>
// 					<MUIRating name='read-only' value={Rating} size='small' />
// 					<Typography variant='h6' sx={{ ml: 1 }}>
// 						{Title}
// 					</Typography>
// 				</Grid>
// 				<Box>
// 					<Typography variant='body2'>{Message}</Typography>
// 				</Box>
// 			</Grid>
// 		</Grid>
// 	);
// };

// export default ReviewItem;
