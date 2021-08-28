import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../Sceens/SignInScreen';
import SignUpSceen from '../Sceens/SignUpSceen';
import ForgotPasswordScreen from '../Sceens/ForgotPasswordSceen';
import DashBoardScreen from '../Sceens/DashBoardScreen';
import ResetPasswordScreen from '../Sceens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();//screen and navigator

const StackNavigation = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignInScreen' screenOptions={{headerShown:false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name='SignUp' component={SignUpSceen}/>
                <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
                <Stack.Screen name='DashBoard' component={DashBoardScreen}/>
                <Stack.Screen name='ResetPassword' component={ResetPasswordScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;