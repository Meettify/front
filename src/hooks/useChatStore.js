// src/hooks/useChatStore.js
import { create } from 'zustand';

export const useChatStore = create((set) => ({
    lastMessages: {},
    setLastMessage: (username, message) =>
        set((state) => ({
            lastMessages: {
                ...state.lastMessages,
                [username]: {
                    text: message.text,
                    timestamp: new Date().toLocaleTimeString(), // 타임스탬프 추가
                },
            },
        })),
}));
