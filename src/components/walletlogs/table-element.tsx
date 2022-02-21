import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import { makeDate } from "../../config/util";
import { WalletLogProps } from "./types";
import WalletTableRow from "./table-row";
import Box from "../box";

type Props = {
  data: WalletLogProps[];
};

const WalletTable: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer sx={{ marginBottom: "20px" }} component={Box}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Reference</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Amount</TableCell>
            <TableCell align="left">Created</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <WalletTableRow key={row.attributes.Unique} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WalletTable;
