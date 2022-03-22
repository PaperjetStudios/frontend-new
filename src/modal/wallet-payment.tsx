import { gql, useQuery } from "@apollo/client";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import Quantity from "../components/products/quantity";

import { cartState } from "../state/cart";

import BaseModal from "./base-modal";

import { ModalProps } from "./types";
import { forwardRef, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  min: number;
  max: number;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={Number}
        scale={2}
        radix="."
        definitions={{
          "#": /[1-9]/,
        }}
        /* @ts-ignore */
        inputRef={ref.current}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

type WalletPaymentModalProps = {
  callback: (data: any) => void;
  balance: {
    Open: number;
    Available: number;
  };
};

const WalletPaymentModal: React.FC<ModalProps & WalletPaymentModalProps> = ({
  showing,
  toggle,
  callback,
  balance,
}) => {
  const [cart] = cartState.use();
  const [paymentAmount, setPaymentAmount] = useState<string>();
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    // get the payment amount in a string for the input
    const parsed =
      typeof cart.walletPayment === "string"
        ? cart.walletPayment
        : cart.walletPayment.toString();
    setPaymentAmount(parsed);
  }, [cart]);

  useEffect(() => {
    // compare the order total with how much is in the wallet
    const avail = balance.Available;
    const total = cart.totals.total;

    if (avail > total) {
      setMax(total);
    } else {
      setMax(avail);
    }
  }, [cart, balance]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(event.target.value);
  };

  return (
    <BaseModal showing={showing} toggle={toggle} trigger={"pay_with_wallet"}>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <Input
          type="number"
          autoFocus
          value={paymentAmount}
          onChange={handleChange}
          name="amount"
          id="amount"
          inputProps={{ min: 0, max: max }}
          inputComponent={TextMaskCustom as any}
        />
      </FormControl>

      <Box sx={{ display: "flex", flex: 1, gap: "20px", mt: 3 }}>
        <Box>
          <Button
            onClick={() => {
              callback(paymentAmount);
            }}
            variant="contained"
          >
            Pay with Wallet
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => {
              toggle(false);
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

/*
      <Box>{cart.walletPayment}</Box>
      <Box>{cart.totals.total}</Box>

      <Box>{balance.Available}</Box>
*/

export default WalletPaymentModal;
