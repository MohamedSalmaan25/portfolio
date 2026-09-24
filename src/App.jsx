import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Drawer,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  LinearProgress,
  Tooltip,
  Fab,
  Zoom,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from "@mui/lab";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

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
    icon: <CodeIcon />,
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: <StorageIcon />,
    skills: [
      { name: "Django", level: 80 },
      { name: "Node.js", level: 80 },
      { name: "Python", level: 85 },
    ],
  },
  {
    title: "Data & Tools",
    icon: <AutoAwesomeIcon />,
    skills: [
      { name: "PostgreSQL", level: 70 },
      { name: "MongoDB", level: 75 },
      { name: "Git", level: 90 },
      { name: "REST APIs", level: 85 },
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
    title: "Takhtit",
    description: "Full-stack project management tool built with Django REST Framework and React, supporting project, sprint, and ticket tracking with role-based access.",
    image: "/assets/img/portfolio/logo-takhtit.png",
    link: "https://takhtitt.netlify.app/",
    tag: "Full Stack",
  },
  {
    title: "Weather Hub",
    description: "Find current and historical weather insights.",
    image: "/assets/img/portfolio/app-1.jpg",
    link: "https://weatherrhub.netlify.app",
    tag: "React",
  },
  {
    title: "Pet-Zone",
    description: "E-commerce platform for pet care essentials.",
    image: "/assets/img/portfolio/product-1.jpg",
    link: "https://petzone-7bb4.onrender.com",
    tag: "Full Stack",
  },
  {
    title: "ApiHitter",
    description: "API testing and request runner platform.",
    image: "/assets/img/portfolio/apihiter.png",
    link: "https://apihitter-wwsk.onrender.com/",
    tag: "Tool",
  },
  {
    title: "Lite UI Design System",
    description: "A lightweight, reusable UI design system.",
    image: "/assets/img/portfolio/branding-1.png",
    link: "https://liteui.netlify.app/",
    tag: "Design System",
  },
];

const rotatingRoles = [
  "Full Stack Web Developer",
  "Data Analyst",
  "Freelancer",
];

function ScrollTop(props) {
  const { children, window: windowProp } = props;
  const trigger = useScrollTrigger({
    target: windowProp ? windowProp() : undefined,
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = () => {
    const win = windowProp ? windowProp() : window;
    win.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1100 }}
      >
        {children}
      </div>
    </Zoom>
  );
}

