import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import data from './houston.json';
    
const ProviderVisMap = ({zipcodes}) => {
    const ref = useRef();

    useEffect(() => {
        let svg = d3.select(ref.current)

        let geoJson = topojson.feature(data, data.objects["tx_texas_zip_codes_geo"])

        let projection = d3.geoMercator()
            .scale(1000 * 25)
            .center([-95, 29.5])
            .translate([1000 / 2, 1000 / 2])

 
        svg.selectAll('path')
            .data(geoJson.features)
            .enter()
            .append('path')
            .attr('d', d3.geoPath().projection(projection))
            .attr('fill', '#ddd')
            .attr('stroke', '#fff')
            .attr('stroke-width', '.5')
            
        svg.selectAll('.zip')
            .data(zipcodes)
            .enter()
            .append('circle')
            .attr('class', 'zip')
            .style('fill', "#fff")
            .attr('stroke', "#fff")
            .attr('stroke-width', 2)
            .attr('r', 5)
            .attr('cx', d => projection([d.long, d.lat])[0])
            .attr('cy', d => projection([d.long, d.lat])[1])
        },[]);

    return (
        <svg width={800} height={600} id="map" ref={ref} />
    );
};
    
export default ProviderVisMap;