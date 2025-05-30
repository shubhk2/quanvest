import { ERROR, GET_FINANCIAL_DATA, GET_OVERVIEW_DATA, LOADING, RESET_SEARCH_RESULTS, SEARCH_COMPANY, STOP_LOADING, REMOVE_ERROR, CREATE_TAB, REMOVE_TAB, SET_ACTIVE_TAB } from "./actionTypes"

const initState = {
    isLoading: false,
    isError: false,
    data: [],
    searchedCompanies: [],
    selectedCompany: {},
    userTabs: {
        23: {
            tabId: 'tab-23',
            companyName: 'Apple Inc.',
            companyId: 23,
        },
        45: {
            tabId: 'tab-45',
            companyName: 'Microsoft Corp.',
            companyId: 45,
        },
        67: {
            tabId: 'tab-67',
            companyName: 'Google LLC',
            companyId: 67,
        },
        89: {
            tabId: 'tab-89',
            companyName: 'Amazon.com Inc.',
            companyId: 89,
        },
        101: {
            tabId: 'tab-101',
            companyName: 'Tesla Inc.',
            companyId: 101,
        },
        121: {
            tabId: 'tab-121',
            companyName: 'Meta Platforms Inc.',
            companyId: 121,
        },
        141: {
            tabId: 'tab-141',
            companyName: 'Netflix Inc.',
            companyId: 141,
        },
        161: {
            tabId: 'tab-161',
            companyName: 'NVIDIA Corp.',
            companyId: 161,
        },
        181: {
            tabId: 'tab-181',
            companyName: 'Adobe Inc.',
            companyId: 181,
        },
        201: {
            tabId: 'tab-201',
            companyName: 'Salesforce.com Inc.',
            companyId: 201,
        },
        221: {
            tabId: 'tab-221',
            companyName: 'Intel Corp.',
            companyId: 221,
        },
        241: {
            tabId: 'tab-241',
            companyName: 'IBM Corp.',
            companyId: 241,
        },
        261: {
            tabId: 'tab-261',
            companyName: 'Oracle Corp.',
            companyId: 261,
        }
    }
}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case REMOVE_ERROR:
            return {
                ...state,
                isError: false
            }
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
                isLoading: false,
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
        case CREATE_TAB:
            return {
                ...state,
                userTabs: {
                    ...state.userTabs,
                    [payload.companyId]: {
                        tabId: payload.tabId,
                        companyName: payload.companyName,
                        companyId: payload.companyId,
                    }
                }
            }
        case REMOVE_TAB:
            const { [payload.companyId]: _, ...remainingTabs } = state.userTabs;
            return {
                ...state,
                userTabs: remainingTabs
            }
        case SET_ACTIVE_TAB:
            return {
                ...state,
                selectedCompany: state.userTabs[payload.companyId] || {}
            }
        default:
            return state
    }
}