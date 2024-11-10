import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import TabNavigator from "./src/navigator/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
    return (
        // <View style={styles.pageContainer}>
        // {/* <HomeScreen /> */}
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
        // </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});

export default App;

registerRootComponent(App);
