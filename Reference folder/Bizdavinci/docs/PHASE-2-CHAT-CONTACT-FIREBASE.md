# Phase 2 - PathPicker + Chat System + Contact Form + Firebase

> **Goal:** Enable qualified conversations via AI chat and capture leads through the contact form.  
> **Status:** 🔄 In Progress  
> **Estimated Time:** 5–7 days  
> **Depends On:** Phase 1 complete  
> **Gate:** Chat request/response works end-to-end, contact form writes to Firestore (or fallback), PathPicker modal opens from core entry points.

---

## MVP Routes (This Phase)

| Route | Type | Purpose |
|-------|------|---------|
| `/contact` | Page | Lead capture form |
| `/api/chat` | API | Chat endpoint (POST) |
| `/api/contact` | API | Contact form submission (POST) |

---

## Build Scope

### Part A: PathPicker Entry Flow

#### Flow

```
User clicks "Start here" / "Get Started"
    → Modal opens → PathPicker (choice screen)
    → User picks: "Get a quote" | "Ask a question" | "See portfolio"
    → Chat loads with that flow context
```

#### PathPicker Component

**Path:** `src/components/PathPicker/PathPicker.tsx`

**Props:**
```typescript
interface PathPickerProps {
  onSelect: (choice: 'quote' | 'question' | 'portfolio') => void;
  onClose: () => void;
}
```

**Layout:** Close button → Avatar/header → Title "How can I help you today?" → Subtitle → 3 option cards → Trust row ("Private · Free · No sign-up")

**Card design:** Icon + title + subtitle + chevron; hover lift + shadow; CSS transitions only

**Files:**
```
src/components/PathPicker/
├── PathPicker.tsx
├── PathPicker.module.css
└── index.ts
```

#### Global Modal Context

**Path:** `src/contexts/AssistantModalContext.tsx`

```typescript
interface AssistantModalState {
  isOpen: boolean;
  view: 'pathpicker' | 'chat';
  context?: {
    package?: 'bronze' | 'silver' | 'platinum';
    tool?: string;
    industry?: string;
  };
}

interface AssistantModalActions {
  openPathPicker: () => void;
  openChat: (context?: AssistantModalState['context']) => void;
  close: () => void;
}
```

**Invocation points (all use same context):**
```typescript
const { openPathPicker, openChat } = useAssistantModal();

// Hero CTA
<button onClick={openPathPicker}>Start Here</button>

// Pricing page (Phase 4)
<button onClick={() => openChat({ package: 'silver' })}>Get Silver Quote</button>

// Tool result (Phase 4)
<button onClick={() => openChat({ tool: 'cost-estimator' })}>Discuss Results</button>
```

#### Modal Shell (`src/components/chat/ChatModal.tsx`)

- Single `<dialog>` element or fixed overlay
- ESC key closes modal
- Overlay click closes modal
- Focus trap inside modal
- `document.body.style.overflow = 'hidden'` when open

---

### Part B: Chat System

#### Chat Flow

```
User types message
    → Client: useChatMessages.sendMessage()
    → Optional: checkGuardrails() → intent detection
    → POST /api/chat
    → API: OpenAI call with system prompt + knowledge base
    → Response → setChatMessages([...prev, response])
    → ChatBubble renders
```

#### Chat API Contract

**Request:**
```typescript
POST /api/chat
{
  message: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  industry?: string;
}
```

**Response:**
```typescript
{
  response: string;
  cached?: boolean;
}
```

**MVP is non-streaming.** Complete JSON response, not SSE. `TypingIndicator` shows loading state client-side.

#### OpenAI Config (`src/lib/openai/config.ts`)

```typescript
export const OPENAI_CONFIG = {
  model: 'gpt-4o-mini',
  maxTokens: 500,
  temperature: 0.7,
} as const;
```

**SDK:** `openai@^6.25` - uses `chat.completions.create()` which is stable and supported indefinitely.

#### Chat Components

| Component | Path | Purpose |
|-----------|------|---------|
| ChatModal | `src/components/chat/ChatModal.tsx` | Modal shell (portal) |
| ChatInterface | `src/components/chat/ChatInterface.tsx` | Main chat container |
| ChatBubble | `src/components/chat/ChatBubble.tsx` | Message display |
| ChatInputBar | `src/components/chat/ChatInputBar.tsx` | Text input + send |
| WelcomeSequence | `src/components/chat/WelcomeSequence.tsx` | Animated intro |
| TypingIndicator | `src/components/chat/TypingIndicator.tsx` | Loading dots |

