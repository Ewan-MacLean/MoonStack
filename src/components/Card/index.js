import React from "react";
import { Text, Image, ImageBackground, View, StyleSheet, Pressable } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import inter from "../../../assets/fonts/Inter_24pt-Regular.ttf";
import { useNavigation } from "@react-navigation/native";

const Card = ({ stock }) => {
    const { symbol, companyName, currentPrice, marketCap, volume, tags = ["oink", "based", "moon"] } = stock;

    const navigation = useNavigation();
    // console.log('stock',stock)
    const font = useFont(inter, 12);
    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        lowTmp: 10 + 2 * Math.random(),
    }));

    // navigate to the bio screen
    const openBio = () => {
        navigation.navigate("Bio", {symbol,companyName});
    };

    function numberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
                <View style={{ height: 300, width: 300, marginLeft: 10 }}>
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
                <View style={styles.inner}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={styles.label}>
                            <Text style={styles.name}>{symbol}</Text>
                            <Text style={styles.bio}>{companyName}</Text>
                        </View>
                        <View style={styles.info}>
                            <View>
                                <Text style={[styles.price, { fontWeight: "bold", fontSize: 30 }]}>{currentPrice}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',width:'70%'}}>
                                    <View>
                                        <Text style={styles.infoText}>M.Cap:</Text>
                                        <Text style={styles.infoText}>Vol.:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.infoText}>{marketCap}</Text>
                                        <Text style={styles.infoText}>{volume.toLocaleString()}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Text style={styles.infoText}>3M:+10%</Text>
                                <Text style={styles.infoText}>6M:+10%</Text>
                                <Text style={styles.infoText}>1Y:+10%</Text>
                            </View>
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
        gap: 20,
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
