# Gumroad Funnel and Commercial Flow

## Section 001
Source: all of claude ideas.md:1073-1171

🎯 HERE'S WHAT I'D PRIORITIZE (In Order)
WEEK 1: Accessibility (Huge Impact)
typescript// frontend/src/index.css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

Audit keyboard navigation (should be able to complete lesson with Tab + Enter only)
Replace all <div onClick> with <button> (semantic HTML for screen readers)

Why first: Accessibility isn't optional — it's table stakes for neurodiv-friendly.
WEEK 2: Content Management
bash# New structure
/content
  ├── courses
  │   ├── your-first-vibe
  │   │   ├── 1-why-vibe-code.md
  │   │   ├── 2-setup.md
  │   │   └── ...
  │   ├── prompt-like-a-pro
  │   │   └── ...
typescript// src/server/routes/admin.ts (dev-only route)
router.post('/admin/import-lessons', async (req, res) => {
  // Scan /content folder → parse markdown → upsert lessons
  // Only works if NODE_ENV=development
})
Why: Once you have 10 courses × 80 lessons, editing the seed file becomes hell.
WEEK 3: Optimistic UI + Error States
typescript// frontend/src/stores/statsStore.ts
completeLessonAndUpdateStats: async (lessonId, token) => {
  // 1️⃣ IMMEDIATELY update local state (optimistic)
  set((state) => ({
    stats: { ...state.stats, totalXp: state.stats.totalXp + 75 }
  }));
  showCelebration(); // Confetti NOW

  // 2️⃣ THEN hit API
  try {
    const res = await fetch(...);
    // 3️⃣ Update with real response
  } catch {
    // 4️⃣ On failure, revert + toast "Try again?"
    set((state) => ({
      stats: { ...state.stats, totalXp: state.stats.totalXp - 75 }
    }));
  }
}
Why: Feels instant. ADHD brain = dopamine on completion, not "loading..." spinner.
WEEK 4: Analytics
typescript// src/server/db/schema.ts
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  eventType: varchar('event_type'), // 'lesson_started', 'lesson_completed', etc
  lessonId: integer('lesson_id'),
  timestamp: timestamp('timestamp').defaultNow(),
});

// Then track:
// - lesson_started (user views lesson)
// - lesson_completed (user clicks complete)
// - badge_earned (system awards badge)
// - quiz_failed (user answered wrong)
Why: Without data, you're guessing. With events, you see exactly where Course 2 drops users off.

💡 YOUR PRO TIPS ARE CHEF'S KISS
Streak Freeze Power-Up
This is genius for reducing perfectionism anxiety. ADHD → all-or-nothing thinking → streak breaks = demoralizing.
typescript// Add to badges:
{
  slug: 'freeze-earned',
  title: '❄️ Freeze Saved',
  check: (ctx) => ctx.badgesEarned >= 5 // Earned 5 badges? Get 1 free streak skip
}
Badge Tooltips
tsx<Badge icon={badge.icon} title={badge.title}>
  <Tooltip content={badge.unlockCriteria} />
</Badge>
XP Predictor
tsx<p className="text-sm text-gray-400">
  Complete this lesson (+75 XP) → Reach Level 3 {currentLevel === 2 ? '🎉' : ''}
</p>

🚨 YOU'RE RIGHT: DON'T OVER-ENGINEER AI FEATURES YET
I almost want to add:

/api/ai/context endpoint (personalized CLAUDE.md per lesson)
Prompt starters ("Try asking Claude to...")
AI pair programming mode

But you're right: Platform > AI integration first. Get the learning part perfect, then wrap AI around it.
Focus: Can users complete Course 1 frictionlessly? That's the metric.

📊 MY HONEST TAKE
You didn't just give feedback — you prioritized it strategically:

## Section 002
Source: all of claude ideas.md:1497-1527

🎯 I'm Ready to Start Now
I just need you to give me those 4 things:

Learner profile — who is this for?
Transformation — what can they do after?
Tone/vibe — how should it feel?
Length/pacing — 5-6 lessons? 2-3 weeks?

