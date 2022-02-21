const randFormatter = new Intl.NumberFormat("en-za", {
  style: "currency",
  currency: "ZAR",
});

export const moneyFormatter = (cost: number | string) => {
  let value: number;
  if (typeof cost === "string") {
    value = parseFloat(cost);
  } else {
    value = cost;
  }

  return randFormatter.format(value);
};

export const makeDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};

export const makeTime = (dateString: string): string => {
  const date = new Date(dateString);
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
};

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const readableWalletLogStatus = (status: string): string => {
  switch (status) {
    case "Payment_From_Buyer_Open":
      return "Payment from buyer (open)";
      break;
    case "Payment_From_Buyer_Closed":
      return "Payment from buyer (closed)";
      break;
    case "Payment_With_Wallet":
      return "Payment with wallet";
      break;
    case "Payout":
      return "Payout";
      break;
  }
};
