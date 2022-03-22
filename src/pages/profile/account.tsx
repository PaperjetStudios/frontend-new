import BaseProfilePage from "../layout/base-profile-page";
import Box from "../../components/box";
import { Icons } from "../../components/icons";

import AddressForm from "../../forms/user/address";
import { resetUser } from "../../state/user";
import { resetCart } from "../../state/cart";
import { resetCheckout } from "../../state/checkout";
import { useNavigate } from "react-router-dom";
import AreYouSureModal from "../../modal/are-you-sure-modal";
import { useState } from "react";
import ProfileForm from "../../forms/user/profile/profile";

type Props = {};

const Account: React.FC<Props> = ({ children }) => {
  let navigate = useNavigate();
  const [logOutOpen, logOutToggle] = useState(false);

  return (
    <>
      <BaseProfilePage
        title="Account"
        actions={[
          {
            title: "Log Out",
            action: () => {
              logOutToggle(true);
            },
          },
        ]}
        sections={[
          {
            title: "Information",
            content: (
              <Box>
                <ProfileForm />
              </Box>
            ),
            icon: Icons.info,
          },
          {
            title: "Address",
            content: <AddressForm />,
            icon: Icons.home,
          },
        ]}
      ></BaseProfilePage>
      <AreYouSureModal
        yes={() => {
          resetUser();
          resetCart();
          resetCheckout();
          navigate("/");
        }}
        toggle={(tog) => {
          logOutToggle(tog);
        }}
        showing={logOutOpen}
      />
    </>
  );
};

export default Account;
