import AsyncStorage from '@react-native-async-storage/async-storage';

import { IAnyType } from '~/types';

/* --------------------------------------------------------------------------------
  STORAGE - stores the data inside device storage (AsyncStorage)
--------------------------------------------------------------------------------- */
export const storage = {
  set: {
    item: async (name: string, item: string): Promise<void> => {
      await AsyncStorage.setItem(name, item);
    },
    multi: async (items: IAnyType): Promise<void> => {
      await AsyncStorage.multiSet(items);
    },
  },
  get: {
    item: async (label: string): Promise<IAnyType> => AsyncStorage.getItem(label),
    multi: async (items: string[]): Promise<IAnyType> => await AsyncStorage.multiGet(items),
  },
  delete: {
    item: async (item: string): Promise<void> => {
      await AsyncStorage.removeItem(item);
    },
    multiple: async (items: string[]): Promise<void> => {
      await AsyncStorage.multiRemove(items);
    },
    allKeys: async (): Promise<void> => {
      await AsyncStorage.clear();
    },
  },
};
