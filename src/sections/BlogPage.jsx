import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPostsData } from "../data/portfolioData";

export default function BlogPage({ setView, setActivePostId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    blogPostsData.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter blog posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const handlePostClick = (postId) => {
    setActivePostId(postId);
    setView("blog-post");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setView("main");
    // Wait for DOM layout, then scroll to blog section
    setTimeout(() => {
      const element = document.getElementById("blog");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="pt-28 pb-24 px-margin-mobile md:px-margin-desktop min-h-screen relative">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-30"></div>
      <div className="absolute inset-0 grain-overlay pointer-events-none"></div>

      <div className="max-w-container-max mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={handleBackToHome}
          className="group font-label-mono text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest flex items-center gap-2 mb-10 transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to Console
        </button>

        {/* Header Block */}
        <div className="border-b border-outline-variant/15 pb-8 mb-12">
          <span className="font-label-mono text-xs uppercase tracking-widest text-primary font-bold block mb-2">
            DATABASE // SYSTEM_LOG_ARCHIVES
          </span>
          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-6xl text-on-surface tracking-tight mb-4">
            Technical Writings
          </h1>
          <p className="font-body-md text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            A storage vault of personal articles, framework notes, structural blueprints, and technical analyses.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-12">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Query log archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-lowest/80 border border-outline-variant/20 focus:border-primary/50 outline-none rounded pl-10 pr-4 py-2.5 text-sm font-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Tag Filter Selection */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant mr-1">
              Filter:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-[10px] font-label-mono uppercase tracking-wider border rounded transition-all duration-200 ${
                selectedTag === null
                  ? "bg-primary text-background border-primary"
                  : "bg-surface-container-lowest/50 border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/40"
              }`}
            >
              All Logs
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 text-[10px] font-label-mono uppercase tracking-wider border rounded transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-primary text-background border-primary"
                    : "bg-surface-container-lowest/50 border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                onClick={() => handlePostClick(post.id)}
                className="group cursor-pointer border border-outline-variant/20 rounded p-6 bg-surface-container-lowest/30 hover:bg-surface-container-lowest/70 transition-all duration-300 relative flex flex-col justify-between"
              >
                {/* Visual corners */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-outline-variant/35 group-hover:border-primary transition-colors"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-outline-variant/35 group-hover:border-primary transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-outline-variant/35 group-hover:border-primary transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-outline-variant/35 group-hover:border-primary transition-colors"></div>

                <div>
                  <div className="flex items-center gap-3 text-xs font-label-mono text-on-surface-variant uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-lg text-on-surface group-hover:text-primary transition-colors font-bold mb-3 leading-snug">
                    {post.title}
                  </h3>

                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4 mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-surface-container/50 border border-outline-variant/10 rounded text-[9px] font-label-mono text-secondary uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-label-mono text-[10px] uppercase tracking-widest text-primary flex items-center gap-1 group-hover:underline">
                    READ <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="border border-outline-variant/15 rounded p-12 text-center bg-surface-container-lowest/30">
            <span className="font-label-mono text-xs uppercase tracking-widest text-secondary block mb-3">
              [SYSTEM_STATUS: NO_MATCHING_LOGS_FOUND]
            </span>
            <p className="font-body-md text-sm text-on-surface-variant">
              No articles match your active search terms or category filters. Try clearing constraints.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="mt-6 font-label-mono text-xs text-primary uppercase tracking-widest hover:underline"
            >
              Clear Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
