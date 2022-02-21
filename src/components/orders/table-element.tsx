import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { OrderProps } from "../orders/types";

import { makeDate } from "../../config/util";
import OrderTableRow from "./table-row";

import Box from "../box";

type Props = {
  data: {
    id: string;
    attributes: OrderProps;
  }[];
  seller: boolean;
};

const OrderTable: React.FC<Props> = ({ data, seller = false }) => {
  return (
    <TableContainer component={Box} sx={{ marginBottom: "20px" }}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <OrderTableRow
              seller={seller}
              key={row.attributes.Unique}
              row={{
                id: row.id,
                Unique: row.attributes.Unique,
                Payment: row.attributes.Payment,
                Items: row.attributes.Items,
                Total: row.attributes.Total,
                Total_Items: row.attributes.Total_Items,
                Total_Delivery: row.attributes.Total_Delivery,
                Total_After_Commission: row.attributes.Total_After_Commission,
                Commission: row.attributes.Commission,
                createdAt: makeDate(row.attributes.createdAt),
                Status: row.attributes.Status,
                Store: row.attributes.Store,
                Delivery_Address: row.attributes.Delivery_Address,
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
