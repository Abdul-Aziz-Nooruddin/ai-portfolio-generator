/**
 * AI Portfolio Studio — Dynamic Client Web App
 * Supports Universal PDF/Image Analysis, Dynamic Projects, Custom Sections, and Live Generation.
 */

let currentBranch = 'A';
let currentSiteId = null;
let currentPreviewUrl = null;
let projectCounter = 0;
let sectionCounter = 0;

// DOM Elements
const heroLanding = document.getElementById('heroLanding');
const studioWorkspace = document.getElementById('studioWorkspace');
const dropZone = document.getElementById('dropZone');
const resumeFileInput = document.getElementById('resumeFileInput');
const dropStatus = document.getElementById('dropStatus');
const portfolioIframe = document.getElementById('portfolioIframe');
const previewLoader = document.getElementById('previewLoader');
const previewFrameWrapper = document.getElementById('previewFrameWrapper');
const btnOpenNewTab = document.getElementById('btnOpenNewTab');
const btnUnlockDomain = document.getElementById('btnUnlockDomain');
const btnGenerateStudio = document.getElementById('btnGenerateStudio');

// 1. Navigation & View Toggles
async function openStudioView() {
  if (heroLanding) heroLanding.style.display = 'none';
  if (studioWorkspace) studioWorkspace.style.display = 'grid';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // If user has an existing portfolio or session, pre-populate their fields
  await loadExistingPortfolioIfAvailable();

  // Initialize with at least 1 project card if empty
  const projectsContainer = document.getElementById('projectsContainer');
  if (projectsContainer && projectsContainer.children.length === 0) {
    addProjectCard({
      name: 'AI Portfolio Studio',
      desc: 'Autonomous developer portfolio building system with 3D interactions and Bento architecture.',
      tech: 'React, Node.js, Three.js'
    });
  }
}

async function loadExistingPortfolioIfAvailable() {
  try {
    const res = await fetch('/api/web/dashboard', { credentials: 'include' });
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && data.conversation?.extracted_data) {
      const extracted = data.conversation.extracted_data;
      if (extracted.name || extracted.role || (extracted.projects && extracted.projects.length > 0)) {
        populateStudioForm(extracted);
      }
      if (data.siteId) {
        currentSiteId = data.siteId;
        currentPreviewUrl = `/p/${data.siteId}`;
        if (portfolioIframe) {
          portfolioIframe.src = currentPreviewUrl;
          portfolioIframe.style.display = 'block';
          if (previewLoader) previewLoader.style.display = 'none';
        }
        if (btnGenerateStudio) {
          btnGenerateStudio.textContent = '⚡ Update & Republish Live Site';
        }
        if (btnOpenNewTab) {
          btnOpenNewTab.style.display = 'inline-flex';
          btnOpenNewTab.href = currentPreviewUrl;
        }
      }
    }
  } catch (e) {
    // Non-logged in or guest mode
  }
}

function closeStudioView() {
  if (studioWorkspace) studioWorkspace.style.display = 'none';
  if (heroLanding) heroLanding.style.display = 'block';
}

function setBranch(branch, btn) {
  currentBranch = branch;
  document.querySelectorAll('.branch-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function setDeviceMode(mode, btn) {
  document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (mode === 'mobile') {
    previewFrameWrapper.classList.remove('desktop-mode');
    previewFrameWrapper.classList.add('mobile-mode');
  } else {
    previewFrameWrapper.classList.remove('mobile-mode');
    previewFrameWrapper.classList.add('desktop-mode');
  }
}

// 2. Drag & Drop PDF & Image Resume Handler
if (dropZone) {
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  });
}

if (resumeFileInput) {
  resumeFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  });
}

