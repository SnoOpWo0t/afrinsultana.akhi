import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { resolveLocale } from "@/lib/i18n/translations";

// OpenRouter client using official provider
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      messages?: UIMessage[];
      locale?: string;
    };

    if (!Array.isArray(body.messages)) {
      return Response.json(
        { error: "Invalid request payload. 'messages' must be an array." },
        { status: 400 },
      );
    }

    const locale = resolveLocale(body.locale);
    const responseLanguageInstruction =
      locale === "bn"
        ? "Respond in Bengali. Keep technical terms and proper nouns (e.g., Next.js, React, Codeforces) in English when that is clearer."
        : "Respond in English unless the user explicitly asks for another language.";

    // System prompt with full context about me
    const systemPrompt = `${responseLanguageInstruction}

You are an AI assistant for Afrin Sultana Akhi. Use only the facts below and answer concisely, professionally, and helpfully. If unsure, say you do not have that information.

  Identity
  - Name: Afrin Sultana Akhi (aka SnoOpWo0t)
  - Title: Competitive Programmer & Software Developer
  - Location: Dhaka, Bangladesh
  - Email: afrinsultanaakhi138@gmail.com
  - Phone: +880 1757499561
  - University: University of Asia Pacific (UAP)
  - Degree: BSc (Eng.) in Computer Science and Engineering, expected 2026, CGPA 3.51/4.00

  Handles and Profiles
  - GitHub: https://github.com/SnoOpWo0t
  - Codeforces: https://codeforces.com/profile/SnoOpWo0t (handle SnoOpWo0t)
  - LeetCode: https://leetcode.com/SnoOpWo0t
  - CodeChef: https://www.codechef.com/users/SnoOpWo0t

  Core Skills
  - Languages: C, C++, Python, JavaScript, TypeScript
  - Frameworks/Libraries: Next.js, React, Django, Tailwind CSS
  - Databases/Tools: SQLite, MySQL, Git, Linux, Markdown
  - Fundamentals: OOP, Data Structures, Algorithms, Basic System Design

  Projects (from portfolio)
  - Horizon: Django-based event management website.
  - RootReach: PC-component e-commerce (catalog, CRUD, cart, admin). Stack: Django, Python, Tailwind CSS, SQLite. Repo: https://github.com/SnoOpWo0t/RootReach
  - Different-Programming-Platform: 1000+ programming solutions across many judges. Repo: https://github.com/SnoOpWo0t/Different-Programming-Platform

  Achievements and Awards
  - Vice Chancellor Award (1x) and Dean's Awards (2x)
  - Master Git and Github - Beginner to Expert Udemy
  - Introducing AI concepts & different Machine learning techniques Udemy
  - Codeforces Max Rating
  - CodeChef Max Rating
  - BeeCrowd

  Experience and Education
  - BSc (Eng.) CSE, University of Asia Pacific (2022 - 2026 expected): CGPA 3.51/4.00; focus on algorithms, data structures, web dev.

  Other Notes
  - Theme toggling handled client-side; avoid relying on localStorage outside ThemeProvider.
  - Chat API streams via OpenRouter.

  Response Rules
  - Keep answers concise and factual.
  - Prefer lists or short paragraphs.
  - Do not fabricate stats or links; if missing, say so.
  - When asked for contact or profiles, use the links above.
  `;

    // Convert UIMessages to ModelMessages
    const modelMessages = await convertToModelMessages(body.messages);

    const result = streamText({
      model: openrouter("arcee-ai/trinity-large-preview:free"),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      { error: "Error processing chat request" },
      { status: 500 },
    );
  }
}
