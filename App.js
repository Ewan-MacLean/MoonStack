import React from "react";
import { registerRootComponent } from "expo";
import TabNavigator from "./src/navigator/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default App;

registerRootComponent(App);
