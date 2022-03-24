import { ApolloError, gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Box from "../box";
import Loader from "../loader";
import { BASE_ORDER, paginated_orders } from "./queries";
import { OrderProps } from "./types";
import OrderTable from "./table-element";
import useUser from "../../forms/user/useUser";
import { paginated_wallet_logs } from "../walletlogs/queries";
import { DefaultPageSize } from "../../config/config";
import { Input, MenuItem, Pagination, Select, Tab, Tabs } from "@mui/material";

const storeOrderTabs = [
  {
    title: "All",
    listStatus: null,
  },
  {
    title: "Open",
    listStatus: "Open",
  },
  {
    title: "Shipped",
    listStatus: "Shipped",
  },
  {
    title: "Received",
    listStatus: "Received",
  },
  {
    title: "Closed",
    listStatus: "Closed",
  },
];

const filterSelectOptions = [
  { value: "filter by", displayText: "Filter by" },
  { value: "Reference", displayText: "Reference" },
  { value: "Customer", displayText: "Customer" },
];

type Props = {
  seller?: boolean;
};

const StoreOrderList: React.FC<Props> = ({ seller = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("1");
  const [viewedOrdersStatus, setViewedOrdersStatus] = useState();

  const { id } = useUser();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setActiveTab(`${value}`);
    setViewedOrdersStatus(
      storeOrderTabs[`${value - 1}`].listStatus
        ? storeOrderTabs[`${value - 1}`].listStatus.toString()
        : undefined
    );
  };

  const [getStoreOrders, { loading, data }] = useLazyQuery(
    paginated_orders(id, seller ? "seller" : "buyer"),
    {
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  useEffect(() => {
    getStoreOrders({
      variables: {
        pageSize: DefaultPageSize,
        page: currentPage,
        status: viewedOrdersStatus,
      },
    });
  }, [viewedOrdersStatus]);

  if (loading || data === undefined) {
    return <Loader />;
  }

  return (
    <Box className="">
      <Box className="border-b border-grey my-5">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Account Tabs"
        >
          {storeOrderTabs.map((orderTab, ind) => {
            return (
              <Tab
                sx={{
                  paddingX: 2,
                  textTransform: "none",
                  letterSpacing: "0",
                  fontWeight: "400",
                  minHeight: 50,
                }}
                key={`tablist_${ind}`}
                //   icon={section.icon ? section.icon : null}
                //   iconPosition="start"
                label={<Box>{orderTab.title}</Box>}
                value={(ind + 1).toString()}
              />
            );
          })}
        </Tabs>
      </Box>

      <Box className="bg-grey-light mx-2 lg:mx-0 rounded-full w-full lg:w-searchbar flex items-center py-2 pl-2 pr-5 mb-5">
        <Select
          id="select-input"
          sx={{
            ".MuiSelect-icon": {
              fill: "#fff",
            },
            ".MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 0.8rem",
            },
            borderRadius: "20px",
            backgroundColor: "#000",
            fontSize: "12px",
            color: "#fff",
            marginRight: "10px",
            "&:hover": { backgroundColor: "#555" },
          }}
          //   label={label}
          //   onChange={onChange}
          //   value={value}
          defaultValue={"filter by"}
          placeholder="Filter by"
          //   disabled={disabled}
          variant="filled"
          disableUnderline
        >
          {filterSelectOptions.map((option, ind) => {
            return (
              <MenuItem
                key={`select-input-order-filter-menu-item-${ind}`}
                value={option.value}
              >
                {option.displayText}
              </MenuItem>
            );
          })}
        </Select>
        <Input
          sx={{ fontSize: "14px" }}
          placeholder="Filter orders"
          disableUnderline
          className="w-full"
        />
      </Box>

      <OrderTable data={data.orders.data} seller={seller} />

      <Pagination
        count={data.orders.meta.pagination.pageCount}
        size="small"
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  );
};

export default StoreOrderList;
