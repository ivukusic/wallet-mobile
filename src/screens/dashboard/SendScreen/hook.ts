import { useEffect, useMemo, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";

import { QUERY_USER_LIST } from "~/apollo/query";
import { MUTATION_TRANSACTION_CREATE } from "~/apollo/mutation";
import { OptionItem } from "~/components/Radio/types";
import useCurrentUser from "~/hooks/useCurrentUser";
import { IAnyType, ICurrencyType, IUserType, SCREENS } from "~/types";
import { useExchangeRate } from "~/hooks/useExchangeRate";
import { goTo } from "~/navigation/root/utils";

import { ITransferFormType } from "./types";
import { amountToFix } from "~/utils/string";

const useHook = () => {
  const { currentUser } = useCurrentUser();
  const { calculateAmount, calculateExchangeRate } = useExchangeRate();

  const [error, setError] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<IUserType | undefined>();

  const currentUserCurrency = useMemo(
    () => currentUser.accounts[0].currency,
    [currentUser]
  );

  const selectedUserCurrency = useMemo(
    () =>
      selectedUser &&
      selectedUser.accounts.length &&
      selectedUser.accounts[0].currency
        ? selectedUser.accounts[0].currency
        : ICurrencyType.EUR,
    [selectedUser]
  );

  const { data } = useQuery(QUERY_USER_LIST);
  const [transactionCreate, { loading }] = useMutation(
    MUTATION_TRANSACTION_CREATE
  );

  /*********************************************************************************************************************
   * METHODS
   ********************************************************************************************************************/
  const handleTransfer = async ({
    amount,
    currency,
    receiverId,
    description,
  }: ITransferFormType) => {
    const exchangeRate = calculateExchangeRate(
      currentUserCurrency,
      selectedUserCurrency
    );
    const dataToSend = {
      amount: parseFloat(amount),
      currency,
      receiverId,
      description,
      exchangeRate,
    };

    try {
      const res = await transactionCreate({
        variables: { data: dataToSend },
      }).then((response) => response.data.transactionCreate);

      if (res) {
        goTo(SCREENS.Dashboard, { reset: true });
      }
    } catch (e) {
      setError("Something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  /*********************************************************************************************************************
   * DATA
   ********************************************************************************************************************/

  const initialValues: ITransferFormType = {
    amount: "",
    currency: currentUserCurrency,
    receiverId: "",
    description: "",
  };

  const transferSchema = Yup.object().shape({
    amount: Yup.string().required("Required field"),
    currency: Yup.string().required("Required field"),
    receiverId: Yup.string().required("Required field"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: transferSchema,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: handleTransfer,
  });

  const fieldProps = (field: keyof ITransferFormType): IAnyType => {
    const data: IAnyType = formik.getFieldProps(field);
    const { error: fieldError, touched } = formik.getFieldMeta(field);
    const onChange = (v: IAnyType): void => {
      let value = v;
      if (field === "receiverId") {
        const user = userList.find((item: IUserType) => item.id === value);
        setSelectedUser(user);
      }
      formik.handleChange(field)({ target: { value } } as IAnyType);
      if (fieldError) {
        formik.validateField(field);
      }
    };
    data.onChange = onChange;
    data.onChangeText = onChange;

    return { ...data, error: fieldError, touched };
  };

  const userList = useMemo(
    () =>
      (data?.userList || []).filter(
        (item: IUserType) => item.id !== currentUser.id
      ),
    [data]
  );

  const userData = useMemo(
    () =>
      userList.map((item: IUserType) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item.id,
      })),
    [userList]
  );

  const currencyData = useMemo((): OptionItem[] => {
    const currentUserData = {
      label: currentUserCurrency,
      value: currentUserCurrency,
    };
    if (selectedUserCurrency && currentUserCurrency !== selectedUserCurrency) {
      return [
        currentUserData,
        { label: selectedUserCurrency, value: selectedUserCurrency },
      ];
    }
    return [currentUserData];
  }, [currentUser, selectedUser]);

  const receiveAmount = useMemo(() => {
    if (
      !formik.values.receiverId ||
      !formik.values.amount ||
      !formik.values.currency
    ) {
      return "";
    }
    if (selectedUserCurrency === formik.values.currency) {
      return `${formik.values.amount || 0} ${formik.values.currency}`;
    }
    const amount = calculateAmount(
      formik.values.amount || "0",
      formik.values.currency,
      selectedUserCurrency
    );
    return `${amountToFix(amount)} ${selectedUserCurrency}`;
  }, [currentUserCurrency, formik]);

  useEffect(() => {
    if (userList.length && !selectedUser) {
      formik.setFieldValue("receiverId", userList[0].id);
      setSelectedUser(userList[0]);
    }
  }, [selectedUser, userList]);

  return {
    currencyData,
    error,
    fieldProps,
    formik,
    loading,
    receiveAmount,
    selectedUser,
    userData,
  };
};

export default useHook;
