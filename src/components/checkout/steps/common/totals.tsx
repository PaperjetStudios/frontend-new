import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import { useWizard } from "react-use-wizard";
import { moneyFormatter } from "../../../../config/util";
import { cartState } from "../../../../state/cart";
import colors from "../../../../theme/colors";
import ShadowContainer from "../../../common/shadow-container";
import { Icons } from "../../../icons";

type ListItemProps = {
  label: string;
  total: number | string;
  currency?: boolean;
  bigger?: boolean;
};
const TotalListItem: React.FC<ListItemProps> = ({
  label,
  total,
  currency = true,
  bigger = false,
}) => {
  if (total === 0) {
    return null;
  } else {
    return (
      <Stack
        direction="row"
        sx={{
          py: bigger ? 2 : 1,
          px: 3,
          justifyContent: "space-between",
          borderBottom: `1px solid ${colors["grey-light"]}`,
        }}
      >
        <Typography variant={bigger ? "body1" : "body2"}>{label}</Typography>
        <Typography variant={bigger ? "body1" : "body2"}>
          {currency ? moneyFormatter(total) : total}
        </Typography>
      </Stack>
    );
  }
};

type TotalsProps = {
  nextAction?: () => void;
};

const Totals: React.FC<TotalsProps> = ({ nextAction }) => {
  const [cart, setCart] = cartState.use();

  const { nextStep } = useWizard();

  return (
    <ShadowContainer
      sx={{
        padding: 2,
        textAlign: "center",
        position: "sticky",

        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          pt: 1,
          pb: 2,
          fontWeight: "500",
          borderBottom: `1px solid ${colors["grey-light"]}`,
        }}
      >
        Cart Total
      </Typography>

      <Stack>
        <TotalListItem label="Items" total={cart.totals.total_items} />
        <TotalListItem label="Delivery" total={cart.totals.delivery} />
        <TotalListItem label="Vat" total={cart.totals.vat} />
        <TotalListItem bigger label="Total" total={cart.totals.total} />
      </Stack>
      <Button
        sx={{
          marginTop: 3,
          width: "100%",
          ".MuiButton-endIcon": { paddingLeft: "5px" },
          ".MuiButton-endIcon svg": { width: "10px" },
        }}
        endIcon={Icons.chevron.right}
        variant="contained"
        onClick={() => {
          if (nextAction) {
            nextAction();
          } else {
            nextStep();
          }
        }}
      >
        Continue
      </Button>
    </ShadowContainer>
  );
};

export default Totals;
