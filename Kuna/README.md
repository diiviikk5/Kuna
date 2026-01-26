# Kuna

**Instant State for Modern Applications.**

Kuna is the fastest way to add persistence to any application. It combines the simplicity of a global Key-Value store with the power of specialized primitives for AI Agents and Swarms.

> **Kuna = Zero-Config DB + Agent Memory + Snapshot Protocol**

## 🏗 Core Offering

### 1. Global KV Store (The Utility)
- **Zero-Config**: `GET /key`, `POST /key`. No migrations, no schemas.
- **Durable**: Built on Cloudflare D1 for global durability.

### 2. State Superpowers (The Moat)
- **Snapshot Protocol**: `kuna.snapshot()` to save entire application/agent states.
- **Swarm Sync**: Real-time pub/sub for shared memory between distributed instances.
- **Auto-Expiring Scratchpads**: Ephemeral memory with built-in TTL.

### 3. Cloneable Templates (The DX Hook)
- **Zero-to-One**: One-click templates for common structures (User Profiles, Chat History, Task Queues).
- **Viral Growth**: "Clone this database structure" links in app footers.

## 📁 Project Structure (Monorepo)

```
kuna/
├── apps/
│   └── web/              # Next.js Landing Page & Dashboard
├── packages/
│   ├── api/              # Cloudflare Worker + Hono + D1 (Engine)
│   ├── sdk/              # TypeScript Zero-dependency client (<2KB)
│   └── cli/              # (Future) CLI tool for power users
```

## 🚀 Getting Started

```bash
# Development
npm run dev

# Build
npm run build
```

## 📦 SDK Usage

```javascript
import { Kuna } from 'kuna';

// Initialize (Auto-creates namespace if not provided)
const db = new Kuna('my-namespace-id');

// Write
await db.set('users', { name: 'Divik', role: 'admin' });

// Read
const user = await db.get('users');
```

## 💰 Plans

| Feature | Anonymous/Free | Pro ($19/mo) | Enterprise |
|---------|----------------|--------------|------------|
| Namespace | Public/Ephemeral | Private & Durable | VPC / Dedicated D1 |
| Storage | 10MB / 1k Ops | 1GB / 1M Ops | Unlimited |
| Branding | "Built with Kuna" Badge | No Badge | White-label |
| Support | Community | Priority | SLA |

## 🛠 Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Cloudflare Workers, Hono.js, D1
- **SDK**: TypeScript, Zero-dependency

---

Built with ❤️ for developers building with AI agents, real-time apps, and serverless.
