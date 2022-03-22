import produce from "immer";
import { omit } from "lodash";
import { Address, FormType } from "./types";

export const editAddresses = (userData, data, id, remove = false): FormType => {
  if (typeof id === "string") {
    id = parseInt(id);
  }
  const transformedState = omit(
    produce(userData, (draft) => {
      const sanitizedAddresses = draft.Address.map((address) => {
        return omit(address, ["__typename"]);
      });

      draft.Address = sanitizedAddresses as Address[];
      if (id === -1) {
        //ADDING
        draft.Address.push(data);
      } else {
        if (!remove) {
          //UPDATING
          draft.Address[id] = omit(data, ["__typename"]);
        } else {
          //REMOVING
          draft.Address.splice(id, 1);
        }
      }
    }),
    ["__typename"]
  ) as FormType;

  return transformedState as FormType;
};
