import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import data from './visualizationData/us_data.json'

const californiaCounties = ["Alameda","Alpine","Amador","Butte","Calaveras","Colusa","Contra Costa","Del Norte","El Dorado","Fresno","Glenn","Humboldt","Imperial","Inyo","Kern","Kings","Lake","Lassen","Los Angeles","Madera","Marin","Mariposa","Mendocino","Merced","Modoc","Mono","Monterey","Napa","Nevada","Orange","Placer","Plumas","Riverside","Sacramento","San Benito","San Bernardino","San Diego","San Francisco","San Joaquin","San Luis Obispo","San Mateo","Santa Barbara","Santa Clara","Santa Cruz","Shasta","Sierra","Siskiyou","Solano","Sonoma","Stanislaus","Sutter","Tehama","Trinity","Tulare","Tuolumne","Ventura","Yolo","Yuba"];


const FarmerMarketMapVis = ({ farmersData }) => {
  const ref = useRef();

  useEffect(() => {
    let svg = d3.select(ref.current);
    const g = svg.append('g')
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('display', 'none')
        .style('background', '#333')
        .style('border-radius', '2px')
        .style('color', '#fff')
        .style('font-size', '12px')
        .style('padding', '4px');
    
    // State logic
    let state_data = topojson.feature(data, data.objects.states).features.filter((d) => d.properties.name === 'California');

    g.append('g')
      .attr('class', 'states')
      .selectAll('path')
      .data(state_data)
      .join('path')
      .attr('class', 'state')
      .attr('d', d3.geoPath().projection(d3.geoIdentity().fitSize([800, 600], state_data[0])))
      .attr('fill', '#ddd')
    //   .attr('stroke', '#fff')
    //   .attr('stroke-width', '.5')
      .attr('id', 'state');
    

    g.append('clipPath')
    .attr('id', 'clip-state')
    .append('use')
    .attr('xlink:href', '#state');


    // County logic
    let countiesTopology = topojson.feature(data, data.objects.counties);
    let stateCounties = countiesTopology.features.filter(county => californiaCounties.includes(county.properties.name));

    g.append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(stateCounties)
    .join('path')
    .attr('clip-path', 'url(#clip-state)')
    .attr('class', 'county')
    .attr('d', d3.geoPath().projection(d3.geoIdentity().fitSize([800, 600], state_data[0])))
    .on('mouseover', function (event, d) {
        console.log(d)
        this.classList.add('hovered')
        tooltip.text(d.properties.name).style('display', 'block')
    })
    .on('mousemove', function (event, d) {
        tooltip
            .style('top', (event.pageY - 10) + 'px')
            .style('left', (event.pageX + 10) + 'px')
    })
    .on('mouseout', function (event, d) {
        this.classList.remove('hovered')
        tooltip.style('display', 'none')
    });
  });

  return (
    <svg width={3000} height={2000} id="map" ref={ref} />
  );
};

export default FarmerMarketMapVis;