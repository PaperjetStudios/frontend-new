import { ApolloError, gql, useQuery } from '@apollo/client';
import classNames from 'classnames';
import { Outlet, useParams } from 'react-router-dom';

import Box from '../../components/box';
import Loader from '../../components/loader';
import TitleBreadcrumbBar from '../../components/page/title-breadcrumb-bar';
import { createStoreLink } from '../../config/config';
import { single_product_by_slug } from '../../components/products/queries';
import Footer from './footer';
import Header from './header';

type Props = {
	className?: string;
	id?: string;
};

const BaseProduct: React.FC<Props> = ({ children, className }) => {
	const { product } = useParams();

	const { loading, data } = useQuery(single_product_by_slug, {
		variables: {
			slug: product,
		},
		onCompleted: data => {
			// console.log('Base Product Slug query', data);
		},
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	if (loading || data === undefined) {
		return <Loader />;
	}

	const { Title, Store } = data?.products?.data[0]?.attributes;

	return (
		<Box className={classNames(className ? className : '', 'base-layout')}>
			<Header />
			<Box>
				<TitleBreadcrumbBar
					title={Title}
					middleLink={{
						title: Store.data.attributes.Title,
						url: createStoreLink(Store.data.id),
					}}
				/>
				<Outlet />
			</Box>
			<Footer />
		</Box>
	);
};

export default BaseProduct;

//  const { loading, data } = useQuery(
//     gql`
//       ${BASE_PRODUCT}
//       query ($id: ID) {
//         product(id: $id) {
//           data {
//             attributes {
//               ...BASE_PRODUCT
//             }
//           }
//         }
//       }
//     `,
//     {
//       variables: {
//         id: product,
//       },
//       onError: (error: ApolloError) => {
//         console.log(JSON.stringify(error));
//       },
//     }
//   );
