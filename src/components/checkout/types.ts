import { StepSetup } from "../wizard/types";

export type StepElementProps = {
  setup: StepSetup;
};

export type OrderGroup = {
  Commission: number;
  Payment?: null;
  Total: number;
  Total_After_Commission: number;
  Total_Delivery: number;
  Total_Items: number;
  Unique: string;
};
