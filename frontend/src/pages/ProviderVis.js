import { useEffect, useState } from "react";
import axios from "axios";
import ProviderVisMap from "../components/ProviderVisMap";

const ProviderVis = () => {
    const URL = "https://api.feedingspace.city/"

    const [vis1Data, setVis1Data] = useState({});

    const mostFoodSourceVisualization = async () => {
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
                    result.num += 1;
                }
            });
        });
        
        
        // for (let i = 0; i < result.length; i++) {
        //     if (result[i].lat !== 0) {
        //         axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&address=${result[i].zipcode}`);
        //     }
        // }
        setVis1Data(result);
        console.log(result);
    }

    useEffect(() => {
        mostFoodSourceVisualization();
    }, []);

  return (
    <ProviderVisMap
    zipcodes={{}}>

    </ProviderVisMap>
  );
};

export default ProviderVis;
