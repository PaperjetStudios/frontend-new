import Box from "../components/box";

import ProductCardList from "../components/products/list";
import BasePage from "./layout/base-page";

type Props = {};

const Homepage: React.FC<Props> = ({ children }) => (
  <BasePage slug="home">
    <Box hcenter wrapper>
      <ProductCardList page={1} pageSize={3} />
      {children}
    </Box>
  </BasePage>
);

export default Homepage;