function App(props) {
  const [showResume, setShowResume] = useState(false);

  // Theme State (Default Dark)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved ? saved === "dark" : true;
  });

  // Typing Effect State
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Mobile Nav & Scroll Spy
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Image 3D Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Typing Effect effect
  useEffect(() => {
    if (subIndex === rotatingRoles[roleIndex].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      Math.max(isDeleting ? 50 : 100, Math.random() * 150),
    );

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, roleIndex]);

  // Scroll spy effect - fast scroll listener
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.substring(1));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 120; // Navbar height offset

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - offset <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Tilt effect handler
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * 20, y: -x * 20 }); // Max 10 deg tilt
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="site-shell">
      {/* Hero anchor sentinel – sits at the very top, zero height */}
      <div id="home" style={{ position: "absolute", top: 0, height: 0 }} />

      {/* Navbar */}
      <header className="topbar">
        <a href="#home" className="brand">
          <CodeIcon sx={{ color: "var(--brand)" }} />
          <span>Portfolio</span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={
                    activeSection === link.href.substring(1) ? "active" : ""
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Tooltip
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
          </Tooltip>
        </nav>

        {/* Mobile Nav Toggle */}
        <div
          className="mobile-only"
          style={{ alignItems: "center", gap: "0.5rem" }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ color: "var(--text)" }} />
          </IconButton>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: 260, background: "var(--surface)", p: 2 },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            style={{ display: "flex", gap: "8px", color: "var(--text)" }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            <span style={{ fontWeight: 600 }}>
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: "var(--text)" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <ul
          className="nav-list"
          style={{ flexDirection: "column", gap: "2rem", marginTop: "2rem" }}
        >
          {navLinks.map((link) => (
            <li key={link.href} style={{ width: "100%", textAlign: "center" }}>
              <a
                href={link.href}
                onClick={handleDrawerToggle}
                style={{ fontSize: "1.2rem" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Drawer>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-copy reveal">
            <span className="eyebrow">Hello, I am</span>
            <h1>
              Mohamed <br />
              <span className="highlight">Salmaan</span>
            </h1>
            <div className="hero-role-container">
              <span className="hero-role">
                {rotatingRoles[roleIndex].substring(0, subIndex)}
              </span>
            </div>
            <p className="description">
              I am a Computer Science graduate focused on modern web
              development, user-centered interfaces, and practical solutions. I
              build digital experiences that look great and work perfectly.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary-custom">
                View Projects <ArrowForwardIcon fontSize="small" />
              </a>
              <a href="#contact" className="btn-ghost-custom">
                Contact Me
              </a>
            </div>
          </div>
          <div
            className="hero-visual reveal delay-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
          >
            <div
              className="image-wrapper"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              <img src="/assets/img/my-profile-img.png" alt="Mohamed Salmaan" />
              <div className="floating-badge">
                <span>👋</span> Open to work
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section reveal">
          <div className="section-header">
            <h2>About Me</h2>
            <p>
              Passionate and curious tech enthusiast with a strong foundation in
              Computer Science.
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                Hello! I am Mohamed Salmaan. I enjoy building real-world
                applications, exploring new technologies, and turning ideas into
                digital experiences. My goal is to keep learning and keep
                building software that matters.
              </p>
              <br />
              <p>
                I love collaborating on meaningful projects that help users,
                improve processes, or deliver something creative and impactful.
              </p>
            </div>
            <div
              className="about-cards-grid"
              style={{ display: "grid", gap: "1rem" }}
            >
              <div className="about-card">
                <h3>Profile Snapshot</h3>
                <ul className="about-list">
                  <li>
                    <CheckCircleIcon fontSize="small" /> <span>DOB:</span> 25
                    August 2004
                  </li>
                  <li>
                    <CheckCircleIcon fontSize="small" /> <span>Degree:</span>{" "}
                    B.Tech (CSE)
                  </li>
                  <li>
                    <CheckCircleIcon fontSize="small" />{" "}
                    <span>University:</span> BSA Crescent Institute
                  </li>
                  <li>
                    <CheckCircleIcon fontSize="small" /> <span>City:</span>{" "}
                    Chennai, Tamil Nadu
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section reveal">
          <div className="section-header">
            <h2>My Skills</h2>
            <p>Technologies I work with across the stack.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-category-card">
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {group.icon} {group.title}
                </h3>
                <div className="skill-items">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="skill-item-row">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          mt: 1,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "var(--line)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "var(--brand)",
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section
          id="resume"
          className="section reveal"
          style={{ textAlign: "center" }}
        >
          <div className="section-header">
            <h2>Resume</h2>
            <p>Review my experience and qualifications.</p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-ghost-custom"
              onClick={() => setShowResume(true)}
              style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}
            >
              <DescriptionIcon /> View Full Resume
            </button>
            <a
              className="btn-primary-custom"
              href="/resume/resume%20webdev%20new.pdf"
              download
              style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}
            >
              Download PDF
            </a>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section reveal">
          <div className="section-header">
            <h2>Experience</h2>
            <p>My professional journey and internships.</p>
          </div>

          <div className="experience-container">
            <Timeline
              position="alternate"
              sx={{
                px: { xs: 0, sm: 2 },
                // On mobile, force left alignment and remove extra left padding
                [`@media (max-width: 768px)`]: {
                  "& .MuiTimelineItem-root": {
                    flexDirection: "row !important",
                  },
                  "& .MuiTimelineItem-root:before": {
                    flex: 0,
                    padding: 0,
                  },
                  "& .MuiTimelineContent-root": {
                    textAlign: "left !important",
                    paddingLeft: "16px",
                    paddingRight: "4px",
                  },
                },
              }}
            >
              {experience.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: "var(--brand)", p: 1 }} />
                    {index < experience.length - 1 && (
                      <TimelineConnector sx={{ bgcolor: "var(--brand-2)" }} />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: { xs: 1, sm: 2 } }}>
                    <div className="timeline-card">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.5rem",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>{item.company}</h3>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.25rem 0.75rem",
                            border: "1px solid var(--brand)",
                            color: "var(--brand)",
                            borderRadius: "999px",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="timeline-role">{item.role}</p>
                      <ul className="timeline-points">
                        {item.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section reveal">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p>
              Some of my recent work. Visit my{" "}
              <a
                href="https://github.com/salmaan-25"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--brand-2)", fontWeight: 600 }}
              >
                GitHub
              </a>{" "}
              for more.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div
                    style={{ position: "absolute", top: "1rem", right: "1rem" }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.4rem 1rem",
                        background: "rgba(15, 23, 42, 0.8)",
                        backdropFilter: "blur(4px)",
                        color: "white",
                        borderRadius: "999px",
                        fontWeight: 600,
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    Visit Project <ArrowForwardIcon fontSize="small" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section reveal">
          <div className="section-header">
            <h2>Get In Touch</h2>
          </div>

          <div className="contact-grid">
            <Tooltip title="Send me an email" arrow placement="top">
              <a
                href="mailto:mohamed.salmaan2004@gmail.com"
                className="contact-card"
              >
                <div className="contact-icon">
                  <EmailIcon fontSize="large" />
                </div>
                <span>mohamed.salmaan2004@gmail.com</span>
              </a>
            </Tooltip>

            <Tooltip title="Give me a call" arrow placement="top">
              <a href="tel:+916379565931" className="contact-card">
                <div className="contact-icon">
                  <PhoneIcon fontSize="large" />
                </div>
                <span>+91 63795 65931</span>
              </a>
            </Tooltip>

            <Tooltip title="Connect on LinkedIn" arrow placement="top">
              <a
                href="https://www.linkedin.com/in/mohamed-salmaan-5234432b3"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <div className="contact-icon">
                  <LinkedInIcon fontSize="large" />
                </div>
                <span>LinkedIn Profile</span>
              </a>
            </Tooltip>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {currentYear} Mohamed Salmaan. All rights reserved.</p>
      </footer>

      {/* Resume Dialog */}
      <Dialog
        open={showResume}
        onClose={() => setShowResume(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "var(--radius-lg)", bgcolor: "var(--surface)" },
        }}
      >
        <div
          style={{
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--line)",
            backgroundColor: "var(--surface)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--text)",
            }}
          >
            Resume Preview
          </h2>
          <Button
            variant="outlined"
            onClick={() => setShowResume(false)}
            sx={{
              color: "var(--text)",
              borderColor: "var(--line)",
              borderRadius: "999px",
              "&:hover": { borderColor: "var(--text)" },
            }}
          >
            Close
          </Button>
        </div>
        <DialogContent sx={{ p: 0, height: "70vh" }}>
          <iframe
            title="Resume PDF"
            src="/resume/resume%20webdev%20new.pdf"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        </DialogContent>
        <div
          style={{
            padding: "0.75rem 1.5rem",
            borderTop: "1px solid var(--line)",
            background: "var(--bg)",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--muted)" }}>
            If the PDF is not visible yet, place your file in public/resume/.
          </p>
        </div>
      </Dialog>

      {/* Scroll to top FAB */}
      <ScrollTop {...props}>
        <Fab
          size="medium"
          aria-label="scroll back to top"
          sx={{
            bgcolor: "var(--brand)",
            color: "white",
            "&:hover": { bgcolor: "var(--brand-light)" },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}

export default App;
