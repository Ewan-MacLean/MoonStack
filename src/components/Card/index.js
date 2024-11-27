import React, { useEffect, useState } from "react";
import { Text, Image, ImageBackground, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AnalysisChart from "../AnalysisChart";
import Axios from "axios";
import { isEmpty, isNumber, isObject, isString } from "lodash";
import TimeFrameBar from "../TimeFrameBar";

const Card = ({ stock }) => {
    const { symbol, name, price, marketCap, volume, tags = ["oink", "based", "moon"] } = stock;

    const [data, setData] = useState("");
    // console.log('oink...',symbol,name)
    const [chartData, setChartData] = useState("");
    // console.log('stockData:',stockData)

    const navigation = useNavigation();
    // console.log('stock',stock)

    // navigate to the bio screen
    const openBio = () => {
        navigation.navigate("Bio", { symbol, name });
    };

    const formatCash = (n) => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
    };

    // const [timeframe, setTimeFrame] = useState(30);
    // var today = new Date();
    // var priorDate = new Date(new Date().setDate(today.getDate() - timeframe));
    // priorDate = priorDate.toLocaleString().slice(0, 10);

    // const options = {
    //     method: "GET",
    //     url: `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=1D&start=${priorDate}&limit=1000&adjustment=raw&feed=sip&sort=asc`,
    //     headers: {
    //         accept: "application/json",
    //         "APCA-API-KEY-ID": "PKSMKSPD6TJUUPYIA2BT",
    //         "APCA-API-SECRET-KEY": "ry0JLg188ZobYvqwLa7CZiN9cD8bCR5We13dkgPF",
    //     },
    // };

    // useEffect(() => {
    //     Axios.request(options)
    //         .then((res) => {
    //             setChartData(res.data.bars[symbol]);
    //             console.log(res.data.bars[symbol]);
    //         })
    //         .catch((err) => console.error(err));
    // }, [symbol, timeframe]);

    // const oinkData = chartData
    //     ? chartData.map(({ c, datetime }, ind) => {
    //           return { value: parseFloat(c), t: ind };
    //       })
    //     : [];
    // console.log("oinkData", oinkData);
    return (
        // instead of an image, we will display the YTD graph
        // card will contain graph, fundamentals, news, and online sentiment (reddit or other)
        <Pressable
            style={styles.card}
            onPress={() => {
                openBio();
            }}
        >
            <View style={styles.main}>
                {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1 }}> */}
                <View>
                    {/* {!isEmpty(oinkData) && <AnalysisChart historicalData={oinkData} />} */}
                    <AnalysisChart symbol={symbol} />
                    {/* <TimeFrameBar timeframe={timeframe} setTimeFrame={setTimeFrame} /> */}
                </View>
                <View style={styles.inner}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={styles.label}>
                            <Text style={styles.name}>{symbol}</Text>
                            <Text style={styles.bio}>{name}</Text>
                        </View>
                        <View style={styles.info}>
                            <View style={{ flexDirection: "row", gap: 15 }}>
                                <Text style={[styles.price, { fontWeight: "bold", fontSize: 30 }]}>{price}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "40%" }}>
                                    <View>
                                        <Text style={styles.infoText}>M.Cap:</Text>
                                        <Text style={styles.infoText}>Vol:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.infoText}>{formatCash(marketCap)}</Text>
                                        <Text style={styles.infoText}>{formatCash(volume)}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text style={styles.infoText}>3M:+10%</Text>
                                <Text style={styles.infoText}>6M:+10%</Text>
                                <Text style={styles.infoText}>1Y:+10%</Text>
                            </View> */}
                        </View>
                    </View>
                    <View style={styles.tags}>
                        {tags.map((tag) => {
                            return (
                                <Text key={tag} style={styles.tag}>
                                    {tag}
                                </Text>
                            );
                        })}
                    </View>
                </View>
            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 500,
        borderRadius: 10,
        backgroundColor: "#fefefe",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    main: {
        width: 350,
        // width: "100%",
        height: "100%",
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "flex-end",
        // gap: 20,
    },
    inner: {
        padding: 10,
        backgroundColor: "#bdbfbe",
        height: 150,
        justifyContent: "space-between",
        // gap: 10,
    },
    label: {
        flex: 0.5,
        // borderWidth:1
    },
    info: {
        // height:'100%',
        flex: 1,
        flexDirection: "column",
        gap: 5,
        flex: 1,
        // borderWidth:1
    },
    tags: {
        flexDirection: "row",
        gap: 5,
        // borderWidth:1
    },
    tag: {
        color: "white",
        padding: 3,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white",
        // backgroundColor: "green",
    },
    name: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    },
    bio: {
        fontSize: 15,
        color: "white",
        lineHeight: 24,
    },
    price: {
        fontSize: 18,
        color: "white",
    },
    infoText: {
        fontSize: 15,
        color: "white",
    },
});

export default Card;
