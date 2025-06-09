import { ERROR, LOADING, REMOVE_CHAT_HISTORY, SET_CHAT_HISTORY, SET_CURRENT_LLM_RESPONSE } from "./actionTypes"

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