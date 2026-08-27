# 🏛️ Phase 48 DOM Forensics & Visibility Verification

## DOM Audit Protocol
1. **Script Tag Rejection**: Text in `<script>` tags does not count toward preservation.
2. **Comment Rejection**: Text in `<!-- comments -->` does not count.
3. **Attribute Rejection**: Facts inside hidden JSON attributes without visible text do not count.
4. **Link Integrity**: All demo and repository URLs are checked for valid HTTP/HTTPS formatting.