// Modern Toast Notification Helper
function showToast(title, message = '', type = 'info', duration = 5000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

async function handleFileUpload(file) {
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    showToast('File Too Large', 'Maximum resume upload size is 10MB.', 'error');
    return;
  }

  if (dropStatus) dropStatus.textContent = `⏳ Analyzing ${file.name} with AI Vision...`;
  
  try {
    const base64Data = await fileToBase64(file);
    const mimeType = file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

    const res = await fetch('/api/web/parse-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Data, mimeType })
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || result.message || 'Failed to extract resume data.');
    }

    const data = result.data || {};
    populateStudioForm(data);

    if (result.branch) {
      setBranch(result.branch, document.querySelector(`.branch-btn[data-branch="${result.branch}"]`));
    }

    openStudioView();
    if (dropStatus) dropStatus.textContent = 'or drag and drop PDF / Image here';

    showToast('Resume Parsed Successfully', `Extracted ${data.name || 'profile'} details with AI Vision.`, 'success');

    // Trigger instant preview generation
    await generatePortfolioSite();

    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  } catch (err) {
    console.error('Upload Error:', err);
    showToast('Resume Extraction Note', `${err.message || 'Could not parse document'}. Opening interactive builder directly.`, 'warning');
    if (dropStatus) dropStatus.textContent = 'or drag and drop PDF / Image here';
    openStudioView();
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function populateStudioForm(data) {
  if (data.name) document.getElementById('inputName').value = data.name;
  if (data.role || data.service_title) document.getElementById('inputRole').value = data.role || data.service_title;
  if (data.bio || data.tagline) document.getElementById('inputBio').value = data.bio || data.tagline;
  if (data.email) document.getElementById('inputEmail').value = data.email;
  if (data.location) document.getElementById('inputLocation').value = data.location;
  if (data.github) document.getElementById('inputGithub').value = data.github;
  if (data.linkedin) document.getElementById('inputLinkedin').value = data.linkedin;
  if (data.website) document.getElementById('inputWebsite').value = data.website;
  if (data.tech_stack || data.skills) document.getElementById('inputTech').value = Array.isArray(data.tech_stack || data.skills) ? (data.tech_stack || data.skills).join(', ') : (data.tech_stack || data.skills);

  // Populate dynamic projects
  const projectsContainer = document.getElementById('projectsContainer');
  if (projectsContainer) {
    projectsContainer.innerHTML = '';
    const projectsList = data.projects || [];
    if (projectsList.length > 0) {
      projectsList.forEach(p => addProjectCard(p));
    } else {
      if (data.project_1_name) {
        addProjectCard({ name: data.project_1_name, desc: data.project_1_desc, tech: data.project_1_tech });
      }
      if (data.project_2_name) {
        addProjectCard({ name: data.project_2_name, desc: data.project_2_desc, tech: data.project_2_tech });
      }
    }
  }

  // Populate dynamic custom sections (experience, education, certifications, awards)
  const sectionsContainer = document.getElementById('sectionsContainer');
  if (sectionsContainer) {
    sectionsContainer.innerHTML = '';
    if (Array.isArray(data.experience) && data.experience.length > 0) {
      data.experience.forEach(exp => addCustomSection('experience', exp));
    }
    if (Array.isArray(data.education) && data.education.length > 0) {
      data.education.forEach(edu => addCustomSection('education', edu));
    }
    if (Array.isArray(data.certifications) && data.certifications.length > 0) {
      data.certifications.forEach(cert => addCustomSection('certification', cert));
    }
    if (Array.isArray(data.awards) && data.awards.length > 0) {
      data.awards.forEach(awd => addCustomSection('award', awd));
    }
  }
}

// 3. Dynamic Projects Management
function addProjectCard(data = {}) {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  projectCounter++;
  const id = `project_${projectCounter}`;

  const card = document.createElement('div');
  card.className = 'dynamic-card';
  card.id = id;
  card.innerHTML = `
    <div class="dynamic-card-header">
      <span class="dynamic-card-title">🚀 Project #${container.children.length + 1}</span>
      <button type="button" class="btn-remove-card" onclick="removeDynamicCard('${id}')">✕ Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Project Name *</label>
        <input type="text" class="proj-name" placeholder="e.g. Nexus AI Orchestrator" value="${escapeAttr(data.name || data.title || '')}" required>
      </div>
      <div class="form-group">
        <label>Tech Stack</label>
        <input type="text" class="proj-tech" placeholder="e.g. Python, FastAPI, React" value="${escapeAttr(data.tech_stack || data.tech || '')}">
      </div>
    </div>
    <div class="form-group">
      <label>Project Description</label>
      <textarea class="proj-desc" rows="2" placeholder="Autonomous multi-agent orchestration framework with persistent vector memory...">${escapeHtml(data.description || data.desc || '')}</textarea>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Live Demo URL</label>
        <input type="url" class="proj-live" placeholder="https://..." value="${escapeAttr(data.live || data.link || '')}">
      </div>
      <div class="form-group">
        <label>GitHub Repository</label>
        <input type="url" class="proj-github" placeholder="https://github.com/..." value="${escapeAttr(data.github || '')}">
      </div>
    </div>
  `;

  container.appendChild(card);
}

// 4. Dynamic Custom Sections Management
function toggleSectionDropdown() {
  const dropdown = document.getElementById('sectionDropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const trigger = document.getElementById('btnAddSectionTrigger');
  const dropdown = document.getElementById('sectionDropdown');
  if (dropdown && trigger && !trigger.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

function addCustomSection(type, data = {}) {
  const container = document.getElementById('sectionsContainer');
  const dropdown = document.getElementById('sectionDropdown');
  if (dropdown) dropdown.style.display = 'none';
  if (!container) return;

  sectionCounter++;
  const id = `section_${sectionCounter}`;
  const card = document.createElement('div');
  card.className = 'dynamic-card';
  card.id = id;
  card.dataset.sectionType = type;

  let fieldsHtml = '';

  if (type === 'experience') {
    fieldsHtml = `
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">💼 Work Experience</span>
        <button type="button" class="btn-remove-card" onclick="removeDynamicCard('${id}')">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Job Title / Role *</label>
          <input type="text" class="sec-role" placeholder="e.g. Lead AI Systems Engineer" value="${escapeAttr(data.role || data.title || '')}" required>
        </div>
        <div class="form-group">
          <label>Company / Organization *</label>
          <input type="text" class="sec-company" placeholder="e.g. Neural Technologies" value="${escapeAttr(data.company || '')}" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Time Period</label>
          <input type="text" class="sec-period" placeholder="e.g. 2022 - Present" value="${escapeAttr(data.period || data.duration || '')}">
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" class="sec-loc" placeholder="e.g. San Francisco, CA / Remote" value="${escapeAttr(data.location || '')}">
        </div>
      </div>
      <div class="form-group">
        <label>Role Summary & Achievements</label>
        <textarea class="sec-desc" rows="2" placeholder="Architected high-throughput inference pipeline scaling to 10M tokens/sec...">${escapeHtml(data.description || (Array.isArray(data.achievements) ? data.achievements.join('. ') : ''))}</textarea>
      </div>
    `;
  } else if (type === 'education') {
    fieldsHtml = `
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">🎓 Education</span>
        <button type="button" class="btn-remove-card" onclick="removeDynamicCard('${id}')">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Degree / Major *</label>
          <input type="text" class="sec-degree" placeholder="e.g. B.S. in Computer Science" value="${escapeAttr(data.degree || '')}" required>
        </div>
        <div class="form-group">
          <label>University / School *</label>
          <input type="text" class="sec-school" placeholder="e.g. Stanford University" value="${escapeAttr(data.institution || data.school || '')}" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Year / Period</label>
          <input type="text" class="sec-year" placeholder="e.g. 2020 - 2024" value="${escapeAttr(data.year || '')}">
        </div>
        <div class="form-group">
          <label>GPA / Honors / Details</label>
          <input type="text" class="sec-grade" placeholder="e.g. GPA 3.9/4.0 • Summa Cum Laude" value="${escapeAttr(data.grade || data.details || '')}">
        </div>
      </div>
    `;
  } else if (type === 'certification') {
    fieldsHtml = `
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">📜 Certification</span>
        <button type="button" class="btn-remove-card" onclick="removeDynamicCard('${id}')">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Certification Name *</label>
          <input type="text" class="sec-cert-name" placeholder="e.g. AWS Solutions Architect Professional" value="${escapeAttr(data.name || data.title || '')}" required>
        </div>
        <div class="form-group">
          <label>Issuer / Organization</label>
          <input type="text" class="sec-cert-issuer" placeholder="e.g. Amazon Web Services" value="${escapeAttr(data.issuer || '')}">
        </div>
      </div>
    `;
  } else if (type === 'award') {
    fieldsHtml = `
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">🏆 Award / Honor</span>
        <button type="button" class="btn-remove-card" onclick="removeDynamicCard('${id}')">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Award Title *</label>
          <input type="text" class="sec-award-title" placeholder="e.g. 1st Place Global AI Hackathon" value="${escapeAttr(data.title || data.name || '')}" required>
        </div>
        <div class="form-group">
          <label>Issuer / Year</label>
          <input type="text" class="sec-award-issuer" placeholder="e.g. OpenAI • 2024" value="${escapeAttr(data.issuer || data.year || '')}">
        </div>
      </div>
    `;
  } else {
    fieldsHtml = `
      <div class="dynamic-card-header">
        <span class="dynamic-card-title">📝 Custom Section</span>
        <button type="button" class="btn-remove-card" onclick="removeDynamicCard('${id}')">✕ Remove</button>
      </div>
      <div class="form-group">
        <label>Section Title *</label>
        <input type="text" class="sec-custom-title" placeholder="e.g. Open Source Contributions or Publications" value="${escapeAttr(data.title || '')}" required>
      </div>
      <div class="form-group">
        <label>Content / Notes</label>
        <textarea class="sec-custom-content" rows="2" placeholder="Describe your achievements, links, or details...">${escapeHtml(data.content || '')}</textarea>
      </div>
    `;
  }

  card.innerHTML = fieldsHtml;
  container.appendChild(card);
}

function removeDynamicCard(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// 5. Studio Form Generation Dispatch
function handleFormGenerate(e) {
  if (e) e.preventDefault();
  generatePortfolioSite();
}

async function generatePortfolioSite(isRegenerate = false) {
  const btnRegenerateStudio = document.getElementById('btnRegenerateStudio');
  btnGenerateStudio.disabled = true;
  btnGenerateStudio.textContent = isRegenerate ? '🔄 Regenerating New 3D Architecture...' : '⏳ Crafting Award-Winning Portfolio...';

  if (isRegenerate) {
    if (portfolioIframe) {
      portfolioIframe.style.display = 'none';
      portfolioIframe.src = 'about:blank';
    }
    if (previewLoader) {
      previewLoader.style.display = 'flex';
      previewLoader.innerHTML = `
        <div class="placeholder-icon" style="font-size: 2.5rem; margin-bottom: 12px; animation: spin 1s linear infinite;">🔄</div>
        <h3>Tearing down old site &amp; synthesizing fresh 3D build...</h3>
        <p>Removing old preview assets and selecting a new 3D spatial architecture.</p>
      `;
    }
  }

  // 1. Gather Personal Info
  const formData = {
    name: document.getElementById('inputName')?.value.trim() || 'Developer',
    role: document.getElementById('inputRole')?.value.trim() || 'Systems Architect',
    bio: document.getElementById('inputBio')?.value.trim() || '',
    email: document.getElementById('inputEmail')?.value.trim() || 'hello@example.com',
    location: document.getElementById('inputLocation')?.value.trim() || '',
    github: document.getElementById('inputGithub')?.value.trim() || '',
    linkedin: document.getElementById('inputLinkedin')?.value.trim() || '',
    twitter: document.getElementById('inputTwitter')?.value.trim() || '',
    website: document.getElementById('inputWebsite')?.value.trim() || '',
    tech_stack: document.getElementById('inputTech')?.value.trim() || ''
  };

  // 2. Gather Dynamic Projects
  const projectCards = document.querySelectorAll('#projectsContainer .dynamic-card');
  const projects = [];
  projectCards.forEach((card, idx) => {
    const name = card.querySelector('.proj-name')?.value.trim();
    if (name) {
      projects.push({
        name,
        tech: card.querySelector('.proj-tech')?.value.trim() || '',
        tech_stack: card.querySelector('.proj-tech')?.value.trim() || '',
        desc: card.querySelector('.proj-desc')?.value.trim() || '',
        description: card.querySelector('.proj-desc')?.value.trim() || '',
        live: card.querySelector('.proj-live')?.value.trim() || '',
        github: card.querySelector('.proj-github')?.value.trim() || ''
      });
      if (idx === 0) {
        formData.project_1_name = name;
        formData.project_1_desc = card.querySelector('.proj-desc')?.value.trim() || '';
        formData.project_1_tech = card.querySelector('.proj-tech')?.value.trim() || '';
      }
      if (idx === 1) {
        formData.project_2_name = name;
        formData.project_2_desc = card.querySelector('.proj-desc')?.value.trim() || '';
        formData.project_2_tech = card.querySelector('.proj-tech')?.value.trim() || '';
      }
    }
  });
  formData.projects = projects;

  // 3. Gather Dynamic Custom Sections
  const sectionCards = document.querySelectorAll('#sectionsContainer .dynamic-card');
  const experience = [];
  const education = [];
  const certifications = [];
  const awards = [];
  const customSections = [];

  sectionCards.forEach(card => {
    const type = card.dataset.sectionType;
    if (type === 'experience') {
      const role = card.querySelector('.sec-role')?.value.trim();
      if (role) {
        experience.push({
          role,
          company: card.querySelector('.sec-company')?.value.trim() || '',
          period: card.querySelector('.sec-period')?.value.trim() || '',
          location: card.querySelector('.sec-loc')?.value.trim() || '',
          description: card.querySelector('.sec-desc')?.value.trim() || ''
        });
      }
    } else if (type === 'education') {
      const degree = card.querySelector('.sec-degree')?.value.trim();
      if (degree) {
        education.push({
          degree,
          institution: card.querySelector('.sec-school')?.value.trim() || '',
          year: card.querySelector('.sec-year')?.value.trim() || '',
          grade: card.querySelector('.sec-grade')?.value.trim() || ''
        });
      }
    } else if (type === 'certification') {
      const name = card.querySelector('.sec-cert-name')?.value.trim();
      if (name) {
        certifications.push({
          name,
          issuer: card.querySelector('.sec-cert-issuer')?.value.trim() || ''
        });
      }
    } else if (type === 'award') {
      const title = card.querySelector('.sec-award-title')?.value.trim();
      if (title) {
        awards.push({
          title,
          issuer: card.querySelector('.sec-award-issuer')?.value.trim() || ''
        });
      }
    } else if (type === 'custom') {
      const title = card.querySelector('.sec-custom-title')?.value.trim();
      if (title) {
        customSections.push({
          title,
          content: card.querySelector('.sec-custom-content')?.value.trim() || ''
        });
      }
    }
  });

  formData.experience = experience;
  formData.education = education;
  formData.certifications = certifications;
  formData.awards = awards;
  formData.custom_sections = customSections;

  const styleHint = document.getElementById('inputStyle')?.value || 'modern-dark';
  const layout = document.getElementById('inputLayout')?.value || 'auto-cycle';

  try {
    const previousSiteId = isRegenerate ? currentSiteId : null;
    const res = await fetch('/api/web/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: formData,
        branch: currentBranch,
        styleHint,
        layout,
        siteId: isRegenerate ? null : currentSiteId,
        previousSiteId,
        regenerate: isRegenerate
      })
    });

    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.success) {
      if (res.status === 504) {
        throw new Error('The AI design engine timed out. Please try again or simplify your input.');
      } else if (res.status === 429) {
        throw new Error('Rate limit reached. Please wait a few moments before generating again.');
      } else if (res.status === 413) {
        throw new Error('Payload too large. Please shorten project descriptions or remove large images.');
      } else {
        throw new Error(result.error || result.message || 'Generation failed. Please verify your details.');
      }
    }

    currentSiteId = result.siteId;
    currentPreviewUrl = result.previewUrl;

    // Load iframe preview (bust cache if updating existing site)
    if (previewLoader) previewLoader.style.display = 'none';
    if (portfolioIframe) {
      portfolioIframe.style.display = 'block';
      portfolioIframe.src = `${result.previewUrl}?v=${Date.now()}`;
    }

    if (btnRegenerateStudio) {
      btnRegenerateStudio.style.display = 'inline-flex';
    }
    if (btnOpenNewTab) {
      btnOpenNewTab.style.display = 'inline-flex';
      btnOpenNewTab.href = result.previewUrl;
    }
    if (btnUnlockDomain) {
      btnUnlockDomain.style.display = 'inline-flex';
    }

    showToast(isRegenerate ? 'Portfolio Regenerated!' : 'Portfolio Generated Successfully!', `Live preview active at ${result.previewUrl}`, 'success');

    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    }
  } catch (err) {
    console.error('Generation Error:', err);
    showToast('Generation Error', err.message || 'Could not build site. Please try again.', 'error');
  } finally {
    btnGenerateStudio.disabled = false;
    btnGenerateStudio.textContent = currentSiteId ? '⚡ Update & Republish Live Site' : '🚀 Generate & Preview Site';
  }
}

