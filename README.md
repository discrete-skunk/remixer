# Content Remixer

A content remixing tool using React.

## Features

1. Paste in text we want to remix
2. Click a button to apply the remixing we want for it
3. Send the request to an AI API endpoint
4. See the remix in an output box
5. Add other styling and features that we want as we go

## Tech Stack

- Next.js (React)
- TailwindCSS
- Vercel
- Claude API

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and add your Claude API key:
   ```
   CLAUDE_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development

The main components of the application are:

- `app/page.tsx`: Main remixer interface
- `app/api/remix/route.ts`: API endpoint for remixing content

To implement the Claude API integration, you'll need to update the API endpoint with your Claude API key and implementation.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