**ChatBubble MVP:** Plain text only. `white-space: pre-wrap` for line breaks. No `dangerouslySetInnerHTML`. No markdown rendering.

```typescript
<p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
```

#### Chat Hooks

| Hook | Purpose |
|------|---------|
| `useChatMessages` | Messages state, sendMessage orchestration |
| `useChatApi` | `fetch` to `/api/chat` |

#### Industry Detection (`src/lib/chat/industryDetector.ts`)

```typescript
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  'dry-cleaner': ['dry clean', 'laundry', 'alterations'],
  'restaurant': ['restaurant', 'cafe', 'menu', 'reservation'],
  'retail': ['store', 'shop', 'inventory', 'products'],
  'salon': ['salon', 'spa', 'hair', 'beauty', 'nails'],
};
```

Priority: PathPicker selection → first message heuristics → undefined (generic).

#### Knowledge Base (`src/lib/prompts/knowledgeBase.ts`)

Freelancer-specific knowledge: services offered, industry examples, pricing ranges, page types.

#### System Prompt (`src/lib/prompts/mainPrompts.ts`)

Freelancer persona with tone, behavior rules, and knowledge base injection.

#### Guardrails (`src/lib/chat/guardrails.ts`)

- Rate limit: 20 req/min per IP
- Message length: max 1000 chars
- Server-side payload caps: last 10–16 turns, max 50KB total
- Banned content filtering

#### Rate Limiting (`src/lib/ratelimit.ts`)

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export const chatRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  prefix: 'ratelimit:chat',
});

export const contactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'ratelimit:contact',
});
```

#### Error Handling

```typescript
// If OpenAI fails:
const FALLBACK_MESSAGE =
  "Sorry, I'm having trouble answering that right now. " +
  "You can still reach me directly through the contact form.";
```

---

### Part C: Contact Form + Firebase

#### Contact Page (`app/contact/page.tsx`)

Form fields: name (required), email (required), industry (optional dropdown), message (required), hidden honeypot field.

#### Contact Form Hook (`src/hooks/useContactForm.ts`)

Form state, Zod validation, submit handler, success/error states.

#### API Route (`app/api/contact/route.ts`)

- Validate with Zod
- Check honeypot (if filled → return success but skip write)
- Rate limit: 5/min per IP
- Write to Firestore `inquiries` collection
- Return `{ success: true }` or error

#### Firebase Setup

**Client SDK:** `src/lib/firebase/config.ts`
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

**Admin SDK:** `src/lib/firebase/admin.ts`
- Uses `FIREBASE_SERVICE_ACCOUNT` env var
- Used only in API routes

#### Firestore Schema

```typescript
interface Inquiry {
  id: string;
  name: string;
  email: string;
  industry?: string;
  message: string;
  createdAt: FieldValue.serverTimestamp();
  source: 'contact_form' | 'chat_cta';
}
```

**Collections:** `inquiries`, `chat_cache` (optional)

#### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{doc} { allow read, write: if false; }
    match /chat_cache/{doc} { allow read, write: if false; }
  }
}
```

All writes go through Admin SDK in API routes. No client-side Firestore writes.

---

## Test Checklist

| Check | Status |
|-------|--------|
| "Start Here" opens PathPicker modal | ☐ |
| Each PathPicker option routes correctly | ☐ |
| Close/ESC/overlay dismisses modal | ☐ |
| Chat message send/receive works end-to-end | ☐ |
| Typing indicator shows during AI response | ☐ |
| Rate limiting blocks abuse (21 req/min test) | ☐ |
| Guardrails reject oversized messages | ☐ |
| OpenAI failure shows fallback message | ☐ |
| `/contact` page loads with form | ☐ |
| Form requires name, email, message | ☐ |
| Invalid email shows validation error | ☐ |
| Valid submission shows success toast | ☐ |
| Submission appears in Firestore `inquiries` | ☐ |
| Honeypot blocks basic bots | ☐ |
| Contact rate limit works (5/min) | ☐ |
| PathPicker + Chat responsive on mobile | ☐ |

## Gate Output

- Stable lead-capture system (chat + contact form)
- PathPicker entry flow functional
- Firebase integration verified
- Ready for Phase 3
