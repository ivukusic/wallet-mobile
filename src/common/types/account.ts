export enum ICurrencyType {
  EUR = 'EUR',
  USD = 'USD',
  YEN = 'YEN',
}

export interface IAccountType {
  id: string;
  balance: number;
  currency: ICurrencyType;
  default: boolean;
}
