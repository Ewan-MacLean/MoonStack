import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card/index";
import stocks from "../../assets/data/dummyData.json"
import { registerRootComponent } from "expo";
import AnimatedStack from "../components/AnimatedStack";

const HomeScreen = () => {
    const onSwipeLeft = (stock) => {
        // console.warn("swipe left:", stock.symbol);
    };
    const onSwipeRight = (stock) => {
        // console.warn("swipe right:", stock.symbol);
    };

    // console.log(stocks)

    return (
        <View style={styles.pageContainer}>
            <AnimatedStack
                data={stocks}
                renderItem={({ item }) => <Card stock={item} />}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
            />
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

export default HomeScreen;

registerRootComponent(HomeScreen);
