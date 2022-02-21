import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import _ from "lodash";
import { useParams } from "react-router-dom";
import Box from "../../components/box";
import Loader from "../../components/loader";
import { GET_ORDER_BY_ID } from "../../components/orders/queries";
import { updateOrderStatus } from "../../components/orders/utils";
import ProductPanelList from "../../components/products/panel-list";
import Typo from "../../components/typo";
import { moneyFormatter } from "../../config/util";
import useUser from "../../forms/user/useUser";

type Props = {};
type OrderListProps = {
  heading: string;
  info: string;
  value: string | number;
  convertToCurrency?: boolean;
};

const OrderListingRow: React.FC<OrderListProps> = ({
  heading,
  info,
  value,
  convertToCurrency = true,
}) => {
  return (
    <Box className="flex w-full justify-between">
      <Typo bold t="smaller">
        {heading}
      </Typo>
      <Typo t="smaller">{info}</Typo>
      <Typo t="smaller">
        {convertToCurrency ? moneyFormatter(value) : value}
      </Typo>
    </Box>
  );
};

type AddressListProps = {
  address: {
    street_1: string;
    street_2: string;
    city: string;
    province: string;
    suburb: string;
    country: string;
    zip: string;
  };
};

const AddressList: React.FC<AddressListProps> = ({ address }) => {
  return (
    <Box className="flex flex-col">
      <Typo t="smaller">{address.street_1}</Typo>
      <Typo t="smaller">{address.street_2}</Typo>
      <Typo t="smaller">{address.city}</Typo>
      <Typo t="smaller">{address.province}</Typo>
      <Typo t="smaller">{address.country}</Typo>
      <Typo t="smaller">{address.zip}</Typo>
    </Box>
  );
};

const Order: React.FC<Props> = ({ children }) => {
  const { order } = useParams();

  const { id } = useUser();

  const { data, loading } = useQuery(GET_ORDER_BY_ID, {
    variables: {
      id: order,
    },
  });

  if (loading) {
    return <Loader />;
  }

  const ord = data.order.data.attributes;

  const itemsCount = _.reduce(
    ord.Items,
    function (n, obj) {
      if (obj.id !== "delivery") {
        return obj.quantity + n;
      } else {
        return n;
      }
    },
    0
  );

  const delivery = _.find(ord.Items, (obj) => {
    return obj.id === "delivery";
  });

  const isBuyer = ord.Buyer.data.id === id;

  return (
    <Box className="flex">
      <Box className="w-4/6 border-r pr-5 border-grey">
        <Box className="flex justify-between items-center">
          <Box>
            <Typo t="small">Reference:</Typo>
            <Typo t="h4" bold>
              {ord.Unique}
            </Typo>
          </Box>
          <Box className="text-right">
            <Typo t="h4" bold>
              {ord.Status}
            </Typo>
          </Box>
        </Box>
        <ProductPanelList list={ord.Items} />
        <Box className="flex flex-col p-5 gap-2">
          <OrderListingRow
            heading="Subtotal"
            info={`${itemsCount} Item${itemsCount > 0 ? "s" : ""}`}
            value={ord.Total_Items}
          />

          <OrderListingRow
            heading="Delivery"
            info={delivery.title}
            value={delivery.cost}
          />

          <OrderListingRow heading="Total" info="" value={ord.Total} />

          <strong>
            <OrderListingRow
              heading="Total After Commission"
              info=""
              value={ord.Total_After_Commission}
            />
          </strong>
        </Box>
      </Box>
      <Box className=" w-2/6 px-5 pt-2">
        <Box className="border-grey border-b pb-5">
          {isBuyer && ord.Status === "Shipped" && (
            <Button
              onClick={() => updateOrderStatus(ord.id, "Recieved")}
              variant="contained"
            >
              Mark as Recieved
            </Button>
          )}
          {!isBuyer && ord.Status === "Open" && (
            <Button
              onClick={() => updateOrderStatus(ord.id, "Shipped")}
              variant="contained"
            >
              Mark as Shipped
            </Button>
          )}
        </Box>
        <Box className="border-grey border-b py-5">
          <Typo bold t="p" className="mb-3">
            Delivery Information
          </Typo>
          <AddressList address={ord.Delivery_Address} />
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
