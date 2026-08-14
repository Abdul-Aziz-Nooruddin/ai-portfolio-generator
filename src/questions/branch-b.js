module.exports = [
  // === BASIC INFO ===
  { key: 'name', label: 'Full Name', text: "What's your full name?", type: 'text', required: true },
  { key: 'service_title', label: 'Service Title', text: "What's your professional title? (e.g., 'Wedding Photographer', 'Home Interior Designer', 'Math Tutor')", type: 'text', required: true },
  { key: 'service_desc', label: 'Service Description', text: "Describe your service in your own words. What makes you special?", type: 'text', required: true },

  // === CONTACT ===
  { key: 'phone', label: 'Phone/WhatsApp', text: "Your phone/WhatsApp number for clients?", type: 'text', required: true },
  { key: 'email', label: 'Email', text: "Your email? (Or type SKIP)", type: 'email', required: false },
  { key: 'instagram', label: 'Instagram', text: "Your Instagram handle? (Great for visual work, or type SKIP)", type: 'text', required: false },
  { key: 'facebook', label: 'Facebook', text: "Facebook page link? (Or type SKIP)", type: 'url', required: false },
  { key: 'website', label: 'Existing Website', text: "Existing website or portfolio? (Or type SKIP)", type: 'url', required: false },
  { key: 'location', label: 'Location', text: "Which areas do you serve? (e.g., 'Mumbai, Thane, Navi Mumbai' or 'All India, Online')", type: 'text', required: true },

  // === EXPERIENCE ===
  { key: 'experience_years', label: 'Experience', text: "How many years of experience?", type: 'text', required: true },
  { key: 'projects_count', label: 'Projects Done', text: "How many projects/clients have you served approximately? (e.g., '50+ weddings', '200+ students')", type: 'text', required: false },

  // === WORK SAMPLES ===
  { key: 'photo_1', label: 'Work Sample 1', text: "📸 Send your best work photo. (You can send up to 5 photos)", type: 'image', required: true },
  { key: 'photo_1_caption', label: 'Photo 1 Caption', text: "Caption for this photo? (e.g., 'Wedding at Taj Mahal, 2024')", type: 'text', required: false },
  { key: 'photo_2', label: 'Work Sample 2', text: "📸 Send another work sample, or type DONE if finished.", type: 'image', required: false },
  { key: 'photo_2_caption', label: 'Photo 2 Caption', text: "Caption?", type: 'text', required: false },
  { key: 'photo_3', label: 'Work Sample 3', text: "📸 Another photo, or type DONE", type: 'image', required: false },
  { key: 'photo_3_caption', label: 'Photo 3 Caption', text: "Caption?", type: 'text', required: false },
  { key: 'photo_4', label: 'Work Sample 4', text: "📸 More photos? Or type DONE", type: 'image', required: false },
  { key: 'photo_5', label: 'Work Sample 5', text: "📸 Last photo? Or type DONE", type: 'image', required: false },

  // === PRICING ===
  { key: 'pricing', label: 'Pricing', text: "Your pricing? (e.g., 'Starting at ₹5000 per project', '₹500/hour', 'Custom quote based on requirements')", type: 'text', required: false },
  { key: 'packages', label: 'Packages', text: "Do you offer packages? (e.g., 'Basic: ₹3000, Premium: ₹8000, Deluxe: ₹15000', or type SKIP)", type: 'text', required: false },

  // === SOCIAL PROOF ===
  { key: 'testimonial_1', label: 'Testimonial 1', text: "💬 Client testimonial? (e.g., 'Amazing work! - Rahul S.', or type SKIP)", type: 'text', required: false },
  { key: 'testimonial_2', label: 'Testimonial 2', text: "Another testimonial? (Or type SKIP)", type: 'text', required: false },
  { key: 'testimonial_3', label: 'Testimonial 3', text: "One more? (Or type SKIP)", type: 'text', required: false },

  // === AVAILABILITY ===
  { key: 'availability', label: 'Availability', text: "Your availability? (e.g., 'Available immediately', '2 weeks notice', 'Weekends only')", type: 'text', required: false },
  { key: 'languages', label: 'Languages', text: "Languages you speak? (e.g., 'Hindi, English, Marathi')", type: 'text', required: false },

  // === STYLE ===
  { key: 'style_hint', label: 'Style Preference', text: "Describe your style: bold & colorful, clean & minimal, warm & friendly, or luxury & elegant?", type: 'text', required: false }
];
