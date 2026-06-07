import { useState } from "react";
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
import Footer from "./components/Footer";

function App() {
  const [currentView, setView] = useState("main"); // 'main' | 'blog' | 'blog-post'
  const [activePostId, setActivePostId] = useState(null);

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Navbar currentView={currentView} setView={setView} setActivePostId={setActivePostId} />
      
      {currentView === "main" ? (
        <main>
          <Hero />
          <Skills />
          <Involvement />
          <Education />
          <Projects />
          <BlogPreview setView={setView} setActivePostId={setActivePostId} />
          <Contact />
        </main>
      ) : currentView === "blog" ? (
        <BlogPage setView={setView} setActivePostId={setActivePostId} />
      ) : (
        <BlogPostReader activePostId={activePostId} setView={setView} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
