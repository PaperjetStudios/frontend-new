import BasePage from "./layout/base-page";

type Props = {};

const Checkout: React.FC<Props> = ({ children }) => (
  <BasePage slug="checkout">
    Checkout
    {children}
  </BasePage>
);

export default Checkout;
