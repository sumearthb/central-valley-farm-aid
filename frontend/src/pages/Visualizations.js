import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { fetchAllLocations, fetchNonProfitsNoParam } from "../utils/ApiUtils";
import CharitiesMapVis from "../components/CharitiesMapVis"
import { Container } from "react-bootstrap";
import '../styles/CharitiesVis.css'

const Visualizations = () => {
  const visualizationRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [nonprofits, setNonProfits] = useState([]);
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
    const fetchData = async () => {
      setLoading(true);
      const fetchedNonProfits = await fetchNonProfitsNoParam();
      setNonProfits(fetchedNonProfits.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      renderChart();
      renderPieChart();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [locations, nonprofits]);

  const renderChart = () => {
    // Checks if data is available before rendering chart
    if (locations.length > 0) {
      // If we want to order by the largest number of crops
      // locations.sort((a, b) => b.crops.crops.length - a.crops.crops.length);

      // Chart dimensions
      const width = 1000; // Adjusted width
      const height = 600; // Adjusted height
      const margin = { top: 80, right: 50, bottom: 90, left: 70 };

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

      svg
        .append("text")
        .attr("x", updatedWidth / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "1.5em")
        .style("font-weight", "bold")
        .text("Number of Crops in Different Locations");

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
        .attr("x", -(updatedHeight / 2) )
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("Number of Crops");
    }
  };

  const aggregatedNonprofits = nonprofits.reduce((acc, nonprofit) => {
    const category = nonprofit.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Convert aggregated data to an array of objects for PieChart
  const pieChartData = Object.keys(aggregatedNonprofits).map((category) => ({
    category,
    count: aggregatedNonprofits[category],
  }));

  const renderPieChart = () => {
    // Checks if data is available before rendering chart
    if (pieChartData.length > 0) {
      const pieChartWidth = 700;
      const pieChartHeight = 600;
      const pieChartRadius = Math.min(pieChartWidth - 150, pieChartHeight - 150) / 2;
      const margin = { top: 20, right: 50, bottom: 90, left: 70 };
      // Adjust the vertical translation to move the pie chart down
      const verticalTranslation = 100;
      const horizontalTranslation = -50;
      const legendWidth = 400; // Increase the legend width

      const pastelColors = [
        "#87CEEB", // Sky Blue
        "#98FB98", // Pale Green
        "#FFA07A", // Light Salmon
        "#FF6347", // Tomato
        "#F0E68C", // Khaki
        "#FFD700", // Gold
        "#AFEEEE", // Pale Turquoise
        "#7FFFD4", // Aquamarine
        "#FFB6C1", // Light Pink
        "#FFDAB9", // Peach Puff
        "#CD853F", // Peru
        "#B0E0E6"  // Powder Blue
      ];
      
      const pieColor = d3.scaleOrdinal().range(pastelColors);

      const pieSvg = d3
        .select(visualizationRef.current)
        .append("svg")
        .attr("width", pieChartWidth + legendWidth)
        .attr("height", pieChartHeight)
        .attr("transform", `translate(${horizontalTranslation}, ${verticalTranslation})`);

      pieSvg
        .append("text")
        .attr("x", pieChartWidth / 2 + 255)
        .attr("y", margin.top / 2 + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "1.5em")
        .style("font-weight", "bold")
        .text("Distribution of Nonprofits by Category");

      const pieArc = d3.arc().innerRadius(0).outerRadius(pieChartRadius);

      const pie = d3.pie().value((d) => d.count);

      const pieArcs = pieSvg
        .selectAll("arc")
        .data(pie(pieChartData))
        .enter()
        .append("g")
        .attr("transform", `translate(${pieChartWidth / 2},${pieChartHeight / 2})`);

      pieArcs
        .append("path")
        .attr("d", pieArc)
        .attr("fill", (d, i) => pieColor(i))
        .on("mouseover", function (event, d) {
          // Show count label on hover
          const centroid = pieArc.centroid(d);
          d3.select(pieSvg.node())
            .append("text")
            .attr("class", "count-label")
            .attr("transform", `translate(${centroid[0] + pieChartWidth / 2},${centroid[1] + pieChartHeight / 2})`) // Adjust the position
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(`${d.data.category} (${d.data.count})`);
        })
        .on("mouseout", function () {
          // Hide count label on mouseout
          d3.select(".count-label").remove();
        });

      // Add legend on the right side
      const legend = pieSvg
        .selectAll(".legend")
        .data(pieChartData.map((d) => d.category))
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${pieChartWidth},${i * 20 + 100})`); // Adjust the legend position

      legend
        .append("rect")
        .attr("width", 20)
        .attr("height", 18)
        .style("fill", (d, i) => pieColor(i));

      legend
        .append("text")
        .attr("x", 32)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text((d, i) => d);
    }
  };

  // Initial rendering
  useEffect(() => {
    renderChart();
    renderPieChart();
  }, [locations, pieChartData]);

  return (
    <Container>
      <Container className="vis">
        <div ref={visualizationRef} />
      </Container>
          

      <Container className="vis">
        <h2> Locations on California Map </h2>
        <CharitiesMapVis />

      </Container>


    </Container>
   
  );
};

export default Visualizations;

