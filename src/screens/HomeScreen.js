import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card/index";
import users from "../../assets/data/users";
import { registerRootComponent } from "expo";
import AnimatedStack from "../components/AnimatedStack";

const HomeScreen = () => {
    const onSwipeLeft = (user) => {
        console.warn("swipe left:", user.name);
    };
    const onSwipeRight = (user) => {
        console.warn("swipe right:", user.name);
    };

    return (
        <View style={styles.pageContainer}>
            <AnimatedStack
                data={users}
                renderItem={({ item }) => <Card user={item} />}
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
