"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  AVAILABLE_MODELS,
  SYSTEM_PROMPTS,
  streamGroqChat,
  generateChatTitle,
  ChatMessageItem,
  getApiKey,
} from '@/utils/groq';
import Header from './Header';
import Sidebar, { ChatSession } from './Sidebar';
import WelcomeHero from './WelcomeHero';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { AlertCircle, X } from './Icons';

const LOCAL_STORAGE_SESSIONS = 'chatyol_sessions_v2';
const LOCAL_STORAGE_ACTIVE_ID = 'chatyol_active_session_id';
const LOCAL_STORAGE_KEY = 'chatyol_groq_api_key';
const LOCAL_STORAGE_MODEL = 'chatyol_selected_model';
const LOCAL_STORAGE_PROMPT = 'chatyol_system_prompt_id';
const LOCAL_STORAGE_TEMP = 'chatyol_temperature';

const createNewSessionObject = (): ChatSession => ({
  id: 'session-' + Date.now(),
  title: 'Percakapan Baru',
  createdAt: Date.now(),
  messages: [],
});

export function ChatApp() {
  const [mounted, setMounted] = useState(false);

  // Chat Sessions State (lazy init from localStorage)
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_SESSIONS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse sessions from localStorage:', e);
      }
    }
    return [createNewSessionObject()];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedId = localStorage.getItem(LOCAL_STORAGE_ACTIVE_ID);
        if (savedId) return savedId;
      } catch {}
    }
    return '';
  });

  // Settings State (lazy init)
  const [apiKey, setApiKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) return saved;
      } catch {}
    }
    return getApiKey();
  });

  const [activeModelId, setActiveModelId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_MODEL);
        if (saved && AVAILABLE_MODELS.some((m) => m.id === saved)) return saved;
      } catch {}
    }
    return AVAILABLE_MODELS[0].id;
  });

  const [activeSystemPromptId, setActiveSystemPromptId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_PROMPT);
        if (saved) return saved;
      } catch {}
    }
    return 'general';
  });

  const [temperature, setTemperature] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_TEMP);
        if (saved) return parseFloat(saved);
      } catch {}
    }
    return 0.7;
  });

  // UI States
  const [input, setInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('chatyol_sidebar_open');
        if (saved !== null) return saved === 'true';
        return window.innerWidth >= 768;
      } catch {}
    }
    return true;
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!activeSessionId && sessions.length > 0) {
      setActiveSessionId(sessions[0].id);
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Failed to persist sessions:', e);
    }
  }, [sessions, mounted]);

  // Save active session id
  useEffect(() => {
    if (!mounted || !activeSessionId) return;
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_ID, activeSessionId);
  }, [activeSessionId, mounted]);

  // Save active model
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(LOCAL_STORAGE_MODEL, activeModelId);
  }, [activeModelId, mounted]);

  // Save system prompt
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(LOCAL_STORAGE_PROMPT, activeSystemPromptId);
  }, [activeSystemPromptId, mounted]);

  // Save temperature
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(LOCAL_STORAGE_TEMP, temperature.toString());
  }, [temperature, mounted]);

  // Save sidebar open state
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('chatyol_sidebar_open', sidebarOpen.toString());
  }, [sidebarOpen, mounted]);

  // Active Session helper
  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0] || createNewSessionObject();
  const currentMessages: ChatMessageItem[] = activeSession.messages || [];

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages.length, isGenerating]);

  // Create New Session
  const handleNewSession = () => {
    const newSession = createNewSessionObject();
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setErrorMessage('');
    setInput('');
  };

  // Delete Session
  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId);
      if (updated.length === 0) {
        const fresh = createNewSessionObject();
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSessionId === sessionId) {
        setActiveSessionId(updated[0].id);
      }
      return updated;
    });
  };

  // Clear All Sessions
  const handleClearAllSessions = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat percakapan?')) {
      const fresh = createNewSessionObject();
      setSessions([fresh]);
      setActiveSessionId(fresh.id);
    }
  };

  // Clear current session messages
  const handleClearCurrentChat = () => {
    if (currentMessages.length === 0) return;
    if (window.confirm('Bersihkan percakapan ini?')) {
      setSessions((prev) =>
        prev.map((s) => (s.id === activeSession.id ? { ...s, messages: [] } : s))
      );
      setErrorMessage('');
    }
  };

  // Export current chat as Markdown
  const handleExportChat = () => {
    if (currentMessages.length === 0) {
      alert('Belum ada pesan untuk diekspor.');
      return;
    }

    let markdown = `# ${activeSession.title}\n`;
    markdown += `*Tanggal: ${new Date(activeSession.createdAt).toLocaleString()}*\n\n---\n\n`;

    currentMessages.forEach((msg) => {
      const sender = msg.role === 'user' ? 'Anda' : 'ChatYol AI';
      markdown += `### ${sender}\n\n${msg.content}\n\n---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeSession.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Stop Generation
  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
  };

  // Send Message Logic
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isGenerating) return;

    setErrorMessage('');
    setInput('');

    const userMessage: ChatMessageItem = {
      id: 'msg-user-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    const activeModel =
      AVAILABLE_MODELS.find((m) => m.id === activeModelId) || AVAILABLE_MODELS[0];

    const assistantPlaceholder: ChatMessageItem = {
      id: 'msg-ai-' + Date.now(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      modelName: activeModel.name,
    };

    const newMessages = [...currentMessages, userMessage, assistantPlaceholder];

    // Optimistically update UI
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSession.id ? { ...s, messages: newMessages } : s
      )
    );

    setIsGenerating(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Trigger AI title generation if first message
    const isFirstMessage = currentMessages.length === 0;

    // Selected system prompt text
    const sysPromptObj = SYSTEM_PROMPTS.find((p) => p.id === activeSystemPromptId);
    const systemPromptText = sysPromptObj ? sysPromptObj.prompt : '';

    try {
      await streamGroqChat({
        messages: newMessages.slice(0, -1),
        model: activeModelId,
        temperature,
        systemPrompt: systemPromptText,
        customApiKey: apiKey,
        signal: controller.signal,
        onChunk: (_delta, accumulated) => {
          setSessions((prev) =>
            prev.map((s) => {
              if (s.id !== activeSession.id) return s;
              const msgs = [...s.messages];
              const lastIdx = msgs.length - 1;
              if (lastIdx >= 0 && msgs[lastIdx].role === 'assistant') {
                msgs[lastIdx] = {
                  ...msgs[lastIdx],
                  content: accumulated,
                };
              }
              return { ...s, messages: msgs };
            })
          );
        },
        onFinish: () => {
          setIsGenerating(false);
          abortControllerRef.current = null;
        },
        onError: (err: any) => {
          setIsGenerating(false);
          abortControllerRef.current = null;
          const errDetail = err?.message || 'Terjadi kesalahan pada Groq API.';
          setErrorMessage(
            `Gagal mendapatkan respons: ${errDetail}. Periksa kembali koneksi internet atau Kunci API di .env.local.`
          );
        },
      });

      // Auto title generation in background
      if (isFirstMessage) {
        generateChatTitle(textToSend, apiKey).then((title) => {
          if (title) {
            setSessions((prev) =>
              prev.map((s) =>
                s.id === activeSession.id ? { ...s, title } : s
              )
            );
          }
        });
      }
    } catch (error: any) {
      setIsGenerating(false);
      abortControllerRef.current = null;
      if (error?.name !== 'AbortError') {
        setErrorMessage(
          `Terjadi kesalahan saat memproses permintaan: ${error?.message || error}`
        );
      }
    }
  };

  // Regenerate last response
  const handleRegenerate = () => {
    if (isGenerating || currentMessages.length === 0) return;
    const lastUserMsg = [...currentMessages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove last assistant message
    const filteredMessages = currentMessages.filter(
      (m, idx) => !(idx === currentMessages.length - 1 && m.role === 'assistant')
    );

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSession.id ? { ...s, messages: filteredMessages } : s
      )
    );

    // Resend
    handleSendMessage(lastUserMsg.content);
  };

  const activeModel =
    AVAILABLE_MODELS.find((m) => m.id === activeModelId) || AVAILABLE_MODELS[0];

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessions={sessions}
        activeSessionId={activeSession.id}
        onSelectSession={(id) => {
          setActiveSessionId(id);
          setErrorMessage('');
        }}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        onClearAllSessions={handleClearAllSessions}
        activeModelName={activeModel.name}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Header */}
        <Header
          currentTitle={activeSession.title}
          models={AVAILABLE_MODELS}
          activeModelId={activeModelId}
          onSelectModel={setActiveModelId}
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onClearChat={handleClearCurrentChat}
          onExportChat={handleExportChat}
        />

        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="p-1 hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto">
          {currentMessages.length === 0 ? (
            <WelcomeHero
              onSelectPrompt={(prompt) => handleSendMessage(prompt)}
              activeModelName={activeModel.name}
            />
          ) : (
            <div className="py-4">
              {currentMessages.map((msg, idx) => {
                const isLastAssistant =
                  msg.role === 'assistant' && idx === currentMessages.length - 1;
                return (
                  <ChatMessage
                    key={msg.id || idx}
                    message={msg}
                    isLastAssistant={isLastAssistant}
                    isGenerating={isGenerating}
                    onRegenerate={handleRegenerate}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <ChatInput
          input={input}
          setInput={setInput}
          onSendMessage={() => handleSendMessage()}
          isGenerating={isGenerating}
          onStopGenerating={handleStopGenerating}
        />
      </div>
    </div>
  );
}

export default ChatApp;
