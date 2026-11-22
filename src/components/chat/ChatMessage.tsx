"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, RotateCw, User } from './Icons';
import MarkdownRenderer from './MarkdownRenderer';
import { ChatMessageItem } from '@/utils/groq';

interface ChatMessageProps {
  message: ChatMessageItem;
  isLastAssistant?: boolean;
  isGenerating?: boolean;
  onRegenerate?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isLastAssistant = false,
  isGenerating = false,
  onRegenerate,
}) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState('/Chatyol-ai.png');

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (ts?: number) => {
    if (!ts) return '';
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div
      className={`py-4 px-4 sm:px-6 transition-colors ${
        isUser ? 'bg-transparent' : 'bg-zinc-900/40 border-y border-zinc-800/40'
      }`}
    >
      <div className="max-w-3xl mx-auto flex gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {isUser ? (
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
              <User size={16} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center overflow-hidden p-0.5">
              <Image
                src={imgSrc}
                alt="ChatYol AI"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                onError={() => setImgSrc('/Chatyol.svg')}
              />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-300">
                {isUser ? 'Anda' : 'ChatYol AI'}
              </span>
              {message.modelName && !isUser && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                  {message.modelName}
                </span>
              )}
            </div>
            {message.timestamp && (
              <span className="text-[11px] text-zinc-500">
                {formatTime(message.timestamp)}
              </span>
            )}
          </div>

          {/* Text / Markdown Body */}
          <div className="text-sm leading-relaxed text-zinc-200 break-words">
            {isUser ? (
              <div className="whitespace-pre-wrap">{message.content}</div>
            ) : (
              <div>
                <MarkdownRenderer content={message.content} />
                {isGenerating && isLastAssistant && (
                  <span className="inline-block w-2 h-4 ml-1 bg-indigo-400 animate-pulse align-middle" />
                )}
              </div>
            )}
          </div>

          {/* Action Toolbar for Assistant */}
          {!isUser && message.content && (
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-zinc-800/60">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 py-1 px-2 rounded hover:bg-zinc-800/60 transition-colors"
                title="Salin pesan"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Salin</span>
                  </>
                )}
              </button>

              {isLastAssistant && !isGenerating && onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 py-1 px-2 rounded hover:bg-zinc-800/60 transition-colors"
                  title="Kirim ulang prompt"
                >
                  <RotateCw size={13} />
                  <span>Kirim Ulang</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

