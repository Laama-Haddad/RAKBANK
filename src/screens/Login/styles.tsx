import {StyleSheet} from 'react-native';
import {getByScreenSize} from '../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F4EF',
    padding: '5%',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
  forgotRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '3%',
  },
  forgotText: {
    fontSize: getByScreenSize(15, 25),
    color: '#9E9A97',
  },
});

export default styles;
