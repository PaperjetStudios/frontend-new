import BaseProfilePage from "../layout/base-profile-page";
import Box from "../../components/box";

type Props = {};

const Wishlist: React.FC<Props> = ({ children }) => {
  return (
    <BaseProfilePage title="Wishlist">
      <Box>Wishlist</Box>
    </BaseProfilePage>
  );
};

export default Wishlist;