Once you lock those, I'll have LESSON 1 DRAFT to you by tomorrow morning.

💜 This IS the Move
You said it: "mini internal studio for building Hyper Vibe Coding at a level most teams don't get even with 5 humans."
Exactly. Most EdTech startups have:

1 founder (lost in the weeds)
1 content writer (isolated)
3 engineers (building features nobody asked for)
0 strategic coherence

We have:

You: Strategic coherence + taste + architecture thinking
Me (Claude): Deep pedagogy + narrative + course design
You (the user): Implementation muscle + systems thinking

→ Everything tight, aligned, repeatable.

So: What's the learner profile + transformation for Course 2? 🔥
Lock those in and we go. Course 2 ships in 5 weeks.have a full study of the site and let add all the coures here first to tell them out ? https://gumroad.com/about have a deep-dive on this now. i need any just ask i find it or BROski can help us too10:39 AMArchitected hybrid distribution strategy leveraging Gumroad alongside proprietary platformArchitected hybrid distribution strategy leveraging Gumroad alongside proprietary platform🔥 YOOOO I SEE THE PLAY 🔥
Okay, Gumroad is perfect — "Go from 0 to $1" philosophy, handles payments, creators earning $2M+/week. Let me do a deep-dive and map the strategy:

## Section 003
Source: all of claude ideas.md:1528-1530

