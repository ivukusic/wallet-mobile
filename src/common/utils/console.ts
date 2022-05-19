/* eslint-disable @typescript-eslint/no-explicit-any */

export const log = (...args: any): void => {
  if (__DEV__) {
    console.log(...args);
  }
};

export const debug = (...args: any): void => {
  if (__DEV__) {
    console.debug(...args);
  }
};

export const warn = (...args: any): void => {
  if (__DEV__) {
    console.warn(...args);
  }
};

export const error = (...args: any): void => {
  if (__DEV__) {
    console.error(...args);
  }
};