// 6. In-Browser Razorpay Checkout & Anti-Tampering Verification
async function handleUnlockDomain(selectedPlan = 'lite') {
  if (!currentSiteId) {
    showToast('Generate First', 'Please generate your portfolio before checking out.', 'warning');
    return;
  }

  btnUnlockDomain.disabled = true;
  btnUnlockDomain.textContent = '⏳ Preparing Checkout...';

  try {
    const res = await fetch('/api/web/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteId: currentSiteId, plan: selectedPlan })
    });

    const order = await res.json();
    if (!order.success) throw new Error(order.error || 'Order creation failed');

    // 1. Standard Razorpay In-Page Modal Checkout
    if (order.isCustomCheckout && window.Razorpay && order.orderId) {
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'AI Portfolio Bot',
        description: `Unlock Permanent Live Hosting (${selectedPlan.toUpperCase()} Plan)`,
        order_id: order.orderId,
        theme: { color: '#3b82f6' },
        modal: {
          ondismiss: function () {
            btnUnlockDomain.disabled = false;
            btnUnlockDomain.textContent = '💳 Unlock & Remove Watermark (₹149)';
          }
        },
        handler: async function (response) {
          showToast('Verifying Payment...', 'Detecting transaction and running anti-tampering checks...', 'info');
          try {
            const verifyRes = await fetch('/api/web/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                siteId: currentSiteId,
                plan: selectedPlan
              })
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            showToast('Payment Approved!', 'Watermark removed! Your portfolio is now permanently active.', 'success');

            // Refresh iframe preview to display pristine, unwatermarked portfolio
            if (portfolioIframe) {
              portfolioIframe.src = `${verifyData.liveUrl || `/p/${currentSiteId}`}?v=${Date.now()}`;
            }

            if (btnUnlockDomain) {
              btnUnlockDomain.style.display = 'none';
            }

            if (typeof confetti === 'function') {
              confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            }
          } catch (verErr) {
            console.error('[VERIFICATION ERROR]', verErr);
            showToast('Verification Failed', verErr.message, 'error');
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (resp) {
        showToast('Payment Failed', resp.error?.description || 'Payment was not completed.', 'error');
      });
      rzpInstance.open();
    } else {
      // 2. Fallback Payment Link Panel
      showPaymentPanel(order.paymentUrl, selectedPlan);
    }
  } catch (err) {
    console.error('Order creation error:', err);
    showPaymentPanel(null, selectedPlan, err.message);
  } finally {
    btnUnlockDomain.disabled = false;
    btnUnlockDomain.textContent = '💳 Unlock & Remove Watermark (₹149)';
  }
}

