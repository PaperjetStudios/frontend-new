import { useParams } from 'react-router-dom';
import LayoutContainer from '../../components/layout-container';
import ProductCardList from '../../components/products/list';

type Props = {};

const Category: React.FC<Props> = ({ children }) => {
	const { cat } = useParams();

	return (
		<LayoutContainer>
			<ProductCardList
				categorySlug={cat}
				page={1}
				pageSize={5}
				displayFilterBar={true}
			/>
		</LayoutContainer>
	);
};

export default Category;
