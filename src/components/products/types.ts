import { Review } from "../reviews/types";
import { DeliveryMethod } from "../store/types";

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
          DeliveryMethods: {
            data: {
              id: number | string;
              attributes: DeliveryMethod;
            }[];
          };
        };
      };
    };
    Featured_Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Gallery: {
      data: {
        attributes: {
          url: string;
        };
      }[];
    };
    Tags: {
      data: {
        id: string;
        attributes: {
          Title: string;
          slug: string;
        };
      }[];
    };
    Reviews: {
      data: {
        attributes: Review[];
      };
    };
  };
};
