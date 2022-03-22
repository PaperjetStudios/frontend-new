import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import Box from "../box";
import { OrderProps } from "../orders/types";
import { moneyFormatter } from "../../config/util";
import { Button } from "@mui/material";
import { axiosInstance } from "../../config/api";

function OrderListItem(props: { row: OrderProps }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const updateOrderStatus = (id: string, status: string) => {
    const data = {
      Status: status,
    };

    return axiosInstance()(`/api/orders/${id}`, {
      method: "put",
      data: { data: data },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  const products = row.Items.map((obj: any) => {
    const { id, cost, title, quantity } = obj;

    if (id !== "delivery") {
      return (
        <div key={id}>{`${title} - ${moneyFormatter(cost)} x ${quantity}`}</div>
      );
    }
  });

  console.log(row.Status);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        key={`table_${row.id}`}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Unique}
        </TableCell>
        <TableCell align="left">{row.Status}</TableCell>
        <TableCell align="left">{moneyFormatter(row.Total_Delivery)}</TableCell>
        <TableCell align="left">{moneyFormatter(row.Total_Items)}</TableCell>
        <TableCell align="left">{moneyFormatter(row.Total)}</TableCell>
        <TableCell align="center" sx={{ gap: "5px" }}>
          {row.Status === "Open" && (
            <Button
              onClick={() => {
                updateOrderStatus(row.id, "Shipped");
              }}
              size="small"
              variant="outlined"
            >
              Mark as Shipped
            </Button>
          )}
          {row.Status === "Shipped" && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                updateOrderStatus(row.id, "Received");
              }}
            >
              Mark as Recieved
            </Button>
          )}
          {row.Status === "Received" && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                updateOrderStatus(row.id, "Closed");
              }}
            >
              Mark as Closed
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Commission</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{products}</TableCell>
                  <TableCell>
                    <p>{row.Delivery_Address.address.street_1}</p>
                    <p>{row.Delivery_Address.address.street_2}</p>
                    <p>{row.Delivery_Address.address.suburb}</p>
                    <p>{row.Delivery_Address.address.city}</p>
                    <p>{row.Delivery_Address.address.province}</p>
                    <p>{row.Delivery_Address.address.country}</p>
                  </TableCell>
                  <TableCell align="left">
                    {moneyFormatter(row.Total_After_Commission)}
                  </TableCell>
                  <TableCell align="left">
                    {moneyFormatter(row.Commission)}
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default OrderListItem;
