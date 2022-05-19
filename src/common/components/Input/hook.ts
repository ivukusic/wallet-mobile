import { useEffect, useMemo, useRef, useState } from "react";
import { IAnyType } from "~/types";

export const useHook = ({ error, onFocus }: IAnyType) => {
  const [focused, setFocused] = useState(false);

  const toggleFocused = (state: boolean) => () => {
    setFocused(state);
    if (onFocus && state) {
      onFocus();
    }
  };

  /* ----------------------------------------------------------------------------------------------------------------
    STATE
    - used to match the correct styling for error/focused etc.. states
  ---------------------------------------------------------------------------------------------------------------- */
  const state = useMemo(() => {
    if (error) {
      return "error";
    }
    if (focused) {
      return "focused";
    }
    return "default";
  }, [error, focused]);

  /* ----------------------------------------------------------------------------------------------------------------
    SHOW/HIDE PASSWORD TEXT
    - used to match the correct styling for error/focused etc.. states
  ---------------------------------------------------------------------------------------------------------------- */
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return {
    focused,
    toggleFocused,
    state,
    passwordVisible,
    toggleShowPassword,
  };
};
