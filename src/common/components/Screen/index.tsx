import React, { forwardRef, ReactNode, useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { navigationRef } from '~/navigation/root/utils';
import { Colors } from '~/themes';
import { IAnyType } from '~/types';

import { BackButton } from '../Button';
import { KeyboardAwareScroll, Scroll, ViewContainer } from './styles';
import { BackButtonProps, Props } from './types';

const renderHeaderBack =
  (dark = false) =>
  ({ canGoBack, onPress }: BackButtonProps) =>
    canGoBack && (
      <BackButton
        canGoBack={canGoBack}
        dark={dark}
        onPress={onPress || navigationRef.current?.goBack}
      />
    );

export const Screen: IAnyType = forwardRef<IAnyType, Props>(
  (
    {
      children,
      enableOnAndroid = true,
      enableResetScrollToCoords = false,
      extraScrollHeight = 100,
      keyboardShouldPersistTaps = 'handled',
      header = { headerMode: 'default' },
      mode = 'view',
      ...rest
    },
    ref,
  ) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    useLayoutEffect(() => {
      if (header.headerMode === 'white') {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomColor: 'transparent',
          },
          headerTitle: '',
          headerLeft: renderHeaderBack(true),
        });
      } else if (header.headerMode === 'modal') {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomColor: 'transparent',
          },
          headerTitleStyle: { color: Colors.header },
          headerTitle: header.headerTitle || '',
          headerLeft: renderHeaderBack(true),
        });
      } else {
        navigation.setOptions({
          headerTitle: header.headerTitle || '',
          headerLeft: renderHeaderBack(false),
          headerRight: header.headerRightButton ? () => header.headerRightButton : undefined,
        });
      }
    }, [header, navigation]);

    const renderContent = (): ReactNode => {
      if (mode === 'scroll') {
        return (
          <Scroll
            ref={ref}
            paddingBottom={rest.paddingBottom || insets.bottom}
            backgroundColor="white"
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            {...rest}
          >
            {children}
          </Scroll>
        );
      }
      if (mode === 'keyboard-aware') {
        return (
          <KeyboardAwareScroll
            ref={ref}
            keyboardOpeningTime={0}
            enableOnAndroid={enableOnAndroid}
            enableResetScrollToCoords={enableResetScrollToCoords}
            extraScrollHeight={extraScrollHeight}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            paddingBottom={rest.paddingBottom || insets.bottom}
            backgroundColor="white"
            {...rest}
          >
            {children}
          </KeyboardAwareScroll>
        );
      }
      return (
        <ViewContainer
          ref={ref as IAnyType}
          pb={insets.bottom + 15}
          backgroundColor="white"
          {...rest}
        >
          {children}
        </ViewContainer>
      );
    };

    const statusBarColor = Colors.header;
    const statusBarStyle = 'light-content';
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
  },
);
