import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { useState } from "react";
import Box from "../box";
import { OrderProps } from "../orders/types";
import { moneyFormatter } from "../../config/util";
import { Button } from "@mui/material";
import { axiosInstance } from "../../config/api";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function OrderTableRow(props: { row: OrderProps; seller: boolean }) {
  const { row, seller } = props;
  const [open, setOpen] = useState(false);

  const navigator = useNavigate();

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
        <TableCell>{row.createdAt}</TableCell>
        <TableCell component="th" scope="row">
          {row.Unique}
        </TableCell>
        <TableCell align="left">{row.Status}</TableCell>
        <TableCell align="left">
          {moneyFormatter(row.Total_After_Commission)}
        </TableCell>
        <TableCell align="center" sx={{ gap: "5px" }}>
          {row.Status === "Open" && seller && (
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
          {row.Status === "Shipped" && !seller && (
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
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              navigator(`/profile/order/${row.id}`);
            }}
          >
            {<RemoveRedEyeIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ borderBottom: 0 }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 0 }}
          colSpan={10}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Total Value</TableCell>
                    <TableCell>Commission</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{products}</TableCell>
                  <TableCell>
                    <p>{row.Delivery_Address.street_1}</p>
                    <p>{row.Delivery_Address.street_2}</p>
                    <p>{row.Delivery_Address.suburb}</p>
                    <p>{row.Delivery_Address.city}</p>
                    <p>{row.Delivery_Address.province}</p>
                    <p>{row.Delivery_Address.country}</p>
                  </TableCell>
                  <TableCell align="left">
                    {moneyFormatter(row.Total)}
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

export default OrderTableRow;
