import { ApolloError, useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';

import Box from '../../components/box';
import LayoutContainer from '../../components/layout-container';

import Loader from '../../components/loader';
import FooterMenu from '../../components/menu/footer_menu';

import Typo from '../../components/typo';
import FooterWidgets from '../../components/footer/footer-widgets';

import { footer_menu_query } from './queries';
import CartPreview from '../../components/cart/cart-preview';

type Props = {
	className?: string;
};

type FooterColProps = {
	index: number;
};

const FooterColumn: React.FC<FooterColProps> = ({ index }) => {
	const { loading, data } = useQuery(footer_menu_query, {
		onError: (error: ApolloError) => {
			console.log(JSON.stringify(error));
		},
	});

	if (loading) {
		return <Loader />;
	}

	const columnData = data.footerMenu.data.attributes.Footer_Columns[index];

	return (
		<Grid item xs={12} md={3}>
			<Typo t='h3' className='mb-2'>
				{columnData.Title}
			</Typo>
			<FooterMenu data={columnData.Items} />
			<FooterWidgets data={columnData.Widgets} />
		</Grid>
	);
};

const Footer: React.FC<Props> = ({ children }) => {
	return (
		<>
			<LayoutContainer>
				{/* Footer Columns */}
				{/* <Box hcenter wrapper> */}
				<Grid
					container
					spacing={4}
					justifyContent='space-between'
					sx={{
						my: 7,
					}}>
					<FooterColumn index={0} />
					<FooterColumn index={1} />
					<FooterColumn index={2} />
					<FooterColumn index={3} />
				</Grid>
				{/* </Box> */}
			</LayoutContainer>
			<CartPreview />
		</>
	);
};
export default Footer;
