# 🎬 Screenplay Summarizer AI

A Next.js application that leverages Google's Generative AI (Gemini 1.5 Flash) to analyze and summarize screenplay text. This project demonstrates the integration of a modern React frontend with server-side API routes and Large Language Models (LLMs).

## 🚀 Current Status (MVP)

**Phase 1 & 2 Complete:** Core infrastructure, UI, and Text-to-Summary pipeline are fully functional.

- [x] **Frontend Architecture:** Built with Next.js 14 (App Router) & TypeScript.
- [x] **UI/UX:** Dark-themed, responsive interface utilizing Tailwind CSS.
- [x] **Backend API:** Secure Serverless Function (`/api/summarize`) to handle AI requests.
- [x] **AI Integration:** Implemented `gemini-1.5-flash` for high-speed text analysis.
- [ ] **PDF Parsing:** (Upcoming Phase) Integration of PDF text extraction.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **AI Model:** Google Gemini 1.5 Flash via `@google/generative-ai` SDK
* **IDE:** Cursor

## ⚙️ How It Works

1.  **Input:** User pastes screenplay text into the client-side interface.
2.  **API Request:** The frontend sends a `POST` request to the internal API route.
3.  **Processing:** The server-side route authenticates with Google AI and constructs a structured prompt.
4.  **AI Response:** Gemini analyzes the script and returns a structured summary (Logline, Characters, Synopsis).
5.  **Rendering:** The frontend receives the JSON response and renders it with whitespace preservation.

## 💻 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/Arya-Jathar/screenplay-summarizer.git](https://github.com/Arya-Jathar/screenplay-summarizer.git)
cd screenplay-summarizer
