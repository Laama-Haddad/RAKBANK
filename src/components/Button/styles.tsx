import {StyleSheet} from 'react-native';
import {getByScreenSize} from '../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getByScreenSize(50, 80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: getByScreenSize(16, 30),
  },
});

export default styles;
