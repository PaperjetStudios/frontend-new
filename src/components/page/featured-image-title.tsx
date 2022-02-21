import classNames from "classnames";
import { currentApi } from "../../config/config";
import Box from "../box";
import Typo from "../typo";

type Props = {
  className?: string;
  imageUrl?: string;
  title?: string;
};

const FeaturedImageTitle: React.FC<Props> = ({
  title,
  imageUrl,
  className,
}) => {
  if (imageUrl) {
    return (
      <Box
        style={{ backgroundImage: `url(${currentApi.url}${imageUrl})` }}
        className={classNames(
          className ? className : "",
          "h-40 bg-cover flex justify-center items-center darkener relative z-0"
        )}
      >
        <Typo className="text-light relative z-10 text-shadow-sm" bold t="h1">
          {title}
        </Typo>{" "}
      </Box>
    );
  } else {
    return (
      <Box className={classNames(className ? className : "", "h-52")}>
        <Typo t="h1">{title}</Typo>
      </Box>
    );
  }
};

export default FeaturedImageTitle;
