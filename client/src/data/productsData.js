// Single source of truth for all product pages.
// Names, prices and categories match exactly what's in Store.jsx and FeaturedProducts.jsx.

export const PRODUCTS_DATA = {

  'wf-ai-trading-bot': {
    slug: 'wf-ai-trading-bot',
    emoji: '📈',
    badge: 'AI Software',
    badgeVariant: 'ai',
    cat: 'ai',
    bg: '#060e0a',
    name: 'WF AI Trading Bot',
    tagline: 'A machine-learning algorithm that trades Forex, crypto & stocks — automatically, 24/7.',
    price: 299,
    accentColor: 'var(--green)',
    productDesc: 'ML trading bot for Forex, crypto & stocks. Configurable risk, 24/7 execution.',

    intro: `Most traders lose money not because of bad strategy — but because of emotion, timing, and fatigue. The WF AI Trading Bot removes all three.

It scans markets around the clock, identifies high-probability setups using momentum-based machine learning models, and executes trades in under 0.3 seconds — while you sleep, work, or do anything else.`,

    howItWorks: [
      { step:'01', title:'Install & configure', desc:'Connect the bot to your broker via API keys (Binance, Bybit, Coinbase, MT4/MT5). Set your risk tolerance, preferred pairs, and position size limits. Takes under 10 minutes.' },
      { step:'02', title:'Market scanning', desc:'The bot continuously monitors price action, volume, RSI, MACD, and 12 other indicators across your selected pairs. It looks for confluence — multiple signals aligning before entering a trade.' },
      { step:'03', title:'Signal & execution', desc:'When a high-confidence setup is detected, the bot places the order in 0.3s — before the window closes. Stop-loss and take-profit levels are set automatically based on ATR.' },
      { step:'04', title:'Telegram alerts', desc:'Every trade — entry, exit, stop-loss, or take-profit — sends you an instant Telegram message. Stay informed without watching charts.' },
      { step:'05', title:'Review & optimise', desc:'Access the built-in backtesting dashboard to review historical performance, win rate, and drawdown. Adjust parameters and re-test before going live.' },
    ],

    features: [
      'Supports Forex (MT4/MT5), crypto (Binance, Bybit, Coinbase) and stocks',
      'Configurable risk management — set max drawdown and position size',
      'Momentum ML model trained on 5 years of historical data',
      'Backtesting dashboard with full performance analytics',
      'Telegram alerts for every trade event',
      'One-time license — no monthly subscriptions',
      '30 days post-purchase support included',
      'Detailed setup documentation provided',
    ],

    specs: [
      ['Language', 'Python 3.10+'],
      ['Exchanges', 'Binance, Bybit, Coinbase, MT4, MT5'],
      ['Min. capital', '$200 recommended'],
      ['Execution speed', '~0.3 seconds'],
      ['Backtested win rate', '87% (2019–2024)'],
      ['License type', 'Single user, lifetime'],
    ],

    faq: [
      { q:'Do I need coding knowledge to use it?', a:'No. The bot comes with a full setup guide. You configure it through a simple config file — no coding required.' },
      { q:'Does it work on a VPS?', a:'Yes, and we recommend running it on a VPS (like DigitalOcean or Hetzner) for 24/7 uptime. The setup guide covers this.' },
      { q:'What if I lose money?', a:'All trading carries risk. Start with small amounts and use the risk management settings. Past performance does not guarantee future results.' },
      { q:'Can I use it on multiple accounts?', a:'The license covers one account. Contact us for multi-account pricing.' },
    ],
  },

  'wf-ai-assistant': {
    slug: 'wf-ai-assistant',
    emoji: '💬',
    badge: 'AI Software',
    badgeVariant: 'green',
    cat: 'ai',
    bg: '#07070f',
    name: 'WF AI Assistant',
    tagline: 'A smart chatbot you embed on any website — trained on your content, live in minutes.',
    price: 199,
    accentColor: 'var(--green)',
    productDesc: 'Intelligent chatbot for websites & apps.',

    intro: `Your website gets visitors at 2am. Your inbox fills up with the same 10 questions every week. Your support team spends hours on things that could be automated.

The WF AI Assistant fixes all of that. A fully customisable AI chatbot you embed on any website with a single script tag — trained on your FAQs, product info, or documentation, ready to handle customer questions around the clock.`,

    howItWorks: [
      { step:'01', title:'Train it on your content', desc:'Upload your FAQs, product descriptions, pricing, or any text document. The assistant learns from your content — not generic internet data.' },
      { step:'02', title:'Embed on your site', desc:"Copy one script tag into your website's HTML. The chat widget appears instantly — works on WordPress, Wix, Shopify, or any custom-built site." },
      { step:'03', title:'Handles conversations automatically', desc:'Visitors ask questions. The assistant responds in seconds with accurate answers. It qualifies leads and books appointments too.' },
      { step:'04', title:'Review from your dashboard', desc:'Read full chat histories, see what questions are being asked most, export conversations, and update the training content anytime.' },
    ],

    features: [
      'Embed on any website with one script tag',
      'Train on your own FAQs, docs, or product info',
      'Handles support, lead capture, and appointment booking',
      'Responds in English, Swahili, French, and 7 other languages',
      'Full chat history dashboard and CSV export',
      'Customisable widget colours and branding',
      'Works on WordPress, Shopify, Wix, and custom sites',
      '30 days post-purchase support included',
    ],

    specs: [
      ['Deployment', 'Single script tag embed'],
      ['Languages', '10+ including Swahili & French'],
      ['Response time', 'Under 2 seconds'],
      ['Training data', 'Your own documents & FAQs'],
      ['Dashboard', 'Web-based, included'],
      ['License type', 'Single site, lifetime'],
    ],

    faq: [
      { q:'Does it work on my WordPress site?', a:"Yes. Paste the script tag into your theme's footer or use a plugin like 'Insert Headers and Footers'. Works on any platform." },
      { q:'How do I train it on my content?', a:'After purchase you get access to the dashboard where you can paste text, upload documents, or link to your FAQ page. Training takes a few minutes.' },
      { q:'Can it book appointments?', a:'Yes — it can collect contact details and forward them to you, or integrate with Calendly if you have a booking link.' },
      { q:"What if it doesn't know the answer?", a:"It politely says it doesn't know and offers to connect with a human — you get an email notification." },
    ],
  },

  'business-landing-page': {
    slug: 'business-landing-page',
    emoji: '🌐',
    badge: 'Website Template',
    badgeVariant: 'muted',
    cat: 'web',
    bg: '#07070d',
    name: 'Business Landing Page',
    tagline: 'A professional dark-mode landing page with M-Pesa & PayPal built in — ready to deploy.',
    price: 299,
    accentColor: 'var(--white2)',
    productDesc: 'Node.js + EJS landing page. Dark mode, contact form, M-Pesa/PayPal ready.',

    intro: `A landing page that actually converts. Built with Node.js and EJS, this template gives you a production-ready business website with a dark, premium look — contact form, payment integration, and clean responsive design.

No page builder, no drag-and-drop bloat. Just clean code you fully own and customise.`,

    howItWorks: [
      { step:'01', title:'Download & install', desc:'Unzip the template, run npm install, and you have a working site locally in under 2 minutes.' },
      { step:'02', title:'Customise your content', desc:'Edit the EJS templates to add your business name, services, pricing, and branding. CSS variables let you change the entire colour scheme in one place.' },
      { step:'03', title:'Connect payments', desc:'Add your M-Pesa Paybill credentials and PayPal client ID to the .env file. Both payment flows are already wired — STK Push for M-Pesa, redirect for PayPal.' },
      { step:'04', title:'Deploy', desc:'Deploy to Render, Railway, or any Node.js host. The included guide walks through each option step by step.' },
    ],

    features: [
      'Built with Node.js + Express + EJS',
      'Dark mode design with CSS variable theming',
      'M-Pesa STK Push integration (Safaricom Daraja API)',
      'PayPal payment redirect integration',
      'Contact form with email notification',
      'Fully responsive — mobile, tablet, desktop',
      'Clean, well-commented code',
      'Deploy guide for Render and Railway included',
    ],

    specs: [
      ['Stack', 'Node.js, Express, EJS'],
      ['Payments', 'M-Pesa STK Push, PayPal'],
      ['Styling', 'Vanilla CSS with variables'],
      ['Deployment', 'Render, Railway, any Node host'],
      ['License', 'Single project, lifetime'],
      ['Support', '30 days included'],
    ],

    faq: [
      { q:'Do I need to know Node.js?', a:'Basic knowledge helps, but the setup guide is detailed enough for beginners. Support is included for 30 days if you get stuck.' },
      { q:'Can I use this for a client project?', a:'The license covers one project. Contact us for agency/multi-project pricing.' },
      { q:'Is M-Pesa live or sandbox?', a:'The code supports both. Switch between sandbox and live by changing one variable in your .env file.' },
    ],
  },

  'ecommerce-store': {
    slug: 'ecommerce-store',
    emoji: '🛍️',
    badge: 'Website Template',
    badgeVariant: 'muted',
    cat: 'web',
    bg: '#070a07',
    name: 'E-commerce Store',
    tagline: 'A full online store with cart, checkout, M-Pesa & PayPal — ready to sell.',
    price: 449,
    accentColor: 'var(--white2)',
    productDesc: 'Full online store with cart, checkout, M-Pesa & PayPal integration.',

    intro: `Everything you need to start selling online — built for African markets. A complete e-commerce store with product listings, working cart, checkout flow, and both M-Pesa and PayPal payment processing.

No Shopify fees, no platform lock-in. You own the code, you own the store.`,

    howItWorks: [
      { step:'01', title:'Add your products', desc:'Edit the products data file to add your items — name, price, description, and image. No database required for small catalogues; MongoDB is supported for larger ones.' },
      { step:'02', title:'Configure payments', desc:'Add your M-Pesa and PayPal credentials to the .env file. Customers can pay with M-Pesa STK Push or PayPal from the checkout page.' },
      { step:'03', title:'Customise branding', desc:'Update your logo, colours, and store name. The CSS variable system means a full rebrand takes minutes.' },
      { step:'04', title:'Deploy and start selling', desc:'Deploy to Render or Railway. Share your store link and start taking orders. Order notifications come to your email automatically.' },
    ],

    features: [
      'Product listing page with search and filter',
      'Shopping cart with quantity management',
      'Checkout flow with order summary',
      'M-Pesa STK Push payment integration',
      'PayPal payment integration',
      'Order confirmation emails',
      'Admin order view (basic)',
      'Fully responsive design',
    ],

    specs: [
      ['Stack', 'Node.js, Express, EJS'],
      ['Database', 'JSON (small) / MongoDB (large)'],
      ['Payments', 'M-Pesa STK Push, PayPal'],
      ['Deployment', 'Render, Railway, any Node host'],
      ['License', 'Single store, lifetime'],
      ['Support', '30 days included'],
    ],

    faq: [
      { q:'How many products can it handle?', a:'The JSON-based setup handles up to ~100 products well. For larger catalogues, switch to the MongoDB option included in the package.' },
      { q:'Does it handle shipping?', a:'The order form collects the delivery address and you fulfil manually. Custom shipping logic can be added as a custom project.' },
    ],
  },

  'react-native-starter': {
    slug: 'react-native-starter',
    emoji: '📱',
    badge: 'Mobile App',
    badgeVariant: 'muted',
    cat: 'mob',
    bg: '#08060f',
    name: 'React Native Starter Kit',
    tagline: 'A cross-platform mobile app foundation — auth, Firebase, push notifications, app store ready.',
    price: 499,
    accentColor: 'var(--ai2)',
    productDesc: 'Cross-platform mobile app: auth, Firebase, push notifications, app store ready.',

    intro: `Starting a mobile app from scratch means weeks of boilerplate — authentication, navigation, push notifications, state management, and Firebase setup.

This starter kit handles all of that. Start with a production-ready foundation and build your actual features from day one.`,

    howItWorks: [
      { step:'01', title:'Clone and install', desc:'Clone the repo, run npm install, add your Firebase config, and the app runs on your emulator or device immediately.' },
      { step:'02', title:'Configure Firebase', desc:'Add your Firebase project credentials. Auth (email/password + Google), Firestore database, and push notifications are already wired up.' },
      { step:'03', title:'Build your screens', desc:'The navigation structure, reusable components, and theme system are in place. Add your own screens on top of the existing foundation.' },
      { step:'04', title:'Submit to app stores', desc:"The kit includes an Expo build guide for both iOS App Store and Google Play." },
    ],

    features: [
      'Built with React Native + Expo',
      'Firebase Auth — email/password and Google Sign-In',
      'Firestore database integration',
      'Push notifications (Expo Notifications)',
      'React Navigation — stack, tab, and drawer navigators',
      'Global state management with Context API',
      'Reusable component library included',
      'Light and dark mode support',
      'App Store & Play Store submission guide',
    ],

    specs: [
      ['Framework', 'React Native + Expo'],
      ['Auth', 'Firebase Auth'],
      ['Database', 'Firebase Firestore'],
      ['Notifications', 'Expo Push Notifications'],
      ['Platforms', 'iOS & Android'],
      ['License', 'Single app, lifetime'],
    ],

    faq: [
      { q:'Do I need a Mac to build for iOS?', a:"With Expo's EAS Build service you can build for iOS from any operating system — no Mac required." },
      { q:'Is Firebase free?', a:'Firebase has a generous free tier (Spark plan) that covers most small to medium apps. You only pay when you scale.' },
    ],
  },

  'dashboard-ui-kit': {
    slug: 'dashboard-ui-kit',
    emoji: '🎨',
    badge: 'UI Kit',
    badgeVariant: 'muted',
    cat: 'ui',
    bg: '#0a060d',
    name: 'Dashboard UI Kit',
    tagline: '80+ Figma screens for SaaS products — auto-layout, variables, light & dark mode.',
    price: 349,
    accentColor: 'var(--amber)',
    productDesc: '80+ Figma screens for SaaS. Auto-layout, variables, light & dark mode.',

    intro: `Designing a SaaS dashboard from scratch is slow. This Figma kit gives you 80+ ready-made screens — analytics, tables, user management, settings, onboarding, and more.

Built with auto-layout and Figma variables so everything resizes and rebrands instantly. Hand it to a developer or use it as the foundation for your own design system.`,

    howItWorks: [
      { step:'01', title:'Duplicate to your Figma', desc:'After purchase you receive a Figma file link. Duplicate it to your workspace and you have immediate access to all 80+ screens.' },
      { step:'02', title:'Set your brand colours', desc:'Update the Figma colour variables with your brand palette. Every component updates instantly across all screens.' },
      { step:'03', title:'Pick your screens', desc:'Choose the screens you need, copy them into your project file, and customise the content. All components use auto-layout so resizing is clean.' },
      { step:'04', title:'Hand off to developers', desc:"Use Figma's Dev Mode to share specs with your developers. Every component is properly named and organised for clean handoff." },
    ],

    features: [
      '80+ screens covering all core SaaS flows',
      'Auto-layout throughout — everything resizes cleanly',
      'Figma variables for one-click rebranding',
      'Light mode and dark mode for every screen',
      'Analytics, tables, forms, modals, settings',
      'Onboarding and auth screens included',
      'Mobile versions of key screens included',
      'Component library with 200+ elements',
    ],

    specs: [
      ['Tool', 'Figma'],
      ['Screens', '80+'],
      ['Components', '200+'],
      ['Modes', 'Light & Dark'],
      ['Auto-layout', 'Yes, throughout'],
      ['License', 'Single project, lifetime'],
    ],

    faq: [
      { q:'Do I need a paid Figma plan?', a:'The free plan lets you view and edit. Figma variables require the Professional plan ($15/month).' },
      { q:'Can I use this for a client project?', a:'Yes — the license allows use in one client project. Contact us for agency licensing.' },
    ],
  },

  'saas-boilerplate': {
    slug: 'saas-boilerplate',
    emoji: '🚀',
    badge: 'SaaS',
    badgeVariant: 'ai',
    cat: 'saas',
    bg: '#06080f',
    name: 'SaaS Boilerplate',
    tagline: 'A full-stack SaaS foundation — auth, billing, admin, API, and deployment guide included.',
    price: 599,
    accentColor: 'var(--ai2)',
    productDesc: 'Full-stack boilerplate: auth, billing, admin panel, API & deploy guide.',

    intro: `Building a SaaS from scratch takes months before you even get to your actual product. This boilerplate gives you everything every SaaS needs — authentication, subscription billing, admin dashboard, REST API, and complete deployment setup.

Start building your features on day one instead of month three.`,

    howItWorks: [
      { step:'01', title:'Clone and configure', desc:'Clone the repo, fill in your .env variables (database URL, Stripe keys, email provider), and the full stack runs locally with one command.' },
      { step:'02', title:'Customise your plans', desc:'Edit the pricing config file to set your subscription tiers, feature limits, and Stripe price IDs. The billing flow handles everything else automatically.' },
      { step:'03', title:'Build your product features', desc:'Add your own API routes, pages, and business logic on top of the existing foundation. Auth, sessions, and user management are already handled.' },
      { step:'04', title:'Deploy to production', desc:'Follow the included deployment guide for Render (backend) and Vercel (frontend). Includes database setup, environment variables, and domain configuration.' },
    ],

    features: [
      'JWT authentication with refresh tokens',
      'Stripe subscription billing — monthly and annual plans',
      'Admin dashboard — user management, revenue overview',
      'REST API with rate limiting and validation',
      'Email system — welcome, password reset, receipts',
      'Role-based access control (user, admin, superadmin)',
      'PostgreSQL database with migrations',
      'React frontend with protected routes',
      'Full deployment guide for Render + Vercel',
    ],

    specs: [
      ['Backend', 'Node.js + Express'],
      ['Frontend', 'React'],
      ['Database', 'PostgreSQL'],
      ['Billing', 'Stripe'],
      ['Auth', 'JWT + refresh tokens'],
      ['License', 'Single product, lifetime'],
    ],

    faq: [
      { q:'Does this include M-Pesa billing?', a:'The current version uses Stripe. M-Pesa subscription billing can be added as a custom integration — contact us for a quote.' },
      { q:'Can I white-label this for clients?', a:'The license covers one product. Contact us for agency licensing.' },
      { q:'Is the code well documented?', a:'Yes — every module has inline comments and a full README walks through the architecture and how to extend each part.' },
    ],
  },

  'developer-portfolio': {
    slug: 'developer-portfolio',
    emoji: '✦',
    badge: 'Website Template',
    badgeVariant: 'muted',
    cat: 'web',
    bg: '#07070f',
    name: 'Developer Portfolio',
    tagline: 'An animated one-page portfolio for developers — responsive, fast to customise.',
    price: 199,
    accentColor: 'var(--white2)',
    productDesc: 'Animated one-page portfolio for developers. Responsive, fast to customize.',

    intro: `Your portfolio is your first impression. This template gives you a fast, animated, dark-mode portfolio that stands out — built with React and Framer Motion.

Smooth scroll animations, a projects section, skills display, and a working contact form. Ready to make yours in under an hour.`,

    howItWorks: [
      { step:'01', title:'Download and run', desc:'Unzip, run npm install && npm start, and your portfolio is live locally. No complex configuration needed.' },
      { step:'02', title:'Add your details', desc:"Edit the data.js config file with your name, bio, skills, and project links. No need to touch the component code." },
      { step:'03', title:'Add your projects', desc:'Add each project with a title, description, tech stack, and link. Screenshots are optional but supported.' },
      { step:'04', title:'Deploy for free', desc:"Deploy to Vercel — connect your GitHub repo and it's live. Free hosting, custom domain support." },
    ],

    features: [
      'Built with React + Framer Motion animations',
      'Smooth scroll-triggered reveal animations',
      'Projects section with tech stack tags',
      'Skills section with categorised display',
      'Working contact form',
      'Dark mode design',
      'Fully responsive — mobile to desktop',
      'One data.js file controls all content',
      'Deploy to Vercel for free',
    ],

    specs: [
      ['Stack', 'React + Framer Motion'],
      ['Hosting', 'Vercel (free tier)'],
      ['Customisation', 'Single data.js config file'],
      ['Animations', 'Scroll-triggered, hover states'],
      ['License', 'Single use, lifetime'],
      ['Support', '30 days included'],
    ],

    faq: [
      { q:'Can I use my own domain?', a:"Yes — Vercel supports custom domains for free. Point your domain's DNS to Vercel and it handles SSL automatically." },
      { q:'Does the contact form send emails?', a:"Yes — it uses EmailJS which has a free tier (200 emails/month). Setup instructions are included." },
    ],
  },

};

export function getProduct(slug) {
  return PRODUCTS_DATA[slug] || null;
}

export const ALL_PRODUCTS = Object.values(PRODUCTS_DATA);
