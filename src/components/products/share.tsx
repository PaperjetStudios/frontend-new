import classNames from "classnames";
import React from "react";
import { useLocation } from "react-router-dom";
import { currentApi } from "../../config/config";
import Box from "../box";
import { Icons } from "../icons";

type Props = {
  providers: {
    provider: string;
    linkURL?: string;
  }[];
};

const SocialShare: React.FC<Props> = ({
  providers = [{ provider: "facebook" }, { provider: "twitter" }],
}) => {
  const location = useLocation();
  const path = currentApi.url + location.pathname;

  return (
    <Box
      className={classNames("flex gap-2 flex-grow-0 text-sm text-grey-dark")}
    >
      {providers.map((social, ind) => {
        if (social.provider === "facebook") {
          return (
            <div
              key="facebook_share"
              className="fb-share-button"
              data-href={
                social?.linkURL
                  ? encodeURIComponent(social.linkURL)
                  : encodeURIComponent(path)
              }
              data-layout="button_count"
              data-size="small"
            >
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${
                  social?.linkURL
                    ? encodeURIComponent(social.linkURL)
                    : encodeURIComponent(path)
                }&amp;src=sdkpreparse`}
                className="fb-xfbml-parse-ignore"
              >
                {Icons.social.facebook}
              </a>
            </div>
          );
        } else if (social.provider === "instagram") {
          return (
            <a
              key="instagram"
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/"
            >
              {Icons.social.instagram}
            </a>
          );
        } else if (social.provider === "twitter") {
          return (
            <a
              key="twitter_share"
              rel="noreferrer"
              target="_blank"
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              // className="twitter-share-button"
              data-text={
                social?.linkURL
                  ? encodeURIComponent(social.linkURL)
                  : encodeURIComponent(path)
              }
              data-url={
                social?.linkURL
                  ? encodeURIComponent(social.linkURL)
                  : encodeURIComponent(path)
              }
              data-show-count="false"
            >
              {Icons.social.twitter}
            </a>
          );
        } else if (social.provider === "pinterest") {
          return (
            <a
              key="pintrest_share"
              rel="noreferrer"
              target="_blank"
              data-pin-do="embedPin"
              href="https://www.pinterest.com/pin/create/button"
            >
              {Icons.social.pinterest}
            </a>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default SocialShare;
