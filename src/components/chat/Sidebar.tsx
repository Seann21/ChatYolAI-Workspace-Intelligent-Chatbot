"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  MessageSquare,
  Trash2,
  Search,
  PanelLeftClose,
  ArrowLeft,
} from './Icons';

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  messages: any[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
  onClearAllSessions: () => void;
  activeModelName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onClearAllSessions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logoSrc, setLogoSrc] = useState('/Chatyol-ai.png');

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 bg-zinc-950 border-r border-zinc-800/80 flex flex-col transition-all duration-300 ease-in-out shrink-0 select-none ${
          isOpen
            ? 'w-64 sm:w-72 translate-x-0 opacity-100'
            : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:border-r-0 overflow-hidden pointer-events-none md:pointer-events-none'
        }`}
      >
        {/* Brand & New Chat */}
        <div className="p-3.5 border-b border-zinc-800/80 min-w-[16rem]">
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
              title="Ke Beranda ChatYol"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 p-0.5 overflow-hidden flex items-center justify-center">
                <Image
                  src={logoSrc}
                  alt="ChatYol"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                  onError={() => setLogoSrc('/Chatyol.svg')}
                />
              </div>
              <span className="font-bold text-sm text-zinc-100 tracking-tight group-hover:text-cyan-300 transition-colors">
                ChatYol <span className="text-cyan-400">AI</span>
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
              title="Tutup sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          <button
            onClick={() => {
              onNewSession();
              if (typeof window !== 'undefined' && window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Percakapan Baru</span>
          </button>
        </div>

        {/* Search Input */}
        {sessions.length > 3 && (
          <div className="px-3 py-2 border-b border-zinc-800/40">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari riwayat chat..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Riwayat Percakapan
          </div>

          {filteredSessions.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-zinc-500">
              {searchTerm ? 'Tidak ada hasil ditemukan' : 'Belum ada riwayat chat'}
            </div>
          ) : (
            filteredSessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  className={`group relative flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800/90 text-white font-medium'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                  onClick={() => {
                    onSelectSession(session.id);
                    if (typeof window !== 'undefined' && window.innerWidth < 768) onClose();
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-6">
                    <MessageSquare size={14} className="flex-shrink-0 text-zinc-400" />
                    <span className="text-xs truncate">{session.title}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-rose-400 transition-opacity cursor-pointer"
                    title="Hapus sesi ini"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer controls */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60 space-y-2">
          {sessions.length > 1 && (
            <button
              onClick={onClearAllSessions}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Hapus Semua Riwayat</span>
            </button>
          )}

          <Link
            href="/"
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-cyan-300 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="px-2.5 pt-1 text-[11px] text-zinc-500 flex items-center justify-between border-t border-zinc-800/40">
            <span>ChatYol AI</span>
            <span>Groq Engine</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

