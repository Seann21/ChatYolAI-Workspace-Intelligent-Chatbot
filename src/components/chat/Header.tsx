"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Download,
  Trash2,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeft,
} from './Icons';
import { ModelOption } from '@/utils/groq';

interface HeaderProps {
  currentTitle: string;
  models: ModelOption[];
  activeModelId: string;
  onSelectModel: (id: string) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onClearChat: () => void;
  onExportChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTitle,
  models,
  activeModelId,
  onSelectModel,
  isSidebarOpen,
  onToggleSidebar,
  onClearChat,
  onExportChat,
}) => {
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeModel = models.find((m) => m.id === activeModelId) || models[0];

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setModelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur px-3 sm:px-4 flex items-center justify-between sticky top-0 z-20">
      {/* Left side: Sidebar Toggle + Back to Landing + Chat Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          title={isSidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
          aria-label={isSidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}
        </button>

        {/* Back to Landing Page link */}
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-cyan-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
          title="Kembali ke Landing Page"
        >
          <ArrowLeft size={13} />
          <span>Beranda</span>
        </Link>

        <div className="min-w-0 flex items-center gap-2">
          <span className="font-semibold text-xs sm:text-sm text-zinc-100 truncate">
            {currentTitle || 'Percakapan Baru'}
          </span>
        </div>
      </div>

      {/* Right side: Model Switcher & Action buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Model Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-200 transition-colors cursor-pointer"
          >
            <Sparkles size={13} className="text-indigo-400" />
            <span className="font-medium hidden sm:inline">{activeModel.name}</span>
            <span className="font-medium sm:hidden">{activeModel.tag}</span>
            <ChevronDown size={13} className="text-zinc-500" />
          </button>

          {modelDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-zinc-900 border border-zinc-800 p-1.5 shadow-2xl z-30 space-y-1">
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Pilih Model AI
              </div>
              {models.map((model) => {
                const isSelected = model.id === activeModelId;
                return (
                  <button
                    key={model.id}
                    onClick={() => {
                      onSelectModel(model.id);
                      setModelDropdownOpen(false);
                    }}
                    className={`w-full flex flex-col text-left p-2 rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/10 border border-indigo-500/30 text-white'
                        : 'hover:bg-zinc-800/60 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold">{model.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${model.badgeColor}`}
                        >
                          {model.tag}
                        </span>
                        {isSelected && <Check size={13} className="text-indigo-400" />}
                      </div>
                    </div>
                    <span className="text-[11px] text-zinc-400 leading-tight">
                      {model.description}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Clear chat button */}
        <button
          onClick={onClearChat}
          className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 transition-colors cursor-pointer"
          title="Bersihkan pesan percakapan ini"
        >
          <Trash2 size={16} />
        </button>

        {/* Export chat button */}
        <button
          onClick={onExportChat}
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors cursor-pointer"
          title="Unduh percakapan (Markdown)"
        >
          <Download size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;

