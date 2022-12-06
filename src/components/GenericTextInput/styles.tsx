import {StyleSheet} from 'react-native';
import {getByScreenSize} from '../../utils/responsive';

const styles = StyleSheet.create({
  container: {
    borderRadius: getByScreenSize(10, 20),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: getByScreenSize(80, 130),
    paddingVertical: '5%',
    paddingHorizontal: '3%',
  },
  label: {
    fontSize: getByScreenSize(18, 30),
    color: '#222222',
  },
  textInput: {
    fontSize: getByScreenSize(18, 30),
    height: getByScreenSize(40, 55),
    paddingTop: '2%',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderColor: '#fc9949',
  },
  icon: {
    position: 'absolute',
    right: getByScreenSize(15, 25),
    top: getByScreenSize(30, 55),
  },
});

export default styles;
