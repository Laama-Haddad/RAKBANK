import {StyleSheet} from 'react-native';
import {hdp} from '../../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  topContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '10%',
    backgroundColor: '#f6fce7',
    marginBottom: '5%',
    height: hdp(30)
  },
  title: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
  },
  infoTextLabel: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  infoValueText: {
    fontSize: 18,
    color: '#555555',
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: '5%',
  },
  logoutText: {
    fontSize: 20,
    color: '#000000',
  },
  gpsLocationContainer: {
    paddingHorizontal: '5%',
    paddingTop: '3%',
  },
  gpsLocationRowContainer: {
    paddingVertical: '2%',
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default styles;
