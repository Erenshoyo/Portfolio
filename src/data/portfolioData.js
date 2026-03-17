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
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
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
      "Conducted beginner-friendly workshops on HTML, CSS, and introductory React concepts.",
      "Optimized the club website's loading speed and ensured full cross-browser compatibility.",
    ],
  },
];

export const projectsData = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    title: "Dragon News Portal",
    description:
      "A dynamic, responsive React-based news portal that delivers categorized news content. It features comprehensive social login options, trending news marquees, and secure private routing.",
    techStack: [
      "React",
      "Firebase Auth",
      "Tailwind CSS",
      "DaisyUI",
      "React Router",
    ],
    liveLink: "https://dragon-news-site-241.web.app",
    githubLink: "https://github.com/Erenshoyo/Dragon-news-practice-project",
    featured: false,
    image: "/projects/dragon.png",
  },
];
