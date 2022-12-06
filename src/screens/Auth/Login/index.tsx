import React, {useEffect, useRef, useState} from 'react';
import {LoginProps} from '../../../resources/interfaces/screens/login';
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {getByScreenSize, hdp, wdp} from '../../../utils/responsive';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import GenericTextInput from '../../../components/GenericTextInput';
import Button from '../../../components/Button';
import Background from '../../../resources/assets/background.svg';

import {connect} from 'react-redux';
import {login, setAuthStatus} from './action';
import {RootState} from '../../../redux/store';
import {isEmptyObject} from '../../../utils/funcs';
import DeviceInfo, {useDeviceName} from 'react-native-device-info';
import {GeoPosition} from 'react-native-geolocation-service';
import {
  getUserLocation,
  grantLocationPermissions,
} from '../../../utils/permissions';
import {ToggleAuth} from '../../../utils/authFuncs';

const mandatoryFields = ['username', 'password'];
const Login = ({navigation}: LoginProps) => {
  const [form, updateForm] = useState({
    username: '',
    password: '',
  });
  let deviceName = useDeviceName();
  const deviceJSON = {
    operatingSystem: Platform.OS,
    deviceName: deviceName.result,
    gpsLocation: {
      latitude: 0,
      latitudeDelta: 0,
      longitude: 0,
      longitudeDelta: 0,
    },
    publicIPAddress: '',
    macAddress: '',
  };

  const [formComplete, setFormComplete] = useState(false);
  const [showUsernameLabel, setShowUsernameLabel] = useState(false);
  const [showPasswordLabel, setShowPasswordLabel] = useState(false);
  const [loading, setLoading] = useState(false);
  const refInputUserName = useRef(null);
  const refInputPassword = useRef(null);
  const handleChange = (key, value) => {
    updateForm({
      ...form,
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

  const submit = async () => {
    setLoading(true);
    const res = await login(form);
    await grantLocationPermissions();
    const location = (await getUserLocation()) as GeoPosition;
    deviceJSON.gpsLocation = {
      latitude: location.coords.latitude,
      latitudeDelta: 2,
      longitude: location.coords.longitude,
      longitudeDelta: 2,
    };
    if (isEmptyObject(res)) {
      console.log('Username Or Password is Wrong');
    } else {
      setLoading(false);
      deviceJSON.publicIPAddress = DeviceInfo.getIpAddressSync();
      deviceJSON.macAddress = await DeviceInfo.getMacAddress();
      let tempUserInfo = {
        ...form,
        ...deviceJSON,
      };
      ToggleAuth({logged: true, userInfo: tempUserInfo}).then();
    }
  };
  return (
    <View style={styles.container}>
      <Background
        style={{position: 'absolute', top: 0, left: 0}}
        width={wdp(100)}
        height={hdp(62)}
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
        {loading && <ActivityIndicator color={'#000000'} size={'large'} />}
        <Button
          disabled={!formComplete}
          type={'solid'}
          buttonColor={formComplete ? '#222222' : '#8F8C90'}
          title={'Submit'}
          titleColor={'#FFFFFF'}
          onPress={() => formComplete && submit()}
          buttonStyle={{width: wdp(85), marginTop: '4%'}}
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
