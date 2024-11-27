import { registerRootComponent } from "expo";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, LogBox } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import NavHeader from "../components/NavHeader";
import AnalysisChart from "../components/AnalysisChart";
import Axios from "axios";

const Bio = ({ navigation, route }) => {
    const [data, setData] = useState("");

    const handleGoBack = () => {
        navigation.goBack();
    };

    const { symbol, name } = route.params;

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

    useEffect(() => {
        Axios.get(
            `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=qQWpLn4H9rBkh6ykOXqK2XDqCkpMvtKb`
        ).then((res) => {
            // console.log("fetching bio...");
            setData(res.data[0]);
        });
    }, []);

    const { description } = data;

    LogBox.ignoreLogs(["VirtualizedLists"]);

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>23</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.pageContainer}>
            <NavHeader goBack={handleGoBack} title={`${name} (${symbol})`} />
            <ScrollView scrollEnabled={true} style={{ flex: 1 }}>
                <AnalysisChart symbol={symbol} />
                <View style={[styles.container, { flexDirection: "row", gap: 20 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.header}>Fundamentals</Text>
                        <FlatList
                            data={financialCharacteristics}
                            renderItem={({ item }) => <Item title={item.title} />}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.header}>News</Text>
                        <View>
                            <Text>Reddit sentiment</Text>
                            <Text>Twitter sentiment</Text>
                            <Text>Yahoo finance sentiment</Text>
                            <Text>Past earnings v expected</Text>
                            <Text>Second page for financial metrics</Text>
                            <Text>
                                Allow users to search stocks by bull pattern (recently had golden cross, cup & handle,
                                bull flags, established support, testing resistance, volume patterns)
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.header}>Bio</Text>
                    <Text>{description}</Text>
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
