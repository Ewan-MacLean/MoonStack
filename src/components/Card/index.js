import React from "react";
import { Text, Image, ImageBackground, View, StyleSheet } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import inter from "../../../assets/fonts/Inter_24pt-Regular.ttf";

const Card = ({ stock }) => {
    const { symbol, companyName, currentPrice } = stock;

    const font = useFont(inter, 12);
    // console.log('stock',stock)
    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        lowTmp: 10 + 2 * Math.random(),
    }));

    return (
        // instead of an image, we will display the YTD graph
        // card will contain graph, fundamentals, news, and online sentiment (reddit or other)
        <View style={styles.card}>
            <View
                style={styles.main}
            >
                <View style={{ height:300,width:300,marginLeft:10 }}>
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
                    <Text style={styles.name}>{symbol}</Text>
                    <Text style={styles.bio}>{companyName}</Text>
                </View>
            </View>
        </View>
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
        gap:20
    },
    inner: {
        padding: 10,
        backgroundColor:'grey'
    },
    name: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    },
    bio: {
        fontSize: 18,
        color: "white",
        lineHeight: 24,
    },
});

export default Card;
