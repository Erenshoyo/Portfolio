import { Smartphone } from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGithub,
  FaNpm,
  FaChrome,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiVite,
  SiFramer,
  SiTailwindcss,
  SiDaisyui,
  SiCssmodules,
  SiEslint,
  SiExpress,
  SiPostgresql,
} from "react-icons/si";

export const personalInfo = {
  name: "Asif Shahriar Tauhid",
  role: "Frontend Developer",
  brandStatement:
    "Frontend developer focused on building clean, responsive, and user-centered web experiences with modern React workflows.",
  availability: "Available for Opportunities",
  email: "asifshahriartauhid@gmail.com",
  calendarForm: "https://calendly.com/placeholder",
  socials: {
    github: "https://github.com/Erenshoyo",
    linkedin: "https://www.linkedin.com/in/asif-tauhid/",
    facebook: "https://www.facebook.com/asifshahriar.tauhid/",
  },
};

export function isConfiguredLink(url) {
  return Boolean(url) && !url.includes("placeholder");
}

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Involvement", href: "#involvement" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
];

export const skillsData = [
  {
    category: "Core Web",
    items: [
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "JavaScript (ES6+)", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: FaReact },
      { name: "Vite", icon: SiVite },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    category: "Styling & UI",
    items: [
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "DaisyUI", icon: SiDaisyui },
      { name: "CSS Modules", icon: SiCssmodules },
      { name: "Responsive Design", icon: Smartphone },
    ],
  },
  {
    category: "Tools & Workflow",
    items: [
      { name: "Git & GitHub", icon: FaGithub },
      { name: "NPM / Yarn", icon: FaNpm },
      { name: "ESLint & Prettier", icon: SiEslint },
      { name: "Browser DevTools", icon: FaChrome },
    ],
  },
  {
    category: "Currently Learning",
    items: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
];

export const involvementData = [
  {
    id: 1,
    role: "Open Source Contributor & Self-Taught Developer",
    organization: "Frontend Journey",
    duration: "August 2025 - Present",
    points: [
      "Built multiple full-stack and frontend applications utilizing modern tools like React, Tailwind CSS, and Firebase.",
      "Consistently solved algorithmic problems and pushed code to GitHub to maintain an active learning streak.",
      "Mastered modern developer workflows including version control, responsive design, and local storage state management.",
    ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    organization: "NSU ACM Student Chapter",
    duration: "March 2026 - Present",
    points: [
      "Collaborated with a team of students to design and develop the official club flagship event landing page.",
    ],
  },
];

export const educationData = [
  {
    id: 1,
    duration: "2023 - Present",
    degree: "B.Sc. (Engr.) in Computer Science and Engineering",
    institution: "North South University, Dhaka",
  },
  {
    id: 2,
    duration: "2019-2021",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Govt. Science College, Tejgaon, Dhaka",
  },
  {
    id: 3,
    duration: "2017-2019",
    degree: "Secondary School Certificate (SSC)",
    institution: "Safiuddin Sarker Academy & College, Tongi, Gazipur",
  },
];

export const projectsData = [
  {
    id: 1,
    title: "LifeOS Productivity Suite",
    description:
      "A premium, offline-first productivity platform that unifies tasks, habits, journaling, and deep-focus tools into a single intentional system.",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "TypeScript",
    ],
    liveLink: "https://lifeos-es.netlify.app",
    githubLink: "https://github.com/Erenshoyo/LifeOS",
    status: "in-progress",
    featured: true,
    image: "/projects/lifeos.png",
  },
  {
    id: 2,
    title: "PulseCity Event Explorer",
    description:
      "A smart web app for discovering events, viewing details, and creating local booking records. Features Firebase authentication, protected routes, and elegant UI components.",
    techStack: [
      "React",
      "Vite",
      "Firebase Auth",
      "Tailwind CSS",
      "DaisyUI",
      "React Router",
    ],
    liveLink: "https://pulsecity-event-explorer.web.app",
    githubLink: "https://github.com/Erenshoyo/PulseCity-Event-Explorer",
    featured: true,
    image: "/projects/pulse.png",
  },
  {
    id: 3,
    title: "Phudu Medical Booking",
    description:
      "A healthcare platform connecting patients with medical professionals. Users can browse doctor profiles, check real-time availability, and manage appointments with local storage persistence.",
    techStack: [
      "React",
      "Tailwind CSS",
      "React Router",
      "Recharts",
      "React Toastify",
    ],
    liveLink: "https://phudu-medical.web.app",
    githubLink: "https://github.com/Erenshoyo/Phudu-medical-booking",
    featured: true,
    image: "/projects/phudu.png",
  },
];

