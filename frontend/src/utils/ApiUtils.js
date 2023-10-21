import axios from "axios";

const URL = "https://www.centralvalleyfarmaid.me/api/"

export const fetchSpecLocation = async(county_name) => {
    let response = await axios.get(`${URL}GetLocations/${county_name}`);
    return response.data;
}

export const fetchLocations = async(page, per_page) => {
    let response = await axios.get(`${URL}GetAllLocations?page=${page}&per_page=${per_page}`);
    return response.data;
}

export const fetchLocationsLength = async() => {
    let response = await axios.get(`${URL}GetNumLocations`);
    return response.data.count;
}

export const fetchSpecNonProfit = async(charity_name) => {
    let response = await axios.get(`${URL}GetNonProfit/${charity_name}`);
    return response.data;
}

export const fetchNonProfits = async(page, per_page) => {
    let response = await axios.get(`${URL}GetAllNonProfit?page=${page}&per_page=${per_page}`);
    return response.data;
}

export const fetchNonProfitsLength = async() => {
    let response = await axios.get(`${URL}GetNumNonProfits`);
    return response.data.count;
}

export const fetchSpecMarket = async(market_name) => {
    let response = await axios.get(`${URL}GetLocations/${market_name}`);
    return response.data;
}

export const fetchMarkets = async(page, per_page) => {
    let response = await axios.get(`${URL}GetAllMarkets?page=${page}&per_page=${per_page}`);
    return response.data;
}

export const fetchMarketsLength = async() => {
    let response = await axios.get(`${URL}GetNumMarkets`);
    return response.data.count;
}
