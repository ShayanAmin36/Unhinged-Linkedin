# Unhinged-Linkedin

Turn chaotic real-life events into polished LinkedIn "wins" using a Chrome extension + TypeScript backend powered by Gemini.

## What It Does

- Takes a messy or negative event as input.
- Sends it to a local Express API.
- Uses Gemini (`gemini-2.5-flash`) to rewrite it in dramatic corporate-jargon style.
- Returns a ready-to-post LinkedIn-style paragraph in the extension popup.

## Tech Stack

- Extension: Chrome Extension (Manifest V3), TypeScript
- Backend: Node.js, Express, TypeScript
- AI: Google Gemini via `@google/genai`

## Project Structure

```text
backend/
  index.ts
  package.json
  tsconfig.json
extension/
  manifest.json
  popup.html
  popup.ts
  tsconfig.json
README.md
```

## Prerequisites

- Node.js 18+
- npm
- Google Gemini API key
- Google Chrome (for loading the extension)

## 1) Backend Setup

From project root:

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

Start the backend:

```bash
npm run dev
```

You should see:

```text
Unhinged LinkedIn Bot server running on http://localhost:3000
```

## 2) Extension Setup

In a second terminal:

```bash
cd extension
npm install
npx tsc
```

This builds `popup.ts` into `extension/dist/popup.js`.

## 3) Load the Extension in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `extension/` folder

Now open the extension popup, enter your event, and click **Synergize My Post**.

## How It Works

1. Popup UI sends `POST http://localhost:3000/generate` with `{ text }`.
2. Backend validates input and builds a corporate-spin prompt.
3. Gemini generates the final post.
4. Extension displays the response.

## API

### `POST /generate`

Request body:

```json
{
  "text": "I got fired on a Monday"
}
```

Success response:

```json
{
  "result": "Today marked a powerful transition in my professional journey..."
}
```

Error response examples:

```json
{
  "error": "Please provide some text to translate."
}
```

```json
{
  "error": "Failed to generate corporate spin."
}
```

## Troubleshooting

- `Failed to connect to the server` in popup:
  - Make sure backend is running on `http://localhost:3000`.
- Gemini errors:
  - Verify `GEMINI_API_KEY` is set correctly in `backend/.env`.
- Popup not updating after code changes:
  - Rebuild with `npx tsc` in `extension/`, then reload extension in `chrome://extensions`.

## License

ISC
