import * as React from "react";
import { View } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";
import inter from "../../../assets/fonts/Inter_24pt-Regular.ttf";

const AnalysisChart = ({historicalData}) => {
    const font = useFont(inter, 12);
    const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

    function ToolTip({ x = SharedValue, y = SharedValue }) {
      console.log('x',x)
        return <Circle cx={x} cy={y} r={8} color="black" />;
    }

    // console.log('hist',historicalData)

    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        highTmp: 40 + 30 * Math.random(),
    }));

    // console.log(DATA)
    return (
        <View style={{ height: 300, width: "100%", paddingHorizontal: 20 }}>
            <CartesianChart
                data={historicalData}
                xKey="t"
                yKeys={["value"]}
                axisOptions={{
                    font,
                }}
                domainPadding={{ top: 20, bottom: 20 }}
                // xAxis={
                //     {tickCount:10}
                // }
                // yAxis={
                //     {tickCount:10}
                // }
                // chartPressState={state}
            >
                {({ points }) => {
                    // console.log("value");
                    return (
                        <>
                            <Line points={points.value} color="red" strokeWidth={3} curveType="natural" />
                            {isActive && <ToolTip x={state.x.position} y={state.y.value.position} />}
                        </>
                    );
                }}
            </CartesianChart>
            {/* <View style={{ height: 50 }}><Text>{value}</Text></View> */}
        </View>
    );
};

export default AnalysisChart;
