# 🏛️ Phase 46 Multi-Source Conflict Handling

## Policy & Execution
When multiple sources supply divergent information (e.g. GitHub: `Systems Engineer` / `42% latency reduction`, Resume: `Senior Distributed Systems Architect` / `38% latency reduction`):

1. **Source Attribution**: The highest-confidence source (`VERIFIED` or explicit `USER_PROVIDED`) is featured in the primary role slot.
2. **Alternate Preservation**: Divergent metrics or roles are preserved in `_sourceAlternates` and displayed with provenance tags where appropriate.
3. **No Compromise Invention**: The engine never averages conflicting claims into fabricated intermediate values.
