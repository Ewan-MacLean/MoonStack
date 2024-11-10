import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import { NavigationContainer } from "@react-navigation/native";
import Bio from "../screens/Bio";

//TODO: tie in ModelStackNavigator and subcomponents

const Stack = createStackNavigator();

export default function HomeStackNavigator({ route: { params = {} } = {} }) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="MatchesScreen"
                    component={Bio}
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
