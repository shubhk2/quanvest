import '../../Styles/Components/ChatAI.css';
import * as Dialog from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { ChatMessageScreen } from './ChatMessageScreen';
import { removeChatHistory, sendChatRequest } from '../../Redux/ChatReducer/action';
import { FaTrashAlt } from "react-icons/fa";

export const ChatAI = () => {
    const dispatch = useDispatch();
    const { isLoading, chatHistory, chatHistoryMap } = useSelector((state) => state.chatReducer);
    const [selectedChat, setSelectedChat] = useState(0);
    const [chatQuery, setChatQuery] = useState('');

    const textareaRef = useRef(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setChatQuery(textarea.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            dispatch(sendChatRequest(chatQuery, selectedChat, chatHistory.length + 1, setSelectedChat))
        }
    };

    useEffect(() => {
        setChatQuery('');
    }, [selectedChat]);

    return (
        <Dialog.Root className="chat-ai">
            <Dialog.Trigger asChild>
                <button className="chat-ai-Button violet">Ask Copilot</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="chat-ai-DialogOverlay" />
                <Dialog.Content className="chat-ai-DialogContent">
                    <Dialog.Title className="chat-ai-DialogTitle">Quanvest Copilot</Dialog.Title>

                    <div className="chat-ai-copilot-container">
                        <div className='chat-ai-history'>
                            <button className={`button-secondary ${selectedChat === 0 && 'active'}`} onClick={() => setSelectedChat(0)}>New Chat</button>
                            <hr />
                            <div className='history-buttons'>
                                {
                                    chatHistory.map(chatId => {
                                        const chatHistoryTitle = chatHistoryMap[chatId]?.title || `Chat ${chatId}`;
                                        return (
                                            <button key={chatId} className={`button-secondary chat-history-tabs ${selectedChat === chatId && 'active'}`} onClick={() => setSelectedChat(chatId)}><span>{chatHistoryTitle}</span><FaTrashAlt className='remove-chat-history' onClick={e => { e.stopPropagation(); dispatch(removeChatHistory({ chatId })); setSelectedChat(0) }} /></button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='chat-ai-message-screen'>
                            <div className="chat-ai-message-preview">
                                {
                                    selectedChat === 0 ?
                                        <div className="chat-ai-welcome-message">
                                            <h2>Welcome to Quanvest Copilot</h2>
                                            <p>Start a new chat or select an existing one to view messages.</p>
                                            <p>Type your message in the input box below to interact with the AI.</p>
                                        </div>
                                        :
                                        <ChatMessageScreen chatId={selectedChat} />
                                }
                            </div>
                            <div className="chat-ai-message-input">
                                <textarea disable={isLoading} ref={textareaRef} id='message-input' rows={1} onKeyDown={handleKeyDown} onInput={handleInput} value={chatQuery} placeholder="Type your prompt here..." ></textarea>
                            </div>
                        </div>
                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}