import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

type Props = {
	filter: string;
	onChangeValue: (data: any) => void;
};

// Going to use an unstyled component instead of the customisations below

// const CustomizedFormControl = styled(FormControl)``;

// const CustomizedMenuItem = styled(MenuItem)``;

// const CustomizedSelect = styled(Select)``;

// Using this as an example of filtering until I can edit the models in Strapi

const ProductFilter: React.FC<Props> = ({ filter, onChangeValue }) => {
	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel>Condition</InputLabel>
			<Select
				value={filter}
				onChange={onChangeValue}
				displayEmpty
				label='Condition'>
				<MenuItem value='Any'>
					<em>Condition (Any)</em>
				</MenuItem>
				<MenuItem value={'New'}>Condition (New)</MenuItem>
				<MenuItem value={'Used'}>Condition (Used)</MenuItem>
			</Select>
		</FormControl>
	);
};

export default ProductFilter;
