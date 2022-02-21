import BasePage from "./layout/base-page";

type Props = {};

const NothingFound: React.FC<Props> = ({ children }) => (
  <BasePage slug="nothing-found">
    404, Nothing Found.
    {children}
  </BasePage>
);

export default NothingFound;
