import { StoreData } from "../../components/store/types";

export type userData = {
  FirstName?: string;
  LastName?: string;
  Phone?: string;
  blocked: false;
  email: string;
  username?: string;
  Address?: [
    {
      Street_Address_1: string;
      Street_Address_2: string;
      Suburb: string;
      City: string;
      Country: string;
      Zip_Code: string;
    }
  ];
  Wallet_Roundup?: {
    Available?: number;
    Open?: number;
  };
  store?: StoreData;
};
