
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { ACCENT_COLOR_HEX, BORDER_COLOR_HEX } from '../constants';

interface ChatInterfaceProps {
  chatHistory: ChatMessageType[];
  onChatSubmit: (query: string) => Promise<void>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatHistory, onChatSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const chatLogRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    const query = inputValue.trim();
    if (!query) return;

    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
    }
    await onChatSubmit(query);
  }, [inputValue, onChatSubmit]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="card h-[calc(100vh-250px)] md:h-[calc(100vh-270px)] flex flex-col p-0">
      <div ref={chatLogRef} className="flex-1 overflow-y-auto flex flex-col gap-3 p-4 md:p-5 pb-4">
        {chatHistory.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className="sticky bottom-0 z-10 flex gap-2 md:gap-3 p-3 md:p-4 bg-bg-primary border-t border-border-primary">
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent border border-border-primary rounded-lg text-text-primary resize-none p-2 md:p-3 outline-none text-sm md:text-base max-h-32"
          placeholder="Execute command or query Sonar..."
          rows={1}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{borderColor: BORDER_COLOR_HEX}}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-accent-blue hover:opacity-90 text-white py-2 px-4 md:px-6 rounded-lg font-semibold text-sm md:text-base flex-shrink-0"
          style={{backgroundColor: ACCENT_COLOR_HEX}}
        >
          EXECUTE
        </button>
      </div>
    </div>
  );
};
