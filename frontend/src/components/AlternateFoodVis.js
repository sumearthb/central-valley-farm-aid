import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import data from './houston.json';
import axios from 'axios';
    
const AlternateFoodVis = () => {
    const URL = "https://api.feedingspace.city/"

    const [zipcodes, setZipcodes] = useState({});
    const ref = useRef();

    const height = 1500;
    const width = 1500;
    
    const svg = d3.select(ref.current)

    const geoJson = topojson.feature(data, data.objects["tx_texas_zip_codes_geo"])

    const projection = d3.geoMercator()
        .scale(width * 25)
        .center([-94.85, 29.2])
        .translate([width / 2, height / 2]);


    svg.selectAll('path')
        .data(geoJson.features)
        .enter()
        .append('path')
        .attr('d', d3.geoPath().projection(projection))
        .attr('fill', '#ddd')
        .attr('stroke', '#fff')
        .attr('stroke-width', '.5')


    const fetchData = async () => {
        // Get the zipcodes
        let response = await axios.get(`${URL}get_all_zipcodes?page=1&per_page=1000`);
        let result = [];
        response.data.forEach(e => {
            result.push({
                zipcode: e.zip_code,
                num: 0,
                lat: 0,
                long: 0
            });
        });

        // Get the alt food sources
        response = await axios.get(`${URL}get_all_altfoodsources?page=1&per_page=1000`);
        response.data.forEach(e => {
            result.forEach(r => {
                if (e.zip_code === r.zipcode) {
                    r.num += 1;
                }
            });
        });
        
        let newresult = []
        for (let i = 0; i < result.length; i++) {
            if (result[i].num !== 0) {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&address=${result[i].zipcode}`)
                .then(r => {
                    result[i].lat = r.data.results[0].geometry.location.lat;
                    result[i].long = r.data.results[0].geometry.location.lng;
                });
                newresult.push(result[i]);
            }
        }
        setZipcodes(newresult);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        svg.selectAll('zip')
            .data(zipcodes)
            .enter()
            .append('circle')
            .attr('class', 'zip')
            .style('fill', d3.color("steelblue"))
            .attr('stroke', d3.color("steelblue"))
            .attr('stroke-width', 2)
            .attr('r', function(d) {return (5 + (d.num * 3));})
            .attr('cx', d => projection([d.long, d.lat])[0])
            .attr('cy', d => projection([d.long, d.lat])[1])
        },[zipcodes]);

    return (
        <svg width={800} height={800} id="map" ref={ref}/>
    );
};
    
export default AlternateFoodVis;