import { RouteProp } from "@react-navigation/native";
import {
  IAnyType,
  RootStackParamList,
  RouterNavigationProp,
  SCREENS,
} from "~/types";

type ScreenRouteProp = RouteProp<RootStackParamList, SCREENS.Login>;

export interface ScreenProps {
  navigation: RouterNavigationProp;
  route: ScreenRouteProp;
}

export interface ILoginFormType {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
}

export interface IUseHookReturnType {
  error: string;
  fieldProps: IAnyType;
  formik: IAnyType;
  loading: boolean;
}
