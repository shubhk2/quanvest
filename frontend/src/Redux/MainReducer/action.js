import axios from "axios";
import { CREATE_TAB, ERROR, GET_OVERVIEW_DATA, LOADING, REMOVE_ERROR, REMOVE_TAB, RESET_SEARCH_RESULTS, SEARCH_COMPANY, SET_ACTIVE_TAB, STOP_LOADING } from "./actionTypes";

export const loading = () => {
    return {
        type: LOADING,
    };
}
export const stopLoading = () => {
    return {
        type: STOP_LOADING,
    }
}
export const error = () => {
    return {
        type: ERROR,
    }
}
export const removeError = () => {
    return {
        type: REMOVE_ERROR,
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
export const getOverviewData = (payload) => {
    return {
        type: GET_OVERVIEW_DATA,
        payload
    }
}
export const createTab = (payload) => {
    return {
        type: CREATE_TAB,
        payload
    }
}
export const removeTab = (payload) => {
    return {
        type: REMOVE_TAB,
        payload
    }
}
export const setActiveTab = (payload) => {
    return {
        type: SET_ACTIVE_TAB,
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
            console.log("Successfully fetched overview data");
            dispatch(getOverviewData(res.data));
        })
        .catch((err) => {
            dispatch(error());
            throw new Error(err);
        });
}