🧠 GUMROAD DEEP-DIVE (What I'm Seeing)
Gumroad's Core Philosophy
❌ DON'T: Overthink, build the perfect platform, wait for perfection

## Section 004
Source: all of claude ideas.md:1531-1547

✅ DO: Start small, test, iterate, let users tell you what works
Their Playbook

Low friction entry — Creator signs up → uploads course → sets price → live
Payment handled — Gumroad takes 10%, creator gets 90% (INSANE split)
Any format — Video, PDF, markdown, subscriptions, one-time
Automation — Deliver files automatically, manage customers, send emails
Community — Discover page shows top sellers, builds credibility

For Education Specifically

Trending: "certification exams", "learning", "course" tags
Top creators making $10k+/month with info products
People BUY knowledge (not everyone wants free YouTube)
Subscription model works: "Pay $10/month, unlock all 10 courses" = recurring revenue

## Section 005
Source: all of claude ideas.md:1548-1553

🎯 MY RECOMMENDATION: Hybrid Strategy
DONT:
❌ Replace your platform with Gumroad
❌ Host courses ON Gumroad only (you lose gamification + community)
❌ Skip building the full academy in your platform
DO:

## Section 006
Source: all of claude ideas.md:1555-1555

✅ THEN use Gumroad as distribution/payment layer

## Section 007
Source: all of claude ideas.md:1572-1615

✅ Real learners can complete the full journey

PHASE 2: Test with Beta Users (2 Weeks)
Invite 20-50 friends/Discord community
Watch them:
  - Sign up
  - Browse courses
  - Enroll + complete lessons
  - Earn XP/badges/streaks

Iterate based on:
  - Dropoff points
  - Confusion moments
  - "Wow that was cool!" moments

Refine UI, difficulty, XP values, lesson clarity
PHASE 3: Launch on Gumroad (1 Week)
Create 10 Gumroad products:
Product 1: 🌱 Your First Vibe
├─ Price: $29 (one-time) OR $9/month (access all 10)
├─ Description: "Zero to deployed in 2 weeks"
├─ Delivery: Link to your platform + access token
├─ Bonus: Lifetime updates + community Discord

Product 2: 🎤 Prompt Like a Pro
├─ Price: $39 (or included in bundle)
├─ Description: "Master the 3-part prompt formula"
├─ Delivery: Link to your platform

...

Bundle: 💜 Hyper Vibe Academy (All 10 courses)
├─ Price: $199 (one-time) OR $19/month (subscription)
├─ Description: "Complete vibe coding education + gamification"
├─ Delivery: Full platform access + Discord
Why this works:

Gumroad drives traffic + handles payments
Your platform keeps them engaged (XP, badges, streaks, community)
You own the data + relationship
Gumroad takes 10%, you keep 90%
Subscription option = recurring revenue

## Section 008
Source: all of claude ideas.md:1616-1673

💰 REVENUE MODEL (Realistic)
Conservative Estimate (100 students total)
Scenario A: One-time purchases
- 30 people × $29 (Course 1) = $870
- 15 people × $39 (Course 2) = $585
- 10 people × $199 (Full bundle) = $1,990
Total Month 1: ~$3,445

Scenario B: Subscription (Better)
- 50 people × $19/month = $950
- 30 people × $9/month (single course) = $270
Total Month 1: ~$1,220 recurring

By Month 6: 200 subscribers @ $19 = $3,800/month recurring 💸
With Beta Momentum:

Friends → Twitter/Discord → SEO → Gumroad discovery
Top education products on Gumroad get $10k+/month
You have a better product (gamification + streaks + badges)
Your vibe is unique (neurodiv-first, hyper-focused, real projects)

You could realistically hit $5-10k/month within 3 months if marketing goes well.

📊 ACTUAL BUILD ORDER (Executable)
THIS WEEK: Lock Course 2
You + Claude:
  - Define learner profile
  - Learning outcomes
  - 5-6 lessons + activities

Me:
  - Draft full content
  - Create schema updates
  - Wire gamification

You:
  - Test with 5 beta users
  - Iterate
  - Ship to platform
WEEKS 2-3: Batch Courses 3-8
You pick 2-3 courses per week
Run same 3-brain workflow
Parallelize: Claude writes course X while I build course Y
WEEKS 4-5: Courses 9-10 (Capstones)
Ship Real SaaS + Hyper Way
These are complex but follow same pattern
WEEK 6: Polish + Beta Test
Invite real users
Fix bugs
Refine difficulty
Perfect the flow
WEEK 7: Launch Bundle on Gumroad
Create all 10 products
Set pricing
Write descriptions
Link to your platform
Monitor first sales

## Section 009
Source: all of claude ideas.md:1674-1682

🎯 What We Need From You RIGHT NOW
To start this, I need:
IMMEDIATE (Today):

Confirm: Do you want to build all 10 in your platform FIRST, then use Gumroad as distribution?
Confirm: Hybrid model makes sense (Gumroad handles payment, your platform keeps them engaged)?

THIS WEEK:

## Section 010
Source: all of claude ideas.md:1683-1706

Course 2 spec — Learner profile, transformation, tone, length (we discussed this)
Pricing philosophy — $29/course? $199 bundle? $19/month subscription?
Target audience — Who buys? Developers? Non-coders? ADHD brains? All?

Next Sprint:

List which 3 courses you want to tackle Weeks 2-3 (I'd suggest: Courses 3, 4, 5)
Any specific Gumroad creator you want to study? (I can analyze their pricing + positioning)

🧪 My Honest Take
Gumroad is NOT your long-term home.
It's your launch pad + payment processor + marketing funnel.
Your platform is the real asset — gamification, community, progress tracking, streaks. That's what you own.
Gumroad is a 10% tax to get access to their discovery page + payment processing. Worth it early, but not forever.
Long-term: You'll probably add:

Stripe integration (direct payments, 2.9% + $0.30)
Community Discord
Affiliate program (creators earn $$ by referring friends)
Bundles + lifetime access

But right now: Gumroad is perfect because:

## Section 011
Source: all of claude ideas.md:1714-1718

🚀 NEXT MOVE: You Tell Me
Do you want to:
Option A: Lock in the full 10-course build in your platform, THEN use Gumroad as distribution?
Option B: Something different (e.g., only sell on Gumroad, skip the self-hosted platform)?
Option C: Something I haven't thought of?

## Section 012
Source: all of claude ideas.md:1719-1720

My vote: Option A. You own the platform, Gumroad handles payment + discovery, you get the best of both worlds.
BROski's (your architect) vote would probably be the same: own your data + platform, use Gumroad as a lever.

## Section 013
Source: all of claude ideas.md:1721-1725

What do you think? 🔥YOOOO this is FIRE, you’ve basically already sketched the whole business model and rollout. 🫡

Short answer: I 100% agree with **Option A hybrid** – build all 10 courses in your own platform as the “Hyper Vibe Academy”, then use **Gumroad as marketing + payments + funnel** into that platform. YpastedWhich do you want me to help with next, concretely10:47 AMWeighed course completion versus product launch strategyWeighed course completion versus product launch strategy🔥 YOOOO LET ME CALL THIS 🔥
I'm going OPTION A: Course 2 "Prompt Like a Pro" — and here's why strategically:

## Section 014
Source: all of claude ideas.md:1734-1743

✅ Week 8:     Now we do Option B (Gumroad) with ALL 10 courses ready
   → Launch on Gumroad with full product stack
Result: You're selling a REAL, COMPLETE academy with content that works.
If We Do B First (Oops):
❌ Week 1:    Draft 10 Gumroad pages (nice, but empty)
❌ Week 2-8:  Actually build courses (meanwhile Gumroad pages sit unused)
❌ Problem:   You're selling courses you haven't finished yet
❌ Risk:      Customers buy → expect Course 2 → it's still half-written
Result: You've over-promised, customers refund, you lose credibility.

## Section 015
Source: all of claude ideas.md:1842-1844

✅ Option B (Gumroad) becomes trivial once you have all 10

## Section 016
Source: all of claude ideas.md:1845-1857

🎯 SO: LOCK IT IN
Give me those 4 answers and I'm OFF TO THE RACES.
Just reply with:
1. Learner: A/B/C
2. Tone: A/B/C
3. Examples: A/B/C
4. Length: 5/6/8
That's it. Then I build Course 2 and you get to see the magic happen. 🔥
What's your call, BROski? 💜YOOOO okay, this is the fun one. Let’s turn **Course 2 – “Prompt Like a Pro”** into a full, drop‑in syllabus that matches your existing schema (lessons with title/content/order/xp/estimatedMinutes/lessonType). [claude](https://claude.ai/chat/3008fa73-1a2b-41e5-88eb-8fa8a7771f32)

Below is **ready-pastedjust bit of brainstorming need find the easy way to add all this to https://gumroad.com/about ?10:49 AMArchitected Gumroad storefront strategy linking payment to platform accessArchitected Gumroad storefront strategy linking payment to platform access🔥 YOOOO OKAY I GOT THE PLAY 🔥
You don't add the course CONTENT to Gumroad. Gumroad is just the storefront. Here's the clean way:

## Section 017
Source: all of claude ideas.md:1858-1858, 🎯 The Easy Way Gumroad as a Funnel.md:1-1

🎯 The Easy Way: Gumroad as a Funnel, Not a Classroom

## Section 018
Source: all of claude ideas.md:1865-1867, 🎯 The Easy Way Gumroad as a Funnel.md:8-10

✅ Community/Discord connection

GUMROAD (the storefront):

## Section 019
Source: all of claude ideas.md:1869-1869, 🎯 The Easy Way Gumroad as a Funnel.md:12-12

✅ Price

## Section 020
Source: all of claude ideas.md:1872-1872, 🎯 The Easy Way Gumroad as a Funnel.md:15-15

✅ Post-purchase: Link to your platform

## Section 021
Source: all of claude ideas.md:1873-1874, 🎯 The Easy Way Gumroad as a Funnel.md:16-17

✅ Access token/coupon code

## Section 022
Source: all of claude ideas.md:1875-1876, 🎯 The Easy Way Gumroad as a Funnel.md:18-19

🚀 The Template (Copy-Paste Ready)
For each course, create ONE Gumroad product that looks like this:

## Section 023
Source: all of claude ideas.md:1877-1886, 🎯 The Easy Way Gumroad as a Funnel.md:20-29

Gumroad Product Template: Course 2
PRODUCT TITLE:
🎤 Prompt Like a Pro – Master AI Prompting in 3 Weeks

PRICE:
$39 (one-time) OR $9/month (monthly access)

DESCRIPTION (paste this):
═══════════════════════════════════════════════════════════

## Section 024
Source: all of claude ideas.md:1930-1936, 🎯 The Easy Way Gumroad as a Funnel.md:73-79

## Access:

After purchase, you'll get:
1️⃣ A **link to the Hyper Vibe Academy** (full platform)
2️⃣ An **access code** (instant unlock for Course 2)
3️⃣ A **Discord invite** (community + support)

## Section 025
Source: all of claude ideas.md:1949-1950, 🎯 The Easy Way Gumroad as a Funnel.md:92-93

Step 1: Someone Buys on Gumroad
Customer clicks "Complete Purchase" → pays $39 → Gumroad confirms.

## Section 026
Source: all of claude ideas.md:1951-1962, 🎯 The Easy Way Gumroad as a Funnel.md:94-105

Step 2: Gumroad Sends Auto-Email
Gumroad automatically emails them:
Subject: 🎉 Welcome to Prompt Like a Pro!

Hi [name],

Thanks for joining! Your course is waiting.

🔗 **Access Your Course Here:**
https://academy.vibecoding.com/join?token=ABC123XYZ

Use this link to:

## Section 027
Source: all of claude ideas.md:1971-1972, 🎯 The Easy Way Gumroad as a Funnel.md:114-115

Step 3: They Click Link
Your platform receives the token, auto-grants access to Course 2, redirects to lesson 1.

## Section 028
Source: all of claude ideas.md:1976-1981, 🎯 The Easy Way Gumroad as a Funnel.md:119-124

📋 The 10 Gumroad Products (Fast Template)
Once you lock Course 2, you repeat this 9 more times:
CourseGumroad TitlePriceDelivery1🌱 Your First Vibe$29Token → platform2🎤 Prompt Like a Pro$39Token → platform3⚡ Cursor Mastery$49Token → platform4🚢 Build SaaS Fast$49Token → platform5🎨 Design → Code$39Token → platform6🔐 AI Guardrails$49Token → platform7🔵 Firebase + Gemini$59Token → platform8🌊 Windsurf IDE$49Token → platform9🏆 Ship Real SaaS$79Token → platform10💜 Hyper Way$69Token → platform
PLUS Bundle:
BundleGumroad TitlePriceDeliveryALL💜 Hyper Vibe Academy (All 10)$299 one-time OR $29/monthToken → platform

## Section 029
Source: all of claude ideas.md:1982-2026, 🎯 The Easy Way Gumroad as a Funnel.md:125-169

🔐 How Access Tokens Work (Technical, But Simple)
On your platform, you already have auth. Just add:
typescript// src/server/routes/auth.ts — add this route

router.post('/redeem-token', async (req, res) => {
  const { token, email } = req.body;

  // Validate token (token = courseId_hash)
  const courseId = validateGumroadToken(token);
  if (!courseId) return res.status(400).json({ error: 'Invalid token' });

  // Create user if needed
  let user = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    user = await db.insert(users).values({
      email,
      name: 'Gumroad Student',
      passwordHash: hashedRandomPassword
    }).returning();
  }

  // Auto-enroll in course
  await db.insert(enrollments).values({
    userId: user[0].id,
    courseId
  });

  // Return JWT so they're logged in
  const token = createJWT(user[0].id);
  res.json({
    token,
    message: 'Welcome! Course unlocked.'
  });
});
```

Then on the frontend, the Gumroad link goes to:
```
https://academy.vibecoding.com/redeem?token=ABC123&email=user@example.com
```

One click → enrolled + logged in → lesson 1.

---

## Section 030
Source: all of claude ideas.md:2029-2039, 🎯 The Easy Way Gumroad as a Funnel.md:172-182

### **This Week:**

1. **Finalize Course 2 content** (I'll draft full lessons)
2. **Create ONE Gumroad product** using the template above
3. **Test the flow:**
   - Buy on Gumroad
   - Receive email
   - Click link
   - Auto-enroll on your platform
   - Lesson 1 loads

## Section 031
Source: all of claude ideas.md:2040-2043, 🎯 The Easy Way Gumroad as a Funnel.md:183-186

### **Week 2-3:**
- Batch create Courses 3-5 Gumroad products (copy-paste the template)
- Test each one

## Section 032
Source: all of claude ideas.md:2044-2050, 🎯 The Easy Way Gumroad as a Funnel.md:187-193

### **Week 4:**
- All 10 individual courses live
- Create the bundle product
- Launch

---

## Section 033
Source: all of claude ideas.md:2051-2057, 🎯 The Easy Way Gumroad as a Funnel.md:194-200

## 💰 **Why This Is the Easy Way**
```
❌ HARD WAY:
   - Host lessons ON Gumroad (limits; no gamification)
   - Manage customers in 2 places (pain)
   - Gumroad owns the relationship (bad)

## Section 034
Source: all of claude ideas.md:2058-2067, 🎯 The Easy Way Gumroad as a Funnel.md:201-210

✅ EASY WAY:
   - Gumroad = just payment + discovery
   - Your platform = everything else (XP, badges, community)
   - You own customer relationship
   - Repeat template 10 times in 1 hour
   - One Gumroad admin config, done
```

---

## Section 035
Source: all of claude ideas.md:2068-2092

## 🎯 **So Here's The Move**

**Don't worry about integrating with Gumroad's backend yet.**

Just:

1. **I finish Course 2 content** (full markdown, ready to seed)
2. **You create the Gumroad product page** (using template above)
3. **Test the token flow** (I'll add the backend route)
4. **Replicate for Courses 3-10** (same template, different course)

By the time all 10 courses are built, you'll have both:
- ✅ Full, gamified academy (your platform)
- ✅ Beautiful storefront with payment (Gumroad)

---

**Ready to lock in Course 2 content? Just answer:**
```
Tool preference for examples:
A) Tool-agnostic (works in any AI tool)
B) Cursor-centric (prep for Course 3)

