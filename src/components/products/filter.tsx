import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import colors from '../../theme/colors';

type Props = {
	filter: {
		condition: string;
		sale: string;
	};
	onChangeValue: (data: any) => void;
};

const CustomizedSelect = styled(Select)`
	height: 38px;

	.MuiOutlinedInput-notchedOutline {
		border-width: 1.5px;
		border-color: ${colors['grey-lighter']};
	}
`;

const CustomizedInputLabel = styled(InputLabel)`
	top: 0px;
	font-weight: 500;
	&.Mui-focused {
		top: 0px;
	}
`;

//

export const ProductFilter: React.FC<Props> = ({ filter, onChangeValue }) => {
	return (
		<Grid>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<CustomizedInputLabel>Sale</CustomizedInputLabel>
				<CustomizedSelect name='sale' value={filter.sale} onChange={onChangeValue} displayEmpty label='Sale'>
					<MenuItem value='Any'>
						<em>Show All</em>
					</MenuItem>
					<MenuItem value={'true'}>On Sale</MenuItem>
					<MenuItem value={'false'}>Not on Sale</MenuItem>
				</CustomizedSelect>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<CustomizedInputLabel>Condition</CustomizedInputLabel>
				<CustomizedSelect name='condition' value={filter.condition} onChange={onChangeValue} displayEmpty label='Condition'>
					<MenuItem value='Any'>
						<em>Condition (Any)</em>
					</MenuItem>
					<MenuItem value={'New'}>Condition (New)</MenuItem>
					<MenuItem value={'Used'}>Condition (Used)</MenuItem>
				</CustomizedSelect>
			</FormControl>
		</Grid>
	);
};

export default ProductFilter;
