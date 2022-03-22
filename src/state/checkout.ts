import { newRidgeState } from "react-ridge-state";

interface Checkout {
  unlockedSteps: number;
}

const initialCheckoutState = {
  unlockedSteps: 0,
} as Checkout;

export const checkoutState = newRidgeState<Checkout>(initialCheckoutState);

export function resetCheckout() {
  checkoutState.set(initialCheckoutState);
}

// run function as application starts
resetCheckout();
