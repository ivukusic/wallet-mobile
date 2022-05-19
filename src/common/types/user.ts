import { IAccountType } from "./account";

export enum IGenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface IUserType {
  id: string;
  email: string;
  firstName?: string;
  lastName: string;
  gender: IGenderType;
  mobileNumber: string;
  phone: string | null;
  accounts: IAccountType[];
}
