# 🤖 theslotbot

> Bespoke AI CRM & Workflow Automations for **Diagnostic Labs** and **Salons & Spas**.

[![Live Demo](https://img.shields.io/badge/Live-Demo-gold?style=for-the-badge&logo=vercel)](https://theslotbot.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Vercel-blue?style=for-the-badge&logo=postgresql)](https://vercel.com/docs/storage/vercel-postgres)

**theslotbot** is a premium, single-page Next.js web application built for an AI automation agency. It showcases tailored automated workflows, features an interactive ROI Calculator tailored to Indian businesses (using `₹`), and integrates a live database-backed lead generation form with automated email notification alerts.

[![Landing Page]](public/images/landingPage.png)

---

## ✨ Key Features

- **🌐 Niche Workflows Swapper**: Seamlessly toggles between custom workflow automation lists for **Diagnostic Labs** (scheduling, report delivery via WhatsApp/Email, Patient CRM) and **Salons & Spas** (no-show reduction, loyalty loops, upsells, staff sync).
- **🧮 Interactive ROI Calculator**: A real-time calculator that computes hours saved per week and extra revenue generated per month (in `₹`) based on custom inputs for daily appointments and manual booking minutes.

[![ROI Calculator]](public/images/ROICalc.png)

- **📝 Live Lead Capture Form**: Integrated with a serverless backend to automatically insert incoming leads into a database.
- **📧 Instant Email Notifications**: Dispatches a clean HTML email notification immediately to the administrator using **Resend** upon lead submission.
- **💎 Dark Glassmorphic Design**: A premium dark-mode user interface with subtle gold gradients, micro-animations, glow-orbs, and complete mobile responsiveness.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Database**: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (`@vercel/postgres` SDK)
- **Emails**: [Resend](https://resend.com/) (`resend` SDK)
- **Styling**: Vanilla CSS (Custom dark theme & glassmorphic system in `app/globals.css`)
- **Icons**: FontAwesome Web Fonts

---

## 📁 Directory Structure

```
theslotbot-next/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js      # Serverless function for DB insert & Email notification
│   ├── globals.css           # Premium dark/gold CSS theme & glassmorphism utilities
│   ├── layout.js             # HTML layout, FontAwesome & Font configuration
│   └── page.js               # Client component with core state, ROI calculator, & form
├── public/                   # Static assets & images
├── package.json              # Dependency manifests
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <your-repository-url>
cd theslotbot-next
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```env
# Vercel Postgres Connection (provided automatically when linking storage in Vercel)
POSTGRES_URL="your-postgres-url-here"

# Resend API Key (Create yours at https://resend.com)
RESEND_API_KEY="re_yourApiKey"

# Recipient Email for Lead Notifications
ADMIN_EMAIL="your-email@example.com"
```

> [!NOTE]
> During development or when using the **Resend Free Tier**, you can only send emails to the email address registered on your Resend account. Ensure `ADMIN_EMAIL` matches your Resend login email.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## ☁️ Deployment

This project is optimized for deployment on **Vercel** with integrated storage.

1. **Deploy to Vercel**: Push your project to a GitHub repository, import it into Vercel, and click **Deploy**.
2. **Connect Postgres**:
   - Go to your Vercel Project Dashboard.
   - Select **Storage** -> **Connect Database** -> **Create New Postgres**.
   - Connect it to your project. This will automatically populate the required `POSTGRES_URL` variables.
3. **Set Environment Variables**:
   - In your project's **Settings** -> **Environment Variables**, add:
     - `RESEND_API_KEY` (Your Resend API Key)
     - `ADMIN_EMAIL` (Your notification email)
4. **Redeploy**: Go to the **Deployments** tab and redeploy the latest commit so Vercel injects the newly configured environment variables.

> [!IMPORTANT]
> The database schema is self-initializing. On the first lead submission, the API route will automatically run `CREATE TABLE IF NOT EXISTS leads ...` if the table does not already exist in your Vercel Postgres instance.

---

## 👥 The Human Intelligence Behind the AI

We are a specialized team dedicated to building custom business automation systems:

| Team Member | Role | Focus |
| :--- | :--- | :--- |
| **Tashir Ahmed** | Automation Architect | Designing logic-driven workflows & eliminating bottlenecks. |
| **Sujal Kumar Jaiswal** | CRM Integration Lead | Connecting lab databases & salon software. |
| **Jagdish Singh** | Client Success Lead | Enhancing user adoption & maximizing ROI. |

---

## 🔗 Connect With Us

- **LinkedIn**: [theslotbot Company Page](https://www.linkedin.com/company/slotbot/?viewAsMember=true)
