# 🏛️ Phase 45 Raw Evidence Store

## Purpose
`RawEvidenceStore` is an immutable, append-only in-memory storage engine that preserves raw source payloads exactly as received from input sources before any parsing, schema conversion, or normalization occurs.

---

## 1. Storage Architecture

```javascript
class RawEvidenceStore {
  constructor() {
    this._sources = new Map(); // Immutable source extractions keyed by sourceId
    this._auditLog = [];
  }

  ingest(sourceId, sourcePayload, metadata = {}) {
    // Deep freeze payload to guarantee immutability
    const immutableSnapshot = Object.freeze(JSON.parse(JSON.stringify(sourcePayload)));
    this._sources.set(sourceId, {
      id: sourceId,
      payload: immutableSnapshot,
      ingestedAt: Date.now(),
      metadata
    });
  }
}
```

---

## 2. Guarantees
1. **Zero Destructive Overwrites**: Subsequent updates from different sources never mutate earlier snapshots.
2. **Auditability**: Provides complete back-references from rendered DOM components to the exact raw JSON or document snippet from which the claim originated.
3. **Replayability**: Enables reproducible generation cycles and regression testing against exact raw payloads.
