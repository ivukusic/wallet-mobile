import { useState } from "react";

import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";

import { MUTATION_AUTH_SIGNUP } from "../../../apollo/mutation";
import client from "../../../apollo/client";

import { ILoginFormType } from "./types";
import { IAnyType, SCREENS } from "~/types";
import { goTo, reset } from "~/navigation/root/utils";

const initialValues: ILoginFormType = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const useHook = () => {
  const [error, setError] = useState("");

  const [signup, { loading }] = useMutation(MUTATION_AUTH_SIGNUP);

  /*********************************************************************************************************************
   * METHODS
   ********************************************************************************************************************/
  const handleRegistration = async ({
    email,
    firstName,
    lastName,
    phone,
  }: ILoginFormType) => {
    try {
      const res = await signup({
        variables: {
          data: {
            email,
            firstName,
            lastName,
            phone,
          },
        },
      }).then((response) => response.data.authSignup);

      await client.setToken(res.accessToken);
      await client.updateLocalStateCurrentUser(res.user);

      if (res.user.accounts?.length) {
        reset(SCREENS.Dashboard);
      } else {
        goTo(SCREENS.Currency);
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
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Wrong email format").required("Required field"),
    firstName: Yup.string().required("Required field"),
    lastName: Yup.string().required("Required field"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: handleRegistration,
  });

  const fieldProps = (field: keyof ILoginFormType): IAnyType => {
    const data: IAnyType = formik.getFieldProps(field);
    const { error: fieldError, touched } = formik.getFieldMeta(field);

    const onChange = (v: IAnyType): void => {
      let value = v;
      if (["email", "phone"].includes(field)) {
        value = v.trim();
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

  return { error, fieldProps, formik, loading };
};

export default useHook;