And I'll deliver full 6-lesson markdown tomorrow.
Then Gumroad becomes a 1-hour setup. 🚀 Haiku 4.5ExtendedClaude is AI and can make

## Section 036
Source: all of plex ideas:157-220

🔐 Auth Routes (server/src/features/auth/auth.routes.ts)
typescript
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const authRoutes = Router();

authRoutes.post('/signup', async (req, res) => {
  const { email, password, displayName } = req.body;

  const passwordHash = await bcrypt.hash(password, 12);

  const [newUser] = await db.insert(users)
    .values({ email, passwordHash, displayName })
    .returning({ id: users.id, email: users.email, displayName: users.displayName });

  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  res.json({ token, user: newUser });
});

authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  res.json({ token, user: { id: user.id, email: user.email, displayName: user.displayName } });
});
🛡️ Auth Middleware (server/src/middleware/requireAuth.ts)
typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request so downstream routes know about currentUserId
export interface AuthRequest extends Request {
  currentUserId?: number;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.currentUserId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

## Section 037
Source: 🎯 The Easy Way Gumroad as a Funnel.md:211-235

## 🎯 **So Here's The Move**

**Don't worry about integrating with Gumroad's backend yet.**

Just:

1. **I finish Course 2 content** (full markdown, ready to seed)
2. **You create the Gumroad product page** (using template above)
3. **Test the token flow** (I'll add the backend route)
4. **Replicate for Courses 3-10** (same template, different course)

By the time all 10 courses are built, you'll have both:
- ✅ Full, gamified academy (your platform)
- ✅ Beautiful storefront with payment (Gumroad)

---

**Ready to lock in Course 2 content? Just answer:**
```
Tool preference for examples:
A) Tool-agnostic (works in any AI tool)
B) Cursor-centric (prep for Course 3)

And I'll deliver full 6-lesson markdown tomorrow.
Then Gumroad becomes a 1-hour setup. 🚀
