import { useMemo } from "react";
import { ScaleLinear } from "d3";

// tick length
const TICK_LENGTH = 10;

export const AxisBottom = ({ xScale, pixelsPerTick, height, headerText}) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
        {/* Header Text */}
        {/* <text
            textAnchor="middle"
            style={{
                fontSize: "20px",
                fontWeight: "bold",
                fill: "#2d2e2d",
            }}
            transform={`translate(${range[0] + (range[1] - range[0]) / 2}, ${height + 40})`}
        >
        {headerText}
         </text> */}

        {/* Ticks and labels */}
        {ticks.map(({ value, xOffset }) => (
            <g
            key={value}
            transform={`translate(${xOffset}, 0)`}
            shapeRendering={"crispEdges"}
            >
            <line
                y1={TICK_LENGTH}
                y2={-height - TICK_LENGTH}
                stroke="#2d2e2d"
                strokeWidth={1}
            />
            <text
                key={value}
                style={{
                fontSize: "16px",
                textAnchor: "middle",
                transform: "translateY(20px)",
                fill: "#2d2e2d",
                }}
            >
                {value}
            </text>
            </g>
      ))}


    </>
  );
};
