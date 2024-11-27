import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const TimeFrameBar = ({timeframe,setTimeFrame,increment,setIncrement}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                height: 50,
                width:"105%",
                marginHorizontal:-10,
                backgroundColor: "grey",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
            }}
        >
            <Pressable
                onPress={() => {
                    setTimeFrame(365*5);
                    setIncrement('1W')
                }}
                style={[styles.button, timeframe === 365*5 && { backgroundColor: "white" }]}
            >
                <Text>5Y</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    setTimeFrame(365);
                    setIncrement('1D')
                }}
                style={[styles.button, timeframe === 365 && { backgroundColor: "white" }]}
            >
                <Text>1Y</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    setTimeFrame(183);
                    setIncrement('2H')
                }}
                style={[styles.button, timeframe === 183 && { backgroundColor: "white" }]}
            >
                <Text>6M</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    setTimeFrame(30);
                    setIncrement('30Min')
                }}
                style={[styles.button, timeframe === 30 && { backgroundColor: "white" }]}
            >
                <Text>1M</Text>
            </Pressable>
        </View>
    );
};

export default TimeFrameBar;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth:1
        // backgroundColor: "#bdbfbe",
    },
})