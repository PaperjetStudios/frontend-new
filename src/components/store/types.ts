import { EcomImage } from "../../config/types";

type SocialLink = {
  Url: string;
  Type: string;
};

export type StoreData = {
  Title: string;
  Description: string;
  slug: string;
  Rating: number;
  Gallery: EcomImage[];
  Contact_Details?: {
    Address: StoreAddress;
    Email: string;
    Validated: boolean;
    Social: SocialLink[];
  };
};

export type StoreAddress = {
  Street_Address_1: string;
  Street_Address_2: string;
  Suburb: string;
  City: string;
  Country: string;
  Zip_Code: string;
};
