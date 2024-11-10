import { registerRootComponent } from "expo";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, LogBox } from "react-native";
import stocks from "../../assets/data/dummyData.json";
import { useFont } from "@shopify/react-native-skia";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { CartesianChart, Line } from "victory-native";
import inter from "../../assets/fonts/Inter_24pt-Regular.ttf";
import Card from "../components/Card/index";
import AnimatedStack from "../components/AnimatedStack";
import NavHeader from "../components/NavHeader";

const Bio = ({ navigation, route }) => {

    LogBox.ignoreLogs(["VirtualizedLists"])

    const handleGoBack = () => {
        navigation.goBack();
    };

    const font = useFont(inter, 12);
    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        lowTmp: 10 + 2 * Math.random(),
    }));

    const symbol = route.params;

    const financialCharacteristics = [
        { id: "earningsPerShare", title: "EPS" },
        { id: "priceToEarningsRatio", title: "P/E Ratio" },
        { id: "priceToBookRatio", title: "P/B Ratio" },
        { id: "dividendYield", title: "Dividend Yield" },
        { id: "returnOnEquity", title: "ROE" },
        { id: "debtToEquityRatio", title: "D/E Ratio" },
        { id: "freeCashFlow", title: "FCF" },
        { id: "revenueGrowth", title: "RG" },
        { id: "currentRatio", title: "CR" },
        { id: "beta", title: "Beta" },
    ];

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>23</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.pageContainer}>
            <NavHeader goBack={handleGoBack} title={symbol} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ height: 300, width: "80%", marginRight: 30 }}>
                        <CartesianChart
                            data={DATA} // 👈 specify your data
                            xKey="day" // 👈 specify data key for x-axis
                            // yKeys={["lowTmp"]}
                            yKeys={["lowTmp", "highTmp"]}
                            axisOptions={{ font }} // 👈 we'll generate axis labels using given font.
                        >
                            {/* 👇 render function exposes various data, such as points. */}
                            {({ points }) => (
                                // 👇 and we'll use the Line component to render a line path.
                                <Line points={points.lowTmp} color="green" strokeWidth={3} />
                            )}
                        </CartesianChart>
                    </View>
                </View>
                <View style={[styles.container,{flexDirection:'row',gap:20}]}>
                    <View style={{flex:1}}>
                        <Text style={styles.header}>Fundamentals</Text>
                        <FlatList
                            data={financialCharacteristics}
                            renderItem={({ item }) => <Item title={item.title} />}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.header}>News</Text>
                        <View>
                            {/* 
                            These will be an amalgamation of posts about the chosen stock in the last 90 days */}
                            <Text>reddit sentiment</Text>
                            <Text>twitter sentiment</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.header}>Bio</Text>
                    <Text>
                        Apple Inc. designs and sells consumer electronics like iPhones, Macs, and iPads, along with
                        wearables and accessories. It also offers services such as the App Store, Apple Music, and Apple
                        Pay, catering to individual, business, and institutional customers. Founded in 1976, Apple is
                        headquartered in Cupertino, California.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    header: {
        fontSize: 18,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default Bio;

registerRootComponent(Bio);
