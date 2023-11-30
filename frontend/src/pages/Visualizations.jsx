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
    const handleResize = () => {
      renderChart();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [locations]);

  const renderChart = () => {
    // Checks if data is available before rendering chart
    if (locations.length > 0) {
      // If we want to order by the largest number of crops
      // locations.sort((a, b) => b.crops.crops.length - a.crops.crops.length);

      // Chart dimensions
      const width = 1200;
      const height = width / 2;
      const margin = { top: 50, right: 50, bottom: 90, left: 70 };

      // Makes plot dynamic to page size
      const containerWidth = visualizationRef.current.clientWidth;
      const containerHeight = height;

      const updatedWidth = containerWidth - margin.left - margin.right;
      const updatedHeight = containerHeight - margin.top - margin.bottom;

      // Scales
      const xScale = d3
        .scaleBand()
        .domain(locations.map((location) => location.name))
        .range([margin.left, updatedWidth - margin.right])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(locations, (location) => location.crops.crops.length)])
        .range([updatedHeight - margin.bottom, margin.top]);

      // Clear previous chart
      d3.select(visualizationRef.current).selectAll("*").remove();

      // Container for bar plot 
      const svg = d3.select(visualizationRef.current).append("svg").attr("width", updatedWidth).attr("height", updatedHeight);

      // Bars data
      svg
        .selectAll("rect")
        .data(locations)
        .enter()
        .append("rect")
        .attr("x", (location) => xScale(location.name))
        .attr("y", (location) => yScale(location.crops.crops.length))
        .attr("width", xScale.bandwidth())
        .attr("height", (location) => updatedHeight - margin.bottom - yScale(location.crops.crops.length))
        .attr("fill", "steelblue");

      // X-axis
      svg
      .append("g")
      .attr("transform", `translate(0, ${updatedHeight - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -10)
      .attr("y", -4)
      .style("text-anchor", "end");

      // Y-axis
      svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));

      // Axis labels
      svg
        .append("text")
        .attr("x", updatedWidth / 2)
        .attr("y", updatedHeight)
        .attr("text-anchor", "middle")
        .text("Location");

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(updatedHeight / 2) - 50)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("Number of Crops");
    }
  };

  // Initial rendering
  useEffect(() => {
    renderChart();
  }, [locations]);

  return <div ref={visualizationRef}></div>;
};

export default Visualizations;
