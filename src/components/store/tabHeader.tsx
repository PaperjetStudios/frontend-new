import { Button } from "@mui/material";
import Box from "../box";
import Typo from "../typo";
import colors from "../../theme/colors";

type TabHeaderActions = {
  title: string;
  action: () => any;
  icon?: React.ReactElement;
};

type TabHeaderProps = {
  header_title: string;
  actions?: TabHeaderActions[];
};

const TabHeader: React.FC<TabHeaderProps> = ({
  header_title = "",
  actions = [],
}) => {
  return (
    <Box className="fflex justify-between space-x-5 py-5 px-5" vcenter>
      <Typo t="h3">{header_title}</Typo>
      {/* <Button
          sx={{ color: colors.light, backgroundColor: colors.primary }}
          onClick={() => {
            navigate("/profile/shop/setup/edit");
          }}
        >
          {"Edit store"}
        </Button> */}
      <Box className="flex gap-2">
        {actions.length > 0 &&
          actions.map((act, ind) => {
            return (
              <Button
                key={`shop-page-tab-header-${header_title}-action-${act?.title}-${ind}`}
                sx={{ color: colors.light, backgroundColor: colors.primary }}
                onClick={act.action}
                // variant="contained"
              >
                {act.title}
              </Button>
            );
          })}
      </Box>
    </Box>
  );
};

export default TabHeader;
