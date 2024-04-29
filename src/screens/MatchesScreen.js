import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { registerRootComponent } from "expo";

const MatchesScreen = () => {
    return (
        <View>
            <Text>Matches</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});

export default MatchesScreen;

registerRootComponent(MatchesScreen);
