🎯 The Easy Way: Gumroad as a Funnel, Not a Classroom
What Actually Lives Where
YOUR PLATFORM (the real academy):
  ✅ All 10 courses (seeded in DB)
  ✅ Full lessons, quizzes, activities
  ✅ XP, badges, streaks (the magic)
  ✅ User progress tracking
  ✅ Community/Discord connection

GUMROAD (the storefront):
  ✅ Course title + description
  ✅ Price
  ✅ Demo/teaser content
  ✅ Payment processor
  ✅ Post-purchase: Link to your platform
  ✅ Access token/coupon code

🚀 The Template (Copy-Paste Ready)
For each course, create ONE Gumroad product that looks like this:
Gumroad Product Template: Course 2
PRODUCT TITLE:
🎤 Prompt Like a Pro – Master AI Prompting in 3 Weeks

PRICE:
$39 (one-time) OR $9/month (monthly access)

DESCRIPTION (paste this):
═══════════════════════════════════════════════════════════

# 🎤 Prompt Like a Pro

**Learn to write prompts that actually work.**

Most people ask AI: "Make me an app."
Pros ask: "You are a senior engineer. Here's the context. Build this."

In 3 weeks, you'll:
✅ Learn the 3-part prompt formula (Role + Context + Task)
✅ Master iterative prompting (guide AI like a junior dev)
✅ Build a personal prompt library you'll reuse forever
✅ Complete real mini-projects in Cursor/Replit/Lovable

**What you'll ship:** A prompt playbook with 10+ reusable templates 
for debugging, building features, and shipping faster.

**Level:** Beginner (but helpful even if you code)
**Duration:** 3 weeks, ~6 lessons
**Format:** Video + text + hands-on challenges
**Community:** Access to Hyper Studio Discord

---

## What's Included:

- 6 structured lessons (text + examples + challenges)
- 20+ real prompt examples you can copy-paste
- 2 mini-projects (build a real feature + a dashboard)
- Personal prompt playbook capstone
- Lifetime access + updates
- Discord community (ask questions, share wins)

---

## What People Say:

*"I went from 'please AI help' to actually *specifying* what I want. 
My code quality jumped immediately."*

*"Finally understand why some prompts work and others don't."*

---

## Access:

After purchase, you'll get:
1️⃣ A **link to the Hyper Vibe Academy** (full platform)
2️⃣ An **access code** (instant unlock for Course 2)
3️⃣ A **Discord invite** (community + support)

🚀 **Start learning in 60 seconds.**

═══════════════════════════════════════════════════════════

WHAT'S INCLUDED IN DELIVERY:
- File: "Access_Your_Course.txt" with platform link + code
- Email: Follow-up with Discord invite + getting started guide

TAGS/CATEGORY:
education, programming, ai, course, learning

🔄 How the Delivery Works (Super Simple)
Step 1: Someone Buys on Gumroad
Customer clicks "Complete Purchase" → pays $39 → Gumroad confirms.
Step 2: Gumroad Sends Auto-Email
Gumroad automatically emails them:
Subject: 🎉 Welcome to Prompt Like a Pro!

Hi [name],

Thanks for joining! Your course is waiting.

🔗 **Access Your Course Here:**
https://academy.vibecoding.com/join?token=ABC123XYZ

Use this link to:
✅ Create your account
✅ Unlock Course 2 instantly
✅ Join the community Discord

Questions? Reply to this email or reach out on Discord.

Happy prompting! 🎤
— Hyper Vibe Studio
Step 3: They Click Link
Your platform receives the token, auto-grants access to Course 2, redirects to lesson 1.
Step 4: They Learn + Earn XP
They're in your gamified academy now. You own the relationship forever.

📋 The 10 Gumroad Products (Fast Template)
Once you lock Course 2, you repeat this 9 more times:
CourseGumroad TitlePriceDelivery1🌱 Your First Vibe$29Token → platform2🎤 Prompt Like a Pro$39Token → platform3⚡ Cursor Mastery$49Token → platform4🚢 Build SaaS Fast$49Token → platform5🎨 Design → Code$39Token → platform6🔐 AI Guardrails$49Token → platform7🔵 Firebase + Gemini$59Token → platform8🌊 Windsurf IDE$49Token → platform9🏆 Ship Real SaaS$79Token → platform10💜 Hyper Way$69Token → platform
PLUS Bundle:
BundleGumroad TitlePriceDeliveryALL💜 Hyper Vibe Academy (All 10)$299 one-time OR $29/monthToken → platform

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

## ✅ **Your Action Items (Super Clean)**

### **This Week:**

1. **Finalize Course 2 content** (I'll draft full lessons)
2. **Create ONE Gumroad product** using the template above
3. **Test the flow:**
   - Buy on Gumroad
   - Receive email
   - Click link
   - Auto-enroll on your platform
   - Lesson 1 loads

### **Week 2-3:**
- Batch create Courses 3-5 Gumroad products (copy-paste the template)
- Test each one

### **Week 4:**
- All 10 individual courses live
- Create the bundle product
- Launch

---

## 💰 **Why This Is the Easy Way**
```
❌ HARD WAY:
   - Host lessons ON Gumroad (limits; no gamification)
   - Manage customers in 2 places (pain)
   - Gumroad owns the relationship (bad)

✅ EASY WAY:
   - Gumroad = just payment + discovery
   - Your platform = everything else (XP, badges, community)
   - You own customer relationship
   - Repeat template 10 times in 1 hour
   - One Gumroad admin config, done
```

---

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