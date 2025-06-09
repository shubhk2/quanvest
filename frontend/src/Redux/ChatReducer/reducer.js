import { ERROR, LOADING, REMOVE_CHAT_HISTORY, SET_CHAT_HISTORY, SET_CURRENT_LLM_RESPONSE } from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    chatHistory: [],
    chatHistoryMap: {},
    currentLLMResponse: {}
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
        case SET_CHAT_HISTORY:
            return {
                ...state,
                isLoading: false,
                isError: false,
                chatHistory: payload.chatId,
                chatHistoryMap: { ...state.chatHistoryMap, [payload.chatId]: payload.chatHistory }
            };
        case REMOVE_CHAT_HISTORY:
            return {
                ...state,
                isLoading: false,
                isError: false,
                chatHistory: state.chatHistory.filter(chatId => chatId !== payload.chatId),
                chatHistoryMap: Object.keys(state.chatHistoryMap)
                    .filter(chatId => chatId !== payload.chatId)
                    .reduce((acc, chatId) => {
                        acc[chatId] = state.chatHistoryMap[chatId];
                        return acc;
                    }, {})
            };
        case SET_CURRENT_LLM_RESPONSE:
            return {
                ...state,
                isLoading: false,
                isError: false,
                currentLLMResponse: {
                    ...state.currentLLMResponse,
                    [payload.chatId]: payload.response
                }
            };
        default:
            return state;
    }
}