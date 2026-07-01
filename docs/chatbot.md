# Chatbot Architecture and Usage Guide

This document covers how the AI chatbot is implemented end-to-end: UI, API route, localization behavior, streaming, and safe customization.

## Feature Overview

Main component: `components/features/chatbot/Chatbot.tsx`

Backend route: `app/api/chat/route.ts`

The chatbot is a floating panel that:

- streams assistant responses in real time
- supports markdown rendering (including code blocks)
- respects current UI locale (English/Bangla)

## Frontend Implementation

### Chat State and Transport

The chatbot uses AI SDK React hooks:

- `useChat` from `@ai-sdk/react`
- `DefaultChatTransport` from `ai`

Transport config:

```ts
transport: new DefaultChatTransport({ api: "/api/chat" })
```

Message sending includes locale context:

```ts
sendMessage({ text: input }, { body: { locale } });
```

### Rendering

- Markdown is rendered with `react-markdown` + `remark-gfm`.
- Code blocks are routed into `CodeBlock` component for copy UX.
- The UI differentiates user/assistant bubbles.
- Loading state is shown during stream via animated dots.

### Accessibility and Interaction

- Floating button and close control use aria labels from localization copy.
- Input autofocuses when panel opens.
- Overlay click closes panel.
- Scroll behavior is constrained to the chat panel while open.

## Backend Implementation

Route file: `app/api/chat/route.ts`

### Request Contract

Expected JSON body:

```ts
{
  messages: UIMessage[];
  locale?: string;
}
```

Validation:

- Returns `400` if `messages` is not an array.

### Locale-Aware Response Instruction

The route resolves locale with `resolveLocale` and prepends language instruction:

- Bangla locale: respond in Bengali, keep technical terms in English where clearer
- English locale: respond in English unless user asks otherwise

### Model + Streaming

- Provider: `@openrouter/ai-sdk-provider`
- Streaming: `streamText(...)`
- Message conversion: `convertToModelMessages(...)`

Returns streaming response:

```ts
return result.toUIMessageStreamResponse();
```

### System Prompt

The system prompt is portfolio-specific and includes:

- identity/profile details
- project portfolio information
- achievements/experience
- response constraints (concise, factual, no fabrication)

## Environment Variables

Required:

- `OPENROUTER_API_KEY`

Optional (unrelated to chatbot route directly but used elsewhere):

- `GITHUB_TOKEN`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `RESEND_TO`

## Customization Guide

### 1) Change model

Edit `app/api/chat/route.ts`:

```ts
model: openrouter("arcee-ai/trinity-large-preview:free")
```

Replace with any supported OpenRouter model ID.

### 2) Change behavior/tone

Update system prompt in `app/api/chat/route.ts`.

Keep guardrails:

- no fabricated claims
- concise factual responses
- preserve profile link accuracy

### 3) Change UI copy

Edit localization keys under `chatbot` in `lib/i18n/translations.ts`.

## Error Handling

- Frontend keeps chat usable while request is in progress.
- Backend wraps route in `try/catch` and returns `500` JSON on unexpected failures.
- Errors are logged for diagnosis.

## Security and Safety Notes

- Never expose API keys in client components.
- Keep route-level input validation strict.
- Maintain concise, constrained system prompt behavior.
- Avoid adding personally sensitive information beyond intended portfolio context.

## Related Files

- `components/features/chatbot/Chatbot.tsx`
- `components/features/chatbot/CodeBlock.tsx`
- `app/api/chat/route.ts`
- `lib/i18n/translations.ts`
