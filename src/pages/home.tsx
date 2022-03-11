import Box from '../components/box';
import LayoutContainer from '../components/layout-container';

import ProductCardList from '../components/products/list';
import BasePage from './layout/base-page';

type Props = {};

const Homepage: React.FC<Props> = ({ children }) => (
	<BasePage slug='home'>
		<LayoutContainer>
			<ProductCardList page={1} pageSize={4} />
			{children}
		</LayoutContainer>
	</BasePage>
);

export default Homepage;
