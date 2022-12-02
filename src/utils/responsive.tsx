import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const hdp = (percent: number) => hp(percent);
export const wdp = (percent: number) => wp(percent);

/**
 * This function return the value depending on the screen size
 */
export const getByScreenSize = (smValue: number, lgValue: number) =>
  wp(100) < 500 ? smValue : lgValue;
