import { useParams } from 'react-router-dom';
import Box from '../../components/box';

type Props = {};

const Category: React.FC<Props> = ({ children }) => {
	const { cat } = useParams();

	return <Box>{cat}</Box>;
};

export default Category;
