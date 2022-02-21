import { ApolloError, useQuery } from "@apollo/client";
import classNames from "classnames";
import React from "react";
import { currentApi } from "../../config/config";
import { options_query } from "../../config/queries";
import Box from "../box";
import Loader from "../loader";
import Typo from "../typo";
import Newsletter from "./newsletter";
import SocialListing from "./social-listing";
import { FooterWidget } from "./types";

type Props = {
  className?: string;
  style?: {};
  data?: FooterWidget[];
};

const FooterWidgets: React.FC<Props> = ({
  children,
  className,
  style,
  data,
}) => {
  const { loading: loadingOptions, data: options } = useQuery(options_query, {
    onError: (error: ApolloError) => {
      console.log(JSON.stringify(error));
    },
  });

  if (loadingOptions) {
    return <Loader />;
  }

  const optionData = options?.option?.data?.attributes;

  const WidgetEls = [];

  if (data) {
    for (const d of data) {
      switch (d.Type) {
        case "Social":
          WidgetEls.push(
            React.createElement(SocialListing, {
              key: `widget_${d.id}`,
              className: "mt-4",
            })
          );
          break;

        case "Newsletter":
          WidgetEls.push(
            React.createElement(Newsletter, {
              key: `widget_${d.id}`,
            })
          );
          break;

        case "Supported_Credit_Cards":
          WidgetEls.push(
            <Box className="mt-3" key={`widget_${d.id}`}>
              <img
                src={`${currentApi.url}${optionData.Credit_Cards.data.attributes.url}`}
                alt="Supported Credit Cards"
              />
            </Box>
          );
          break;

        case "Copyright":
          WidgetEls.push(
            <Box className="mt-3" key={`widget_${d.id}`}>
              <Typo t="small" className="text-grey-lighter">
                {optionData.Copyright}
              </Typo>
            </Box>
          );
          break;
      }
    }
  }

  return (
    <Box style={style} className={classNames(className ? className : "")}>
      {WidgetEls}
    </Box>
  );
};

export default FooterWidgets;
