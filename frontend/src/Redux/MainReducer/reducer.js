import { ERROR, GET_FINANCIAL_DATA, GET_OVERVIEW_DATA, LOADING, RESET_SEARCH_RESULTS, SEARCH_COMPANY, SET_SEARCHED_COMPANY } from "./actionTypes"

const initState = {
    isLoading: false,
    isError: false,
    data: [],
    searchedCompanies: [],
    selectedCompany: {}
}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case GET_OVERVIEW_DATA:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: payload
            };
        case GET_FINANCIAL_DATA:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: payload
            };
        case SEARCH_COMPANY:
            return {
                ...state,
                isLoading: true,
                isError: false,
                searchedCompanies: payload.results || []
            }
        case RESET_SEARCH_RESULTS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                searchedCompanies: []
            }
        case SET_SEARCHED_COMPANY:
            return {
                ...state,
                isLoading: false,
                isError: false,
                selectedCompany: payload
            }
        default:
            return state
    }
}