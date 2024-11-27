import React from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { CartesianChart, Line, Area, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";
import inter from "../../../assets/fonts/Inter_24pt-Regular.ttf";
import axios from "axios";
import { isEmpty } from "lodash";
import TimeFrameBar from "../TimeFrameBar";
import parseDateString from "../../utils/formatter";

const AnalysisChart = ({ symbol }) => {
    const font = useFont(inter, 12);
    const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

    function ToolTip({ x = SharedValue, y = SharedValue }) {
        console.log("x", x);
        return <Circle cx={x} cy={y} r={8} color="black" />;
    }
    const [chartData, setChartData] = useState([]);
    const [timeframe, setTimeFrame] = useState(30);
    const [increment, setIncrement] = useState("30Min");
    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - timeframe));
    priorDate = priorDate.toLocaleString().slice(0, 10);

    const options = {
        method: "GET",
        url: `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbol}&timeframe=${increment}&start=${priorDate}&limit=1000&adjustment=raw&feed=sip&sort=asc`,
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
            })
            .catch((err) => console.error(err));
    }, [symbol, timeframe]);

    const oinkData = chartData
        ? chartData.map(({ c, t }, ind) => {
              return { value: parseFloat(c), t: t };
          })
        : [];

    if (!isEmpty(chartData)) {
        const difference = oinkData[0].value - oinkData[oinkData.length - 1].value;
        const pctChange = 1 - oinkData[0].value / oinkData[oinkData.length - 1].value;
        const colour = difference < 0 ? "green" : "red";
        return (
            <View style={{ height: 350, marginHorizontal: 7 }}>
                <View
                    style={{
                        width: "100%",
                        height: 30,
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingHorizontal: 30,
                    }}
                >
                    {pctChange > 0 ? (
                        <Text style={{ color: "green", fontSize: 20 }}>+{(pctChange * 100).toFixed(2)}%</Text>
                    ) : (
                        <Text style={{ color: "red", fontSize: 20 }}>{(pctChange * 100).toFixed(2)}%</Text>
                    )}
                </View>
                <CartesianChart
                    data={oinkData}
                    xKey="t"
                    yKeys={["value"]}
                    axisOptions={{
                        font,
                        formatXLabel: (value) => {
                            if (!isEmpty(value)) {
                                const stringValue = value.toLocaleString();
                                const dateInfo = parseDateString(stringValue);
                                const { monthYear } = dateInfo;
                                const cleanDate = [
                                    monthYear.slice(0, 3),
                                    ...[`'`, monthYear.slice(monthYear.length - 2, monthYear.length)],
                                ].join("");
                                return cleanDate;
                            }
                            return "Err.";
                        },
                    }}
                    domainPadding={{ top: 100, bottom: 100, right: 20 }}
                >
                    {({ points, chartBounds }) => {
                        return (
                            <>
                                <Line points={points.value} color={colour} strokeWidth={3} curveType="cardinal50" />
                                {isActive && <ToolTip x={state.x.position} y={state.y.value.position} />}
                                <Area
                                    points={points.value}
                                    y0={chartBounds.bottom}
                                    curveType="cardinal50"
                                    opacity={0.3}
                                    color={colour}
                                    // animate={{ type: "timing", duration: 300 }}
                                />
                            </>
                        );
                    }}
                </CartesianChart>
                <TimeFrameBar timeframe={timeframe} setTimeFrame={setTimeFrame} setIncrement={setIncrement} />
            </View>
        );
    } else {
        return (
            <View style={{ height: 350, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }
};

export default AnalysisChart;
