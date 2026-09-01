const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class ResumePdfGenerator {
  /**
   * Generates a PDF resume buffer from candidate profile data
   * @param {Object} profile - Normalized candidate profile
   * @returns {Promise<Buffer>}
   */
  static async generateResumePdfBuffer(profile = {}) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margins: { top: 36, bottom: 36, left: 40, right: 40 },
          bufferPages: true,
          info: {
            Title: `${profile.name || 'Candidate'} - Resume`,
            Author: profile.name || 'Portfolio Creator',
            Subject: 'Professional Resume / Curriculum Vitae',
            Keywords: Array.isArray(profile.skills) ? profile.skills.map(s => typeof s === 'object' ? (s.name || s.category || '') : s).filter(Boolean).join(', ') : ''
          }
        });

        const buffers = [];
        doc.on('data', b => buffers.push(b));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', err => reject(err));

        const name = profile.name || 'Software Engineer';
        const role = profile.role || 'Full Stack Software Engineer';
        const bio = profile.bio || profile.tagline || profile.summary || '';
        const email = profile.email || profile.contact?.email || '';
        const phone = profile.phone || profile.contact?.phone || '';
        const location = profile.location || profile.contact?.location || 'Remote / Worldwide';
        const github = profile.github || profile.socialLinks?.github || '';
        const linkedin = profile.linkedin || profile.socialLinks?.linkedin || '';
        const website = profile.website || profile.contact?.website || '';
        const skills = Array.isArray(profile.skills) ? profile.skills : [];
        const experience = Array.isArray(profile.experience) ? profile.experience : [];
        const projects = Array.isArray(profile.projects) ? profile.projects : [];
        const education = Array.isArray(profile.education) ? profile.education : (profile.education ? [profile.education] : []);

        const primaryColor = '#1e293b';
        const accentColor = '#4f46e5';
        const mutedColor = '#64748b';
        const darkTextColor = '#0f172a';

        // 1. Header Banner
        doc.fontSize(22).fillColor(darkTextColor).font('Helvetica-Bold').text(name, { align: 'left' });
        doc.fontSize(12).fillColor(accentColor).font('Helvetica-Bold').text(role, { align: 'left' });
        doc.moveDown(0.3);

        // Contact Info Line
        const contactParts = [];
        if (email) contactParts.push(`✉ ${email}`);
        if (phone) contactParts.push(`📞 ${phone}`);
        if (location) contactParts.push(`📍 ${location}`);
        if (github) contactParts.push(`GitHub: ${github.replace(/^https?:\/\//, '')}`);
        if (linkedin) contactParts.push(`LinkedIn: ${linkedin.replace(/^https?:\/\//, '')}`);
        if (website) contactParts.push(`Web: ${website.replace(/^https?:\/\//, '')}`);

        doc.fontSize(8.5).fillColor(mutedColor).font('Helvetica').text(contactParts.join('  •  '), { lineGap: 2 });
        doc.moveDown(0.4);

        // Horizontal Separator
        doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
        doc.moveDown(0.6);

        // Helper Section Header
        const renderSectionHeader = (title) => {
          doc.fontSize(11).fillColor(primaryColor).font('Helvetica-Bold').text(title.toUpperCase(), { lineGap: 2 });
          doc.strokeColor('#e2e8f0').lineWidth(0.75).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
          doc.moveDown(0.4);
        };

        // 2. Executive Summary
        if (bio) {
          renderSectionHeader('Professional Summary');
          doc.fontSize(9.5).fillColor(darkTextColor).font('Helvetica').text(bio, { lineGap: 2, align: 'justify' });
          doc.moveDown(0.6);
        }

        // 3. Technical Skills
        if (skills.length > 0) {
          renderSectionHeader('Technical Competencies');
          doc.fontSize(9.5).fillColor(darkTextColor).font('Helvetica-Bold').text('Core Technologies & Frameworks: ', { continued: true });
          doc.font('Helvetica').text(skills.join('  •  '), { lineGap: 2 });
          doc.moveDown(0.6);
        }

        // 4. Professional Experience
        if (experience.length > 0) {
          renderSectionHeader('Experience & Career Milestones');
          experience.slice(0, 4).forEach((exp) => {
            const expRole = exp.role || exp.title || 'Software Engineer';
            const company = exp.company || exp.organization || 'Independent Practice';
            const period = exp.period || exp.dates || exp.duration || '2024 - Present';
            const desc = exp.desc || exp.description || '';

            doc.fontSize(10).fillColor(darkTextColor).font('Helvetica-Bold').text(expRole, { continued: true });
            doc.fillColor(mutedColor).font('Helvetica').text(`  —  ${company}`, { continued: true });
            doc.fillColor(accentColor).font('Helvetica-Bold').text(` (${period})`, { align: 'right' });
            
            if (desc) {
              doc.fontSize(9).fillColor('#334155').font('Helvetica').text(desc, { lineGap: 1.5, align: 'justify' });
            }
            doc.moveDown(0.4);
          });
          doc.moveDown(0.2);
        }

        // 5. Featured Projects
        if (projects.length > 0) {
          renderSectionHeader('Key Projects & Production Architectures');
          projects.slice(0, 4).forEach((p) => {
            const pName = p.name || p.title || 'Featured Project';
            const pTech = p.tech || (Array.isArray(p.tags) ? p.tags.join(', ') : '');
            const pDesc = p.desc || p.description || '';

            doc.fontSize(10).fillColor(darkTextColor).font('Helvetica-Bold').text(pName, { continued: true });
            if (pTech) {
              doc.fontSize(8.5).fillColor(accentColor).font('Helvetica').text(`  [${pTech}]`);
            } else {
              doc.text('');
            }

            if (pDesc) {
              doc.fontSize(9).fillColor('#334155').font('Helvetica').text(pDesc, { lineGap: 1.5, align: 'justify' });
            }
            doc.moveDown(0.4);
          });
          doc.moveDown(0.2);
        }

        // 6. Education
        if (education.length > 0) {
          renderSectionHeader('Education & Credentials');
          education.slice(0, 2).forEach((edu) => {
            const deg = edu.degree || edu.study || 'Computer Science & Software Engineering';
            const inst = edu.institution || edu.school || edu.university || 'University';
            const per = edu.period || edu.year || '';
            const grade = edu.grade ? ` • ${edu.grade}` : '';

            doc.fontSize(9.5).fillColor(darkTextColor).font('Helvetica-Bold').text(deg, { continued: true });
            doc.fillColor(mutedColor).font('Helvetica').text(`  —  ${inst}${grade}${per ? ` (${per})` : ''}`);
            doc.moveDown(0.2);
          });
        }

        // Footer note
        doc.fontSize(7.5).fillColor('#94a3b8').font('Helvetica').text(`Generated automatically via AI Portfolio Studio • Verified Profile: ${name}`, 40, 785, { align: 'center', width: 515 });

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Saves a generated PDF resume directly to the site's directory
   * @param {string} siteDir - Absolute path to site folder
   * @param {Object} profile - Normalized profile data
   */
  static async saveSiteResumePdf(siteDir, profile) {
    try {
      const pdfBuffer = await this.generateResumePdfBuffer(profile);
      fs.mkdirSync(siteDir, { recursive: true });
      fs.writeFileSync(path.join(siteDir, 'resume.pdf'), pdfBuffer);
      return path.join(siteDir, 'resume.pdf');
    } catch (err) {
      console.error('[PDF GENERATOR] Error saving resume.pdf:', err);
      return null;
    }
  }
}

module.exports = { ResumePdfGenerator };
