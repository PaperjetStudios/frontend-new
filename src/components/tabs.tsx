import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import colors from '../theme/colors';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const CustomizedTabs = styled(Tabs)`
	border-style: solid;
	border-width: 1px 0 1px 0;
	border-color: ${colors['grey']};
	margin: 10px 0;

	.MuiTabs-indicator {
		background-color: transparent;
	}

	.MuiButtonBase-root:first-of-type {
		padding-left: 0;
	}

	.MuiButtonBase-root:last-of-type {
		padding-right: 0;
	}

	.MuiTabs-indicator::before {
		width: 0;
		height: 0;
		left: 45%;
		content: '';
		position: absolute;
		transform: scale(2.5);
		border-bottom: 7px solid black;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
	}
`;

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ mt: 6, maxWidth: 900 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

type TabsProps = {
	tabs: {
		title: string;
		content: React.ReactNode;
	}[];
	defaultTab?: number;
};

const PJSTabs: React.FC<TabsProps> = ({ tabs, defaultTab = 0 }) => {
	const [currentTab, setCurrentTab] = React.useState(defaultTab);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	return (
		<Box>
			<Box>
				<CustomizedTabs value={currentTab} onChange={handleChange} aria-label='tabs'>
					{tabs.map((tab, index) => {
						return (
							<Tab
								sx={{ textTransform: 'capitalize', letterSpacing: 0 }}
								disableRipple
								key={tab.title}
								label={tab.title}
								{...a11yProps(index)}
							/>
						);
					})}
				</CustomizedTabs>
			</Box>
			{tabs.map((tab, index) => {
				return (
					<TabPanel key={`panel_${tab.title}`} value={currentTab} index={index}>
						{tab.content}
					</TabPanel>
				);
			})}
		</Box>
	);
};

export default PJSTabs;
