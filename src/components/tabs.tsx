import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "./box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="p-2">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
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
    <Box className="w-full">
      <Box className="border-b border-grey">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="tabs"
          centered
        >
          {tabs.map((tab, ind) => {
            return (
              <Tab
                disableRipple
                key={tab.title}
                label={tab.title}
                {...a11yProps(ind)}
              />
            );
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, ind) => {
        return (
          <TabPanel key={`panel_${tab.title}`} value={currentTab} index={ind}>
            {tab.content}
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default PJSTabs;
