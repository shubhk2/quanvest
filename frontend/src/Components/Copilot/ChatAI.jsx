import Plot from 'react-plotly.js';
import '../../Styles/Components/ChatAI.css';
import * as Dialog from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ChatMessageScreen } from './ChatMessageScreen';

export const ChatAI = () => {
    const dispatch = useDispatch();
    const { chatHistory, chatHistoryMap } = useSelector((state) => state.chatReducer);
    const [selectedChat, setSelectedChat] = useState(0);

    useEffect(() => {

    }, [dispatch, chatHistory, chatHistoryMap]);

    return (
        <Dialog.Root className="chat-ai">
            <Dialog.Trigger asChild>
                <button className="chat-ai-Button violet">Ask with Copilot</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="chat-ai-DialogOverlay" />
                <Dialog.Content className="chat-ai-DialogContent">
                    <Dialog.Title className="chat-ai-DialogTitle">Quanvest Copilot</Dialog.Title>

                    <div className="chat-ai-copilot-container">
                        <div className='chat-ai-history'>
                            <button onClick={() => setSelectedChat(0)}>New Chat</button>
                            <hr />
                            {
                                chatHistory.map(chatId => {
                                    const chatHistoryTitle = chatHistoryMap[chatId]?.title || `Chat ${chatId}`;
                                    return (
                                        <button key={chatId} onClick={() => setSelectedChat(chatId)}>{chatHistoryTitle}</button>
                                    )
                                })
                            }
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
                                <textarea id='message-input' placeholder="Type your message here..." ></textarea>
                            </div>
                        </div>
                    </div>

                    <Dialog.Close asChild>
                        <button aria-label="Close">
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}