export const blogPostsData = [
  {
    id: "responsive-bento-grids",
    title: "Architectural UI: Building Responsive Bento Grids with CSS & Framer Motion",
    excerpt: "An in-depth look at implementing asymmetrical, container-based dashboard bento grids with micro-interactions, responsive sizing rules, and fluid animation entries.",
    date: "June 05, 2026",
    readTime: "5 min read",
    tags: ["React", "CSS", "Design System"],
    content: `
# Architectural UI: Building Responsive Bento Grids with CSS & Framer Motion

Modern interface designs have shifted away from standard repeating card grids toward more dynamic, asymmetric layouts. The **Bento Grid**—inspired by Japanese lunchboxes—is a primary design system element that helps group multi-dimensional information visually.

In this deep dive, we'll explore how to build a responsive, production-ready Bento Grid using Tailwind CSS and animate its entry fluidly with Framer Motion.

## 1. Structuring the Grid Layout

To build a bento layout, we use CSS Grid. Tailwind makes this straightforward using the grid-cols class family. For desktop screens, a 12-column grid provides maximum flexibility for different column spans (e.g. col-span-7 and col-span-5).

\`\`\`jsx
<div className="grid grid-cols-12 gap-6">
  {/* Card 1: Wide */}
  <div className="col-span-12 md:col-span-7">...</div>
  {/* Card 2: Narrow */}
  <div className="col-span-12 md:col-span-5">...</div>
</div>
\`\`\`

## 2. Setting Up Accent Lines & Border Anchors

To achieve a premium, architectural look, we replace bulky dropshadows with clean line borders and accent anchors:

*   Use \`border border-outline-variant/15\` to outline panels.
*   Add absolute corner indicators that align with the grid cells.
*   Use background grain overlays or radial dot gradients for technical surfaces.

## 3. Animating Grid Entries with Framer Motion

When rendering grids, animating them staggered makes the load experience feel incredibly premium. We define parent container variants and child item variants:

\`\`\`javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
\`\`\`

By applying these to \`motion.div\` elements, the layout slides into place naturally.
    `
  },
  {
    id: "dynamic-themes-pattern",
    title: "The Dynamic Themes Pattern: Seamless Dark-to-Light Fades with Tailwind CSS Variables",
    excerpt: "How to escape standard Tailwind utility-based theme classes and build an architecture that supports instant color-scheme transitions using CSS custom variables.",
    date: "May 22, 2026",
    readTime: "6 min read",
    tags: ["Tailwind", "CSS", "Web Dev"],
    content: `
# The Dynamic Themes Pattern: Seamless Dark-to-Light Fades

Usually, implementing a dark theme in Tailwind involves adding the \`dark:\` modifier to dozens of elements. However, this approach can quickly become verbose, hard to maintain, and does not support smooth theme transition fades.

Instead, we can leverage CSS variables inside our Tailwind configuration file.

## 1. Mapping Tailwind Colors to CSS Variables

Inside \`tailwind.config.js\`, instead of hardcoding hex values, reference CSS custom variables:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        "on-surface": "var(--on-surface)"
      }
    }
  }
}
\`\`\`

## 2. Defining Theme Blocks in index.css

In your global stylesheet, define the actual hex values for both light and dark themes using HTML data attributes:

\`\`\`css
:root[data-theme="figmaDark"] {
  --primary: #c3cb9a;
  --background: #14140d;
  --on-surface: #e6e2d7;
}

:root[data-theme="figmaLight"] {
  --primary: #5A633F;
  --background: #FAFAF6;
  --on-surface: #202514;
}
\`\`\`

## 3. Adding Smooth Fading Transitions

To toggle the theme smoothly, we apply a transition to base structural elements. Avoid using a universal \`*\` selector as it can cause performance lags or break layout animations. Instead, target base tags:

\`\`\`css
html, body, header, footer, section, div, button, a {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
\`\`\`

This approach decouples your style utilities from the active theme and makes switching themes look elegant.
    `
  },
  {
    id: "offline-first-persistence",
    title: "Offline-First Design: Architecting local persistence systems for modern SPAs",
    excerpt: "Structuring local storage caching, state synchronization hooks, and error handling fallback systems for offline performance and high-reliability data persistence.",
    date: "April 18, 2026",
    readTime: "8 min read",
    tags: ["Architecture", "React", "State"],
    content: `
# Offline-First Design: Architecting local persistence systems

In a world reliant on network availability, building interfaces that work offline is crucial for user experience. An offline-first Single Page Application ensures data remains accessible even with spotty connectivity.

Let's discuss how to sync states to the client local storage securely.

## 1. Creating a Sync Hook

We can build a custom state synchronization hook that handles read/write fallbacks:

\`\`\`javascript
import { useState, useEffect } from 'react';

export function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn("Storage read error:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn("Storage write error:", error);
    }
  }, [key, state]);

  return [state, setState];
}
\`\`\`

## 2. Managing UI Offline Indicators

To inform users about sync updates, we can monitor the browser connection state:

\`\`\`javascript
const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  const goOnline = () => setIsOnline(true);
  const goOffline = () => setIsOnline(false);

  window.addEventListener('online', goOnline);
  window.addEventListener('offline', goOffline);

  return () => {
    window.removeEventListener('online', goOnline);
    window.removeEventListener('offline', goOffline);
  };
}, []);
\`\`\`

By combining persistent state and offline handlers, we create reliable, native-feeling web applications.
    `
  }
];