function showPaymentPanel(paymentUrl, plan = 'lite', errorMsg = null) {
  const existing = document.getElementById('paymentPanel');
  if (existing) existing.remove();

  const panel = document.createElement('div');
  panel.id = 'paymentPanel';
  panel.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  `;

  if (errorMsg) {
    panel.innerHTML = `
      <div style="background: #18181b; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2.5rem; max-width: 440px; width: 100%; text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚠️</div>
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">Checkout Unavailable</h3>
        <p style="color: #a1a1aa; margin-bottom: 1.5rem; font-size: 0.9rem;">Razorpay credentials not yet configured. Contact us via Telegram to unlock your portfolio.</p>
        <a href="https://t.me/ai_portfolio_generator_bot" target="_blank" rel="noopener noreferrer"
           style="display: inline-flex; align-items: center; gap: 0.5rem; background: #9a3412; color: #fff; text-decoration: none; font-weight: 700; padding: 0.9rem 1.75rem; border-radius: 12px; margin-bottom: 0.75rem;">
          Open Telegram Bot to Unlock
        </a>
        <button onclick="document.getElementById('paymentPanel').remove()"
                style="display: block; width: 100%; background: none; border: 1px solid rgba(255,255,255,0.1); color: #a1a1aa; padding: 0.6rem; border-radius: 10px; cursor: pointer; font-size: 0.9rem; margin-top: 0.75rem;">
          Close
        </button>
      </div>`;
  } else {
    panel.innerHTML = `
      <div style="background: #18181b; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2.5rem; max-width: 460px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🚀</div>
        <h3 style="font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem;">Unlock Custom Domain & CDN Hosting</h3>
        <p style="color: #a1a1aa; margin-bottom: 1.5rem; font-size: 0.9rem;">Remove preview watermark, get instant live hosting, and connect your custom domain.</p>

        <a id="btnSubscribeLink" href="${paymentUrl}" target="_blank" rel="noopener noreferrer"
           onclick="handlePaymentSuccess()"
           style="display: block; background: linear-gradient(135deg, #9a3412, #b45309); color: #fff; text-decoration: none; font-size: 1rem; font-weight: 700; padding: 0.95rem; border-radius: 12px; margin-bottom: 0.75rem; box-shadow: 0 10px 25px rgba(154, 52, 18,0.4); transition: opacity 0.2s;">
          💳 Subscribe Now (₹149/mo) &rarr;
        </a>
        <p style="color: #71717a; font-size: 0.75rem; margin-bottom: 1rem;">Recurring monthly subscription • Cancel anytime via dashboard</p>

        <button onclick="document.getElementById('paymentPanel').remove()"
                style="background: none; border: 1px solid rgba(255,255,255,0.1); color: #a1a1aa; padding: 0.55rem 1.5rem; border-radius: 10px; cursor: pointer; font-size: 0.85rem;">
          Close
        </button>
      </div>`;
  }

  document.body.appendChild(panel);
  panel.addEventListener('click', (e) => {
    if (e.target === panel) panel.remove();
  });
}

function handlePaymentSuccess() {
  setTimeout(() => {
    const panel = document.getElementById('paymentPanel');
    if (panel) {
      panel.querySelector('div > div').innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">Payment in Progress</h3>
        <p style="color: #a1a1aa; margin-bottom: 1.5rem;">Once confirmed, your 2-hour takedown timer will be removed and your portfolio will remain live forever!</p>
        <button onclick="document.getElementById('paymentPanel').remove()"
                style="background: #9a3412; border: none; color: #fff; padding: 0.75rem 1.75rem; border-radius: 12px; cursor: pointer; font-size: 0.95rem; font-weight: 600;">
          Got it!
        </button>`;
    }
  }, 3000);
}

