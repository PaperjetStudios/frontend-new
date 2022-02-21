import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";

import Box from "../box";
import { OrderProps } from "../orders/types";
import {
  makeDate,
  moneyFormatter,
  readableWalletLogStatus,
} from "../../config/util";
import { Button } from "@mui/material";
import { WalletLogProps } from "./types";
import { useNavigate } from "react-router-dom";

function WalletTableRow(props: { row: WalletLogProps }) {
  const { row } = props;

  const navigator = useNavigate();

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        key={`table_${row.id}`}
      >
        <TableCell component="th" scope="row">
          {row.attributes.Unique}
        </TableCell>
        <TableCell align="left">
          {readableWalletLogStatus(row.attributes.Transaction)}
        </TableCell>
        <TableCell align="left">
          {moneyFormatter(row.attributes.Total)}
        </TableCell>
        <TableCell align="left">{makeDate(row.attributes.createdAt)}</TableCell>
        <TableCell align="center" sx={{ gap: "5px" }}>
          <Button
            onClick={() => {
              navigator(`/profile/order/${row.id}`);
            }}
            size="small"
            variant="outlined"
          >
            See Order
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default WalletTableRow;
