"use client";

import React, { useState, useEffect } from 'react';
import { Check, Copy, Terminal } from './Icons';

interface CodeBlockProps {
  language?: string;
  code: string;
}

/**
 * CodeBlock with on-demand syntax highlighting & instant fallback
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  const [HighlighterComponent, setHighlighterComponent] = useState<any>(null);
  const [themeStyle, setThemeStyle] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    // Dynamically load syntax highlighter only when a code block is actually rendered
    Promise.all([
      import('react-syntax-highlighter').then((mod) => mod.Prism),
      import('react-syntax-highlighter/dist/esm/styles/prism').then((mod) => mod.oneDark),
    ])
      .then(([prism, style]) => {
        if (isMounted) {
          setHighlighterComponent(() => prism);
          setThemeStyle(style);
        }
      })
      .catch((err) => {
        console.warn('Could not load code syntax highlighter:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/80 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-indigo-400" />
          <span>{language || 'text'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Salin kode"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">Tersalin!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>

      <div className="p-0 overflow-x-auto text-sm leading-relaxed">
        {HighlighterComponent && themeStyle ? (
          <HighlighterComponent
            language={language || 'text'}
            style={themeStyle}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }}
            wrapLongLines={true}
          >
            {code}
          </HighlighterComponent>
        ) : (
          <pre className="p-4 text-xs sm:text-sm text-zinc-200 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

/**
 * Inline text parser for bold, italic, inline code, and links
 */
const renderInlineText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for inline code `...`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded bg-zinc-800 text-indigo-300 font-mono text-[0.88em] border border-zinc-700/60"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Check for bold **...**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="font-semibold text-zinc-100">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Check for italic *...*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(
        <em key={key++} className="italic text-zinc-200">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Plain text up to next special character
    const nextSpecial = remaining.search(/[`*]/);
    if (nextSpecial === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    } else if (nextSpecial === 0) {
      parts.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    } else {
      parts.push(<span key={key++}>{remaining.slice(0, nextSpecial)}</span>);
      remaining = remaining.slice(nextSpecial);
    }
  }

  return parts;
};

/**
 * Render paragraphs, headings, bullet lists, numbered lists, blockquotes
 */
const renderTextBlocks = (rawText: string): React.ReactNode[] => {
  const lines = rawText.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let isNumbered = false;
  let blockKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      const ListTag = isNumbered ? 'ol' : 'ul';
      blocks.push(
        <ListTag
          key={`list-${blockKey++}`}
          className={`my-2 pl-6 space-y-1 ${
            isNumbered ? 'list-decimal' : 'list-disc'
          } marker:text-zinc-500`}
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="text-zinc-300">
              {renderInlineText(item)}
            </li>
          ))}
        </ListTag>
      );
      listItems = [];
      isNumbered = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line flushes active list
    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList();
      blocks.push(
        <h4 key={`h3-${blockKey++}`} className="text-base font-semibold text-zinc-100 mt-4 mb-1">
          {renderInlineText(trimmed.slice(4))}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      blocks.push(
        <h3 key={`h2-${blockKey++}`} className="text-lg font-bold text-zinc-100 mt-5 mb-2 border-b border-zinc-800/80 pb-1">
          {renderInlineText(trimmed.slice(3))}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushList();
      blocks.push(
        <h2 key={`h1-${blockKey++}`} className="text-xl font-bold text-white mt-6 mb-2">
          {renderInlineText(trimmed.slice(2))}
        </h2>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      blocks.push(
        <blockquote
          key={`quote-${blockKey++}`}
          className="border-l-2 border-indigo-500/80 pl-4 py-1 my-2 text-zinc-400 italic bg-zinc-900/40 rounded-r"
        >
          {renderInlineText(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Bullet lists (- or *)
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      if (isNumbered) flushList();
      listItems.push(bulletMatch[1]);
      continue;
    }

    // Numbered lists (1. or 2.)
    const numberMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberMatch) {
      if (!isNumbered && listItems.length > 0) flushList();
      isNumbered = true;
      listItems.push(numberMatch[1]);
      continue;
    }

    // Normal Paragraph
    flushList();
    blocks.push(
      <p key={`p-${blockKey++}`} className="my-1 text-zinc-200">
        {renderInlineText(trimmed)}
      </p>
    );
  }

  flushList();
  return blocks;
};

/**
 * Full Markdown block parser
 */
export const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textSection = content.slice(lastIndex, match.index);
      elements.push(
        <div key={`text-${index++}`}>{renderTextBlocks(textSection)}</div>
      );
    }

    const language = match[1] || 'text';
    const code = match[2].trimEnd();
    elements.push(
      <CodeBlock key={`code-${index++}`} language={language} code={code} />
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    elements.push(
      <div key={`text-${index++}`}>
        {renderTextBlocks(content.slice(lastIndex))}
      </div>
    );
  }

  return <div className="space-y-3 leading-relaxed text-zinc-200">{elements}</div>;
};

export default MarkdownRenderer;