// 7. Dynamic Auth State on Landing Page
async function checkAuthState() {
  const slot = document.getElementById('navAuthSlot');
  if (!slot) return;

  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        const name = data.user.name || data.user.email.split('@')[0];
        slot.innerHTML = `
          <a href="/dashboard.html" class="nav-link" style="color: #60a5fa; font-weight: 700; text-decoration: none; padding: 0.4rem 0.8rem;">
            👤 ${escapeHtml(name)}
          </a>
        `;
      }
    }
  } catch (e) {
    // Unauthenticated fallback
  }
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

window.addEventListener('DOMContentLoaded', checkAuthState);

// ========================================================
// 8. ⚡ ONE-CLICK GITHUB GENERATOR CLIENT CONTROLLER
// ========================================================

let lastGithubTarget = null;
let lastGithubResult = null;

async function handleGithubGenerate(e) {
  if (e) e.preventDefault();
  const inputEl = document.getElementById('githubUsernameInput');
  const target = (inputEl ? inputEl.value : '').trim();
  if (!target) {
    alert('Please enter your GitHub username or profile URL.');
    return;
  }

  lastGithubTarget = target;
  openGithubProgressModal();

  try {
    // Step 1: Connecting to GitHub
    setGithubStep(1, 'active');
    setGithubStatus('Connecting to GitHub API...', 'Validating username and establishing connection');

    // Simulate progressive real feedback while API is running
    const progressTimer1 = setTimeout(() => {
      setGithubStep(1, 'completed');
      setGithubStep(2, 'active');
      setGithubStatus('Reading Developer Profile...', 'Extracting verified identity and profile README');
    }, 450);

    const progressTimer2 = setTimeout(() => {
      setGithubStep(2, 'completed');
      setGithubStep(3, 'active');
      setGithubStatus('Analyzing Repositories...', 'Ranking top projects, commit activity, and language distribution');
    }, 950);

    const progressTimer3 = setTimeout(() => {
      setGithubStep(3, 'completed');
      setGithubStep(4, 'active');
      setGithubStatus('Understanding Technical Expertise...', 'Extracting skills, frameworks, and architecture domains');
    }, 1500);

    const progressTimer4 = setTimeout(() => {
      setGithubStep(4, 'completed');
      setGithubStep(5, 'active');
      setGithubStatus('Synthesizing Evidence-Based Content...', 'Gemini AI narrative synthesis with zero hallucinations');
    }, 2100);

    const progressTimer5 = setTimeout(() => {
      setGithubStep(5, 'completed');
      setGithubStep(6, 'active');
      setGithubStatus('Synthesizing 22D Design Blueprint...', 'Crafting bespoke WebGL 3D scenes and typography pairing');
    }, 2800);

    const progressTimer6 = setTimeout(() => {
      setGithubStep(6, 'completed');
      setGithubStep(7, 'active');
      setGithubStatus('Applying Cross-Dimension Diversity Governor...', 'Enforcing collision rejection & structural uniqueness');
    }, 3400);

    const progressTimer7 = setTimeout(() => {
      setGithubStep(7, 'completed');
      setGithubStep(8, 'active');
      setGithubStatus('Publishing Live Portfolio...', 'Rendering responsive HTML/CSS/JS and generating preview');
    }, 4100);

    const previousSiteId = lastGithubResult?.siteId || null;
    const themeSelect = document.getElementById('githubThemeSelect');
    const selectedTheme = themeSelect ? themeSelect.value : 'auto';

    const res = await fetch('/api/generate/github', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        githubUrl: target,
        previousSiteId,
        theme: selectedTheme,
        creative_mode: selectedTheme !== 'auto' ? selectedTheme : null
      })
    });

    // Clear timers
    [progressTimer1, progressTimer2, progressTimer3, progressTimer4, progressTimer5, progressTimer6, progressTimer7].forEach(clearTimeout);

    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.success) {
      if (res.status === 404 || (result.error && result.error.toLowerCase().includes('not found'))) {
        throw new Error(`GitHub user "${target}" was not found. Please verify the spelling or profile URL.`);
      } else if (res.status === 504) {
        throw new Error('GitHub synthesis timed out. Please try again.');
      } else if (res.status === 429) {
        throw new Error('Hourly generation limit reached. Please wait a few moments.');
      } else {
        throw new Error(result.error || result.message || 'Failed to generate portfolio from GitHub.');
      }
    }

    lastGithubResult = result;

    // Mark all steps completed
    for (let i = 1; i <= 8; i++) {
      setGithubStep(i, 'completed');
    }

    showToast('GitHub Portfolio Generated!', `Synthesized 3D portfolio from @${result.username || target}`, 'success');

    // Populate result card
    populateGithubResult(result);
  } catch (err) {
    console.error('[GITHUB GENERATE ERROR]', err);
    setGithubStatus('Generation Failed', err.message || 'Could not complete GitHub synthesis.');
    showToast('Generation Error', err.message || 'Could not build site from GitHub.', 'error');
  }
}

