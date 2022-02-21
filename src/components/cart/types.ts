import { gql } from "@apollo/client";
import { BASE_PRODUCT } from "../products/queries";
import { Product } from "../products/types";

export type CartItem = {
  Product: {
    data: Product;
  };
  Quantity: number;
  Extra: string | null;
};

export const CART_BASE = gql`
  ${BASE_PRODUCT}
  fragment CART_BASE on CartEntity {
    id
    attributes {
      CartItem {
        Product {
          data {
            id
            attributes {
              ...BASE_PRODUCT
            }
          }
        }
        Quantity
        Extra
      }
    }
  }
`;
