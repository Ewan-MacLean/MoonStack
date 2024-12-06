import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Pressable } from "react-native";
import { AuthService, WatchlistService } from "../_firebase/index";
import { SafeAreaView } from "react-native-safe-area-context";

const WatchlistScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [watchlist, setWatchlist] = useState([]);
    const [newStock, setNewStock] = useState("");

    // Register User
    const handleRegister = async () => {
        try {
            await AuthService.register(email, password);
            Alert.alert("Success", "User registered successfully");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    // Login User
    const handleLogin = async () => {
        try {
            await AuthService.login(email, password);
            // Fetch watchlist after login
            const stocks = await WatchlistService.getUserWatchlist();
            setWatchlist(stocks);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    // Add Stock to Watchlist
    const handleAddStock = async () => {
        try {
            await WatchlistService.addToWatchlist(newStock);
            // Refresh watchlist
            const updatedWatchlist = await WatchlistService.getUserWatchlist();
            setWatchlist(updatedWatchlist);
            setNewStock("");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View
                style={{
                    // backgroundColor: "red",
                    flex: 1,
                    width: "100%",
                    paddingVertical: 30,
                    paddingHorizontal: 50,
                    justifyContent: "center",
                }}
            >
                <View style={{ flex: 1, gap: 20 }}>
                    <TextInput
                        style={{ height: 50, borderWidth: 1 }}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={{ height: 50, borderWidth: 1 }}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <View style={{ flex: 1, gap: 20 }}>
                    <Pressable style={{ borderWidth: 1, width: "100%"}} onPress={handleRegister}>
                        <Text style={{fontSize:30}}>Register</Text>
                    </Pressable>
                    <Pressable style={{ borderWidth: 1, width: "100%" }} onPress={handleLogin}>
                        <Text style={{fontSize:30}}>Login</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ backgroundColor: "white", flex: 1, width: "100%" }}>
                <TextInput placeholder="Add Stock Symbol" value={newStock} onChangeText={setNewStock} />
                <Button title="Add to Watchlist" onPress={handleAddStock} />

                {watchlist.map((stock) => (
                    <View key={stock.id}>
                        <Text>{stock.symbol}</Text>
                        <Text>Added: {stock.addedAt.toDate().toLocaleDateString()}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default WatchlistScreen;
