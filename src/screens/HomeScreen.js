import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card/index";
import stocks from "../../assets/data/dummyData.json";
import { registerRootComponent } from "expo";
import AnimatedStack from "../components/AnimatedStack";
import Axios from "axios";
import { isEmpty } from "lodash";
import StockData from "../components/StockData";

// RENAME THE APP TO 'MOONSTACK'

const HomeScreen = () => {
    const onSwipeLeft = (stock) => {
        // console.log("swipe left:", stock.symbol);
    };
    const onSwipeRight = (stock) => {
        // console.log("swipe right:", stock.symbol);
    };

    const symbolList = stocks.map(({ symbol }) => {
        return symbol;
    });

    const listString = symbolList.join(",");

    const [data, setData] = useState("");

    useEffect(() => {
        Axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${listString}?apikey=qQWpLn4H9rBkh6ykOXqK2XDqCkpMvtKb`
        ).then((res) => {
            console.log("fetching bulk price data...");
            setData(res.data);
        });
    }, []);

    return (
        <View style={styles.pageContainer}>
            <AnimatedStack
                data={data}
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
