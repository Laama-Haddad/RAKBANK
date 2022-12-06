import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackItem} from '../resources/interfaces/stackItem';
import {navigationRef} from '../navigation';
import Welcome from '../screens/Auth/Welcome';
import Login from '../screens/Auth/Login';
import {TabItem} from '../resources/interfaces/tabItem';
import LoadingIcon from 'react-native-vector-icons/Feather';
import ProductIcon from 'react-native-vector-icons/Entypo';
import LiveChatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TokenIcon from 'react-native-vector-icons/FontAwesome5';
import LocateIcon from 'react-native-vector-icons/FontAwesome5';
import {getByScreenSize} from '../utils/responsive';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Platform, Text, View} from 'react-native';
import {keys} from '../api/keys';
import {getLocalData} from '../utils/storage';
import config from '../config';
import Home from '../screens/Content/Home';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const LiveChat = () => <></>;
const Token = () => <></>;
const LocateUs = () => <></>;

const tabsScreens: TabItem[] = [
  {
    id: 0,
    name: 'home',
    label: 'Products',
    component: Home,
    icon: (color, size) => (
      <ProductIcon name={'wallet'} color={color} size={size} />
    ),
  },
  {
    id: 1,
    name: 'liveChat',
    label: 'Live Chat',
    component: LiveChat,
    icon: (color, size) => (
      <LiveChatIcon
        name={'chat-processing-outline'}
        color={color}
        size={size}
      />
    ),
  },
  {
    id: 2,
    name: 'token',
    label: 'RAK Token',
    component: Token,
    icon: (color, size) => <TokenIcon name={'key'} color={color} size={size} />,
  },
  {
    id: 3,
    name: 'locateUs',
    label: 'Locate Us',
    component: LocateUs,
    icon: (color, size) => (
      <LocateIcon name={'search-location'} color={color} size={size} />
    ),
  },
];
const HomeTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#888888',
        tabBarInactiveTintColor: '#222222',
      }}>
      {tabsScreens.map((screen, idx) => (
        <Tabs.Screen
          key={`tabScreen${idx}`}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: false,
            tabBarLabel: `${screen.label}`,
            tabBarLabelStyle: {fontSize: getByScreenSize(13, 25)},
            tabBarIcon: ({focused}) =>
              screen.icon(
                focused ? '#888888' : '#222222',
                getByScreenSize(20, 25),
              ),
            tabBarStyle: {height: getByScreenSize(50, 80)},
          }}
        />
      ))}
    </Tabs.Navigator>
  );
};
const authScreens: StackItem[] = [
  {
    id: 0,
    name: 'welcome',
    component: Welcome,
  },
];
const modalScreens: StackItem[] = [
  {
    id: 0,
    name: 'login',
    component: Login,
  },
];
const screens: StackItem[] = [
  {
    id: 0,
    name: 'homeTabs',
    component: HomeTabs,
  },
];
const AppNavigator = () => {
  const userStatus = useSelector(state => state.auth);

  const [router, setRouter] = useState<string>('');
  const checkUser = async () => {
    const user = await getLocalData(keys.AUTH);

    if (!!user && user.logged) {
      setRouter('home');
    } else {
      setRouter('auth');
    }
  };
  useEffect(() => {
    if (config.debug) {
      console.log('logged =>', userStatus.logged);
      console.log('userInfo =>', userStatus.userInfo);
    }
    checkUser().then();
  }, [userStatus]);
  const selectRouter = useCallback(() => {
    if (router === 'home') {
      return (
        <Stack.Navigator
          screenOptions={{gestureEnabled: Platform.OS === 'ios'}}>
          <Stack.Group>
            {screens.map((screen, idx) => (
              <Stack.Screen
                key={idx}
                options={{
                  headerShown: false,
                }}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Group>
        </Stack.Navigator>
      );
    } else if (router === 'auth') {
      return (
        <Stack.Navigator screenOptions={{gestureEnabled: true}}>
          <Stack.Group>
            {authScreens.map((screen, idx) => (
              <Stack.Screen
                key={idx}
                options={{
                  headerShown: false,
                }}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
            }}>
            {modalScreens.map((screen, idx) => (
              <Stack.Screen
                key={`screen${idx}`}
                options={{
                  headerShown: false,
                }}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Group>
        </Stack.Navigator>
      );
    }
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={'#C3014B'} size={'large'}/>
        <Text style={{fontSize: 30, marginTop: '2%'}}>Loading...</Text>
      </View>
    );
  }, [router]);

  return (
    <NavigationContainer ref={navigationRef}>
      {selectRouter()}
    </NavigationContainer>
  );
};
export default AppNavigator;
