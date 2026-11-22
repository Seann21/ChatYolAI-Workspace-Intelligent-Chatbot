"use client";

import React, { useRef, useEffect } from 'react';
import { ArrowUp, Square } from './Icons';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: () => void;
  isGenerating: boolean;
  onStopGenerating: () => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSendMessage,
  isGenerating,
  onStopGenerating,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      // Cap max height to ~200px
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isGenerating && input.trim() && !disabled) {
        onSendMessage();
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) {
      onStopGenerating();
    } else if (input.trim() && !disabled) {
      onSendMessage();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4">
      <form
        onSubmit={handleFormSubmit}
        className="relative flex items-end gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 sm:p-2.5 shadow-xl shadow-black/40 focus-within:border-indigo-500/80 focus-within:ring-1 focus-within:ring-indigo-500/40 transition-all"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Kirim pesan ke ChatYol AI... (Shift + Enter untuk baris baru)"
          disabled={disabled}
          rows={1}
          className="w-full resize-none bg-transparent px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none min-h-[40px] max-h-[200px] leading-relaxed"
        />

        <div className="flex-shrink-0 flex items-center mb-0.5">
          {isGenerating ? (
            <button
              type="button"
              onClick={onStopGenerating}
              className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-sm cursor-pointer"
              title="Hentikan respons"
            >
              <Square size={16} className="fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
              title="Kirim pesan"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </form>

      <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-zinc-500">
        <span>Tekan Enter untuk kirim, Shift + Enter untuk baris baru</span>
        <span className="hidden sm:inline">Didukung oleh Groq LPU</span>
      </div>
    </div>
  );
};

export default ChatInput;

