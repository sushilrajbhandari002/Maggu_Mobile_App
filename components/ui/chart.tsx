import React, { createContext, useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryBar,
  VictoryPie,
  VictoryAxis,
  VictoryTooltip,
  VictoryLegend,
  VictoryVoronoiContainer,
} from "victory-native";
import Svg from "react-native-svg";

export type ChartConfig = {
  [k: string]: {
    label?: string;
    color?: string;
    icon?: React.ComponentType;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within <ChartContainer>");
  return context;
}

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  style?: object;
}

export function ChartContainer({ config, children, style }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <View style={[styles.container, style]}>
        <Svg width="100%" height="100%">
          <VictoryChart
            width={350}
            height={250}
            containerComponent={<VictoryVoronoiContainer />}
          >
            {children}
          </VictoryChart>
        </Svg>
      </View>
    </ChartContext.Provider>
  );
}

// Example ChartTooltipContent for VictoryNative
export function ChartTooltipContent({ label, datum }: any) {
  return (
    <View style={styles.tooltip}>
      <View>
        <VictoryTooltip
          orientation="top"
          pointerLength={5}
          cornerRadius={3}
          flyoutStyle={{ fill: "#fff", stroke: "#ccc" }}
          text={`${label}: ${datum.y}`}
        />
      </View>
    </View>
  );
}

// Example ChartLegendContent
export function ChartLegendContent({ config }: { config: ChartConfig }) {
  const legendData = Object.entries(config).map(([key, item]) => ({
    name: item.label || key,
    symbol: { fill: item.color || "#000" },
  }));

  return <VictoryLegend x={50} y={10} orientation="horizontal" data={legendData} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    justifyContent: "center",
    alignItems: "center",
  },
  tooltip: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
