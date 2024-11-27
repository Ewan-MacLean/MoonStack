import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AnalysisChart from "../AnalysisChart";

const Card = ({ stock }) => {
    const { symbol, name, price, marketCap, volume, tags = ["oink", "based", "moon"] } = stock;
    
    // navigate to the bio screen
    const navigation = useNavigation();
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

    return (
        <Pressable
            style={styles.card}
            onPress={() => {
                openBio();
            }}
        >
            <View style={styles.main}>
                <AnalysisChart symbol={symbol} />
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
        paddingTop: 10,
    },
    main: {
        width: 350,
        height: "100%",
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "",
    },
    inner: {
        flex: 1,
        padding: 10,
        backgroundColor: "#bdbfbe",
        justifyContent: "space-between",
    },
    label: {
        flex: 0.5,
    },
    info: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
        flex: 1,
    },
    tags: {
        flexDirection: "row",
        gap: 5,
    },
    tag: {
        color: "white",
        padding: 3,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white",
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
