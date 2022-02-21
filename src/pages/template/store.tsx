import { useParams } from "react-router-dom";
import Box from "../../components/box";

type Props = {};

const Store: React.FC<Props> = ({ children }) => {
  const { store } = useParams();

  return <Box>{store}</Box>;
};

export default Store;
