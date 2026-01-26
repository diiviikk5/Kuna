---
description: Create a personalized product demo video for a client using Remotion
---

# Vemux Video Creation Workflow

This workflow helps you create personalized product demo videos for clients. You provide the assets and info, I generate the Remotion composition, you render and deliver.

## 1. Gather Client Info

Before starting, collect the following from your client:

**Required:**
- [ ] Product/Brand Name
- [ ] Product URL (for scraping visuals if needed)
- [ ] Tagline or key message (1 sentence)
- [ ] 3-4 key features/benefits (short phrases)
- [ ] Logo file (PNG with transparency preferred)
- [ ] 2-4 product screenshots or images
- [ ] Preferred style: Clean / Dark / Developer / Minimal / Gradient
- [ ] Duration preference: 15s / 30s / 45s

**Optional:**
- Brand colors (hex codes)
- Background music preference
- CTA text (e.g., "Try Free", "Get Started")
- Social handles

## 2. Prepare Assets

// turbo
```bash
# Create client folder
mkdir -p src/remotion/assets/[CLIENT_NAME]
```

Place all client assets in `src/remotion/assets/[CLIENT_NAME]/`:
- `logo.png`
- `screenshot-1.png`, `screenshot-2.png`, etc.
- Any other brand assets

## 3. Generate Video Composition

Tell me the client info using this format:

```
/video-create
Client: [Name]
Product: [Product Name]
URL: [Product URL]
Tagline: [One-liner]
Features:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]
Style: [Clean/Dark/Developer/Minimal/Gradient]
Duration: [15s/30s/45s]
CTA: [Call to action text]
Assets folder: src/remotion/assets/[CLIENT_NAME]/
```

I will then:
1. Create/update the Remotion composition in `src/remotion/`
2. Configure scenes, timing, and animations
3. Set up the video plan JSON

## 4. Preview the Video

// turbo
```bash
npm run remotion:preview
```

This opens the Remotion Studio where you can preview and tweak.

## 5. Render Final Video

// turbo
```bash
npm run remotion:render
```

Output will be in `out/video.mp4` (HD 1080p).

## 6. Deliver & Invoice

- Send video to client via email/Drive/Dropbox
- Invoice: $50-200 depending on complexity
- Offer revisions if needed (1-2 included)

---

## Pricing Guide

| Tier | What's Included | Price |
|------|-----------------|-------|
| Basic | 15s video, 2 features, 1 revision | $50 |
| Standard | 30s video, 4 features, 2 revisions | $100 |
| Premium | 45s video, custom animations, 3 revisions | $200 |

---

## Quick Commands

- `/video-create` - Start new video project
- `/video-preview` - Open Remotion preview
- `/video-render` - Render final video
- `/video-revise` - Make changes to current project
