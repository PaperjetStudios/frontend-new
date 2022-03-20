import { Button, Box, Typography } from '@mui/material';
import { border } from '@mui/system';
import { styled } from '@mui/material/styles';
import colors from '../../theme/colors';
import { Icons } from '../icons';

type Props = {
	max: number;
	value: number;
	setValue: (newValue: number) => void;
};

const CustomizedButton = styled(Button)`
	height: 42px;
	color: ${colors['grey-medium']};
	:hover {
		color: ${colors['dark']};
		background-color: transparent;
	}
`;

const Quantity: React.FC<Props> = ({ value, max, setValue }) => {
	const handleAdd = () => {
		if (value < max) {
			setValue(value + 1);
		}
	};

	const handleMinus = () => {
		if (value >= 2) {
			setValue(value - 1);
		}
	};

	return (
		<Box
			sx={{
				border: 2,
				display: 'flex',
				alignItems: 'center',
				borderColor: colors['grey-lighter'],
				width: '140px',
			}}>
			<CustomizedButton onClick={handleMinus}>{Icons.minus}</CustomizedButton>
			<Box>
				<Typography variant='subtitle1'>{value}</Typography>
			</Box>
			<CustomizedButton onClick={handleAdd}>{Icons.plus}</CustomizedButton>
		</Box>
	);
};

export default Quantity;
