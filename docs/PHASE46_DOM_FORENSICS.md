# 🏛️ Phase 46 DOM Forensics & Anti-Cheat Auditing

## Anti-Cheat Verification Mandate
The DOM auditor was architected to be hostile to false positives:

1. **Script Tag Rejection**: Text located solely inside `<script>` or JSON variables does NOT count as visible.
2. **Comment Rejection**: Text in `<!-- HTML comments -->` does NOT count.
3. **Data-Attribute Rejection**: Values stored only in `data-evidence="..."` without visible rendering do NOT count.
4. **Entity Decoding**: Inspects fully decoded HTML strings (`&amp;` $\to$ `&`, `&lt;` $\to$ `<`) to ensure exact user claims are represented.
5. **No Broken Links**: All URLs, GitHub repositories, and demo endpoints are validated for correct `href` attributes.
