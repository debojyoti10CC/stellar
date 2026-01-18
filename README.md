# Nexus-Shield 
### AI-Powered Contract Lifecycle Management on the Stellar Blockchain

Nexus-Shield is an enterprise-grade platform designed to solve the critical challenges of cross-border trade—including jurisdictional risk, version inconsistency, and lack of trust. By integrating **AI-driven legal intelligence** with **Stellar’s blockchain anchoring**, Nexus-Shield provides a secure, transparent, and verifiable environment for managing contracts from draft to execution.

[📺 Watch the Demo Video](https://youtu.be/LjVOfTOljcQ)

---

## 🚀 Key Features

### 🏛️ Contract Management Workbench
* **Intuitive Dashboard:** Monitor your contract lifecycle at a glance with status tracking for active contracts, AI scans, and verified records.
* **Template Library:** Quickly generate Non-Disclosure Agreements (NDA), Service Agreements, and Partnership Agreements.
* **Version Control:** Track modifications in real-time with multi-party negotiation and visual version comparisons.

### 🤖 AI Compliance Sentinel
* **Automated Summarization:** Extracts key obligations, timelines, and payment terms instantly.
* **Risk Detection:** Flags missing clauses (e.g., Force Majeure) and high-risk liability terms.
* **Contract Q&A:** A context-aware legal assistant that answers questions grounded strictly in the uploaded document.

### ⛓️ Blockchain Trust Layer (Stellar)
* **Immutable Anchoring:** Anchors cryptographic hashes (SHA-256) of contract versions on the Stellar ledger.
* **Digital Signatures:** Secure execution using Stellar wallets (Freighter, Albedo).
* **Tamper-Proof Audit Trail:** A permanent, verifiable history of every approval, signature, and state change.

---

## 🛠️ Technology Stack

* **Frontend:** [Next.js](https://nextjs.org/) (React), Tailwind CSS, Framer Motion
* **AI Services:** Python, FastAPI, [LangChain](https://www.langchain.com/) (RAG), LLM APIs
* **Blockchain:** [Stellar Network](https://stellar.org/), Soroban Smart Contracts
* **Wallets:** Freighter, Albedo

---

## ⚙️ How It Works

1.  **Draft:** Upload or create a contract in the Nexus Workbench.
2.  **Analyze:** The AI Sentinel identifies clauses and flags jurisdictional risks.
3.  **Collaborate:** Parties negotiate; every version is automatically hashed.
4.  **Verify:** The contract's integrity is checked against the Stellar ledger.
5.  **Execute:** Parties sign with their Stellar keys, creating a permanent on-chain record.

---

## 📂 Repository Structure

```text
├── frontend/          # Next.js application & UI components
├── ai-services/       # Python FastAPI service for NLP & RAG
├── blockchain/        # Soroban smart contracts & Stellar SDK logic
└── docs/              # Technical blueprints & documentation
