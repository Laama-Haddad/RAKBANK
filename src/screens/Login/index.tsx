import React, {useEffect, useRef, useState} from 'react';
import {LoginProps} from '../../resources/interfaces/screens/login';
import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {getByScreenSize, hdp, wdp} from '../../utils/responsive';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import GenericTextInput from '../../components/GenericTextInput';
import Button from '../../components/Button';
import Background from '../../resources/assets/background.svg';

import {connect} from 'react-redux';
import {login, setAuthStatus} from './action';
import {RootState} from '../../redux/store';
import {ToggleAuth} from '../../utils/authFuncs';
import {isEmptyObject} from '../../utils/funcs';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

const mandatoryFields = ['username', 'password'];
const Login = ({navigation}: LoginProps) => {
  const [form, updateForm] = useState({
    username: '',
    password: '',
  });
  const [info, updateInfo] = useState({
    operatingSystem: '',
    deviceName: '',
    gpsLocation: {},
    publicIPAddress: '',
  });
  const [formComplete, setFormComplete] = useState(false);
  const [showUsernameLabel, setShowUsernameLabel] = useState(false);
  const [showPasswordLabel, setShowPasswordLabel] = useState(false);
  const refInputUserName = useRef(null);
  const refInputPassword = useRef(null);
  const handleChange = (key, value) => {
    updateForm({
      ...form,
      [key]: value,
    });
  };
  const handleChangeInfo = (key, value) => {
    updateInfo({
      ...info,
      [key]: value,
    });
  };
  useEffect(() => {
    let _formComplete = true;
    for (let index = 0; index < mandatoryFields.length; index++) {
      const field = mandatoryFields[index];
      if (!form[field] || form[field].length <= 0) {
        setFormComplete(false);
        _formComplete = false;
        break;
      }
    }
    if (_formComplete) {
      setFormComplete(true);
    }
  }, [form]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            handleChangeInfo('gpsLocation', position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  const getExtraInfo = callBack => {
    handleChangeInfo('operatingSystem', Platform.OS);
    DeviceInfo.getDeviceName().then(deviceName => {
      handleChangeInfo('deviceName', deviceName);
    });
    DeviceInfo.getIpAddress().then(ip => {
      handleChangeInfo('publicIPAddress', ip);
    });
    getLocation();
    callBack();
  };
  const submit = async () => {
    const res = await login(form);
    if (isEmptyObject(res)) {
      console.log('Username Or Password is Wrong');
    } else {
      ToggleAuth({logged: true}).then();
      getExtraInfo(() => console.log(form, info));
    }
  };
  return (
    <View style={styles.container}>
      <Background
        style={{position: 'absolute', top: 0, left: 0}}
        width={wdp(100)}
        height={hdp(65)}
      />
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon
            name={'arrow-back-ios'}
            size={getByScreenSize(20, 30)}
            color={'#FFFFFF'}
          />
        </TouchableOpacity>
        <Button
          type={'outline'}
          buttonColor={'#FFFFFF'}
          title={'Register'}
          titleColor={'#FFFFFF'}
          buttonStyle={{width: wdp(23)}}
          onPress={() => console.log('Register')}
        />
      </View>
      <View style={styles.bottomContainer}>
        <GenericTextInput
          autoFocus={true}
          autoComplete={'username'}
          value={form.username}
          onChangeText={text => handleChange('username', text)}
          placeholder={showUsernameLabel ? ' ' : 'username'}
          ref={refInputUserName}
          onFocus={() => {
            setShowUsernameLabel(true);
          }}
          onBlur={() => {
            setShowUsernameLabel(false);
          }}
          onEndEditing={value =>
            value === ''
              ? setShowUsernameLabel(false)
              : setShowUsernameLabel(true)
          }
          showLabel={showUsernameLabel}
          label={'username'}
          containerStyle={{width: wdp(90), marginVertical: 10}}
        />
        <GenericTextInput
          autoComplete={'password'}
          value={form.password}
          onChangeText={text => handleChange('password', text)}
          placeholder={showPasswordLabel ? ' ' : 'password'}
          ref={refInputPassword}
          secureTextEntry={form.password.length !== 0}
          noEye={false}
          onFocus={() => {
            setShowPasswordLabel(true);
          }}
          onBlur={() => {
            setShowPasswordLabel(false);
          }}
          onEndEditing={value =>
            value === ''
              ? setShowPasswordLabel(false)
              : setShowPasswordLabel(true)
          }
          showLabel={showPasswordLabel}
          label={'password'}
          containerStyle={{width: wdp(90), marginVertical: 10}}
        />
        <Button
          disabled={!formComplete}
          type={'solid'}
          buttonColor={formComplete ? '#222222' : '#8F8C90'}
          title={'Submit'}
          titleColor={'#FFFFFF'}
          onPress={() => formComplete && submit()}
          buttonStyle={{width: wdp(85), marginTop: '5%'}}
        />

        <View style={styles.forgotRowContainer}>
          <TouchableOpacity onPress={() => console.log('Forgor User ID')}>
            <Text style={styles.forgotText}>Forgot User ID</Text>
          </TouchableOpacity>
          <Text style={styles.forgotText}> | </Text>
          <TouchableOpacity onPress={() => console.log('Forgor Password')}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log('Enable User ID')}>
          <Text style={styles.forgotText}>Enable User ID</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {setAuthStatus})(Login);
