import classNames from "classnames";
import { currentApi } from "../../config/config";
import Box from "../box";
import Typo from "../typo";

import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "@mui/material";
import { Icons } from "../icons";

type Props = {
  className?: string;
  gallery: any[];
};

type ImageProps = {
  url: string;
};

const ShopStripImage: React.FC<ImageProps> = ({ url = "" }) => {
  return <Box className="w-full h-64" bg_img={`${currentApi.url}${url}`}></Box>;
};

const GalleryImageTitle: React.FC<Props> = ({ gallery, className }) => {
  if (gallery) {
    return (
      <Box
        className={classNames(
          className ? className : "",
          "h-64 bg-cover darkener relative z-0 mb-10"
        )}
      >
        <Carousel
          className="relative"
          showThumbs={false}
          showArrows={true}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <Button
                disableRipple
                sx={{ position: "absolute", background: "#fff" }}
                onClick={onClickHandler}
                className=" w-10 h-10 border-grey border -translate-y-1/2 rounded-2xs items-center justify-center flex absolute left-14 z-50  text-dark top-1/2"
              >
                {Icons.chevron.left}
              </Button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <Button
                disableRipple
                sx={{ position: "absolute", background: "#fff" }}
                onClick={onClickHandler}
                className="w-10 h-10 border-grey border -translate-y-1/2 rounded-2xs items-center justify-center flex absolute right-14 z-50  text-dark top-1/2"
              >
                {Icons.chevron.right}
              </Button>
            )
          }
          onChange={() => {}}
          onClickItem={() => {}}
          onClickThumb={() => {}}
        >
          {gallery.map((img) => {
            console.log(img);
            return (
              <ShopStripImage
                key={img.attributes.url}
                url={img.attributes.url}
              />
            );
          })}
        </Carousel>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default GalleryImageTitle;
