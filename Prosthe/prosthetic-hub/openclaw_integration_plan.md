# OpenClaw Agent Enhancement & Prosthetic Integration Plan

This document outlines the step-by-step strategy for upgrading your **OpenClaw** agent (currently using Minimax m2.1) from a basic browser-automation tool to a fully integrated, highly capable AI assistant. It also describes how your **Prosthetic-Hub** project serves as the central orchestration dashboard for these integrations.

## Architecture Overview

1. **Prosthetic Hub (Frontend - Next.js)**: Acts as the command center. This is where users log in, authorize third-party apps (OAuth), input their API keys, and manage their agent's active skills.
2. **OpenClaw (Backend Agent System)**: Runs the Minimax m2.1 models. It receives secure tokens/keys from the Prosthetic Hub and executes tool calls (fetching Gmail, pushing to GitHub, searching the web with Tavily, or responding to WhatsApp).

---

## Step 1: Integrating Tavily API for Web Search

Since you do not want to use Brave Search and prefer the free Tavily API, this is the easiest first win. Tavily is optimized for LLM agents.

**Implementation in OpenClaw:**
1. Sign up for Tavily and get the free tier API Key.
2. In OpenClaw, define a new tool schema for the Minimax m2.1 model: `search_web_with_tavily(query)`.
3. When the Minimax model decides to search, it outputs the tool call. OpenClaw catches it, makes an HTTP POST request to `https://api.tavily.com/search`, and feeds the parsed context (markdown/JSON) back to the Minimax model.

**Prosthetic Integration:**
- Create an "Integrations" page in the Prosthetic Hub for users to input their `TAVILY_API_KEY`. 
- Pass this key to OpenClaw securely using the **newly created `OpenClawConfigManager` API**.
  - **How it works (Automated Config):** We have built a backend route in Prosthetic Hub (`/api/openclaw-config`). When a user inputs their key on the website, the site sends a POST request to this route. The Node.js utility automatically reads `C:\Users\Divik\.openclaw\openclaw.json`, adds the new skill `apiKey`, updates the timestamp, and saves it. **You never have to manually edit the JSON file again.**

---

## Step 2: GitHub Integration

To make OpenClaw genuinely useful for code, it needs GitHub access.

**Implementation in OpenClaw:**
1. Define Agent Tools like: `read_github_repo`, `create_github_issue`, `push_github_commit`, `review_pull_request`.
2. Use the official GitHub REST/GraphQL APIs or an SDK like `octokit`.

**Prosthetic Integration (Crucial Step):**
- Prosthetic must act as an **OAuth App** or **GitHub App**.
- Users click "Connect GitHub" on the Prosthetic Hub UI.
- Prosthetic handles the OAuth flow, retrieves the GitHub Access Token, and securely passes it to OpenClaw, so the agent acts on behalf of the user.

---

## Step 3: Google Workspace Integration

Similar to GitHub, the agent needs to read emails, summarize docs, or schedule calendar events.

**Implementation in OpenClaw:**
1. Define Agent Tools: `read_recent_emails`, `send_email`, `search_drive_docs`, `create_calendar_event`.
2. Use Google APIs. The agent will prompt the user when it needs to interact with these services.

**Prosthetic Integration:**
- Configure a Google Cloud Console Project.
- Set up **Google OAuth credentials** within Prosthetic-Hub.
- Request explicit scopes from the user (e.g., `https://www.googleapis.com/auth/gmail.readonly`).
- Prosthetic stores the Refresh Token and Access Token, managing token expiration and securely sending active tokens to OpenClaw.

---

## Step 4: WhatsApp Integration & Dynamic Skill Creation

This is the most advanced and impressive feature. You want users to text the agent on WhatsApp, and the agent to learn or create "skills" dynamically.

**Implementation Strategy:**
1. **WhatsApp Connection**: Use the official Meta WhatsApp Cloud API or a service like Twilio.
2. **Webhook Receiver**: Set up a webhook endpoint (either on Prosthetic backend or OpenClaw) to listen for incoming WhatsApp messages securely.
3. **Dynamic Skill Creation Loop**:
   - User messages on WhatsApp: *"Whenever I send you an invoice link, file it into my Google Drive folder named 'Expenses'."*
   - OpenClaw analyzes the message using Minimax m2.1.
   - It identifies a **Trigger** (Invoice link via WhatsApp) and an **Action Sequence** (Download file -> Upload to Drive folder).
   - OpenClaw translates this into a JSON-based or Python-based "Skill Configuration".
   - It saves this newly generated skill in its database as a permanent macro.
4. **Execution**: The next time a user sends an invoice link, the newly created "Invoice processing skill" intercepts the workflow and executes autonomously using the previously integrated Google Workspace capabilities.

---

## Summary of How Prosthetic Fits In

OpenClaw on its own is just an engine that "denies to do shit" because it lacks context and security credentials. **Prosthetic** is the solution to this problem.

Prosthetic should be designed as the **Identity, Authentication, and Dashboard platform**:
- **Auth Layer:** NextAuth.js (or similar) to handle Google & GitHub logins.
- **Skill Marketplace UI:** A beautiful UI built with Framer Motion (already in your package.json) where users can see the custom skills OpenClaw has generated via WhatsApp.
- **Agent Sandbox:** An interface depicting what OpenClaw is currently doing (logs, active browsers, recent WhatsApp replies).

### Next Steps Recommendation
1. **Start with Tavily**: It requires zero OAuth setup. Just pass the key to the agent and give it the tool definition.
2. **Implement GitHub/Google OAuth in Prosthetic**: Build the "Connect Integrations" UI panel locally.
3. **Tackle WhatsApp Webhooks Last**: This requires the most robust infrastructure (server publicly accessible, webhook validation, and dynamic generation logic).