function openGithubProgressModal() {
  const modal = document.getElementById('githubProgressModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
  }
  const resultCard = document.getElementById('githubResultCard');
  if (resultCard) resultCard.style.display = 'none';
  const progressBox = document.getElementById('githubProgressBox') || document.querySelector('.github-steps-container');
  if (progressBox) progressBox.style.display = 'flex';

  // Reset steps
  for (let i = 1; i <= 8; i++) {
    const stepEl = document.getElementById(`step-${i}`) || document.getElementById(`ghStep${i}`);
    if (stepEl) {
      stepEl.classList.remove('active', 'completed');
    }
  }
  setGithubStep(1, 'active');
}

function setGithubStep(stepNum, state) {
  const stepEl = document.getElementById(`step-${stepNum}`) || document.getElementById(`ghStep${stepNum}`);
  if (!stepEl) return;
  stepEl.classList.remove('active', 'completed');
  if (state === 'active') {
    stepEl.classList.add('active');
    const statusIcon = stepEl.querySelector('.step-status');
    if (statusIcon) statusIcon.textContent = '⏳';
  }
  if (state === 'completed') {
    stepEl.classList.add('completed');
    const statusIcon = stepEl.querySelector('.step-status');
    if (statusIcon) statusIcon.textContent = '✅';
  }
}

