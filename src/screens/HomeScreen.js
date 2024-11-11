import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card/index";
import stocks from "../../assets/data/dummyData.json";
import { registerRootComponent } from "expo";
import AnimatedStack from "../components/AnimatedStack";

const HomeScreen = () => {
    const onSwipeLeft = (stock) => {
        // console.log("swipe left:", stock.symbol);
    };
    const onSwipeRight = (stock) => {
        // console.log("swipe right:", stock.symbol);
    };

    const symbolList = stocks.map((obj) => {
        return obj.symbol;
    });

    let stockData = {};

    const listString = symbolList.join(",");

    async function fetchExam() {
        try {
            const response = await fetch(
                `https://financialmodelingprep.com/api/v3/quote/${listString}?apikey=qQWpLn4H9rBkh6ykOXqK2XDqCkpMvtKb`,
                {
                    method: "GET",
                    credentials: "same-origin",
                }
            );
            const data = await response.json();
            const filteredData = data.map(({ symbol, name, price, marketCap, volume }) => {
                return { symbol, name, price, marketCap, volume };
            });
            return filteredData;
        } catch (error) {
            console.error(error);
        }
    }

    const readExam = async () => {
        const exam = await fetchExam();
        // console.log(exam);
        return exam
    };
    readExam();

    // console.log(readExam())
    // console.log(stockData)


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
        backgroundColor: "#2f3030",
    },
});

export default HomeScreen;

registerRootComponent(HomeScreen);
