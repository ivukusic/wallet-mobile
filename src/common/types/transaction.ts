import { ICurrencyType } from './account';
import { IUserType } from './user';

export interface ITransactionType {
  id: string;
  amount: number;
  amountOriginal: number;
  currency: ICurrencyType;
  currencyOriginal: ICurrencyType;
  description: string;
  exchangeRate: number;
  receiver: IUserType;
  sender: IUserType;
  createdAt: string;
  updatedAt: string;
}