function setGithubStatus(title, desc) {
  const titleEl = document.getElementById('githubProgressTitle') || document.getElementById('githubStatusTitle');
  const descEl = document.getElementById('githubProgressSubtitle') || document.getElementById('githubStatusDesc');
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;
}

function populateGithubResult(result) {
  const progressBox = document.getElementById('githubProgressBox') || document.querySelector('.github-steps-container');
  if (progressBox) progressBox.style.display = 'none';

  const resultCard = document.getElementById('githubResultCard');
  const previewIframe = document.getElementById('githubResultIframe');
  const liveLink = document.getElementById('btnOpenGithubSite') || document.getElementById('btnGithubLiveLink');
  const subtitleEl = document.getElementById('githubResultSubtitle');

  if (subtitleEl && result.username) {
    subtitleEl.textContent = `Synthesized Awwwards-grade 3D portfolio for @${result.username}`;
  }
  if (previewIframe && result.previewUrl) {
    previewIframe.src = `${result.previewUrl}?v=${Date.now()}`;
  }
  if (liveLink && result.previewUrl) {
    liveLink.href = result.previewUrl;
  }
  if (resultCard) resultCard.style.display = 'block';
}

function closeGithubModal() {
  const modal = document.getElementById('githubProgressModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
}

function copyGithubPreviewLink() {
  if (!lastGithubResult || !lastGithubResult.previewUrl) return;
  const fullUrl = `${window.location.origin}${lastGithubResult.previewUrl}`;
  navigator.clipboard.writeText(fullUrl).then(() => {
    const btnText = document.getElementById('btnCopyGithubText');
    if (btnText) {
      btnText.textContent = '✅ Link Copied!';
      setTimeout(() => { btnText.textContent = '📋 Copy Link'; }, 2000);
    }
  }).catch(() => {
    alert(`Portfolio URL: ${fullUrl}`);
  });
}

async function regenerateGithubDesign() {
  if (!lastGithubTarget) return;
  await handleGithubGenerate();
}

function regenerateStudioDesign() {
  generatePortfolioSite(true);
}
window.regenerateStudioDesign = regenerateStudioDesign;

function editGithubInStudio() {
  closeGithubModal();
  if (!lastGithubResult || !lastGithubResult.profileData) {
    openStudioView();
    return;
  }
  const p = lastGithubResult.profileData;
  openStudioView();

  const nameInput = document.getElementById('inputName');
  const roleInput = document.getElementById('inputRole');
  const bioInput = document.getElementById('inputBio');
  const emailInput = document.getElementById('inputEmail');
  const locInput = document.getElementById('inputLocation');
  const ghInput = document.getElementById('inputGithub');
  const techInput = document.getElementById('inputTech');

  if (nameInput) nameInput.value = p.name || '';
  if (roleInput) roleInput.value = p.role || '';
  if (bioInput) bioInput.value = p.bio || p.tagline || '';
  if (emailInput) emailInput.value = p.email || '';
  if (locInput) locInput.value = p.location || '';
  if (ghInput) ghInput.value = p.github || '';
  if (techInput) techInput.value = p.tech_stack || '';

  // Populate projects
  const projectsContainer = document.getElementById('projectsContainer');
  if (projectsContainer) {
    projectsContainer.innerHTML = '';
    if (Array.isArray(p.projects)) {
      p.projects.forEach(proj => {
        addProjectCard(proj);
      });
    }
  }

  // Update live preview iframe with current generated site
  if (portfolioIframe && lastGithubResult.previewUrl) {
    currentPreviewUrl = lastGithubResult.previewUrl;
    currentSiteId = lastGithubResult.siteId;
    portfolioIframe.src = lastGithubResult.previewUrl;
    if (previewLoader) previewLoader.style.display = 'none';
  }
}

// 12. Global Window Function Exports for Bulletproof HTML Onclick Handlers
window.openStudioView = openStudioView;
window.closeStudioView = closeStudioView;
window.setBranch = setBranch;
window.addProjectCard = addProjectCard;
window.toggleSectionDropdown = toggleSectionDropdown;
window.addCustomSection = addCustomSection;
window.setDeviceMode = setDeviceMode;
window.regenerateStudioDesign = regenerateStudioDesign;
window.handleUnlockDomain = handleUnlockDomain;
window.closeGithubModal = closeGithubModal;
window.copyGithubPreviewLink = copyGithubPreviewLink;
window.regenerateGithubDesign = regenerateGithubDesign;
window.editGithubInStudio = editGithubInStudio;
window.handleGithubGenerate = handleGithubGenerate;
window.handleSignupSubmit = handleSignupSubmit;

// 13. Deep-Link Mode Switcher on Page Load
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  if (mode === 'builder' || mode === 'studio') {
    openStudioView();
  } else if (mode === 'github') {
    const input = document.getElementById('githubUsernameInput');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      input.focus();
    }
  } else if (mode === 'resume') {
    const drop = document.getElementById('dropZone');
    if (drop) drop.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

