import axios from "axios";
import { GET_OVERVIEW_DATA, RESET_SEARCH_RESULTS, SEARCH_COMPANY, SET_SEARCHED_COMPANY } from "./actionTypes";

export const loading = () => {
    return {
        type: "LOADING",
    };
}
export const error = () => {
    return {
        type: "ERROR",
    }
}
export const searchCompany = (payload) => {
    return {
        type: SEARCH_COMPANY,
        payload
    }
}
export const resetSearchResults = () => {
    return {
        type: RESET_SEARCH_RESULTS
    }
}
export const setSearchedCompany = (payload) => {
    return {
        type: SET_SEARCHED_COMPANY,
        payload
    }
}
export const getOverviewData = (payload) => {
    return {
        type: GET_OVERVIEW_DATA,
        payload
    }
}

export const searchCompanyFunc = (searchString, limit = 10) => dispatch => {
    dispatch(loading());
    const request = {
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL}/search/companies?q=${searchString}&limit=${limit}`
    }
    return axios(request)
        .then((res) => {
            dispatch(searchCompany(res.data));
        })
        .catch((err) => {
            console.error(err);
            dispatch(error());
        });
}
export const getOverviewDataFunc = id => dispatch => {
    dispatch(loading());
    const request = {
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL}/overview/company/${id}`
    }
    return axios(request)
        .then((res) => {
            dispatch(getOverviewData(res.data));
        })
        .catch((err) => {
            console.error(err);
            dispatch(error());
        });
}