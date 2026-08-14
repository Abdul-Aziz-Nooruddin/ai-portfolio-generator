module.exports = [
  // === BASIC INFO ===
  { key: 'name', label: 'Full Name', text: "What's your full name?", type: 'text', required: true },
  { key: 'role', label: 'Current Role', text: "Your current role/title? (e.g., 'Marketing Manager', 'Financial Analyst', 'HR Consultant')", type: 'text', required: true },
  { key: 'company', label: 'Company', text: "Current company name? (Or type 'Freelance'/'Independent')", type: 'text', required: false },

  // === CONTACT ===
  { key: 'email', label: 'Email', text: "Your professional email?", type: 'email', required: true },
  { key: 'phone', label: 'Phone', text: "Phone number? (Or type SKIP)", type: 'text', required: false },
  { key: 'linkedin', label: 'LinkedIn', text: "LinkedIn URL? (Or type SKIP)", type: 'url', required: false },
  { key: 'location', label: 'Location', text: "Where are you based?", type: 'text', required: false },

  // === ABOUT ===
  { key: 'bio', label: 'Professional Summary', text: "Write a 3-4 sentence professional summary about yourself.", type: 'text', required: true },
  { key: 'industry', label: 'Industry', text: "What industry do you work in? (e.g., 'Finance', 'Healthcare', 'E-commerce', 'EdTech')", type: 'text', required: false },

  // === EXPERIENCE ===
  { key: 'experience_years', label: 'Years of Experience', text: "Total years of experience?", type: 'text', required: true },
  { key: 'previous_roles', label: 'Previous Roles', text: "Previous companies/roles? (e.g., 'Ex-Amazon (2 yrs), Ex-Flipkart (1 yr)', or type SKIP)", type: 'text', required: false },

  // === SKILLS ===
  { key: 'skills', label: 'Key Skills', text: "Your key skills? (e.g., 'Strategic Planning, Data Analysis, Team Leadership, SEO')", type: 'text', required: true },
  { key: 'tools', label: 'Tools', text: "Tools you use? (e.g., 'Excel, PowerBI, Salesforce, Tableau, Slack')", type: 'text', required: false },

  // === ACHIEVEMENTS ===
  { key: 'achievements', label: 'Key Achievements', text: "Notable achievements with metrics? (e.g., 'Increased sales by 40%', 'Managed team of 15', 'Reduced costs by ₹20L')", type: 'text', required: false },
  { key: 'metrics', label: 'Metrics', text: "Any quantifiable results? (e.g., '₹5Cr revenue managed', '100+ clients served', '95% client retention')", type: 'text', required: false },
  { key: 'awards', label: 'Awards/Recognition', text: "Awards or recognition? (Or type SKIP)", type: 'text', required: false },
  { key: 'certifications', label: 'Certifications', text: "Professional certifications? (e.g., 'PMP, CFA Level 1, Six Sigma', or type SKIP)", type: 'text', required: false },

  // === SERVICES (if applicable) ===
  { key: 'services_offered', label: 'Services', text: "Do you offer consulting/services? (e.g., 'Business Strategy Consulting', 'Financial Planning', or type SKIP)", type: 'text', required: false },
  { key: 'pricing', label: 'Pricing', text: "Your consulting rates? (e.g., '₹2000/hour', 'Project-based', or type SKIP)", type: 'text', required: false },

  // === CONTENT ===
  { key: 'speaking', label: 'Speaking', text: "Speaking engagements? (e.g., 'TEDx speaker, Conference panelist', or type SKIP)", type: 'text', required: false },
  { key: 'publications', label: 'Publications', text: "Articles or publications? (Or type SKIP)", type: 'text', required: false },
  { key: 'testimonial_1', label: 'Testimonial', text: "Client/colleague testimonial? (Or type SKIP)", type: 'text', required: false },

  // === STYLE ===
  { key: 'style_hint', label: 'Style Preference', text: "Style preference: corporate & professional, modern & creative, or minimal & elegant?", type: 'text', required: false }
];
