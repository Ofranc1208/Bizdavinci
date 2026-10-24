# Pricing & Setup Plan — Voice Agent + Website Bundle

> High-level GTM plan for selling the **website + chat + inbound voice** bundle to restaurants
> and doctor's offices. Includes setup-time targets and the self-calling demo loop.

---

## The bundle (one package, tiered)

| Tier | Includes | Price |
|---|---|---|
| **Starter** | Website + menu CMS (owner uploads/edits) + web chat (answers from menu/hours/FAQ) | **$199/mo** |
| **Growth** *(flagship)* | Starter + inbound voice agent (answers calls, takes orders/bookings, 24/7) | **$599/mo** |
| **Pro** | Growth + outbound voice (confirmations, reminders, no-show re-engagement) + analytics | **$999/mo** |

- **One-time setup/onboarding: $1,200** (anchor; negotiate to $1,000 to close, never below).
  - Framed as **onboarding the whole system**, NOT "the website."
  - Includes: website rebuild, menu/photo load, voice persona tuning, test calls, go-live + staff walkthrough.
  - **"The site is yours to keep either way"** — removes the cancel-and-lose-everything objection.
- **Waive setup ONLY as a close-the-deal lever** ("if we go live today, I'll waive it"), never on the first ask.

---

## Why charge setup (don't build "free")

1. Free = worthless in the owner's mind → ignored, never updated, churns in month 2.
2. Real work: branding, menu load, mobile, SEO, chat wiring, persona tuning = 6–10 hrs.
3. Setup fee funds your build cycle + first ~3 months runtime; you're cash-positive day one.
4. A prospect who won't pay $1,200 upfront will churn at $599 in month 3.

---

## Per-customer demo setup target: <1 hour

| Step | Time |
|---|---|
| Scrape existing site + Google Business/Yelp menu | 5–8 min |
| Generate templated site → Vercel preview URL | 10–15 min |
| Load menu → `chunks.jsonl` (brain) + rebuild index | 5–10 min |
| Clone persona template → tune name/menu/hours | 10 min |
| Provision Twilio number → wire to agent persona | 5 min |
| Smoke-test 2 calls, fix 1 garble, send owner the links | 5–10 min |
| **Total (demo)** | **~40–55 min** |

- **Website reconstruction <20 min:** YES — requires a **one-time template + LLM menu mapper** (~1–2 days upfront). Per-customer after that is slot-filling.
- **Scrape stack:** Firecrawl or Crawl4AI for the site; **Google Business Profile API / Yelp** as fallback (many restaurants have no menu on their own site).
- **<1 hr = DEMO only.** Production launch = 2–4 hrs (CRM/POS hookup, branding polish, staff training, HIPAA BAA for doctor). Demo cost is customer acquisition; setup fee pays for production.

---

## The pitch (3 sentences, then stop)

1. **"You're losing money every time the phone rings during a rush and nobody picks up — that's an order walking to your competitor."**
2. **"I built you a demo. Call this number — an AI takes your order and knows your whole menu. And I rebuilt your website with it live."** *(hand them a card: demo number + QR to preview site)*
3. **"It's $599/month, $1,200 setup covers me rebuilding your site and training the AI on your menu, and it pays for itself in week one from the orders you're currently missing."**

Then **stop talking.** Let them call the demo number in front of you. The demo sells itself.

---

## The self-calling demo loop (your own voice agent cold-calls owners)

1. **Pre-build a demo site + live demo line per prospect** (~15 min once templated; public menu data only).
2. **Voice agent cold-calls the owner** (<45 sec):
   > "Hi, this is Sam with [Your Company]. I rebuilt your website and trained an AI on your menu so customers can call and place orders 24/7 — it's live right now at [URL] and [phone number]. I'll text you both so you can try it. If you like it, we're $1,200 setup and $599/month. Text 'yes' and I'll come by Tuesday."
3. **Owner self-tries the demo** → calls the number, hears it take *their* menu order, sees *their* rebuilt site. The "aha" closes them, not your pitch.
4. **Human closes the contract.** AI opens the door; don't let it sign the deal.

### Legal/ethical rules for the cold-call
- B2B cold calls to **business lines during business hours** are legal under TCPA. Keep to business lines only.
- **Disclose "this is an AI assistant"** (ethical + increasingly required by state law). `buildCompliancePrompt` already enforces recording disclosure; add an AI-disclosure line.
- **One touch, then permission.** Cold-call → if engaged, text the links. If not, don't hammer.
- **Honor "stop" instantly** (the FSM `OPT_OUT` node already handles this).
- **Clean list only.** Buy scrubbed data, respect DNC where applicable.

---

## Numbers that make the pitch undeniable (lead with THEIR money)

**Restaurant (100 calls/day):**
- ~20 missed calls/day during rush × $30 ticket × 30 days = **~$18k/month lost orders**.
- Conservative 25–35% capture via the bot = **~$4,500–6,300/mo recovered**.
- Your hard runtime cost ≈ $385/mo (TTS-dominated).
- **Charge $599/mo → ~60–75% gross margin; owner net-positive in week one.**

**Doctor's office (60–80 calls/day):**
- ~12 missed appointment calls/day × $180 visit value × 25% capture × 30 = **~$3,000–5,000/mo recovered**.
- ~3–5 hrs/day receptionist time reclaimed → **~$1,200–1,800/mo realized labor savings**.
- Your hard runtime cost ≈ $550/mo (longer calls + compliance logging).
- **Charge $999–1,299/mo.**

---

## 90-day GTM

- **Month 1:** Build 20 templated demos; cold-call each with the agent. Target 5–8 sign-ups.
- **Month 2:** Turn sign-ups into case studies with real call logs ("recovered 47 orders, $1,400 in week 2"). Use as referral bait.
- **Month 3:** Channel partners — POS vendors, restaurant associations, dental group practices. Warm lists for a revenue cut.

---

## One risk to name honestly

Cold-calling owners with an AI, even legal, will **annoy some, delight others.** Mitigate: <45-sec calls, disclose AI, lead with "I already built you something free" (reciprocity), never call the same number twice if they don't engage. The ones who try the demo convert high — that's the signal to scale.
