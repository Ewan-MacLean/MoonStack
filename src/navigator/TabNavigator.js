import React from "react";
import { Platform, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./HomeStackNavigator";
import MatchesScreen from "../screens/MatchesScreen";
import WatchlistScreen from "../screens/Watchlist";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route: { params = {} } = {} }) => {
    // const Sheet = useSheet();
    const navigation = useNavigation();

    const handleNav = (path) => {
        navigation.navigate(path);
        // Sheet.dismiss();
    };
    // const sheetContent = () => <ChecklistDrawer handleNav={(path) => handleNav(path)} />;

    return (
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: Platform.OS === "android" ? "8%" : "10%",
                        // height: Platform.OS === "android" ? 64 : 86,
                        backgroundColor:'black'
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarItemStyle: {
                        paddingVertical: Platform.OS === "android" ? 6 : 2,
                    },
                    tabBarIconStyle: {
                        marginTop: Platform.OS === "android" ? 4 : 10,
                    },
                    tabBarLabelStyle: {
                        paddingBottom: 4,
                    },
                }}
                initialRouteName="Home"
            >
                <Tab.Screen
                    name="HomeScreen"
                    component={HomeStackNavigator}
                    options={{
                        headerShown: false,
                        tabBarLabel: ({ tintColor, focused }) => (
                            <Text
                                style={{
                                    // fontFamily: fonts.standard,
                                    fontSize: 10,
                                    lineHeight: 18,
                                    color: 'white',
                                }}
                            >
                                Home
                            </Text>
                        ),
                        // tabBarIcon: ({ focused }) =>
                        //     focused ? (
                        //         <NotesActive style={{ width: 22, height: 22 }} />
                        //     ) : (
                        //         <NotesInactive style={{ width: 22, height: 22 }} />
                        //     ),
                    }}
                />
                <Tab.Screen
                    name="Watchlist"
                    component={WatchlistScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: ({ tintColor, focused }) => (
                            <Text
                                style={{
                                    // fontFamily: fonts.standard,
                                    fontSize: 10,
                                    lineHeight: 18,
                                    color: 'white'
                                }}
                            >
                                Watchlist
                            </Text>
                        ),
                        // tabBarIcon: ({ focused }) =>
                        //     focused ? (
                        //         <NotesActive style={{ width: 22, height: 22 }} />
                        //     ) : (
                        //         <NotesInactive style={{ width: 22, height: 22 }} />
                        //     ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={MatchesScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: ({ tintColor, focused }) => (
                            <Text
                                style={{
                                    // fontFamily: fonts.standard,
                                    fontSize: 10,
                                    lineHeight: 18,
                                    color: 'white',
                                }}
                            >
                                Profile
                            </Text>
                        ),
                        // tabBarIcon: ({ focused }) =>
                        //     focused ? (
                        //         <NotesActive style={{ width: 22, height: 22 }} />
                        //     ) : (
                        //         <NotesInactive style={{ width: 22, height: 22 }} />
                        //     ),
                    }}
                />
            </Tab.Navigator>
    );
};

export default TabNavigator;
