# ChatBotKit White-label

Welcome to the ChatBotKit White-label Solution! This powerful tool enables you to build and deploy custom conversational AI SaaS solutions quickly and efficiently. This is the ideal for entrepreneurs, agencies, and developers who want to build their own AI platforms.

<img src="https://github.com/chatbotkit/cbk-whitelabel/assets/5363404/f6ede4f1-eca0-4e5d-86ed-5c974539e30e" width="30%"/>
<img src="https://github.com/chatbotkit/cbk-whitelabel/assets/5363404/461acb90-2501-4204-a738-3bd42f382e84" width="30%"/>
<img src="https://github.com/chatbotkit/cbk-whitelabel/assets/5363404/b2e994d4-2a67-4774-8d6a-be146d601cb6" width="30%"/>

## Benefits

### 🌟 **Tailored to Your Brand**

**Personalize Seamlessly:** Our ChatBotKit White-label Solution boasts unparalleled customization. Transform its appearance to resonate with your brand's unique aesthetic and ethos.

### 🚀 **Scalability at Your Fingertips**

**Grow Without Limits:** Built upon the robust ChatBotKit Node SDKs, our solution scales effortlessly with your business, ensuring you're always ahead of the curve.

### 🔒 **Fortified Security**

**Protection You Can Trust:** Leveraging the Clerk authentication platform, the ChatBotKit White-label Solution guards your application against cyber threats, ensuring peace of mind.

### 💰 **Cost-Effective Monetization**

**Profit with Ease:** Integrated with Stripe, our solution simplifies monetization, turning your application into a revenue-generating powerhouse.

### 🛠️ **Open-Source Innovation**

**Freedom to Customize:** Being open-source, our solution offers unparalleled flexibility, allowing you to tailor the application to your unique business requirements.

### 🎯 **User-Friendly Design**

**Effortless Experience:** With its intuitive interface, the ChatBotKit White-label Solution makes managing and customizing your application a breeze.

### 🚀 **Streamlined Deployment**

**Deploy with Confidence:** Our solution simplifies the deployment process, enabling you to launch your application quickly and efficiently.

### 🛠️ **Hassle-Free Maintenance**

**Maintain with Ease:** Designed for effortless upkeep, our solution ensures your application remains cutting-edge with minimal effort.

### 🔄 **Regular Updates, No Fuss**

**Stay Ahead, Effortlessly:** Our easy-to-update system means your application always enjoys the latest features and improvements without any hassle.

### 🔗 **Seamless Integration**

**Integrate Effortlessly:** Our solution's compatibility ensures smooth integration with your existing systems, enhancing functionality without the complexity.

## Prerequisites

Before you begin, ensure you have the following installed:

- A package manager (npm, yarn, pnpm, or bun)
- A [ChatBotKit](https://chatbotkit.com) account
- A [Clerk](https://clerk.dev/) account
- A [Stripe](https://stripe.com/) account

## Getting Started

### Setting Up Your Development Environment

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/chatbotkit/cbk-whitelabel
   cd cbk-whitelabel
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

7. **Keeping In Sync:**
   If you wish you can also keep the ChatBotKit SDK in sync with the latest version pulling the latest changes from the repository.

   ```bash
   # add the ChatBotKit repository as an upstream remote
   git remote add upstream https://github.com/chatbotkit/cbk-whitelabel.git
   # fetch the latest changes
   git fetch upstream
   # switch to the main branch
   git checkout main
   # merge the latest changes
   git merge upstream/main
   # install dependencies
   npm install
   ```

## Documentation and Learning Resources

- **Explore ChatBotKit:** Learn more about the capabilities and features of ChatBotKit at [ChatBotKit.com](https://chatbotkit.com).
- **SDK Documentation:** Utilize the [ChatBotKit Node SDKs](https://github.com/chatbotkit/node-sdk) for advanced customization and functionality.

## Deploying Your Chatbot

**Deploy with Vercel:**
For a hassle-free deployment, use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js). It’s optimized for Next.js applications like this one.

- **Deployment Guide:** For detailed instructions, see the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

## Support and Contributions

For support, feature requests, or contributions, please visit [our GitHub repository](https://github.com/chatbotkit/cbk-whitelabel).

If you need help with ChatBotKit, please visit [ChatBotKit](https://chatbotkit.com) main website.

**The ChatBotKit team may be able to provide development and commercial support for your project. Please contact us for more information.**
