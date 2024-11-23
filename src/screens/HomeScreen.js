import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card/index";
import stocks from "../../assets/data/dummyData.json";
import { registerRootComponent } from "expo";
import AnimatedStack from "../components/AnimatedStack";
import Axios from "axios";
import { isEmpty } from "lodash";
import StockData from "../components/StockData";

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

    // let stockData = {};

    const listString = symbolList.join(",");

    const [isMounted, setIsMounted] = useState(false);
    const [stockData, setStockData] = useState({});

    // const fetchStockData = () => {
    //     Axios.get(
    //         `https://financialmodelingprep.com/api/v3/quote/${listString}?apikey=qQWpLn4H9rBkh6ykOXqK2XDqCkpMvtKb`
    //     ).then((res) => {
    //         console.log("fetching...");
    //         // console.log("data...", res.data);
    //         setStockData(res.data);
    //     });
    // };

    // // fetchStockData()

    // // console.log('ismounted',isMounted)

    // useEffect(() => {
    //     if (isMounted === false) {
    //         setIsMounted(true);
    //         fetchStockData();
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log(stockData);
    // }, [stockData]);

    return (
        <View style={styles.pageContainer}>
            <StockData />
            {/* <AnimatedStack
                data={stocks}
                renderItem={({ item }) => <Card stock={item} />}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
            /> */}
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
