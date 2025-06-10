import axios from "axios";
import { CREATE_CHAT_HISTORY, ERROR, LOADING, REMOVE_CHAT_HISTORY, SET_CHAT_HISTORY, SET_CURRENT_LLM_RESPONSE } from "./actionTypes"

export const loading = () => {
    return {
        type: LOADING,
    };
}
export const error = () => {
    return {
        type: ERROR,
    }
}
export const createChatHistory = payload => {
    return {
        type: CREATE_CHAT_HISTORY,
        payload
    }
}
export const setChatHistory = (payload) => {
    return {
        type: SET_CHAT_HISTORY,
        payload
    }
}
export const removeChatHistory = (payload) => {
    return {
        type: REMOVE_CHAT_HISTORY,
        payload
    }
}
export const setCurrentLLMResponse = (payload) => {
    return {
        type: SET_CURRENT_LLM_RESPONSE,
        payload
    }
}

export const sendChatRequest = (query, chatId, historyLength, setSelectedChat) => dispatch => {
    dispatch(loading());
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            "user_query": query,
            "company_ids": [
                0
            ],
            "context": {
                "additionalProp1": {}
            },
            "raw_only": false
        }),
        url: `${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL_LOCAL}/copilot/ask`
    }
    return axios(config)
        .then(res => {
            dispatch(setCurrentLLMResponse(res.data));
            if (chatId) {
                const payload = {
                    chatId,
                    historyData: {
                        query: query,
                        response: res.data,
                        timestamp: new Date().toISOString()
                    }
                }
                dispatch(setChatHistory(payload))
            } else {
                const payload = {
                    chatId: historyLength,
                    title: query || `Chat ${chatId}`,
                    historyData: {
                        query: query,
                        response: res.data,
                        timestamp: new Date().toISOString()
                    }
                }
                dispatch(createChatHistory(payload))
                setSelectedChat(historyLength);
            }
            return true;
        })
        .catch(err => {
            console.error(err?.response?.data || err);
            dispatch(error());
        })
}