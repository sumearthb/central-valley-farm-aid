import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import data from './visualizationData/us_data.json'
import ch_data from './visualizationData/charityCountyMapping.json'

const californiaCounties = ["Alameda","Alpine","Amador","Butte","Calaveras","Colusa","Contra Costa","Del Norte","El Dorado","Fresno","Glenn","Humboldt","Imperial","Inyo","Kern","Kings","Lake","Lassen","Los Angeles","Madera","Marin","Mariposa","Mendocino","Merced","Modoc","Mono","Monterey","Napa","Nevada","Orange","Placer","Plumas","Riverside","Sacramento","San Benito","San Bernardino","San Diego","San Francisco","San Joaquin","San Luis Obispo","San Mateo","Santa Barbara","Santa Clara","Santa Cruz","Shasta","Sierra","Siskiyou","Solano","Sonoma","Stanislaus","Sutter","Tehama","Trinity","Tulare","Tuolumne","Ventura","Yolo","Yuba"];


const CharitiesMapVis = ({ chData }) => {
  const ref = useRef();

  useEffect(() => {

    const width = 1100;
    const height = 800;

    let svg = d3.select(ref.current)
        .on("click", reset);

    const zoom = d3.zoom()
        .scaleExtent([1, 2])
        .on("zoom", zoomed);
    
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
    let projection = d3.geoIdentity().fitSize([width, height], state_data[0])
    let path = d3.geoPath().projection(projection);

    const california = g.append('g')
    //   .attr('transform', `scale(2)`)
      .attr('class', 'states')
      .selectAll('path')
      .data(state_data)
      .join('path')
      .attr('class', 'state')
      .attr('d', path)
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

    let counties = g.append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(stateCounties)
    .join('path')
    .attr('clip-path', 'url(#clip-state)')
    .attr('class', 'county')
    .attr('d', path)
    .on('click', clicked)
    .on('mouseover', function (event, d) {
        this.classList.add('hovered')
        tooltip.transition()
              .style('opacity', 1)
        tooltip.text(d.properties.name).style('display', 'block')
    })
    .on('mousemove', function (event, d) {
        tooltip
            .style('top', (event.pageY - 10) + 'px')
            .style('left', (event.pageX + 10) + 'px')
    })
    .on('mouseout', function (event, d) {
        this.classList.remove('hovered')
        tooltip.transition()
               .style('opacity', 0)
    });


    function zoomed(event) {
        const {transform} = event;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
    }

    function reset() {
        counties.transition().style("fill", null);
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
      }

    function clicked(event, d) {
      this.classList.remove('hovered')
        tooltip.transition()
               .style('opacity', 0)
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        event.stopPropagation();
        counties.transition().style("fill", null);
        d3.select(this).transition().style("fill", "orange");
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(2, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, svg.node())
        );
        let county_np = ch_data[d.properties.name]
        // All works up to here
        county_np.forEach(coordinates => {
          const [longitude, latitude] = coordinates;
          const [x, y] = projection([longitude, latitude]);
          console.log(x)
          console.log(y)
        
          svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 5) // Adjust the radius as needed
            .attr("fill", "red"); // Adjust the color as needed
        });
      }


  }, []);

  return (
    <svg width={3000} height={1000} id="map" ref={ref} />
  );
};

export default CharitiesMapVis;