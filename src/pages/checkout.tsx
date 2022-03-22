import CheckoutBase from "../components/checkout/checkout-base";
import BasePage from "./layout/base-page";

type Props = {};

const Checkout: React.FC<Props> = ({ children }) => (
  <BasePage slug="checkout">
    <CheckoutBase />
  </BasePage>
);

export default Checkout;
