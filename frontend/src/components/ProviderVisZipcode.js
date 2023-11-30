import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import data from './visualizationData/feedingSpaceZipcodeData.json';
    
const MARGIN = { top: 80, right: 80, bottom: 80, left: 80 };
const width = 1000
const height = 90

const ProviderVisScatterPlot = () => {
    // Layout. The div size is set by the given props.
    // The bounds (=area inside the axis) is calculated by substracting the margins
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    // find the min and max of incomes and populations 
    const dataMaxMin = maxMinOfLongAndLat(data)

    // Scales 
    // Will have the Income
    const yScale = d3.scaleLinear().domain([dataMaxMin["minIncome"] - 2500, dataMaxMin["maxIncome"] + 2500]).range([boundsHeight, 0]);
    // Will have Population
    const xScale = d3.scaleLinear().domain([dataMaxMin["minPopulation"] - 5000, dataMaxMin["maxPopulation"] + 5000]).range([0, boundsWidth]);

    console.log(data)
    // Build the circle shapes
    const allShapes = data.data.map((d, i) => {
        console.log(d)
        return (
            <circle
                key={i} 
                r={13}
                cx={xScale(d[2])}
                cy={yScale(d[1])}
                opacity={1}
                stroke="#58a36b"
                fill="#58a36b"
                fillOpacity={0.3}
                strokeWidth={1}
            />
        );
    });

// Axis labels
    return (
        <div>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                >

                    {/* Y axis */}–
                    <text x="-5" y={((height/2)).toString()} text-anchor="middle" dominant-baseline="hanging" transform="rotate(-90, -60, 470)" font-size="22" font-weight="bold">Income</text>
                    <AxisLeft yScale={yScale} pixelsPerTick={50} width={boundsWidth} headerText={"Income in Dollars"} />


                    {/* X axis, use an additional translation to appear at the bottom */}
                    <g transform={`translate(0, ${boundsHeight})`}>
                        <text x={((width/2) - 50).toString()} y="40" text-anchor="middle" dominant-baseline="hanging" font-size="22" font-weight="bold">Population</text>
                        <AxisBottom xScale={xScale} pixelsPerTick={100}height={boundsHeight} />
                    </g>

                    {/* Circles */}
                    {allShapes}
                </g>
            </svg>
        </div>
    );
};


const maxMinOfLongAndLat = (jsonData) => {
        // Initialize variables to hold the max and min values
    let maxIncome = Number.NEGATIVE_INFINITY;
    let minIncome = Number.POSITIVE_INFINITY;
    let maxPopulation = Number.NEGATIVE_INFINITY;
    let minPopulation = Number.POSITIVE_INFINITY;

    // Iterate through the data array
    jsonData.data.forEach(entry => {
        const income = entry[1];
        const population = entry[2];

        // Update max and min values
        maxIncome = Math.max(maxIncome, income);
        minIncome = Math.min(minIncome, income);
        maxPopulation = Math.max(maxPopulation, population);
        minPopulation = Math.min(minPopulation, population);
    });

    var results = { 
        "maxIncome": maxIncome, 
        "maxPopulation": maxPopulation,
        "minPopulation": minPopulation,
        "minIncome": minIncome
    }

    return results
}

    
export default ProviderVisScatterPlot;
