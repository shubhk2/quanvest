import axios from "axios";
import { CREATE_TAB, ERROR, GET_FINANCIAL_DATA, GET_OVERVIEW_DATA, GET_OVERVIEW_GRAPH_DATA, LOADING, REMOVE_ERROR, REMOVE_TAB, RESET_SEARCH_RESULTS, SEARCH_COMPANY, SET_ACTIVE_TAB, STOP_LOADING } from "./actionTypes";

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
export const getOverviewGraphData = (payload) => {
    return {
        type: GET_OVERVIEW_GRAPH_DATA,
        payload
    }
}
export const getFinancialData = (payload) => {
    return {
        type: GET_FINANCIAL_DATA,
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
        url: `${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL_LOCAL}/search/companies?q=${searchString}&limit=${limit}`
    }
    return axios(request)
        .then((res) => {
            dispatch(searchCompany(res.data));
        })
        .catch((err) => {
            console.error(err?.response?.data || err);
            dispatch(error());
        });
}
export const getCompanyDetailsById = id => dispatch => {
    dispatch(loading());
    const request = {
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL_LOCAL}/search/company/${id}`
    }
    return axios(request)
        .then(res => {
            return res?.data?.result || {};
        })
        .catch(err => {
            console.error(err?.response?.data || err);
            dispatch(error());
            return {};
        })
}
export const getOverviewDataFunc = id => dispatch => {
    dispatch(loading());
    const request = {
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL_LOCAL}/overview/company/${id}`
    }
    return axios(request)
        .then((res) => {
            dispatch(getOverviewData({ data: res.data }));
            // dispatch(getOverviewGraphDataFunc(id));
        })
        .catch((err) => {
            dispatch(error());
            throw new Error(err?.response?.data || err);
        });
}
export const getOverviewGraphDataFunc = (id, type = "price", period = "10yr") => dispatch => {
    dispatch(loading());
    const request = {
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL_LOCAL}/stock_data/${type}/${period}/chart?company_number=${id}`
    }
    return axios(request)
        .then((res) => {
            dispatch(getOverviewGraphData({ data: res.data }));
        })
        .catch((err) => {
            dispatch(error());
            throw new Error(err?.response?.data || err);
        });
}
export const getFinancialDataFunc = (id, type, start = '', end = '') => dispatch => {
    dispatch(loading());
    const request = {
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL_LOCAL}/financials?company_number=${id}&statement_type=${type}`
    }
    if (start) request.url += `&start_year=${start}`;
    if (end) request.url += `&end_year=${end}`;
    return axios(request)
        .then(res => {
            console.log(res.data);
            dispatch(getFinancialData({ type, data: res.data }));
        })
        .catch(err => {
            console.error(err?.response?.data || err);
            dispatch(error());
        })
}