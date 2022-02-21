import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type Props = {
  className?: string;
  size?: "small" | "medium" | "large";
};

const Loader: React.FC<Props> = ({ children, className }) => (
  <div
    className={classNames(
      className ? className : "",
      "flex justify-center items-center w-full h-full"
    )}
  >
    <FontAwesomeIcon icon={["fad", "spinner-third"]} spin />
  </div>
);

export default Loader;
