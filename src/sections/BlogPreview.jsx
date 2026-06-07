import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { blogPostsData } from "../data/portfolioData";

export default function BlogPreview({ setView, setActivePostId }) {
  // Take the 2 most recent posts for preview
  const recentPosts = blogPostsData.slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handlePostClick = (postId) => {
    setActivePostId(postId);
    setView("blog-post");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllClick = () => {
    setView("blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="blog" className="py-24 px-margin-mobile md:px-margin-desktop border-t border-outline-variant/15 relative">
      <div className="max-w-container-max mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary font-bold block mb-3">
              KNOWLEDGE_BASE // WRITINGS
            </span>
            <h2 className="font-display-md text-3xl sm:text-4xl text-on-surface tracking-tight">
              Technical Log Archives
            </h2>
          </div>
          <button
            onClick={handleViewAllClick}
            className="group font-label-mono text-xs text-primary uppercase tracking-widest flex items-center gap-2 border border-outline-variant/20 hover:border-primary/50 px-5 py-2.5 rounded transition-all duration-300 hover:bg-surface-container/30"
          >
            Browse Full Archive
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Post List */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {recentPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              onClick={() => handlePostClick(post.id)}
              className="group cursor-pointer border border-outline-variant/20 rounded p-6 bg-surface-container-lowest/40 hover:bg-surface-container-lowest/80 transition-all duration-300 relative flex flex-col justify-between"
            >
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-outline-variant/40 group-hover:border-primary transition-colors"></div>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-outline-variant/40 group-hover:border-primary transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-outline-variant/40 group-hover:border-primary transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-outline-variant/40 group-hover:border-primary transition-colors"></div>

              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-label-mono text-on-surface-variant uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors font-bold mb-3 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags & Action Row */}
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4 mt-2">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-surface-container/50 border border-outline-variant/10 rounded text-[10px] font-label-mono text-secondary uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-label-mono text-xs uppercase tracking-widest text-primary flex items-center gap-1 group-hover:underline">
                  LOG_READ <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
