import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose-neon prose max-w-none text-sm leading-relaxed">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="my-3 rounded overflow-hidden border border-[#00f5ff]/15">
                <div
                  className="flex items-center gap-2 bg-black/60 px-4 py-2 border-b border-[#00f5ff]/10"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_4px_#00f5ff]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#00f5ff]/60">{match[1]}</span>
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.8)',
                    fontSize: '0.8rem',
                    lineHeight: '1.6',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="prose-neon-code" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
