import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Bio from "../screens/Bio";

const Stack = createStackNavigator();

export default function HomeStackNavigator({ route: { params = {} } = {} }) {
    return (
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name="Homescreen"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="Bio"
                    component={Bio}
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                    }}
                />
            </Stack.Navigator>
    );
}
