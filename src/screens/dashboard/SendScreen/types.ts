import { ICurrencyType } from "~/types";

export interface ITransferFormType {
  amount: string;
  currency: ICurrencyType | null;
  receiverId: string;
  description: string;
}
