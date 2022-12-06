export interface Location {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
export interface UserInfo {
  username: string;
  password: string;
  operatingSystem: string;
  macAddress: string;
  deviceName: string;
  gpsLocation: Location;
  publicIPAddress: string;
}
