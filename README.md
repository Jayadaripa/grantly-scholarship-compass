
<div align="center">

# 🎓 GRANTLY
### Scholarship Compass

**Find Your Future. Fund Your Dreams.**

A student-first platform to discover scholarship opportunities, understand eligibility, and manage the scholarship application journey.

<br/>

[🌐 Live Demo](https://grantly-scholarship-compass.vercel.app/) ·
[💻 GitHub Repository](https://github.com/Jayadaripa/grantly-scholarship-compass)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel)

</div>

---

## 🌱 About the Project

Finding scholarships shouldn't feel like a scholarship of its own.

Students often have to search across multiple platforms, interpret eligibility requirements, and keep track of deadlines and application documents.

**GRANTLY — Scholarship Compass** aims to simplify this process by bringing scholarship discovery, eligibility insights, and application organization into one student-friendly platform.

The goal is to help students move from confusion to clarity and make educational opportunities easier to discover.

> Built for students. Designed to make opportunities easier to find.

## 🚀 Live Demo

Explore the deployed application:

### [🌐 Visit GRANTLY](https://grantly-scholarship-compass.vercel.app/)

## ✨ Key Features

### 🔎 Scholarship Discovery
Explore scholarship opportunities and discover relevant information in one place.

### 🎯 Personalized Scholarship Matching
Compare student profile details with scholarship eligibility criteria using a rule-based matching approach.

### 🧾 Eligibility Insights
Understand scholarship requirements and identify criteria that need further verification.

### 📌 Save Scholarships
Save interesting opportunities and revisit them later.

### 📊 Application Tracking
Organize scholarship applications and keep track of their progress.

### 📁 Document Checklist
Manage the documents required for scholarship applications.

### 🤖 GRANTLY AI Navigator
A scholarship-guide experience designed to help students explore scholarship-related questions.

### 📱 Responsive Interface
A clean and accessible interface designed for desktop, tablet, and mobile devices.

---

## 🖥️ Application Preview

<!-- Add your actual screenshots here after uploading them to GitHub -->

<!--
<p align="center">
  <img src="docs/screenshots/homepage.png" width="85%" alt="GRANTLY Homepage"/>
</p>

<p align="center">
  <img src="docs/screenshots/scholarship-matching.png" width="85%" alt="Scholarship Matching"/>
</p>
-->

> Screenshots of the landing page, scholarship matching interface, and dashboard can be added here to showcase the application visually.

---

## 🧭 How It Works

| Step | Description |
|---|---|
| 01 — Build Your Profile | Add your academic background and relevant student information. |
| 02 — Discover Opportunities | Explore scholarships based on your profile and preferences. |
| 03 — Understand Eligibility | Review requirements and identify potential matches. |
| 04 — Stay Organized | Save scholarships, track applications, and manage documents. |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Building reusable UI components |
| TypeScript | Type-safe application development |
| Vite | Development server and build tooling |
| Tailwind CSS | Responsive and consistent styling |
| React Router | Client-side navigation |
| Lucide React | Interface icons |
| LocalStorage | Browser-side persistence, where implemented |

---

## 📂 Project Structure

The following is a representative structure for the application. Update the paths to match the exact files and folders in your repository.

```text
grantly-scholarship-compass/
│
├── public/
│   └── assets/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── pages/
│   │   └── Application pages
│   │
│   ├── data/
│   │   └── Scholarship data
│   │
│   ├── utils/
│   │   └── Helper functions
│   │
│   ├── scholarships.ts
│   ├── store.ts
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Architecture Overview

- **UI Components:** Reusable elements for a consistent interface.
- **Scholarship Data:** Scholarship information and eligibility criteria.
- **Application State:** Student profile and related application data.
- **Matching Logic:** Compares scholarship criteria with student information.
- **Routing:** Manages navigation between application pages.

---

## 🧠 Scholarship Matching Logic

One of GRANTLY's core features is its scholarship matching functionality.

The matching system evaluates scholarship criteria against the available student profile information.

Possible evaluation criteria include:

- Education level
- Academic performance
- Course or stream
- Financial eligibility
- Domicile requirements
- Scholarship category

The system can classify criteria into:

| Status | Meaning |
|---|---|
| ✅ Met | The available profile information satisfies the criterion. |
| ⚠️ Verify | Additional information or verification is needed. |
| ❌ Fail | The available information does not satisfy the criterion. |

The matching percentage helps students understand how closely an opportunity aligns with their profile.

**Important:** A match percentage is not a probability of winning a scholarship and does not guarantee eligibility or selection.

---

## ⚙️ Getting Started

Follow these steps to run GRANTLY locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Jayadaripa/grantly-scholarship-compass.git

# Navigate to the project directory
cd grantly-scholarship-compass

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL displayed in your terminal.

Usually:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

GRANTLY is deployed using Vercel.

The application can be accessed here:

**[https://grantly-scholarship-compass.vercel.app/](https://grantly-scholarship-compass.vercel.app/)**

To deploy your own version:

1. Fork or clone the repository.
2. Import the repository into Vercel.
3. Configure the project build settings if required.
4. Deploy the application.

For a standard Vite application, the build command is:

```bash
npm run build
```

The default output directory is:

```text
dist
```

---

## 🔮 Future Improvements

Potential improvements for future versions:

- [ ] Integrate verified scholarship data sources.
- [ ] Implement secure backend authentication.
- [ ] Expand scholarship eligibility matching.
- [ ] Add scholarship deadline reminders.
- [ ] Support secure document storage.
- [ ] Integrate a live AI assistant.
- [ ] Improve accessibility and usability.
- [ ] Add personalized scholarship recommendations.

---

## 🧪 Project Disclaimer

GRANTLY is a hackathon frontend prototype.

- Some scholarship listings may contain sample or demonstration data.
- Scholarship details should be verified with official providers.
- Eligibility matching does not guarantee scholarship selection.
- Demo AI responses do not necessarily indicate a live AI integration.
- Browser-based persistence is not a secure server-side storage solution.
- Official scholarship websites should be used for final application submission.

---

## 💚 The Vision Behind GRANTLY

> Finding financial assistance for education should not be complicated.

GRANTLY aims to make scholarship discovery more approachable by helping students find opportunities, understand eligibility, and organize their application journey in one place.

The vision is simple:

**Make opportunities easier to find. Make the scholarship journey easier to manage.**

---

## 👩‍💻 Author

**Jaya Daripa**

Built as a hackathon project with the goal of making scholarship opportunities more accessible and easier to discover for students.

---

<div align="center">

### ⭐ If you find GRANTLY interesting, consider giving the repository a star!

**[Explore GRANTLY →](https://grantly-scholarship-compass.vercel.app/)**

</div>
