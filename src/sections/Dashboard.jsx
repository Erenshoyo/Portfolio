import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { projectsData, blogPostsData } from "../data/portfolioData";
import {
  FolderGit,
  BookOpen,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Database,
  ArrowLeft,
  X,
  FileCode,
  CheckCircle,
} from "lucide-react";

export default function Dashboard({ setView, projects, setProjects, blogs, setBlogs }) {
  const [activeTab, setActiveTab] = useState("projects"); // 'projects' | 'blogs' | 'system'
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Modals state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // Form State - Projects
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    status: "completed",
    featured: false,
    image: "",
  });

  // Form State - Blogs
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    readTime: "",
    tags: "",
  });

  // Verify auth session
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setView("login");
      }
    };
    checkUser();
  }, [setView]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView("main");
  };

  // Helper: Flash message
  const flashStatus = (msg, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setStatusMessage("");
    } else {
      setStatusMessage(msg);
      setErrorMessage("");
    }
    setTimeout(() => {
      setStatusMessage("");
      setErrorMessage("");
    }, 4000);
  };

  // Seeding: Insert default projects & blogs
  const seedDatabase = async () => {
    setIsLoading(true);
    try {
      // Seed Projects
      const projectsToInsert = projectsData.map((p) => ({
        title: p.title,
        description: p.description,
        tech_stack: p.techStack,
        live_link: p.liveLink,
        github_link: p.githubLink,
        status: p.status || "completed",
        featured: p.featured,
        image: p.image,
      }));

      const { error: projErr } = await supabase.from("projects").insert(projectsToInsert);
      if (projErr) throw projErr;

      // Seed Blogs
      const blogsToInsert = blogPostsData.map((b) => ({
        id: b.id,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        read_time: b.readTime,
        tags: b.tags,
      }));

      const { error: blogErr } = await supabase.from("blogs").insert(blogsToInsert);
      if (blogErr) throw blogErr;

      // Refresh Parent State
      const { data: latestProj } = await supabase.from("projects").select("*").order("created_at", { ascending: true });
      const { data: latestBlogs } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });

      if (latestProj) setProjects(latestProj);
      if (latestBlogs) setBlogs(latestBlogs);

      flashStatus("Database tables seeded successfully with fallback archives!");
    } catch (err) {
      flashStatus(`Database seeding failed: ${err.message}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // PROJECT CRUD
  // -------------------------------------------------------------
  const openNewProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: "",
      description: "",
      techStack: "",
      liveLink: "",
      githubLink: "",
      status: "completed",
      featured: false,
      image: "",
    });
    setShowProjectModal(true);
  };

  const openEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      techStack: Array.isArray(project.tech_stack) ? project.tech_stack.join(", ") : "",
      liveLink: project.live_link || "",
      githubLink: project.github_link || "",
      status: project.status || "completed",
      featured: !!project.featured,
      image: project.image || "",
    });
    setShowProjectModal(true);
  };

  const saveProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      tech_stack: projectForm.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      live_link: projectForm.liveLink,
      github_link: projectForm.githubLink,
      status: projectForm.status,
      featured: projectForm.featured,
      image: projectForm.image,
    };

    try {
      if (editingProject) {
        // Update
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProject.id);
        if (error) throw error;
        flashStatus("Project metadata updated successfully.");
      } else {
        // Insert
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) throw error;
        flashStatus("New deployment log entry created.");
      }

      // Refresh list
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: true });
      if (data) setProjects(data);
      setShowProjectModal(false);
    } catch (err) {
      flashStatus(`Failed to save project: ${err.message}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Confirm deletion of deployment log entry?")) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      // Refresh list
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: true });
      if (data) setProjects(data);
      flashStatus("Deployment record purged.");
    } catch (err) {
      flashStatus(`Deletion failed: ${err.message}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // BLOG CRUD
  // -------------------------------------------------------------
  const openNewBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      readTime: "",
      tags: "",
    });
    setShowBlogModal(true);
  };

  const openEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      readTime: blog.read_time || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
    });
    setShowBlogModal(true);
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      id: blogForm.id.trim().toLowerCase().replace(/\s+/g, "-"),
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      read_time: blogForm.readTime,
      tags: blogForm.tags.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingBlog) {
        // Update
        const { error } = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", editingBlog.id);
        if (error) throw error;
        flashStatus("Log archive post updated successfully.");
      } else {
        // Insert
        const { error } = await supabase.from("blogs").insert([payload]);
        if (error) throw error;
        flashStatus("New writing log entry published.");
      }

      // Refresh list
      const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
      if (data) setBlogs(data);
      setShowBlogModal(false);
    } catch (err) {
      flashStatus(`Failed to save blog post: ${err.message}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Confirm deletion of writing log entry?")) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      // Refresh list
      const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
      if (data) setBlogs(data);
      flashStatus("Writing log entry purged.");
    } catch (err) {
      flashStatus(`Deletion failed: ${err.message}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 px-margin-mobile md:px-margin-desktop min-h-screen relative">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-20"></div>
      <div className="absolute inset-0 grain-overlay pointer-events-none"></div>

      <div className="max-w-container-max mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-outline-variant/15 pb-6 mb-8 gap-4">
          <div>
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary font-bold block mb-1">
              CONTROL_PANEL // SYS_DASHBOARD
            </span>
            <h1 className="font-display-lg text-3xl text-on-surface tracking-tight">
              Systems Editor Console
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("main")}
              className="group font-label-mono text-xs text-on-surface-variant hover:text-primary uppercase tracking-wider flex items-center gap-2 border border-outline-variant/15 px-4 py-2 rounded bg-surface-container-lowest/30 transition-all"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Website View
            </button>
            <button
              onClick={handleLogout}
              className="font-label-mono text-xs text-error/90 hover:text-error uppercase tracking-wider flex items-center gap-2 border border-error/20 px-4 py-2 rounded hover:bg-error/5 transition-all"
            >
              <LogOut size={13} />
              Session End
            </button>
          </div>
        </div>

        {/* Message notification banners */}
        {statusMessage && (
          <div className="mb-6 p-4 border border-primary/20 bg-primary/5 rounded text-xs font-label-mono text-primary flex items-center gap-2">
            <CheckCircle size={14} className="flex-shrink-0" />
            <span>[SYS_MSG] {statusMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 border border-error/20 bg-error/5 rounded text-xs font-label-mono text-error">
            <span className="font-bold uppercase block mb-1">[ERR_SYS_ABORT]</span>
            {errorMessage}
          </div>
        )}

        {/* Tab Controls Row */}
        <div className="flex border-b border-outline-variant/15 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3.5 font-label-mono text-xs uppercase tracking-widest border-b-2 transition-all ${
              activeTab === "projects"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <FolderGit size={14} />
            Selected Deployments ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-2 px-6 py-3.5 font-label-mono text-xs uppercase tracking-widest border-b-2 transition-all ${
              activeTab === "blogs"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <BookOpen size={14} />
            Technical Archives ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab("system")}
            className={`flex items-center gap-2 px-6 py-3.5 font-label-mono text-xs uppercase tracking-widest border-b-2 transition-all ${
              activeTab === "system"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Database size={14} />
            Database Initializer
          </button>
        </div>

        {/* Tab Panel Content */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                Active Table: projects
              </span>
              <button
                onClick={openNewProject}
                className="bg-primary hover:opacity-90 text-background px-4 py-2 text-xs font-ui-element rounded flex items-center gap-1.5 font-bold transition-opacity"
              >
                <Plus size={14} /> Add Project Card
              </button>
            </div>

            {projects.length > 0 ? (
              <div className="border border-outline-variant/15 rounded bg-surface-container-lowest/30 overflow-hidden">
                <table className="w-full text-left font-body-md text-sm">
                  <thead className="bg-surface-container/50 font-label-mono text-xs uppercase text-on-surface-variant tracking-wider border-b border-outline-variant/15">
                    <tr>
                      <th className="p-4">Project Title</th>
                      <th className="p-4">Stack Tags</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Console Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-surface-container/20">
                        <td className="p-4 font-bold text-on-surface">
                          {proj.title}
                          {proj.featured && (
                            <span className="ml-2 text-[8px] bg-primary/10 text-primary border border-primary/20 px-1 py-0.5 rounded uppercase font-bold tracking-widest">
                              FEATURED
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-xs font-label-mono text-secondary">
                          {Array.isArray(proj.tech_stack) ? proj.tech_stack.slice(0, 3).join(", ") : ""}
                          {Array.isArray(proj.tech_stack) && proj.tech_stack.length > 3 ? "..." : ""}
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            proj.status === "in-progress"
                              ? "bg-primary/10 text-primary"
                              : "bg-surface-container text-on-surface-variant"
                          }`}>
                            {proj.status === "in-progress" ? "Ongoing" : "Completed"}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openEditProject(proj)}
                            className="p-2 border border-outline-variant/25 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-2 border border-error/25 rounded hover:bg-error/5 text-error/80 hover:text-error transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center border border-outline-variant/15 rounded p-12 bg-surface-container-lowest/30">
                <span className="font-label-mono text-xs uppercase tracking-widest text-secondary block mb-2">
                  [STATUS_DB_EMPTY]
                </span>
                <p className="font-body-md text-sm text-on-surface-variant">
                  No records stored inside 'projects' Postgres table. Use the Database Initializer tab to populate fallbacks.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "blogs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
                Active Table: blogs
              </span>
              <button
                onClick={openNewBlog}
                className="bg-primary hover:opacity-90 text-background px-4 py-2 text-xs font-ui-element rounded flex items-center gap-1.5 font-bold transition-opacity"
              >
                <Plus size={14} /> Write Blog Post
              </button>
            </div>

            {blogs.length > 0 ? (
              <div className="border border-outline-variant/15 rounded bg-surface-container-lowest/30 overflow-hidden">
                <table className="w-full text-left font-body-md text-sm">
                  <thead className="bg-surface-container/50 font-label-mono text-xs uppercase text-on-surface-variant tracking-wider border-b border-outline-variant/15">
                    <tr>
                      <th className="p-4">Post Title & Slug ID</th>
                      <th className="p-4">Tags</th>
                      <th className="p-4">Read Time</th>
                      <th className="p-4 text-right">Console Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-surface-container/20">
                        <td className="p-4">
                          <span className="font-bold text-on-surface block leading-tight">{b.title}</span>
                          <span className="font-label-mono text-[10px] text-on-surface-variant">/{b.id}</span>
                        </td>
                        <td className="p-4 text-xs font-label-mono text-secondary">
                          {Array.isArray(b.tags) ? b.tags.join(", ") : ""}
                        </td>
                        <td className="p-4 text-xs text-on-surface-variant">{b.read_time}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openEditBlog(b)}
                            className="p-2 border border-outline-variant/25 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => deleteBlog(b.id)}
                            className="p-2 border border-error/25 rounded hover:bg-error/5 text-error/80 hover:text-error transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center border border-outline-variant/15 rounded p-12 bg-surface-container-lowest/30">
                <span className="font-label-mono text-xs uppercase tracking-widest text-secondary block mb-2">
                  [STATUS_DB_EMPTY]
                </span>
                <p className="font-body-md text-sm text-on-surface-variant">
                  No records stored inside 'blogs' Postgres table. Use the Database Initializer tab to populate fallbacks.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "system" && (
          <div className="border border-outline-variant/15 rounded p-8 bg-surface-container-lowest/40 max-w-2xl relative">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary"></div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-primary"></div>
            
            <h3 className="font-headline-md text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
              <Database className="text-primary" size={18} />
              Synchronize Fallback Archives
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
              If your database tables are completely empty or have been wiped, you can initialize them by uploading the default static dataset (`projectsData` and `blogPostsData`) directly into your Supabase PostgreSQL tables.
            </p>

            <div className="border-l-2 border-primary/40 pl-4 py-2.5 bg-primary/5 rounded mb-8 font-label-mono text-xs text-on-surface-variant">
              <span className="font-bold text-primary block uppercase tracking-wider mb-1">Warning //</span>
              Seeding will insert records directly. To prevent duplicated items, clear existing table rows before running if they contain records.
            </div>

            <button
              onClick={seedDatabase}
              disabled={isLoading}
              className="bg-primary hover:opacity-95 text-background font-ui-element text-sm font-bold py-3 px-6 rounded flex items-center gap-2 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Writing SQL Records..." : "Initialize / Seed Database"}
            </button>
          </div>
        )}

      </div>

      {/* -------------------------------------------------------------
          MODAL: PROJECT FORM
      ------------------------------------------------------------- */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-surface-container border border-outline-variant/20 rounded p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowProjectModal(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={18} />
            </button>

            <span className="font-label-mono text-[10px] text-primary uppercase block mb-1">
              {editingProject ? "SQL_UPDATE // PROJECT" : "SQL_INSERT // PROJECT"}
            </span>
            <h2 className="font-headline-md text-xl font-bold text-on-surface mb-6">
              {editingProject ? "Edit Project Details" : "New Deployment Entry"}
            </h2>

            <form onSubmit={saveProject} className="space-y-4 font-body-md text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Image Path / URL</label>
                  <input
                    type="text"
                    required
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/projects/filename.png"
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Project Description</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50 resize-y"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  required
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  placeholder="React, Tailwind CSS, TypeScript"
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Live Demo Link</label>
                  <input
                    type="url"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">GitHub Repository Link</label>
                  <input
                    type="url"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In-Progress</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 bg-surface-container-lowest accent-primary border border-outline-variant/20 rounded"
                  />
                  <label htmlFor="featured" className="font-label-mono text-[10px] uppercase text-on-surface-variant select-none cursor-pointer">
                    Featured Project Layout
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="font-label-mono text-xs text-on-surface-variant hover:text-on-surface uppercase tracking-wider px-4 py-2 border border-outline-variant/15 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:opacity-95 text-background font-ui-element text-sm font-bold px-5 py-2 rounded transition-opacity disabled:opacity-50"
                >
                  {isLoading ? "Saving changes..." : "Save Deployment Log"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: BLOG FORM
      ------------------------------------------------------------- */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-surface-container border border-outline-variant/20 rounded p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBlogModal(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={18} />
            </button>

            <span className="font-label-mono text-[10px] text-primary uppercase block mb-1">
              {editingBlog ? "SQL_UPDATE // WRITING" : "SQL_INSERT // WRITING"}
            </span>
            <h2 className="font-headline-md text-xl font-bold text-on-surface mb-6">
              {editingBlog ? "Edit Writing Log" : "Compose New Log Post"}
            </h2>

            <form onSubmit={saveBlog} className="space-y-4 font-body-md text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Post Slug ID (URL Path)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingBlog}
                    value={blogForm.id}
                    onChange={(e) => setBlogForm({ ...blogForm, id: e.target.value })}
                    placeholder="my-bento-grid-post"
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Read Time Label</label>
                  <input
                    type="text"
                    required
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="6 min read"
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Excerpt Summarization</label>
                <input
                  type="text"
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Post Tags (comma separated)</label>
                <input
                  type="text"
                  required
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  placeholder="React, Framer Motion, Frontend"
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Content Body (Markdown Format)</label>
                  <span className="font-label-mono text-[9px] text-on-surface-variant/50">
                    Supports #, ##, ###, * lists, and code blocks
                  </span>
                </div>
                <textarea
                  required
                  rows={8}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded px-3 py-2 text-on-surface font-label-mono text-xs outline-none focus:border-primary/50 resize-y"
                  placeholder="# Blog Header&#10;&#10;Write markdown text here. Use `code` tags or code blocks:&#10;&#10;```javascript&#10;console.log('hello');&#10;```"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant/10">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="font-label-mono text-xs text-on-surface-variant hover:text-on-surface uppercase tracking-wider px-4 py-2 border border-outline-variant/15 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:opacity-95 text-background font-ui-element text-sm font-bold px-5 py-2 rounded transition-opacity disabled:opacity-50"
                >
                  {isLoading ? "Saving changes..." : "Save Writing Log"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
