import BaseProfilePage from "../layout/base-profile-page";
import Box from "../../components/box";

import { userState } from "../../state/user";

import WalletTableList from "../../components/walletlogs/table-list";
import useUser from "../../forms/user/useUser";

type Props = {};

const Wallet: React.FC<Props> = ({ children }) => {
  const { loadingUser, userData, id } = useUser();

  const available = userData?.Wallet_Roundup?.Available
    ? userData.Wallet_Roundup.Available
    : 0;

  return (
    <BaseProfilePage
      title="Wallet"
      actions={
        available > 0
          ? [
              {
                title: "Request Payout",
                action: () => {
                  alert("payout request for " + available);
                },
              },
            ]
          : []
      }
    >
      <WalletTableList userId={id} />
    </BaseProfilePage>
  );
};

export default Wallet;
