import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import users from "../../assets/data/users";
import { getUserWatchlist } from "../_firebase";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

const MatchesScreen = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWatchlist() {
            try {
                setIsLoading(true);
                const fetchedWatchlist = await getUserWatchlist();
                setWatchlist(fetchedWatchlist);
            } catch (err) {
                setError("Failed to load watchlist");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWatchlist();
    }, []);

    return (
        <SafeAreaView style={styles.root}>
            <GestureHandlerRootView>
                <View style={styles.container}>
                    <Text style={{ fontWeight: "bold", fontSize: 24, color: "#F63A6E", marginBottom: 20 }}>
                        Watchlist
                    </Text>
                    <FlatList
                        style={{ backgroundColor: "black", borderBottomWidth: 1,borderColor:'grey' }}
                        data={watchlist}
                        renderItem={({ item }) => {
                            return (
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 20,
                                        padding: 20,
                                        borderColor:'grey',
                                        borderTopWidth: 1,
                                        borderLeftWidth: 1,
                                        borderRightWidth: 1,
                                    }}
                                >
                                    {item.symbol}
                                </Text>
                            );
                        }}
                        keyExtractor={(item, ind) => ind}
                    />
                </View>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        flex: 1,
        padding: 10,
        backgroundColor: "#2f3030",
    },
    container: {
        padding: 10,
    },
    users: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    user: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 50,

        borderWidth: 2,
        padding: 3,
        borderColor: "#F63A6E",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
});

export default MatchesScreen;

// registerRootComponent(MatchesScreen);
