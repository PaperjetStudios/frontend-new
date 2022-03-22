import { newRidgeState } from "react-ridge-state";
import { currentApi } from "../config/config";

const authStorageKey = currentApi.userStateName;

interface User {
  id?: number;
  jwt?: string;
  cartId?: string;
}

const emptyUser = {
  id: undefined,
  jwt: undefined,
  cartId: undefined,
};

export const userState = newRidgeState<User>(emptyUser, {
  onSet: (newState) => {
    try {
      localStorage.setItem(authStorageKey, JSON.stringify(newState));
    } catch (e) {}
  },
});

export const resetUser = () => {
  userState.set(emptyUser);
};

// setInitialState fetches data from localStorage
async function setInitialState() {
  try {
    const item = await localStorage.getItem(authStorageKey);
    if (item) {
      const initialState = JSON.parse(item);
      userState.set(initialState);
    }
  } catch (e) {}
}

// run function as application starts
setInitialState();
