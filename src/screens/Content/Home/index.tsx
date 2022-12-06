import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {HomeProps} from '../../../resources/interfaces/screens/home';
import {useSelector} from 'react-redux';
import UserIcon from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}: HomeProps) => {
  const {logged, userInfo} = useSelector(state => state.auth);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <UserIcon name={'user-circle-o'} size={120} color={'#C3014B'} />
        <Text style={styles.title}>{userInfo.username}</Text>
      </View>
      {logged && (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTextLabel}>User ID:</Text>
            <Text style={styles.infoValueText}>{userInfo.username}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTextLabel}>Password:</Text>
            <Text style={styles.infoValueText}>{userInfo.password}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTextLabel}>Operating System:</Text>
            <Text style={styles.infoValueText}>{userInfo.operatingSystem}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTextLabel}>Device Name:</Text>
            <Text style={styles.infoValueText}>{userInfo.deviceName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTextLabel}>Mac Address:</Text>
            <Text style={styles.infoValueText}>{userInfo.macAddress}</Text>
          </View>
          <View style={styles.gpsLocationContainer}>
            <Text style={styles.infoTextLabel}>GPS Location:</Text>
            <View style={styles.gpsLocationRowContainer}>
              <Text style={styles.infoValueText}>latitude:</Text>
              <Text style={styles.infoValueText}>
                {JSON.stringify(userInfo.gpsLocation.latitude)}
              </Text>
            </View>
            <View style={styles.gpsLocationRowContainer}>
              <Text style={styles.infoValueText}>longitude:</Text>
              <Text style={styles.infoValueText}>
                {userInfo.gpsLocation.longitude}
              </Text>
            </View>
            <View style={styles.gpsLocationRowContainer}>
              <Text style={styles.infoValueText}>Latitude Delta:</Text>
              <Text style={styles.infoValueText}>
                {userInfo.gpsLocation.latitudeDelta}
              </Text>
            </View>
            <View style={styles.gpsLocationRowContainer}>
              <Text style={styles.infoValueText}>Longitude Delta:</Text>
              <Text style={styles.infoValueText}>
                {userInfo.gpsLocation.longitudeDelta}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Home;
