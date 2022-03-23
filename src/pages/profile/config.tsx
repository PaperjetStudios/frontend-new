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
    to: "/profile",
    icon: Icons.menu.user,
  },
  {
    title: "Wishlist",
    to: "/profile/wishlist",
    icon: Icons.heart,
  },
  {
    title: "Order History",
    to: "/profile/orders",
    icon: Icons.shoppingcart,
  },
  {
    title: "Order",
    to: "/profile/orders/order",
    icon: Icons.shoppingcart,
    hidden: true,
  },
  {
    title: "Shop",
    to: "/profile/shop",
    icon: Icons.store,
  },
  {
    title: "Wallet",
    to: "/profile/wallet",
    icon: Icons.dollar,
  },
];

export const getProfileLinkByTitle = (title: string): ProfileLink => {
  const profileLink = _.filter(ProfileLinks, (profile: ProfileLink) => {
    return profile.title === title;
  });

  return profileLink[0];
};
