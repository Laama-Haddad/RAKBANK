import { NavigationProp } from "@react-navigation/native";

export interface AuthState {
    logged: boolean;
}

export interface LoginProps {
    navigation?: NavigationProp<any>;
    auth: AuthState;
}
