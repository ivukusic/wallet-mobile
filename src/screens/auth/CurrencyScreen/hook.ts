import { useState } from "react";

import { useMutation } from "@apollo/client";

import client from "~/apollo/client";
import { MUTATION_ACCOUNT_CREATE } from "~/apollo/mutation/account";
import useCurrentUser from "~/hooks/useCurrentUser";
import { reset } from "~/navigation/root/utils";

import { SCREENS } from "~/types";

const pickerData = [
  { label: "EUR", value: "EUR" },
  { label: "USD", value: "USD" },
  { label: "YEN", value: "YEN" },
];

const useHook = () => {
  const [currency, setCurrency] = useState(pickerData[1].value);
  const [error, setError] = useState("");

  const { currentUser } = useCurrentUser();
  const [accountCreate, { loading }] = useMutation(MUTATION_ACCOUNT_CREATE);

  const handleSave = async () => {
    try {
      const res = await accountCreate({
        variables: {
          data: { currency },
        },
      }).then((response) => response.data.accountCreate);

      client.updateLocalStateCurrentUser({
        ...currentUser,
        accounts: [...(currentUser.accounts || []), res],
      });
      reset(SCREENS.Dashboard);
    } catch (e) {
      setError("Something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleChange = (value: string) => {
    setCurrency(value);
  };

  return { currency, error, handleChange, handleSave, loading, pickerData };
};

export default useHook;
