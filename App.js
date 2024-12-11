import React from "react";
import { registerRootComponent } from "expo";
import TabNavigator from "./src/navigator/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });

const App = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default App;

registerRootComponent(App);
