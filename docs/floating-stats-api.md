# Floating Stats API Usage Guide

This document explains how the floating competitive-programming stats panel loads and displays data, including source APIs, fallbacks, and extension points.

## Feature Overview

UI component: `components/features/stats/FloatingStats.tsx`

The floating stats panel shows:

- Codeforces rating, max rating, rank, max rank
- LeetCode solved count and global ranking

The panel is opened from a floating action button and fetches data lazily (on first open).

## Data Sources

### Codeforces

Helper: `lib/api/codeforces.ts`

Used function:

- `getCodeforcesUser(handle)`

External endpoint called by helper:

- `https://codeforces.com/api/user.info?handles=<handle>`

Return contract used by UI:

```ts
export interface CodeforcesUser {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  avatar: string;
  titlePhoto: string;
}
```

Failure behavior:

- Logs error
- Returns `null`
- UI falls back to safe placeholders (`0` / `Unrated`)

### LeetCode

Helper: `lib/api/leetcode.ts`

Used function:

- `getLeetCodeStats(username)`

External endpoint called by helper:

- `https://alfa-leetcode-api.onrender.com/<username>/solved`

Return contract used by UI:

```ts
export interface LeetCodeStats {
  totalSolved: number;
  ranking: number;
}
```

Failure behavior:

- Uses internal fallback data (`FALLBACK_DATA`)
- Returns stable shape for UI rendering

## Runtime Flow in FloatingStats

1. User clicks floating button.
2. Panel opens.
3. Component fetches Codeforces + LeetCode in `Promise.all`.
4. Data is stored in local state.
5. `hasFetched` prevents repeated fetches during the same session.

Key states:

- `isExpanded`: panel visibility
- `loading`: fetch status
- `hasFetched`: one-time fetch guard
- `codeforcesData`, `leetcodeData`: resolved stats payloads

## Performance Notes

Current implementation optimizations:

- Deferred fetch (only after panel open)
- Mobile-friendly motion simplification
- Safe fallbacks for API errors to avoid UI breakage

Potential future optimizations:

- Add server route proxy with centralized cache and rate-limit control
- Persist latest successful stats in local/session storage
- Show last-updated timestamp from cached payload

## Configuration Source

Handles and profile links are read from:

- `lib/constants.ts` (`PERSONAL_INFO`)

Used keys:

- `codeforcesHandle`
- `leetcodeHandle`
- `codeforcesUrl`
- `leetcodeUrl`

## Error Handling Model

The API helper layer is intentionally fault-tolerant:

- Never throws into UI path for expected network/API issues
- Logs errors for diagnostics
- Returns nullable/fallback values

This keeps the floating panel responsive even during third-party outages.

## API Usage Example

Using helpers directly in another component:

```ts
import { getCodeforcesUser } from "@/lib/api/codeforces";
import { getLeetCodeStats } from "@/lib/api/leetcode";

const [cf, lc] = await Promise.all([
  getCodeforcesUser("SnoOpWo0t"),
  getLeetCodeStats("SnoOpWo0t"),
]);
```

Always handle nullable/fallback responses in UI.

## Related Files

- `components/features/stats/FloatingStats.tsx`
- `lib/api/codeforces.ts`
- `lib/api/leetcode.ts`
- `lib/constants.ts`
