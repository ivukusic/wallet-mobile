import React, { forwardRef, ReactNode, useLayoutEffect } from "react";
import { StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { KeyboardAwareScroll, Scroll, ViewContainer } from "./styles";
import { Props } from "./types";
import { IAnyType } from "~/types";
import { Colors } from "~/themes";
import { BackButton } from "../Button";

export const Screen: IAnyType = forwardRef<IAnyType, Props>(
  (
    {
      children,
      enableOnAndroid = true,
      enableResetScrollToCoords = false,
      extraScrollHeight = 100,
      keyboardShouldPersistTaps = "handled",
      header = { headerMode: "default" },
      mode = "view",
      ...rest
    },
    ref
  ) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    useLayoutEffect(() => {
      if (header.headerMode === "white") {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomColor: "transparent",
          },
          headerTitle: "",
          headerLeft: ({ canGoBack, onPress }: IAnyType) =>
            canGoBack && (
              <BackButton
                canGoBack={canGoBack}
                dark
                onPress={onPress || navigation.goBack}
              />
            ),
        });
      } else if (header.headerMode === "modal") {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomColor: "transparent",
          },
          headerTitleStyle: { color: Colors.header },
          headerTitle: header.headerTitle || "",
          headerRight: ({ canGoBack, onPress }: IAnyType) =>
            canGoBack && (
              <BackButton
                canGoBack={canGoBack}
                close
                dark
                onPress={onPress || navigation.goBack}
              />
            ),
        });
      } else {
        navigation.setOptions({
          headerLeft: ({ canGoBack, onPress }: IAnyType) =>
            canGoBack && (
              <BackButton
                canGoBack={canGoBack}
                onPress={onPress || navigation.goBack}
              />
            ),
          headerRight: header.headerRightButton
            ? () => header.headerRightButton
            : undefined,
        });
      }
    }, [header, navigation]);

    const renderContent = (): ReactNode => {
      if (mode === "scroll") {
        return (
          <Scroll
            {...rest}
            ref={ref}
            paddingBottom={rest.paddingBottom || insets.bottom}
          >
            {children}
          </Scroll>
        );
      }
      if (mode === "keyboard-aware") {
        return (
          <KeyboardAwareScroll
            {...rest}
            ref={ref}
            keyboardOpeningTime={0}
            enableOnAndroid={enableOnAndroid}
            enableResetScrollToCoords={enableResetScrollToCoords}
            extraScrollHeight={extraScrollHeight}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            paddingBottom={rest.paddingBottom || insets.bottom}
          >
            {children}
          </KeyboardAwareScroll>
        );
      }
      return (
        <ViewContainer ref={ref as IAnyType} pb={insets.bottom + 15} {...rest}>
          {children}
        </ViewContainer>
      );
    };

    const statusBarColor = Colors.header;
    const statusBarStyle = "light-content";
    return (
      <>
        <StatusBar
          animated
          translucent
          backgroundColor={statusBarColor}
          barStyle={statusBarStyle}
        />
        {renderContent()}
      </>
    );
  }
);
