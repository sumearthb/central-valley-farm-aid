import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { fetchAllLocations } from "../utils/ApiUtils";

const Visualizations = () => {
  const visualizationRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedLocations = await fetchAllLocations();
      setLocations(fetchedLocations.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Checks if data is available before rendering chart
    if (locations.length > 0) {
      const data = locations.map((location) => ({
        name: location.name,
        numCrops: location.crops.crops.length,
      }));

      // Chart dimensions
      const width = 1200;
      const height = width / 2;
      const margin = { top: 50, right: 50, bottom: 70, left: 70 };

      // If we want to order by largest number of crops
      //data.sort((a, b) => b.numCrops - a.numCrops);

      // Scales
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.numCrops)])
        .range([height - margin.bottom, margin.top]);

      // Clears previous chart for data change but data won't change
      //d3.select(visualizationRef.current).selectAll("*").remove();

      // Container for bar plot 
      const svg = d3.select(visualizationRef.current).append("svg").attr("width", width).attr("height", height);

      // Bars data
      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.name))
        .attr("y", (d) => yScale(d.numCrops))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - margin.bottom - yScale(d.numCrops))
        .attr("fill", "steelblue");

      // X-axis
      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      // Y-axis
      svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

      // Axis labels
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .text("Location");

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2) - 50)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("Number of Crops");
    }
  }, [locations]);

  return <div ref={visualizationRef}></div>;
};

export default Visualizations;
