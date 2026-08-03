import React, { useEffect, useMemo, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: ["Django", "Node.js", "Python"],
  },
  {
    title: "Data & Tools",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "SQL",
      "Git",
      "REST APIs",
      "Python for data analysis",
    ],
  },
];

const experience = [
  {
    company: "Prudent AI",
    role: "Frontend React Developer",
    type: "Current",
    points: [
      "Focused on UI development and web app design, translating requirements into functional, appealing layouts.",
      "Built responsive React.js components and authored the organization's unique design system.",
      "Migrated an app frontend to a newer version by updating tech stacks and repositories.",
    ],
  },
  {
    company: "IBM SkillBuild",
    role: "Virtual Intern",
    type: "Completed",
    points: [
      "Developed multiple task-based applications guided by instructors.",
      "Handled concurrent project assignments under deadline pressure.",
      "Created design proposals and implementation presentations.",
      "Successfully completed the assigned capstone project and certification.",
    ],
  },
];

const projects = [
  {
    title: "Weather Hub",
    description: "Find current and historical weather insights.",
    image: "/assets/img/portfolio/app-1.jpg",
    link: "https://weatherrhub.netlify.app",
  },
  {
    title: "Pet-Zone",
    description: "E-commerce platform for pet care essentials.",
    image: "/assets/img/portfolio/product-1.jpg",
    link: "https://petzone-7bb4.onrender.com",
  },
  {
    title: "ApiHitter",
    description: "API testing and request runner platform.",
    image: "/assets/img/portfolio/apihiter.png",
    link: "https://apihitter-wwsk.onrender.com/",
  },
  {
    title: "Lite UI Design System",
    description: "A lightweight, reusable UI design system.",
    image: "/assets/img/portfolio/branding-1.png",
    link: "https://liteui.netlify.app/",
  },
];

const rotatingRoles = [
  "Full Stack Web Developer",
  "Data Analyst",
  "Freelancer",
];

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="resume-icon">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v6h6" />
      <path d="M9 13h6M9 17h6M9 9h2" />
    </svg>
  );
}

function App() {
  const [showResume, setShowResume] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 2200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a href="#home" className="brand">
          Portfolio
        </a>
        <nav>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">Hello, I am</p>
            <h1>Mohamed Salmaan</h1>
            <p>
              <span key={rotatingRoles[roleIndex]} className="hero-role">
                {rotatingRoles[roleIndex]}
              </span>
            </p>
            <p>
              I am Mohamed Salmaan, a Computer Science graduate focused on
              modern web development, user-centered interfaces, and practical
              solutions.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-ghost">
                Contact Me
              </a>
            </div>
          </div>
          <div className="hero-visual reveal delay-1">
            <img src="/assets/img/my-profile-img.jpg" alt="Mohamed Salmaan" />
          </div>
        </section>

        <section id="about" className="section reveal">
          <h2>About</h2>
          <p>
            Hello! I am Mohamed Salmaan, a passionate and curious tech
            enthusiast with a strong foundation in Computer Science and
            Engineering. I enjoy building real-world applications, exploring new
            technologies, and turning ideas into digital experiences.
          </p>
          <div className="about-grid">
            <div className="about-card">
              <h3>Profile Snapshot</h3>
              <ul>
                <li>DOB: 25 August 2004</li>
                <li>Degree: B.Tech (CSE)</li>
                <li>University: BSA Crescent Institute</li>
                <li>City: Chennai, Tamil Nadu</li>
              </ul>
            </div>
            <div className="about-card">
              <h3>What Drives Me</h3>
              <p>
                I love collaborating on meaningful projects that help users,
                improve processes, or deliver something creative and impactful.
                My goal is to keep learning and keep building software that
                matters.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section reveal">
          <h2>Skills</h2>
          <p>
            These are my skills categorized by frontend, backend, and tools. I
            am always eager to learn new technologies and expand my skill set.
          </p>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card">
                <h3>{group.title}</h3>
                <div className="chip-wrap">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="section reveal">
          <h2>Resume</h2>
          <p>
            Open my resume directly on the site or download the PDF for offline
            review.
          </p>

          <div className="resume-actions">
            <button
              className="resume-trigger"
              type="button"
              onClick={() => setShowResume(true)}
            >
              <ResumeIcon />
              <span>View Resume</span>
            </button>
            <a
              className="btn btn-primary"
              href="/resume/resume%20webdev%20new.pdf"
              download
            >
              Download Resume
            </a>
          </div>
        </section>

        <section id="experience" className="section reveal">
          <h2>Experience</h2>
          <div className="timeline">
            {experience.map((item) => (
              <article key={item.company} className="timeline-card">
                <div className="timeline-head">
                  <h3>{item.company}</h3>
                  <span>{item.type}</span>
                </div>
                <p className="role">{item.role}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal">
          <h2>Projects</h2>
          <p className="projects-note">
            Visit my{" "}
            <a
              className="github-link"
              href="https://github.com/salmaan-25"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>{" "}
            for more projects.
          </p>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Visit Project
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section reveal">
          <h2>Contact</h2>
          <p>I am open to internship and full-time opportunities.</p>
          <div className="contact-grid">
            <a href="mailto:mohamed.salmaan2004@gmail.com">
              mohamed.salmaan2004@gmail.com
            </a>
            <a href="tel:+916379565931">+91 63795 65931</a>
            <a
              href="https://www.linkedin.com/in/mohamed-salmaan-5234432b3"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn Profile
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        © {currentYear} Mohamed Salmaan. All rights reserved.
      </footer>

      {showResume && (
        <div className="resume-modal" role="dialog" aria-modal="true">
          <div
            className="resume-modal-backdrop"
            onClick={() => setShowResume(false)}
          />
          <div className="resume-modal-panel">
            <div className="resume-modal-top">
              <h3>Resume Preview</h3>
              <button type="button" onClick={() => setShowResume(false)}>
                Close
              </button>
            </div>
            <iframe
              title="Resume PDF"
              src="/resume/resume%20webdev%20new.pdf"
            />
            <p className="resume-hint">
              If the PDF is not visible yet, place your file in public/resume/.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
