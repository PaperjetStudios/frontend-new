export type WalletLogProps = {
  id: string;
  attributes: WalletLogAttributes;
};

export type WalletLogAttributes = {
  createdAt: string;
  Unique: string;
  Total: number | string;
  Transaction:
    | "Payment_From_Buyer_Open"
    | "Payment_From_Buyer_Closed"
    | "Payment_With_Wallet"
    | "Payout";
  Order: {
    data: {
      id: string | number;
    };
  };
};
