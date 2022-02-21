import { newRidgeState } from "react-ridge-state";
import { CartItem } from "../components/cart/types";

interface Cart {
  loading: boolean;
  showing: boolean;
  id?: number;
  attributes?: {
    CartItem: CartItem[];
  };
}

export const cartState = newRidgeState<Cart>({
  loading: false,
  showing: false,
  id: undefined,
  attributes: undefined,
});
