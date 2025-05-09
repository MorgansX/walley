import type React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getCoinChartData } from "@/api/coinMarketApi";

const CHART_WIDTH = 160;
const CHART_HEIGHT = 30;

type CryptoCoinChartProps = {
    chartData: any,
    isLoading:boolean
};

export const CryptoCoinChart: React.FC<CryptoCoinChartProps> = ({ chartData, isLoading }) => {

    if (isLoading) {
        return (
            <ActivityIndicator size="small" color="#999" style={styles.miniChart} />
        );
    }

    if (!chartData) {
        return null;
    }

    return (
        <LineChart
            data={chartData}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withShadow={false}
            bezier
            chartConfig={{
                backgroundColor: "transparent",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2,
                color: (opacity = 1) => chartData.datasets[0].color(opacity),
                propsForDots: {
                    r: "10",
                },
            }}
        />
    );
};

const styles = StyleSheet.create({
    miniChart: {
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
        justifyContent: 'center',
    }
});
