module.exports = [
  // === BASIC INFO ===
  { key: 'name', label: 'Full Name', text: "What's your full name? (As you want it on the portfolio)", type: 'text', required: true },
  { key: 'role', label: 'Role/Title', text: "What's your professional title? (e.g., 'Full Stack Developer', 'UI/UX Designer', 'DevOps Engineer')", type: 'text', required: true },
  { key: 'tagline', label: 'Tagline', text: "One catchy line that describes you. (e.g., 'Building the future, one commit at a time')", type: 'text', required: false },
  { key: 'bio', label: 'Bio', text: "Write a 2-3 sentence bio about yourself and what you do.", type: 'text', required: true },

  // === CONTACT ===
  { key: 'email', label: 'Email', text: "Your professional email address?", type: 'email', required: true },
  { key: 'github', label: 'GitHub Profile', text: "Your GitHub profile URL? (e.g., https://github.com/yourname)", type: 'url', required: false },
  { key: 'linkedin', label: 'LinkedIn', text: "Your LinkedIn profile URL? (Or type SKIP)", type: 'url', required: false },
  { key: 'twitter', label: 'Twitter/X', text: "Your Twitter/X handle? (Or type SKIP)", type: 'text', required: false },
  { key: 'website', label: 'Personal Website', text: "Do you have an existing website or blog? (Or type SKIP)", type: 'url', required: false },
  { key: 'location', label: 'Location', text: "Where are you based? (e.g., 'Bangalore, India' or 'Remote')", type: 'text', required: false },

  // === SKILLS ===
  { key: 'tech_stack', label: 'Tech Stack', text: "What technologies do you work with? List your main ones. (e.g., React, Node.js, Python, AWS, Docker)", type: 'text', required: true },
  { key: 'skills_detailed', label: 'Skills Detail', text: "Rate your top skills (e.g., 'React - Expert, Node.js - Advanced, Python - Intermediate')", type: 'text', required: false },
  { key: 'languages', label: 'Languages', text: "Programming languages you know? (e.g., JavaScript, TypeScript, Python, Go)", type: 'text', required: false },

  // === PROJECT 1 ===
  { key: 'project_1_name', label: 'Project 1 Name', text: "🚀 Project 1: What's it called?", type: 'text', required: true },
  { key: 'project_1_desc', label: 'Project 1 Description', text: "Describe it in 1-2 sentences. What problem does it solve?", type: 'text', required: true },
  { key: 'project_1_tech', label: 'Project 1 Tech', text: "What tech did you use for this project? (e.g., React, Firebase, Tailwind)", type: 'text', required: false },
  { key: 'project_1_github', label: 'Project 1 GitHub', text: "GitHub repo link for this project? (Or type SKIP)", type: 'url', required: false },
  { key: 'project_1_live', label: 'Project 1 Live Demo', text: "Live demo link? (Or type SKIP)", type: 'url', required: false },
  { key: 'project_1_image', label: 'Project 1 Screenshot', text: "Send a screenshot of this project, or type SKIP", type: 'image', required: false },

  // === PROJECT 2 ===
  { key: 'project_2_name', label: 'Project 2 Name', text: "🚀 Project 2: What's it called? (Or type SKIP if you only have one project)", type: 'text', required: false },
  { key: 'project_2_desc', label: 'Project 2 Description', text: "Describe this project in 1-2 sentences.", type: 'text', required: false },
  { key: 'project_2_tech', label: 'Project 2 Tech', text: "Tech stack for this project?", type: 'text', required: false },
  { key: 'project_2_github', label: 'Project 2 GitHub', text: "GitHub repo link? (Or type SKIP)", type: 'url', required: false },
  { key: 'project_2_live', label: 'Project 2 Live Demo', text: "Live demo link? (Or type SKIP)", type: 'url', required: false },
  { key: 'project_2_image', label: 'Project 2 Screenshot', text: "Send a screenshot, or type SKIP", type: 'image', required: false },

  // === PROJECT 3 ===
  { key: 'project_3_name', label: 'Project 3 Name', text: "🚀 Project 3: Name? (Or type SKIP)", type: 'text', required: false },
  { key: 'project_3_desc', label: 'Project 3 Description', text: "Description?", type: 'text', required: false },
  { key: 'project_3_github', label: 'Project 3 GitHub', text: "GitHub repo? (Or type SKIP)", type: 'url', required: false },
  { key: 'project_3_live', label: 'Project 3 Live Demo', text: "Live demo? (Or type SKIP)", type: 'url', required: false },

  // === EXPERIENCE ===
  { key: 'experience', label: 'Work Experience', text: "Your work experience? (e.g., '2 years at StartupX as Frontend Dev, 1 year at TechCorp as Intern')", type: 'text', required: false },
  { key: 'education', label: 'Education', text: "Your education background? (e.g., 'B.Tech CS from IIT Bombay, 2023')", type: 'text', required: false },
  { key: 'certifications', label: 'Certifications', text: "Any certifications? (e.g., AWS Solutions Architect, Google Cloud, or type SKIP)", type: 'text', required: false },
  { key: 'open_source', label: 'Open Source', text: "Any open source contributions? (e.g., 'Contributed to React, maintained 3 npm packages', or type SKIP)", type: 'text', required: false },
  { key: 'blog_writing', label: 'Blog/Writing', text: "Do you write technical blogs or articles? (Share link or type SKIP)", type: 'text', required: false },

  // === STYLE ===
  { key: 'style_hint', label: 'Style Preference', text: "What vibe do you want? (e.g., 'minimalist dark', 'colorful playful', 'professional corporate', 'cyberpunk')", type: 'text', required: false, confirmation: 'Great, I will design your portfolio with that vibe!' }
];
