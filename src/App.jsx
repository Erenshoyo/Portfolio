import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Involvement from "./sections/Involvement";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import BlogPreview from "./sections/BlogPreview";
import Contact from "./sections/Contact";
import BlogPage from "./sections/BlogPage";
import BlogPostReader from "./sections/BlogPostReader";
import Login from "./sections/Login";
import Dashboard from "./sections/Dashboard";
import Footer from "./components/Footer";
import { projectsData, blogPostsData } from "./data/portfolioData";

function App() {
  const [currentView, setView] = useState("main"); // 'main' | 'blog' | 'blog-post' | 'login' | 'dashboard'
  const [activePostId, setActivePostId] = useState(null);
  
  // Dynamic collections loaded from Supabase or static fallbacks
  const [projects, setProjects] = useState(projectsData);
  const [blogs, setBlogs] = useState(blogPostsData);

  // Sync data with Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch Projects
        const { data: projData, error: projErr } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });
        
        if (projErr) throw projErr;
        if (projData && projData.length > 0) {
          const mappedProjects = projData.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            techStack: p.tech_stack || [],
            liveLink: p.live_link || "",
            githubLink: p.github_link || "",
            status: p.status,
            featured: p.featured,
            image: p.image,
          }));
          setProjects(mappedProjects);
        }

        // Fetch Blogs
        const { data: blogsData, error: blogsErr } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (blogsErr) throw blogsErr;
        if (blogsData && blogsData.length > 0) {
          const mappedBlogs = blogsData.map((b) => ({
            id: b.id,
            title: b.title,
            excerpt: b.excerpt,
            content: b.content,
            readTime: b.read_time,
            tags: b.tags || [],
            date: b.created_at ? new Date(b.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }) : "June 05, 2026",
          }));
          setBlogs(mappedBlogs);
        }
      } catch (err) {
        console.warn("Database fetch failed or tables empty. Using static fallback database.", err);
      }
    };

    loadData();
  }, []);

  // Monitor location hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/login") {
        setView("login");
      } else if (hash === "#/dashboard") {
        // Double check authentication status
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user) {
            setView("dashboard");
          } else {
            setView("login");
            window.location.hash = "#/login";
          }
        });
      } else {
        setView((prev) => {
          if (prev === "login" || prev === "dashboard") {
            return "main";
          }
          return prev;
        });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Trigger on load
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update hash when view state changes programmatically
  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === "main" && (window.location.hash === "#/login" || window.location.hash === "#/dashboard")) {
      window.location.hash = "";
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Hide navbar on dashboard / login screens */}
      {currentView !== "login" && currentView !== "dashboard" && (
        <Navbar currentView={currentView} setView={handleViewChange} setActivePostId={setActivePostId} />
      )}
      
      {currentView === "main" ? (
        <main>
          <Hero />
          <Skills />
          <Involvement />
          <Education />
          <Projects projects={projects} />
          <BlogPreview blogs={blogs} setView={handleViewChange} setActivePostId={setActivePostId} />
          <Contact />
        </main>
      ) : currentView === "blog" ? (
        <BlogPage blogs={blogs} setView={handleViewChange} setActivePostId={setActivePostId} />
      ) : currentView === "blog-post" ? (
        <BlogPostReader blogs={blogs} activePostId={activePostId} setView={handleViewChange} />
      ) : currentView === "login" ? (
        <Login setView={(v) => {
          setView(v);
          if (v === "dashboard") window.location.hash = "#/dashboard";
        }} />
      ) : (
        <Dashboard
          setView={handleViewChange}
          projects={projects}
          setProjects={setProjects}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )}
      
      {currentView !== "login" && currentView !== "dashboard" && <Footer />}
    </div>
  );
}

export default App;
