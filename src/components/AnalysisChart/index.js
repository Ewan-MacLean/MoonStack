import React from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";
import inter from "../../../assets/fonts/Inter_24pt-Regular.ttf";
import axios from "axios";
import { isEmpty } from "lodash";
import TimeFrameBar from "../TimeFrameBar";
import { useRoute } from "@react-navigation/native";

const AnalysisChart = ({ symbol }) => {
    // const route = useRoute();
    // console.log(route.name);
    const font = useFont(inter, 12);
    const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

    function ToolTip({ x = SharedValue, y = SharedValue }) {
        console.log("x", x);
        return <Circle cx={x} cy={y} r={8} color="black" />;
    }
    const [chartData, setChartData] = useState([]);
    const [timeframe, setTimeFrame] = useState(30);
    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - timeframe));
    priorDate = priorDate.toLocaleString().slice(0, 10);

    // console.log('hist',historicalData)
    const options = {
        method: "GET",
        url: `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=1D&start=${priorDate}&limit=1000&adjustment=raw&feed=sip&sort=asc`,
        headers: {
            accept: "application/json",
            "APCA-API-KEY-ID": "PKSMKSPD6TJUUPYIA2BT",
            "APCA-API-SECRET-KEY": "ry0JLg188ZobYvqwLa7CZiN9cD8bCR5We13dkgPF",
        },
    };

    useEffect(() => {
        axios
            .request(options)
            .then((res) => {
                setChartData(res.data.bars[symbol]);
                // console.log(res.data.bars[symbol]);
            })
            .catch((err) => console.error(err));
    }, [symbol, timeframe]);

    const oinkData = chartData
        ? chartData.map(({ c, datetime }, ind) => {
              return { value: parseFloat(c), t: ind };
          })
        : [{ value: 5, t: 1 }];
    // console.log('chartData',chartData)
    if (!isEmpty(chartData)) {
        // console.log("oinkData", oinkData);
        return (
            // <View>
            <View style={{ height:300 }}>
                <CartesianChart
                    data={oinkData}
                    xKey="t"
                    yKeys={["value"]}
                    axisOptions={{
                        font,
                    }}
                    domainPadding={{ top: 100, bottom: 100, right: 20 }}
                >
                    {({ points }) => {
                        // console.log("value");
                        return (
                            <>
                                <Line points={points.value} color="red" strokeWidth={3} curveType="cardinal50" />
                                {isActive && <ToolTip x={state.x.position} y={state.y.value.position} />}
                            </>
                        );
                    }}
                </CartesianChart>
                <TimeFrameBar timeframe={timeframe} setTimeFrame={setTimeFrame} />
            </View>
        );
    } else {
        return <Text>OINK</Text>;
    }
};

export default AnalysisChart;
