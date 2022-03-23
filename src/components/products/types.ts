import { Review } from "../reviews/types";

export type Product = {
  id: string | number;
  attributes: {
    Title: string;
    Description: string;
    Condition: string;
    Rating: string;
    slug: string;
    Variation: {
      Quantity: string;
      SKU: string;
      Price: string;
    }[];
    Store: {
      data: {
        id: string;
        attributes: {
          Title: string;
          slug: string;
        };
      };
    };
    Featured_Image: any;
    Gallery: any;
    Tags: any;
    Categories: any;
    Reviews: {
      data: {
        attributes: Review[];
      };
    };
  };
};

export type ProductData_SubmitType = {
  Title: string;
  Description: string;
  Condition: string;
  Variation: {
    Quantity: string;
    SKU: string;
    Price: string;
  }[];
  Store: number | string;
  Featured_Image: any[];
  Gallery: any[];
  Tags: string[];
};
