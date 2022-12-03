import React from 'react';
import {HomeProps} from '../../resources/interfaces/screens/home';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import {getByScreenSize, hdp, wdp} from '../../utils/responsive';
// @ts-ignore
import Background from '../../resources/assets/background.svg';

const Home = ({navigation}: HomeProps) => {
  return (
    <View style={styles.container}>
      <Background
        style={{position: 'absolute', top: 0, left: 0}}
        width={wdp(100)}
        height={hdp(65)}
      />
      <View style={styles.topContainer}>
        <Button
          type={'outline'}
          buttonColor={'#FFFFFF'}
          title={'Register'}
          titleColor={'#FFFFFF'}
          buttonStyle={{width: wdp(23)}}
          onPress={() => console.log('Register')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>RAKBANK</Text>
        <Text style={styles.description}>
          Everything you love about {'\n'}Digital Banking in a smarter,{'\n'}
          simpler design
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          type={'solid'}
          buttonColor={'#222222'}
          title={'Login with User ID'}
          titleColor={'#FFFFFF'}
          onPress={() => navigation?.navigate('login')}
          buttonStyle={{width: wdp(85)}}
        />
        <TouchableOpacity
          style={styles.balanceContainer}
          onPress={() => console.log('Quick Balance')}>
          <Icon
            name={'fingerprint'}
            color={'#000000'}
            size={getByScreenSize(20, 30)}
          />
          <Text style={styles.balanceText}>Quick Balance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
