"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Message } from "@/types";
import { formatTime } from "@/lib/utils";
import { Copy, Download, Share2, ChevronDown, ChevronUp, User, Sparkles } from "lucide-react";

function formatMarkdown(text: string): string {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold text-[#e6c310] mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-white mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-white mt-5 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-[#e6c310]">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="flex gap-2 text-sm text-white/70 ml-2"><span class="text-[#00a651] shrink-0 mt-1">•</span><span>$1</span></li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="flex gap-2 text-sm text-white/70 ml-2"><span class="text-[#e6c310] shrink-0 mt-1">$1.</span><span>$2</span></li>')
    .replace(/\n---\n/g, '\n<hr class="my-4 border-white/10" />\n')
    .replace(/\n\n/g, '</p><p class="text-sm leading-relaxed mb-2">')
    .replace(/\n/g, '<br />');
  html = '<p class="text-sm leading-relaxed mb-2">' + html + '</p>';
  html = html.replace(/<li class="flex/g, '<li class="flex');
  html = html.replace(/<\/li><br \/>/g, '</li>');
  html = html.replace(/<\/h1><br \/>/g, '</h1>');
  html = html.replace(/<\/h2><br \/>/g, '</h2>');
  html = html.replace(/<\/h3><br \/>/g, '</h3>');
  html = html.replace(/<hr class="my-4 border-white\/10" \/><br \/>/g, '<hr class="my-4 border-white/10" />');
  return html;
}

export default function ChatMessage({ message }: { message: Message }) {
  const [expanded, setExpanded] = useState(false);
  const isUser = message.role === "user";

  const { shortContent, fullContent, hasShowMore, feedbackSection } = useMemo(() => {
    const content = message.content;
    const showMoreMatch = content.match(/\[Show More →\]/i);
    const feedbackMatch = content.match(/---\s*\n\*\*💡.*?(?:\[.*?\]\|?.*)+/s);

    let short = content;
    let full = content;
    let hasShowMore = false;
    let feedbackSection = "";

    if (showMoreMatch) {
      hasShowMore = true;
      const idx = showMoreMatch.index!;
      short = content.substring(0, idx).trim();
      full = content.substring(idx + showMoreMatch[0].length).trim();
    }

    if (feedbackMatch) {
      feedbackSection = feedbackMatch[0];
      full = full.replace(feedbackMatch[0], "").trim();
    }

    return { shortContent: short, fullContent: full, hasShowMore, feedbackSection };
  }, [message.content]);

  const displayContent = isUser ? message.content : (hasShowMore && !expanded ? shortContent : fullContent);

  const handleCopy = () => navigator.clipboard.writeText(message.content);
  const handleDownload = () => {
    const blob = new Blob([message.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `bizimana-response-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ text: message.content });
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "bg-[#003478]" : "bg-gradient-to-br from-[#e6c310] to-[#00a651]"
        }`}
      >
        {isUser ? <User size={14} /> : <Sparkles size={14} />}
      </div>

      <div className={`max-w-[88%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser ? "bg-[#003478]/80 rounded-tr-md" : "glass-card rounded-tl-md"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div
              className="text-sm leading-relaxed [&_li]:list-none"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(displayContent) }}
            />
          )}

          {!isUser && hasShowMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 flex items-center gap-1.5 text-xs text-[#e6c310] hover:text-[#e6c310]/80 transition-colors cursor-pointer font-medium"
            >
              {expanded ? (
                <>Show Less <ChevronUp size={14} /></>
              ) : (
                <>Show More → <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>

        {!isUser && expanded && feedbackSection && (
          <div
            className="text-xs text-white/40 mt-1 px-1"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(feedbackSection) }}
          />
        )}

        {!isUser && (
          <div className="flex items-center gap-2 mt-2 px-1">
            <span className="text-[10px] text-white/30">{formatTime(message.timestamp)}</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-[10px] text-white/40 hover:text-white/70 cursor-pointer"
                title="Copy response"
              >
                <Copy size={10} />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-[10px] text-white/40 hover:text-white/70 cursor-pointer"
                title="Download as .md"
              >
                <Download size={10} />
                Download
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-[10px] text-white/40 hover:text-white/70 cursor-pointer"
                title="Share"
              >
                <Share2 size={10} />
                Share
              </button>
            </div>
          </div>
        )}

        {isUser && (
          <span className="text-[10px] text-white/30 mt-1 px-1">{formatTime(message.timestamp)}</span>
        )}
      </div>
    </motion.div>
  );
}
