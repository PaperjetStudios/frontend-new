import { ApolloError, useQuery } from "@apollo/client";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import classNames from "classnames";
import { options_query } from "../../config/queries";
import Box from "../box";
import Loader from "../loader";

type Props = {
  className?: string;
  style?: {};
};

type SocialLink = {
  Type: string;
  Url: string;
};

const SocialListing: React.FC<Props> = ({ children, className, style }) => {
  const { loading, data } = useQuery(options_query, {
    onError: (error: ApolloError) => {
      console.log(JSON.stringify(error));
    },
  });

  if (loading) {
    return <Loader />;
  }

  const socialData = data.option.data.attributes.SocialLinks;

  const socialLinks = socialData.map((obj: SocialLink) => {
    let name = "";
    let icon = "";

    switch (obj.Type) {
      case "Facebook":
        name = "Facebook";
        icon = "facebook-f";
        break;
      case "Instagram":
        name = "Instagram";
        icon = "instagram";
        break;
      case "Twitter":
        name = "Twitter";
        icon = "twitter";
        break;
    }

    return (
      <a key={`social_link_${name}`} href={obj.Url} title={name}>
        <Button
          sx={{
            backgroundColor: "#000",
            borderRadius: "100%",
            color: "#fff",
            minWidth: 0,
            "&:hover": { backgroundColor: "#555" },
          }}
        >
          <FontAwesomeIcon icon={["fab", icon as IconName]} />
        </Button>
      </a>
    );
  });
  return (
    <Box
      style={style}
      className={classNames(
        className ? className : "",
        "flex flex-row gap-2 mt-4"
      )}
    >
      {socialLinks}
    </Box>
  );
};

export default SocialListing;
