import React, { useEffect, useState } from "react";
import { Text, Image, ImageBackground, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AnalysisChart from "../AnalysisChart";
import Axios from "axios";
import { isEmpty, isNumber, isObject, isString } from "lodash";

const TimeFrameBar = ({timeframe,setTimeFrame}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                height: 50,
                width: 30,
                width: "100%",
                backgroundColor: "grey",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
            }}
        >
            <Pressable
                onPress={() => {
                    setTimeFrame(365);
                }}
                style={[styles.button, timeframe === 365 && { backgroundColor: "white" }]}
            >
                <Text>1Y</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    setTimeFrame(120);
                }}
                style={[styles.button, timeframe === 120 && { backgroundColor: "white" }]}
            >
                <Text>6M</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    setTimeFrame(30);
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