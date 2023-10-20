import axios from "axios";

const URL = "https://www.centralvalleyfarmaid.me/api/"

export const fetchLocations = async(page) => {
    let response = await axios.get(`${URL}GetAllLocations?page=${page}`);
    return response.data;
}

export const fetchLocationsLength = async() => {
    let response = await axios.get(`${URL}GetAllLocations`);
    return response.data.instance_count;
}

export const fetchNonProfits = async(page) => {
    let response = await axios.get(`${URL}GetAllNonProfit?page=${page}`);
    return response.data;
}

export const fetchNonProfitsLength = async() => {
    let response = await axios.get(`${URL}GetAllNonProfit`);
    return response.data.instance_count;
}

export const fetchMarkets = async(page) => {
    let response = await axios.get(`${URL}GetAllMarkets?page=${page}`);
    return response.data;
}

export const fetchMarketsLength = async() => {
    let response = await axios.get(`${URL}GetAllMarkets`);
    return response.data.instance_count;
}
