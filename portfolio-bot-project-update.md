# Portfolio Bot — Project Update (Lifecycle, Panels & Email Automation)

> Context for the agent: this document captures decisions made in a planning session on top of the existing project (an AI agent, running on Telegram + a website, that generates a personal portfolio site from a resume or Q&A, on a monthly subscription model). Implement against these rules exactly — they resolve several previously open questions.

---

## 1. Pricing model

- **Pure recurring monthly subscription.** No one-time payment option.
- A one-time ₹149 "go-live" fee was considered and explicitly rejected — it undermines recurring/churn-based revenue. Do not implement a one-time payment path.
- Hosting and maintenance are included in the subscription price — not billed separately.

---

## 2. Site lifecycle & state machine

Implement these as explicit states with a scheduled job driving transitions (see Section 6 — this must NOT be reasoning/LLM-driven; it's deterministic).

| State | Entry condition | Duration | Exit |
|---|---|---|---|
| `preview_unpaid` | User generates a preview, never subscribed | 2 hours | → `deleted` (removed from hosting) |
| `live` | Active subscriber, payment succeeding | Ongoing | Payment fails → `preview_lapsed` |
| `preview_lapsed` | A previously-paying subscriber's payment fails | 5 days | Repay → `live` (instant) / Unpaid after 5 days → `deleted` |
| `deleted` | 5 days unpaid in `preview_lapsed`, or 2 hrs unpaid in `preview_unpaid` | Permanent | No recovery — user must resubscribe and go through generation again from scratch |

**Key rules:**
- The **URL stays identical** across all states (preview, live, lapsed-preview, reactivated-live). Never issue a new URL on state change — this preserves links the user has already shared (job applications, resumes, etc.).
- Reactivation restores the **original stored design**, not a newly regenerated one. This means the design/build artifact must be retained in storage for the full duration a user could be in `preview_lapsed` (5 days), and only purged on transition to `deleted`.
- On transition to `deleted`, purge the stored design/build — do not retain it. There is no soft-delete/undelete for this state.

---

## 3. Preview generation limits

- **1 free preview generation per user per week.**
- **+1 free regeneration** if the user isn't happy with the first result (same week).
- Beyond that (same week), additional previews cost **₹49 each**.
- Abuse prevention:
  - Require **email verification** at sign-up (OTP or confirmation link) to block low-effort fake sign-ups.
  - **Normalize emails before uniqueness checks** — strip everything after `+` and before `@` (e.g. `user+1@gmail.com` → `user@gmail.com`) to catch the common Gmail-alias abuse pattern.
  - On Telegram, enforce the weekly limit against the **Telegram user ID**, not just email — it's a more stable identity signal on that channel.
  - **Do not implement device-fingerprinting** to block multi-account sign-ups. It was evaluated and rejected: easily bypassed (incognito/cookie clearing), unreliable (privacy browsers randomize fingerprints), and risks false-positives against legitimate shared-device users (e.g. shared family computer, cyber café).

---

## 4. Sign-up flow

Sign-up (with email capture) is **required before any preview generation.**

The sign-up form needs **three separate checkboxes** — do not merge these:

1. **Privacy policy** — required to proceed.
2. **Promotional/marketing emails** — optional, opt-in (unchecked by default). Gates the non-subscriber conversion email sequence (Section 5). Sending promotional email to users who didn't check this is a compliance risk (spam complaints degrade sender reputation, which also hurts delivery of the transactional emails below).
3. **Service terms** (takedown timing, deletion policy, etc.) — currently planned to live in an FAQ page rather than a checkbox. **Flagging for reconsideration:** an FAQ is opt-in reading and only protects against users who go looking for it; it does not establish that a user was shown the terms before losing access to their site. A checkbox at the point of first payment would give stronger protection with minimal added friction (users expect friction at a payment step). This decision is not finalized — build the FAQ content, but leave room to add a payment-time checkbox if reconsidered.

---

## 5. Email system

Two distinct email tracks. Do not conflate them — they have different audiences, purposes, and consent requirements.

### 5a. Transactional / lifecycle emails (all users, no separate opt-in needed)
Sent to active or lapsed subscribers about their own account status:
- Payment failed notification
- Grace-period reminders — **not yet fully specified**, but should follow a pattern like day 1 / day 3 / day 4.5 of the 5-day `preview_lapsed` window, escalating in urgency, so deletion isn't a silent event. **This is currently unbuilt and is the highest-priority gap** — without it, the 5-day deletion policy risks blindsiding users who had a recoverable payment issue (expired card, etc.).
- Deletion confirmation (once `deleted`)
- Reactivation confirmation (on repay within window)

### 5b. Conversion / promotional emails (only users who opted in via the promotional checkbox)
For users who signed up and generated a preview but never subscribed. **Sequence is finalized:**

| Email | Trigger | Tone |
|---|---|---|
| 1 | Immediately on portfolio generation | Friendly, funny/catchy — conveys the 2-hour takedown urgency without being alarming. Draft below. |
| 2 | Day 3 | (not yet drafted) |
| 3 | Day 6 | (not yet drafted) |
| 4 | Day 9 | (not yet drafted) |
| Ongoing | Monthly, after day 9 if still unconverted | Re-engagement, low-frequency |

**Critical rule:** if the user regenerates their preview mid-sequence (using their weekly free regen), the **original 4-email sequence keeps running on its original schedule** — do not restart it. Restarting on every regen would let a user who regenerates weekly stay in a permanent high-frequency loop and never drop to the monthly cadence.

**Draft — Email 1 (immediate, on generation):**

> **Subject:** Your portfolio's alive... for 2 hours ⏳
>
> Hey [Name],
>
> Your portfolio just went live — and it looks good. Like, "did I really make this" good.
>
> Small catch: it's on a **2-hour timer** right now. Think of it as a really impatient Cinderella situation — except instead of a pumpkin, you get a 404 page.
>
> **[👉 See your portfolio]**
>
> If you like what you see, lock it in before the clock runs out — then it's yours, live, for good (well, for as long as your subscription is).
>
> — [Product name]

Emails 2–4 still need drafting.

---

## 6. Automation architecture

- **The lifecycle/email triggering system must be a deterministic scheduled job** (cron / scheduled function), not an LLM-based agent. Account-state transitions and reminder timing need to be reliable and auditable — this is not a reasoning task.
- AI/LLM use is appropriate for: the portfolio generation itself (already built), and optionally personalizing email copy — but not for deciding *whether or when* to send an email or change account state.
- The scheduled job should run at least daily (hourly preferred) and:
  1. Check every account's current state and elapsed time in that state
  2. Fire the appropriate state transition (per Section 2's table)
  3. Fire the corresponding email (per Section 5)
  4. Log the action for the admin panel's audit trail

---

## 7. Admin & User panels

Full spec was drafted separately (see `portfolio-bot-panel-spec.md` if available in this project). Key points to carry over:

- **Admin panel must support manual overrides**: extend a user's grace period, force-restore a deleted account, force takedown. This is a deliberate safety valve for payment-gateway false negatives — do not fully automate away human override capability.
- Admin overrides should be logged (who did what, when, why) — audit logging requirement was raised but not finalized; implement basic logging by default.
- User panel needs: current status, live URL, billing management, regen/preview count remaining, notification history.

---

## 8. Still open / not yet decided

Do not silently assume answers to these — flag back to the product owner if the build requires resolving them:

1. Exact timing/content for grace-period reminder emails (day 1/3/4.5 — pattern proposed, not confirmed)
2. Payment gateway choice
3. Whether admin overrides require audit logging / second-person approval, or a single admin can act unilaterally
4. Final placement of service terms — FAQ (current plan) vs. checkbox at payment (flagged as stronger)
5. Email 2, 3, 4 copy for the conversion sequence
