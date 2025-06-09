import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

export const ChatMessageScreen = ({ chatId }) => {

    const dispatch = useDispatch();
    const { } = useSelector(state => state.chatReducer);

    useEffect(() => {

    }, [chatId])
    return (
        <div className="chat-ai-history-preview">

        </div>
    )
}