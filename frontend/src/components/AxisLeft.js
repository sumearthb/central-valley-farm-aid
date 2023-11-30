import { useMemo } from "react";
import { ScaleLinear } from "d3";

const TICK_LENGTH = 10;

export const AxisLeft = ({ yScale, pixelsPerTick, width }) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate(0, ${yOffset})`}
          shapeRendering={"crispEdges"}
        >
          <line
            x1={-TICK_LENGTH}
            x2={width + TICK_LENGTH}
            stroke="#2d2e2d"
            strokeWidth={1}
          />
          <text
            key={value}
            style={{
              fontSize: "16px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
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
