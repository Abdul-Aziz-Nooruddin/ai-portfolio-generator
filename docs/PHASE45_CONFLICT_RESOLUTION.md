# 🏛️ Phase 45 Multi-Source Evidence Conflict Resolution Policy

## 1. Provenance-Based Resolution
When multiple input sources provide conflicting data for the same logical attribute (e.g. GitHub says "42% latency reduction", Resume says "38% latency reduction"), the system follows explicit resolution rules:

1. **Hierarchy of Confidence**:
   - `TIER_1_VERIFIED`: GitHub API, commit tree telemetry, DOI records (Confidence: 0.98 - 0.99).
   - `TIER_2_USER_PROVIDED`: PDF resumes, manual form inputs, questionnaires (Confidence: 0.90 - 0.95).
   - `TIER_3_OCR_EXTRACTED`: Diagram text, image OCR (Confidence: 0.85 - 0.90).
   - `TIER_4_INFERRED`: Design intelligence heuristics (Confidence: 0.50 - 0.80).

2. **Non-Destructive Storage**:
   - The primary presentation slot uses the highest-confidence source.
   - Alternate conflicting statements are preserved in `_multiSourceAlternates` with explicit source annotations.
   - The system **NEVER fabricates** a compromise value (e.g. averaging 42% and 38% into 40% is strictly prohibited).
