/* eslint-disable no-console */
/* eslint-disable no-async-promise-executor */
import EncryptedStorage from 'react-native-encrypted-storage';

export const getLocalData = async key => {
  try {
    const jsonValue = await EncryptedStorage.getItem(key);
    let val = '';
    if (jsonValue) {
      try {
        return JSON.parse(jsonValue);
      } catch (err) {
        return jsonValue;
      }
    }
  } catch (error) {
    return null;
  }
};

export const setLocalData = async (key, value) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

