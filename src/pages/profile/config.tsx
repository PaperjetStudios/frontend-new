import _ from "lodash";
import { Icons } from "../../components/icons";

export const profileSlug = "profile";

export type ProfileLink = {
  title: string;
  to: string;
  icon: React.ReactNode;
  current?: boolean;
  hidden?: boolean;
};

export const ProfileLinks: ProfileLink[] = [
  {
    title: "Account",
    to: "",
    icon: Icons.menu.user,
  },
  {
    title: "Wishlist",
    to: "wishlist",
    icon: Icons.heart,
  },
  {
    title: "Order History",
    to: "orders",
    icon: Icons.shoppingcart,
  },
  {
    title: "Order",
    to: "order",
    icon: Icons.shoppingcart,
    hidden: true,
  },
  {
    title: "Shop",
    to: "shop",
    icon: Icons.store,
  },
  {
    title: "Wallet",
    to: "wallet",
    icon: Icons.dollar,
  },
];

export const getProfileLinkByTitle = (title: string): ProfileLink => {
  const profileLink = _.filter(ProfileLinks, (profile: ProfileLink) => {
    return profile.title === title;
  });

  return profileLink[0];
};
