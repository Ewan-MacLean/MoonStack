import * as React from "react";
import { View } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";
import inter from "../../../assets/fonts/Inter_24pt-Regular.ttf";

const AnalysisChart = () => {
    const font = useFont(inter, 12);
    const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

    function ToolTip({ x = SharedValue, y = SharedValue }) {
      console.log('x',x)
        return <Circle cx={x} cy={y} r={8} color="black" />;
    }

    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        highTmp: 40 + 30 * Math.random(),
    }));
    return (
        <View style={{ height: 300, width: "100%", paddingHorizontal: 20 }}>
            <CartesianChart
                data={DATA}
                xKey="day"
                yKeys={["highTmp"]}
                axisOptions={{
                    font,
                }}
                chartPressState={state}
            >
                {({ points }) => {
                    // console.log("value");
                    return (
                        <>
                            <Line points={points.highTmp} color="red" strokeWidth={3} />
                            {isActive && <ToolTip x={state.x.position} y={state.y.highTmp.position} />}
                        </>
                    );
                }}
            </CartesianChart>
            {/* <View style={{ height: 50 }}><Text>{value}</Text></View> */}
        </View>
    );
};

export default AnalysisChart;
