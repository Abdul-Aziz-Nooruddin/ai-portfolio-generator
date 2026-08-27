# 🏛️ Phase 45 GitHub Ingestion Evidence Retention

## Overview
This document audits the retention of GitHub-derived technical evidence from raw API responses through canonical mapping to the final HTML DOM.

---

## 1. Preserved GitHub Signals
- **Repository Identifiers**: Full repository name, owner, and canonical GitHub URL.
- **Project Descriptions & Topics**: Repository description and all user-tagged topics/tags.
- **Telemetry & Stars**: Real commit counts, star ratings (formatted with star badges), and fork counts.
- **README Snippets & Architectures**: Extracted architecture diagrams, build instructions, and benchmark figures.
- **Live Demo URLs**: Homepage/Deployment URLs configured on GitHub repositories.

---

## 2. Retention Metrics
- GitHub-only Persona Test: `p45_github_only` (Linus Brandt - Open-Source Infrastructure Maintainer).
- Raw Extracted Fields: 8
- Preserved DOM Fields: 8
- Silent Drops: 0 (100% Retention)
