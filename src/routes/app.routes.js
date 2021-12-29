import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SingIn from '../pages/SingIn';
import ChatRoot from '../pages/ChatRoom';
import Messages from '../pages/Messages';


const AppStack = createNativeStackNavigator();

function AppRoutes() {
    return(
        <AppStack.Navigator initialRouteName="ChatRoom">

            <AppStack.Screen 
                name="SignIn"
                component={SingIn}
                options={{
                    title: "Faça Login"
            }}
            />
                <AppStack.Screen 
                name= "ChatRoom"
                component={ChatRoot}
                options={{
                    headerShown: false
                }}
                />

                <AppStack.Screen 
                name='Messages'
                component={Messages}
                options={ ({ route }) => ({
                    title: route.params.threads.name
                })}    
            />
            </AppStack.Navigator>
    )
}

export default AppRoutes;