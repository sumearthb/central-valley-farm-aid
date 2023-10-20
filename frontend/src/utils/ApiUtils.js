import axios from "axios";

const URL = "https://www.centralvalleyfarmaid.me/api/"

export const getAllLocations = async() => {
    let response = await axios.get(`${URL}GetAllLocations`);
    return response.data;
}

export const getCountyImg = async(county) => {
    let place = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=photo&input=${county} County&inputtype=textquery&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`
    );
    let photo_ref = place.data.candidates[0].photos[0].photo_reference;
    let place_photo = await axios.get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_ref}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`,
        {responseType: 'blob'}
    );
    return URL.createObjectURL(place_photo.data);
}