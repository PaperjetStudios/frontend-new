import { Button } from "@mui/material";
import Box from "../components/box";
import OrderList from "../components/testing/order-list";
import { currentApi } from "../config/config";
import BasePage from "./layout/base-page";

type Props = {};

const createRandomOrders = () => {
  fetch(currentApi.url + "/api/order/createRandom")
    .then((response) => response.json())
    .then((dataArr) => {
      console.log(dataArr);
    });
};

const OrderFlow: React.FC<Props> = ({ children }) => (
  <BasePage slug="home">
    <Box className="mt-10" hcenter wrapper>
      <Box className="w-full">
        <Button
          onClick={() => {
            createRandomOrders();
          }}
          variant="contained"
        >
          Create Random Orders
        </Button>

        <Box className="mt-10">
          <OrderList />
        </Box>
      </Box>
    </Box>
  </BasePage>
);

export default OrderFlow;
