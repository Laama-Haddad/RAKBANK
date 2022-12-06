import {StyleSheet} from 'react-native';
import {getByScreenSize, hdp} from '../../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#F9F4EF',
    padding: '5%',
    paddingVertical: '7%',
  },
  topContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
  },
  textContainer: {
    width: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: getByScreenSize(30, 45),
    marginTop: '15%',
    marginBottom: '10%',
  },
  description: {
    color: '#FFFFFF',
    fontSize: getByScreenSize(18, 30),
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: hdp(25),
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '5%',
  },
  balanceText: {
    color: '#000000',
    marginHorizontal: '5%',
    fontSize: getByScreenSize(18, 30),
  },
});

export default styles;
