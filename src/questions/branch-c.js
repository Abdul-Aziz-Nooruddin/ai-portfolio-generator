module.exports = [
  // === BASIC INFO ===
  { key: 'name', label: 'Full Name', text: "What's your full name?", type: 'text', required: true },
  { key: 'tagline', label: 'Tagline', text: "One line about yourself? (e.g., 'Aspiring Data Scientist | ML Enthusiast | Problem Solver')", type: 'text', required: false },

  // === EDUCATION ===
  { key: 'degree', label: 'Degree', text: "What degree are you pursuing/completed? (e.g., 'B.Tech Computer Science', 'BBA Marketing')", type: 'text', required: true },
  { key: 'institution', label: 'Institution', text: "Which college/university?", type: 'text', required: true },
  { key: 'year', label: 'Year/Graduation', text: "Which year are you in? (e.g., '3rd Year', 'Graduated 2024')", type: 'text', required: true },
  { key: 'gpa', label: 'GPA/Percentage', text: "Your GPA or percentage? (Or type SKIP)", type: 'text', required: false },

  // === CONTACT ===
  { key: 'email', label: 'Email', text: "Your email for recruiters?", type: 'email', required: true },
  { key: 'phone', label: 'Phone', text: "Your phone number? (Or type SKIP)", type: 'text', required: false },
  { key: 'linkedin', label: 'LinkedIn', text: "LinkedIn profile URL? (Or type SKIP)", type: 'url', required: false },
  { key: 'github', label: 'GitHub', text: "GitHub profile? (Or type SKIP)", type: 'url', required: false },
  { key: 'location', label: 'Location', text: "Where are you based? (e.g., 'Pune, India')", type: 'text', required: false },

  // === SKILLS ===
  { key: 'skills', label: 'Skills', text: "Skills you've learned? (e.g., Python, React, Data Analysis, Figma, Excel)", type: 'text', required: true },
  { key: 'skills_proficiency', label: 'Skill Levels', text: "Rate your top skills? (e.g., 'Python - Advanced, React - Intermediate, SQL - Beginner')", type: 'text', required: false },
  { key: 'tools', label: 'Tools', text: "Tools/software you know? (e.g., VS Code, Jupyter, Tableau, Photoshop)", type: 'text', required: false },

  // === PROJECTS ===
  { key: 'project_1', label: 'Project 1', text: "Tell me about a project or internship you completed. What was it?", type: 'text', required: false },
  { key: 'project_1_link', label: 'Project 1 Link', text: "GitHub/demo link for this project? (Or type SKIP)", type: 'url', required: false },
  { key: 'project_2', label: 'Project 2', text: "Another project? (Or type SKIP)", type: 'text', required: false },
  { key: 'project_2_link', label: 'Project 2 Link', text: "Link? (Or type SKIP)", type: 'url', required: false },

  // === ACHIEVEMENTS ===
  { key: 'certifications', label: 'Certifications', text: "Certifications? (e.g., AWS Cloud Practitioner, Google Data Analytics, NPTEL, or type SKIP)", type: 'text', required: false },
  { key: 'hackathons', label: 'Hackathons', text: "Hackathon participations or wins? (Or type SKIP)", type: 'text', required: false },
  { key: 'achievements', label: 'Achievements', text: "Any notable achievements? (e.g., 'Dean's List', 'Top 10 in coding competition', or type SKIP)", type: 'text', required: false },
  { key: 'volunteer', label: 'Volunteer Work', text: "Volunteer work or extracurriculars? (Or type SKIP)", type: 'text', required: false },

  // === CAREER ===
  { key: 'role_seeking', label: 'Target Role', text: "What type of role are you looking for? (e.g., 'Software Engineer', 'Data Analyst', 'Product Manager')", type: 'text', required: true },
  { key: 'internship_ready', label: 'Internship Ready', text: "Are you looking for internships? (Yes/No)", type: 'text', required: false },
  { key: 'languages_spoken', label: 'Languages', text: "Languages you speak? (e.g., 'English, Hindi, Marathi')", type: 'text', required: false },

  // === STYLE ===
  { key: 'style_hint', label: 'Style Preference', text: "Portfolio style: creative & colorful, or clean & professional?", type: 'text', required: false }
];
