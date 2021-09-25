import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpSceen from '../screens/SignUpSceen';
import ForgotPasswordScreen from '../screens/ForgotPasswordSceen';
import DashBoardScreen from '../screens/DashBoardScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import DrawerNavigator from './DrawerNavigator';
//import Profile from '../Component/Profile';
import LabelScreen from '../screens/LabelScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import DeleteScreen from '../screens/DeleteScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();//screen and navigator

const StackNavigation = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
                <Stack.Screen name='SplashScreen' component={SplashScreen}/>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name='SignUp' component={SignUpSceen}/>
                <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
                <Stack.Screen name='DashBoard' component={DrawerNavigator}/>
                <Stack.Screen name='ResetPassword' component={ResetPasswordScreen}/>
                <Stack.Screen name='CreateNote'   component={CreateNoteScreen}/>
                <Stack.Screen name='EditNOte' component={EditNoteScreen} />
                <Stack.Screen name='createLabel' component={LabelScreen}/>
                <Stack.Screen name='SearchNote' component={SearchScreen}/>
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;