# 🏛️ Phase 32: Centralized User-Facing Error Recovery System

## 1. Architecture

The `ErrorRecoveryService` ensures zero raw stack traces, filesystem paths, or internal tokens are exposed to end users. All errors are mapped into structured recovery instructions:

```
┌──────────────────────────────────────────────────────────┐
│                   STRUCTURED ERROR CARD                  │
├──────────────────────────────────────────────────────────┤
│  ⚠️ Action Required                                      │
│                                                          │
│  What Happened:  [Plain English summary]                 │
│  Why:            [Clear root cause explanation]          │
│  What You Can Do:[Actionable steps for user]             │
│                                                          │
│  [ Primary Action Button ]  [ Secondary Action Button ]  │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Standard Error Mappings

### GitHub API Rate Limits & 404s
- **What happened**: *"We couldn't find that GitHub account."* / *"GitHub is temporarily limiting requests."*
- **Why**: *"The username may be misspelled, or the account is private."* / *"Public API limit reached."*
- **What you can do**: *"Double-check the username or continue by uploading your resume or answering a few questions."*
- **Actions**: `[Re-enter Username]`, `[Upload Resume Instead]`

### PDF Resume Uploads
- **Oversized**: *"Resume file is too large (max 10 MB)."*
- **Invalid Header**: *"This file does not appear to be a valid PDF."*
- **Page Overflow**: *"Resume has too many pages (> 5 pages)."*
- **Actions**: `[Select Another PDF]`, `[Answer Questions Instead]`

### Image Material
- **Oversized / Unsupported**: *"Only JPEG, PNG, and WebP up to 5 MB are supported."*
- **Count Overflow**: *"Maximum 3 supporting images allowed."*
- **Actions**: `[Select Smaller Image]`, `[Skip Photo]`
