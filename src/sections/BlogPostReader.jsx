import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  CornerDownRight,
} from "lucide-react";
import { blogPostsData } from "../data/portfolioData";

export default function BlogPostReader({ blogs, activePostId, setView }) {
  const displayBlogs = blogs && blogs.length > 0 ? blogs : blogPostsData;
  const post = displayBlogs.find((p) => p.id === activePostId);

  if (!post) {
    return (
      <div className="pt-28 pb-24 px-margin-mobile md:px-margin-desktop min-h-screen flex items-center justify-center">
        <div className="text-center border border-outline-variant/20 rounded p-8 max-w-md bg-surface-container-lowest">
          <span className="font-label-mono text-xs uppercase tracking-widest text-primary block mb-3">
            [ERR_LOG_NOT_FOUND]
          </span>
          <p className="font-body-md text-sm text-on-surface-variant mb-6">
            The writing block you requested could not be retrieved from the
            database logs.
          </p>
          <button
            onClick={() => setView("blog")}
            className="font-label-mono text-xs text-primary uppercase tracking-widest hover:underline"
          >
            Return to Archives
          </button>
        </div>
      </div>
    );
  }

  // Simple custom parser to turn basic markdown strings into beautiful styled JSX
  const renderContent = (content) => {
    const lines = content.split("\n");
    let currentList = [];
    let isCodeBlock = false;
    let codeContent = [];
    let codeLanguage = "";
    const jsxElements = [];

    const flushList = (key) => {
      if (currentList.length > 0) {
        jsxElements.push(
          <ul
            key={`list-${key}`}
            className="list-none space-y-3 my-6 pl-4 border-l border-outline-variant/20"
          >
            {currentList.map((item, idx) => (
              <li
                key={idx}
                className="font-body-md text-base text-on-surface-variant flex items-start gap-2.5"
              >
                <CornerDownRight
                  size={14}
                  className="text-primary mt-1 flex-shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>,
        );
        currentList = [];
      }
    };

    const flushCode = (key) => {
      if (isCodeBlock) {
        jsxElements.push(
          <div
            key={`code-${key}`}
            className="my-6 border border-outline-variant/15 rounded bg-surface-container-lowest/90 overflow-hidden font-label-mono text-xs text-on-surface relative"
          >
            <div className="flex justify-between items-center px-4 py-2 border-b border-outline-variant/10 bg-surface-container/30">
              <span className="text-[10px] text-on-surface-variant tracking-wider uppercase font-bold">
                SYSTEM_LOG // {codeLanguage || "CODE"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            </div>
            <pre className="p-4 overflow-x-auto leading-relaxed text-secondary select-all">
              <code>{codeContent.join("\n")}</code>
            </pre>
          </div>,
        );
        codeContent = [];
        isCodeBlock = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Handle code block boundaries
      if (trimmed.startsWith("```")) {
        if (isCodeBlock) {
          flushCode(idx);
        } else {
          flushList(idx);
          isCodeBlock = true;
          codeLanguage = trimmed.slice(3).trim();
        }
        return;
      }

      if (isCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Handle Headings
      if (trimmed.startsWith("# ")) {
        flushList(idx);
        jsxElements.push(
          <h1
            key={idx}
            className="font-display-lg text-3xl sm:text-4xl text-on-surface tracking-tight mt-10 mb-6 font-bold"
          >
            {trimmed.slice(2)}
          </h1>,
        );
      } else if (trimmed.startsWith("## ")) {
        flushList(idx);
        jsxElements.push(
          <h2
            key={idx}
            className="font-headline-md text-xl sm:text-2xl text-on-surface tracking-tight mt-10 mb-4 font-bold border-b border-outline-variant/10 pb-2"
          >
            {trimmed.slice(3)}
          </h2>,
        );
      } else if (trimmed.startsWith("### ")) {
        flushList(idx);
        jsxElements.push(
          <h3
            key={idx}
            className="font-headline-md text-lg text-primary tracking-wide mt-8 mb-3 font-semibold"
          >
            {trimmed.slice(4)}
          </h3>,
        );
      }
      // Handle List Items
      else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        currentList.push(trimmed.slice(2));
      }
      // Handle Paragraphs
      else if (trimmed.length > 0) {
        flushList(idx);
        // Style inline code quotes
        const parts = line.split(/(`[^`]+`)/g);
        const styledLine = parts.map((part, pIdx) => {
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code
                key={pIdx}
                className="px-1.5 py-0.5 mx-0.5 rounded bg-surface-container border border-outline-variant/10 text-xs font-label-mono text-primary font-semibold"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        });

        jsxElements.push(
          <p
            key={idx}
            className="font-body-md text-base text-on-surface-variant leading-relaxed mb-5"
          >
            {styledLine}
          </p>,
        );
      } else {
        flushList(idx);
      }
    });

    flushList(lines.length);
    flushCode(lines.length);

    return jsxElements;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Simple native alert as a feedback mechanism
    alert("Log archive link copied to clipboard.");
  };

  return (
    <div className="pt-28 pb-24 min-h-screen relative">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-20"></div>
      <div className="absolute inset-0 grain-overlay pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => setView("blog")}
          className="group font-label-mono text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest flex items-center gap-2 mb-10 transition-colors"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Archives
        </button>

        {/* Article header metadata card */}
        <article className="border border-outline-variant/20 rounded p-8 bg-surface-container-lowest/50 backdrop-blur-md mb-10 relative">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary"></div>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-primary"></div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-label-mono text-on-surface-variant uppercase tracking-wider mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>

          <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface leading-tight font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-surface-container border border-outline-variant/15 rounded text-xs font-label-mono text-secondary uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between border-t border-outline-variant/15 pt-6 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">
                AUTHOR: A. S. TAUHID
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 text-xs font-label-mono text-on-surface-variant hover:text-primary uppercase tracking-wider transition-colors border border-outline-variant/15 px-3 py-1.5 rounded hover:bg-surface-container"
            >
              <Share2 size={12} /> Share Log
            </button>
          </div>
        </article>

        {/* Main Article Content */}
        <div className="px-2 sm:px-6">{renderContent(post.content)}</div>

        {/* Footer Trajectory */}
        <div className="border-t border-outline-variant/15 mt-16 pt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setView("blog")}
            className="group font-label-mono text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Archives
          </button>
          <span className="font-label-mono text-[10px] text-on-surface-variant/40">
            [END_OF_TRANSMISSION]
          </span>
        </div>
      </div>
    </div>
  );
}
