import { gql, useQuery } from "@apollo/client";
import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";
import { moneyFormatter } from "../../../../config/util";
import WalletPaymentModal from "../../../../modal/wallet-payment";

import { cartState } from "../../../../state/cart";

type WalletPaymentProps = {
  callback: (data: any) => void;
};

const WalletPayment: React.FC<WalletPaymentProps> = ({ callback }) => {
  const [showModal, toggleModal] = useState(false);
  const [cart] = cartState.use();
  const { data, loading } = useQuery(
    gql`
      query {
        getMyWalletData {
          Available
          Open
        }
      }
    `,
    {
      onCompleted: (data) => {
        console.log("here", data);
      },
    }
  );

  if (loading) {
    return <></>;
  }

  if (data.getMyWalletData.Available === 0) {
    return <></>;
  }

  const walletPayment =
    typeof cart.walletPayment === "string"
      ? parseFloat(cart.walletPayment)
      : cart.walletPayment;

  return (
    <>
      <Button
        sx={{ flex: 1 }}
        variant="contained"
        onClick={() => {
          toggleModal(true);
        }}
      >
        {walletPayment > 0 && (
          <>Paying ({`${moneyFormatter(walletPayment)}`}) (change)</>
        )}
        {walletPayment === 0 && (
          <>
            Pay with Wallet (
            {`${moneyFormatter(data.getMyWalletData.Available)}`})
          </>
        )}
      </Button>

      <WalletPaymentModal
        balance={data.getMyWalletData}
        showing={showModal}
        toggle={toggleModal}
        callback={(data) => {
          callback(data);
          toggleModal(false);
        }}
      />
    </>
  );
};

export default WalletPayment;
