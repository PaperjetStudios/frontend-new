import classNames from "classnames";

import Box from "../../components/box";
import Typo from "../../components/typo";
import Loader from "../../components/loader";
import { getProfileLinkByTitle } from "../profile/config";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { Button } from "@mui/material";

type ProfileSectionProps = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactElement;
};

type ProfileWindowActions = {
  title: string;
  action: () => any;
  icon?: React.ReactElement;
};

type Props = {
  className?: string;
  loading?: boolean;
  title: string;
  sections?: ProfileSectionProps[];
  actions?: ProfileWindowActions[];
};

const BaseProfilePage: React.FC<Props> = ({
  children,
  title,
  className,
  loading,
  sections = [],
  actions = [],
}) => {
  const profileLink = getProfileLinkByTitle(title);

  const [section, setSection] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSection(newValue);
  };

  if (loading) {
    return <Loader />;
  }

  // Show sections if there are, otherwise show children

  return (
    <Box className={classNames(className, " border h-full border-grey")}>
      <Box
        className="flex gap-5 border-b border-grey px-4 py-3 justify-between"
        vcenter
      >
        <Box className="flex gap-5" vcenter>
          <Box className="w-12 h-12 rounded-full bg-grey" vcenter hcenter>
            {profileLink.icon}
          </Box>
          <Typo t="h3">{title}</Typo>
        </Box>
        <Box className="flex gap-2">
          {actions.length > 0 &&
            actions.map((act, ind) => {
              return (
                <Button onClick={act.action} variant="contained">
                  {act.title}
                </Button>
              );
            })}
        </Box>
      </Box>

      {sections.length > 0 && (
        <TabContext value={section}>
          <Box className="border-b border-grey">
            <TabList onChange={handleChange} aria-label="Account Tabs">
              {sections.map((ob, ind) => {
                return (
                  <Tab
                    sx={{
                      paddingX: 10,
                      textTransform: "none",
                      letterSpacing: "0",
                      fontWeight: "400",
                      minHeight: 50,
                    }}
                    key={`tablist_${ind}`}
                    icon={ob.icon ? ob.icon : null}
                    iconPosition="start"
                    label={<Box>{ob.title}</Box>}
                    value={(ind + 1).toString()}
                  />
                );
              })}
            </TabList>
          </Box>

          {sections.map((ob, ind) => {
            return (
              <TabPanel key={`tabpanel_${ind}`} value={(ind + 1).toString()}>
                {ob.content}
              </TabPanel>
            );
          })}
        </TabContext>
      )}
      <Box className="p-5">{sections.length === 0 && children}</Box>
    </Box>
  );
};

export default BaseProfilePage;
