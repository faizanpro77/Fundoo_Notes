import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpSceen from '../screens/SignUpSceen';
import ForgotPasswordScreen from '../screens/ForgotPasswordSceen';
import DashBoardScreen from '../screens/DashBoardScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';

const Stack = createNativeStackNavigator();//screen and navigator

const StackNavigation = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown:false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name='SignUp' component={SignUpSceen}/>
                <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
                <Stack.Screen name='DashBoard' component={DashBoardScreen}/>
                <Stack.Screen name='ResetPassword' component={ResetPasswordScreen}/>
                <Stack.Screen name='CreateNote'   component={CreateNoteScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;