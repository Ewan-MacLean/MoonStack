import Axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const StockData = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        Axios.get(`https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=qQWpLn4H9rBkh6ykOXqK2XDqCkpMvtKb`).then(
            (res) => {
                console.log("fetching...");
                // console.log("data...", res.data);
                setData(res.data);
            }
        );
    }, []);

    console.log(data)

    return (
        <View style={{ backgroundColor: "white", padding: 50, borderRadius: 5 }}>
            <Text>{data[0]?.avgVolume}</Text>
        </View>
    );
};

export default StockData;
