import React, { useEffect } from 'react';

import { Grid, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { ApolloError, useQuery } from '@apollo/client';

import { useLocation } from 'react-router-dom';

import Loader from '../loader';
import { paginated_products } from './queries';
import ProductCard from './card';
import ProductFilter from './filter';
import PJSPagination from '../pagination';

type Props = {
	pageSize: number;
	page: number;
	categorySlug?: string;
	tagsSlug?: string;
	storeSlug?: string;
	condition?: 'Any' | 'New' | 'Used';
	displayFilterBar?: boolean;
	displayPagination?: boolean;
};

const ProductCardList: React.FC<Props> = ({
	page = 1,
	pageSize = 5,
	categorySlug = '',
	tagsSlug = '',
	storeSlug = '',
	condition = '',
	displayFilterBar = false,
	displayPagination = false,
}) => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const pageParam = parseInt(query.get('page') || '1', 10);

	// Reload component when page number changes
	useEffect(() => {
		setCurrentPage(pageParam);
	}, [pageParam]);

	const [currentPage, setCurrentPage] = React.useState(page);

	// Just an example of the filter bar
	const [productCondition, setProductCondition] = React.useState(condition);

	const handleFilterChange = (event: SelectChangeEvent) => {
		setProductCondition(event.target.value);
	};

	const { loading, data } = useQuery(paginated_products(categorySlug, storeSlug, tagsSlug, productCondition), {
		variables: {
			pageSize: pageSize,
			page: currentPage,
		},
		onCompleted: (data: any) => {
			console.log(data);
		},
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	if (loading || data === undefined) {
		return <Loader />;
	}

	return (
		<>
			{displayFilterBar && (
				// Conditionally load the filter bar so this component can be re-used for the "Related Products" etc on Product pages
				<Box sx={{ justifyContent: 'flex-end', display: 'flex', my: 7 }}>
					<ProductFilter filter={productCondition} onChangeValue={handleFilterChange} />
				</Box>
			)}
			<Grid
				container
				spacing={{
					xs: 2,
					md: 3,
					xl: 6,
				}}
				justifyContent='flex-start'
				sx={{
					pt: 4,
					pb: 3,
				}}>
				{data.products.data.map((obj: any, ind: number) => {
					return (
						<Grid key={`prod_${ind}`} item xs={6} md={3}>
							<ProductCard id={obj.id} />
						</Grid>
					);
				})}
			</Grid>

			{data.products.meta.pagination.pageCount !== 1 && displayPagination && (
				<PJSPagination count={data.products.meta.pagination.pageCount} />
			)}
		</>
	);
};

export default ProductCardList;
