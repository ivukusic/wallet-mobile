import React from "react";

import { Entypo } from "@expo/vector-icons";

import { useHook } from "./hook";
import {
  Element,
  ErrorMessage,
  Field,
  Label,
  ElementWrapper,
  ToggleShowPassword,
} from "./styles";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  placeholder,
  error = "",
  onChangeText,
  onFocus,
  required,
  textarea = false,
}) => {
  const { toggleFocused, state, passwordVisible, toggleShowPassword } = useHook(
    { error, onFocus }
  );

  /* ----------------------------------------------------------------------------------------------------------------
    RENDER
  ---------------------------------------------------------------------------------------------------------------- */
  return (
    <Field>
      <Label state={state}>{`${label}${required ? "*" : ""}`}</Label>
      <ElementWrapper state={state}>
        {/* Input element */}

        <Element
          value={value}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          secureTextEntry={type === "password" && !passwordVisible}
          autoCapitalize="none"
          onChangeText={onChangeText}
          onFocus={toggleFocused(true)}
          onBlur={toggleFocused(false)}
          state={state}
          error={error}
          textarea={textarea}
          multiline={textarea}
          textAlignVertical={textarea ? "top" : "center"}
        />

        {/* Show password icon */}
        {type === "password" && (
          <ToggleShowPassword onPress={toggleShowPassword}>
            {passwordVisible ? (
              <Entypo name="eye-with-line" size={23} color="#838383" />
            ) : (
              <Entypo name="eye" size={23} color="#838383" />
            )}
          </ToggleShowPassword>
        )}
      </ElementWrapper>
      <ErrorMessage>{error}</ErrorMessage>
    </Field>
  );
};
