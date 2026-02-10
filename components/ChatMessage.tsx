
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ACCENT_COLOR_HEX, PURPLE_COLOR_HEX, BORDER_COLOR_HEX } from '../constants';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';
  const isPremium = message.isPremium;

  const msgClasses = `
    max-w-[85%] p-3 md:p-4 rounded-xl text-sm md:text-base leading-relaxed
    ${isUser ? 'self-end bg-accent-blue text-white rounded-br-sm' : ''}
    ${!isUser && !isPremium ? 'self-start bg-slate-800 border border-border-primary rounded-bl-sm' : ''}
    ${!isUser && isPremium ? 'self-start bg-gradient-to-br from-violet-900 to-slate-900 border border-accent-purple rounded-bl-sm' : ''}
  `;

  return (
    <div className={msgClasses} style={isUser ? { backgroundColor: ACCENT_COLOR_HEX } : isPremium ? { borderColor: PURPLE_COLOR_HEX } : { borderColor: BORDER_COLOR_HEX, backgroundColor: '#1e293b' }}>
      {message.text}
    </div>
  );
};
