import axios from "axios";

const URL = "https://www.centralvalleyfarmaid.me/api/"

export const fetchSpecLocation = async(county_name) => {
    let response = await axios.get(`${URL}GetLocations/${county_name}`);
    return response.data;
}

export const fetchLocations = async(page, per_page, sort_by, order_by, search) => {
    let request = `${URL}GetAllLocations?page=${page}&per_page=${per_page}&sort_order=${order_by}`
    if (sort_by) {
        request += `&sort_by=${sort_by}`
    }
    if (search) {
        request += `&search=${search}`
    }
    let response = await axios.get(request);
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

export const fetchNonProfits = async(page, per_page, sort_by, order_by, search, category) => {
    let request = `${URL}GetAllNonProfit?page=${page}&per_page=${per_page}&sort_order=${order_by}`
    if (sort_by) {
        request += `&sort_by=${sort_by}`
    }
    if (search) {
        request += `&search=${search}`
    }
    if (category) {
        request += `&category=${category}`
    }
    let response = await axios.get(request);
    return response.data;
}

export const fetchNonProfitsLength = async() => {
    let response = await axios.get(`${URL}GetNumNonProfits`);
    return response.data.count;
}

export const fetchSpecMarket = async(market_name) => {
    let response = await axios.get(`${URL}GetMarket/${market_name}`);
    return response.data;
}

export const fetchMarkets = async(page, per_page, sort_by, order_by, search, wheelchair_accessible, indoors) => {
    let request = `${URL}GetAllMarkets?page=${page}&per_page=${per_page}&sort_order=${order_by}`
    if (sort_by) {
        request += `&sort_by=${sort_by}`
    }
    if (search) {
        request += `&search=${search}`
    }
    if (wheelchair_accessible) {
        request += `&wheelchair_accessible=${wheelchair_accessible}`
    }
    if (indoors) {
        request += `&indoor_status=${indoors}`
    }
    let response = await axios.get(request);
    return response.data;
}

export const fetchMarketsLength = async() => {
    let response = await axios.get(`${URL}GetNumMarkets`);
    return response.data.count;
}
