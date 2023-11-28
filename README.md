# ChatBotKit White-label

Welcome to the ChatBotKit White-label Solution! This powerful tool enables you to build and deploy custom conversational AI SaaS solutions quickly and efficiently.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 12 or later)
- A package manager (npm, yarn, pnpm, or bun)
- A [ChatBotKit](https://chatbotkit.com) account
- A [Clerk](https://clerk.dev/) account
- A [Stripe](https://stripe.com/) account

## Getting Started

### Setting Up Your Development Environment

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/chatbotkit/cbk-white-label
   cd cbk-white-label
   ```

2. **Install Dependencies:**
   Choose your preferred package manager and run the following command:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Create a `.env.local` File:**
   Create a `.env.local` file in the root directory of your project. This file will contain your ChatBotKit, Clerk and Stripe credentials.

   ```bash
   cp .env.example .env.local
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Access the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

6. **Begin Editing:**
   Start customizing your chatbot by editing `app/page.tsx`. Changes will auto-update as you modify the file.

## Documentation and Learning Resources

- **Explore ChatBotKit:** Learn more about the capabilities and features of ChatBotKit at [ChatBotKit.com](https://chatbotkit.com).
- **SDK Documentation:** Utilize the [ChatBotKit Node SDKs](https://github.com/chatbotkit/node-sdk) for advanced customization and functionality.

## Deploying Your Chatbot

**Deploy with Vercel:**
For a hassle-free deployment, use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js). It’s optimized for Next.js applications like this one.

- **Deployment Guide:** For detailed instructions, see the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

## Support and Contributions

For support, feature requests, or contributions, please visit [our GitHub repository](https://github.com/chatbotkit/cbk-white-label).
