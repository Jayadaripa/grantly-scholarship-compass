# Grantly Scholarship Compass

GRANTLY — Unified Scholarship Discovery & Management Platform

Project Overview

Build a modern, premium, responsive web application called GRANTLY, a unified scholarship discovery and management platform designed to simplify the process of finding, understanding, and managing educational financial assistance.

Tagline

"Find Your Future. Fund Your Dreams."

Product Vision

GRANTLY helps students discover scholarships that match their academic background, understand eligibility requirements, organize application documents, and track scholarship applications from discovery to submission.

The platform should transform a complicated scholarship-search experience into a personalized, simple, and intuitive digital journey.

This is a hackathon project. The website should feel like a polished, production-quality SaaS product rather than a basic student project or a generic scholarship directory.

Prioritize excellent UI/UX, meaningful interactions, accessibility, and a cohesive visual identity.

1. DESIGN DIRECTION

Create a premium, modern, minimal, and trustworthy educational fintech-inspired interface.

The website should combine:

The clarity of a modern SaaS dashboard.

The warmth and accessibility of an education platform.

The precision of a fintech product.

The visual polish of a premium startup.

Avoid generic templates, excessive gradients, unnecessary animations, crowded layouts, and oversized empty sections.

Color Palette

Use the following design system consistently.

Primary colors:

Primary Emerald: #0F766E

Deep Forest Green: #134E4A

Accent Mint: #D1FAE5

Bright Emerald: #10B981

Background colors:

Main Background: #F8FAFC

Secondary Background: #F1F5F9

Card Background: #FFFFFF

Sidebar Background: #FFFFFF

Text colors:

Primary Text: #0F172A

Secondary Text: #64748B

Muted Text: #94A3B8

Border:

Default Border: #E2E8F0

Status colors:

Success: #16A34A

Warning: #F59E0B

Error: #EF4444

Information: #3B82F6

Use emerald green for primary buttons, selected navigation, progress indicators, match badges, and important actions.

Use soft green backgrounds for highlighted scholarship matches.

The overall interface should remain light, clean, and highly readable.

Typography

Use:

Primary font: Inter or Plus Jakarta Sans.

Headings: Semi-bold or bold.

Body: Regular.

Buttons: Medium or semi-bold.

Use a clear typography hierarchy with generous spacing.

UI Styling

Rounded cards: 16px–20px.

Buttons: 10px–12px radius.

Inputs: 10px–12px radius.

Subtle borders.

Very soft shadows.

Consistent spacing.

Clean icons from Lucide React.

Smooth, subtle hover transitions.

Small micro-interactions.

No excessive glassmorphism.

No unnecessary neon effects.

The interface must be fully responsive on desktop, tablet, and mobile.

2. TECH STACK

Build the frontend using:

React

Vite

JavaScript

Tailwind CSS

React Router

Lucide React

Framer Motion or Motion for subtle animations

Recharts for dashboard charts when useful

Use reusable React components.

Keep the code modular and maintainable.

Use a centralized mock-data file for scholarships.

Use LocalStorage to persist student profile information, saved scholarships, application statuses, and document checklist progress.

The frontend should work without requiring a backend.

Do not create fake authentication or pretend that real scholarship applications have been submitted.

Clearly distinguish demo functionality from real external scholarship application links.

3. BRAND IDENTITY

Create a unique GRANTLY logo.

The logo should combine:

A graduation cap or graduation-inspired symbol.

A subtle financial growth or opportunity concept.

A clean, minimal icon.

The word GRANTLY in bold typography.

The logo should look professional and recognizable.

Use the logo consistently in the landing page navbar, dashboard sidebar, and authentication screens.

Suggested brand treatment:

GRANTLY

"Your scholarship companion."

4. LANDING PAGE

Create a visually impressive landing page that immediately explains the value of GRANTLY.

Navbar

Include:

GRANTLY logo.

Home.

Explore Scholarships.

How It Works.

About.

Sign In.

Get Started button.

Navbar should be sticky and have a subtle border or shadow.

Hero Section

Headline:

"Your Future Deserves Every Opportunity."

Supporting text:

"Discover scholarships that match your ambitions. Understand your eligibility, organize your applications, and take the next step toward your education."

Primary CTA:
"Find My Scholarships"

Secondary CTA:
"Explore Opportunities"

Include a premium dashboard preview on the right side of the hero.

The dashboard preview should show:

Scholarship match cards.

Upcoming deadlines.

A match percentage.

A small application progress indicator.

Use a subtle emerald gradient accent behind the dashboard preview.

Avoid excessive decorative elements.

The hero should communicate the product immediately.

Trust / Value Section

Display three concise value propositions:

Personalized Discovery
Find scholarships based on your academic profile.

Clear Eligibility
Understand requirements before applying.

Application Management
Keep track of documents, deadlines, and progress.

How It Works

Create a visually appealing three-step section:

Step 1: Build Your Profile
Tell GRANTLY about your education, academic background, and interests.

Step 2: Discover Your Matches
Explore scholarships that fit your profile.

Step 3: Manage Your Applications
Save opportunities, prepare documents, and track progress.

Featured Scholarships

Show 3–4 scholarship cards.

Each card should display:

Scholarship name.

Provider.

Scholarship amount.

Education level.

Category.

Application deadline.

Match badge.

View Details button.

Use sample scholarship data and clearly label demo opportunities.

Feature Showcase

Highlight:

Personalized scholarship matching.

Scholarship eligibility analysis.

Application tracking.

Document checklist.

Deadline management.

AI Scholarship Navigator.

Use a visually appealing layout with icons and subtle illustrations.

CTA Section

Headline:

"Your Next Opportunity Starts Here."

Supporting text:

"Create your profile and discover scholarships that could help fund your education."

CTA:
"Get Started — It's Free"

Footer

Include:

Logo.

Short description.

Product links.

Explore Scholarships.

About.

Contact.

Privacy Policy.

Terms of Service.

5. STUDENT ONBOARDING

Create a multi-step onboarding experience.

The design should be clean, simple, and welcoming.

Include a progress indicator showing the current step.

Step 1 — Basic Information

Fields:

Full Name.

Email.

Date of Birth.

State.

City.

Step 2 — Academic Information

Fields:

Current Education Level.

Institution Name.

Course / Stream.

Academic Year.

Percentage or CGPA.

Graduation Year.

Education level options:

Class 10.

Class 12.

Diploma.

Undergraduate.

Postgraduate.

PhD.

Step 3 — Scholarship Preferences

Fields:

Merit-based.

Need-based.

Government Scholarships.

Private Scholarships.

STEM Scholarships.

Women in Education.

Study Abroad.

Allow multiple selections.

Step 4 — Financial Information

Fields:

Annual Family Income Range.

Income Certificate Availability.

Additional Eligibility Information.

Only request sensitive information when necessary.

Include an explanation of why each important field is collected.

Completion Screen

Display:

"Your scholarship journey starts now."

Show a summary of the profile and a button:

"Discover My Scholarships"

Save the profile in LocalStorage.

6. STUDENT DASHBOARD

This is the most important page of the application.

Create a polished, premium dashboard layout.

Sidebar

Include:

Dashboard.

Explore Scholarships.

My Applications.

Saved Scholarships.

Documents.

AI Navigator.

Profile.

Settings.

The active navigation item should have a subtle emerald background and icon.

Top Navigation

Include:

Search.

Notification icon.

Student profile avatar.

Dropdown menu.

Welcome Section

Display:

"Welcome back, [Student Name]!"

Supporting text:

"Let's find opportunities that match your ambitions."

Include a prominent button:

"Explore Scholarships"

Summary Cards

Create four cards:

Matching Scholarships.

Saved Scholarships.

Applications in Progress.

Upcoming Deadlines.

Each card should contain:

A relevant icon.

A number.

A short label.

A subtle background color.

Optional trend or supporting text.

Use dynamic data where possible.

Scholarship Recommendations

Display personalized scholarship cards.

Each card should include:

Scholarship name.

Provider.

Amount.

Deadline.

Education level.

Category.

Match percentage.

Eligibility summary.

Save button.

View Details button.

Use a clean grid layout.

Upcoming Deadlines

Display scholarships sorted by their upcoming deadlines.

Use subtle urgency indicators:

Due Soon.

Upcoming.

Deadline Passed.

Do not use excessive red or alarming visuals.

Application Progress

Show application statuses:

Interested.

Preparing.

Applied.

Result Received.

Use a horizontal progress visualization or a clean status summary.

Profile Completion

Show a profile completion progress bar.

Example:

"Your profile is 80% complete."

Supporting text:

"Complete your profile to discover more relevant opportunities."

7. EXPLORE SCHOLARSHIPS PAGE

Create a dedicated scholarship discovery page.

Headline:

"Discover Scholarships That Fit You."

Include a prominent search bar.

Search should support:

Scholarship name.

Provider.

Course.

Category.

Filters

Create a clean filter sidebar or filter drawer.

Filters:

Education Level.

Scholarship Category.

Scholarship Amount.

Application Deadline.

Course / Stream.

Merit-based.

Need-based.

Government / Private.

Include:

Apply Filters.

Clear All.

Scholarship Cards

Each scholarship card should display:

Scholarship name.

Provider.

Amount.

Deadline.

Education level.

Category.

Match percentage.

Save icon.

View Details button.

Include sorting options:

Best Match.

Deadline.

Highest Amount.

Show the total number of scholarships.

Include meaningful empty states when no scholarships match the filters.

All search and filter functionality must work.

8. SCHOLARSHIP DETAILS PAGE

Create a detailed scholarship information page.

The layout should feel organized and easy to understand.

Header

Display:

Scholarship name.

Provider.

Scholarship amount.

Application deadline.

Category.

Match percentage.

Primary CTA:
"Apply Now"

Secondary CTA:
"Save Scholarship"

The Apply Now button should open the official application URL when available.

If no official URL exists, show a clearly labeled demo application flow.

Overview

Include:

Scholarship description.

Benefits.

Award amount.

Education level.

Number of awards, if known.

Funding duration, if known.

Eligibility Requirements

Show a checklist of requirements.

Examples:

Education level.

Course.

Minimum academic percentage.

Income requirements.

State or domicile requirements.

Other relevant conditions.

Show three possible eligibility statuses:

Requirement Met.

Needs Verification.

Not Eligible.

Never claim that a student is eligible when mandatory requirements have not been verified.

Required Documents

Create an interactive checklist.

Examples:

Academic Marksheets.

Identity Proof.

Income Certificate.

Institution ID.

Bank Details, if required.

Students should be able to mark documents as ready.

Persist checklist progress.

Application Timeline

Display:

Application Opens.

Application Deadline.

Result Announcement.

Only show dates when data is available.

9. MY APPLICATIONS PAGE

Create an application management dashboard.

Headline:

"Keep Every Opportunity on Track."

Include summary cards:

Total Applications.

Preparing.

Submitted.

Results Received.

Create application cards or a table with:

Scholarship Name.

Amount.

Deadline.

Application Status.

Last Updated.

View Details.

Allow students to update application status.

Statuses:

Interested.

Preparing.

Applied.

Result Received.

Not Selected.

Awarded.

Provide:

Search.

Status filters.

Sorting by deadline.

Include a clean empty state for students who have not saved any scholarships.

Persist application status in LocalStorage.

10. DOCUMENTS PAGE

Create a document management interface.

Display common document categories:

Academic Documents.

Identity Documents.

Income Documents.

Institution Documents.

Other Documents.

Each document card should include:

Document name.

Status.

Required for which scholarships.

Upload or Mark Ready action.

For this frontend prototype, document uploads can be simulated.

If actual file selection is implemented, clearly indicate that files are not securely stored on a server.

Do not pretend that documents have been uploaded to a real storage system.

11. AI SCHOLARSHIP NAVIGATOR

Create a modern conversational assistant called:

"GRANTLY AI"

Subtitle:

"Your personal scholarship guide."

The interface should feel like a premium AI assistant.

Include:

Chat interface.

Message bubbles.

Suggested prompts.

Input field.

Send button.

Loading indicator.

Clear conversation action.

Suggested prompts:

"Find scholarships for undergraduate students."

"What documents do I need?"

"Explain merit-based scholarships."

"Help me understand this scholarship's eligibility."

"Which scholarships have upcoming deadlines?"

The assistant should provide useful, structured answers.

If no AI API is connected, use a clearly identified demo assistant with predefined responses and scholarship data.

Do not falsely claim that an AI model is connected.

The assistant should not invent scholarship details or guarantee eligibility.

12. SCHOLARSHIP MATCH ENGINE

Create a personalized scholarship matching system.

The system should compare the student profile with scholarship requirements.

Matching criteria may include:

Education Level.

Course.

Academic Performance.

Financial Eligibility.

Location / Domicile.

Scholarship Category.

Other Eligibility Requirements.

Show a match percentage and explain why a scholarship matches the student.

Example:

"Why this matches you:

Your education level meets the requirement.

Your course is eligible.

Your academic performance meets the minimum requirement.

Income eligibility still needs verification."

Use a rule-based matching algorithm in JavaScript.

Do not treat a percentage as a guaranteed probability of winning a scholarship.

If mandatory information is missing, display "Potential Match" rather than "Eligible."

13. SAMPLE SCHOLARSHIP DATA

Create at least 12 sample scholarship entries.

Use realistic-looking but clearly labeled demo data.

Include:

Government Scholarships.

Merit Scholarships.

Need-based Scholarships.

STEM Scholarships.

Women in Education Scholarships.

Private Foundation Scholarships.

Each entry should contain:

Unique ID.

Scholarship Name.

Provider.

Description.

Amount.

Education Level.

Eligible Courses.

Minimum Academic Requirement.

Income Requirement, if applicable.

Domicile Requirement, if applicable.

Scholarship Category.

Required Documents.

Application Deadline.

Official Application URL, if available.

Eligibility Conditions.

Use realistic Indian education terminology and INR currency formatting.

Do not invent official URLs or present demo scholarships as verified real opportunities.

Clearly identify sample data as demonstration content.

14. FUNCTIONAL REQUIREMENTS

The website must not be a static mockup.

Implement the following:

Working React Router navigation.

Functional search.

Functional scholarship filters.

Working sorting.

Functional scholarship bookmarking.

Student profile creation.

Scholarship matching.

Scholarship detail navigation.

Application status updates.

Interactive document checklists.

LocalStorage persistence.

Responsive sidebar.

Responsive mobile navigation.

Form validation.

Loading states.

Empty states.

Error states.

Toast notifications.

Working CTA buttons.

Do not leave buttons that look functional but do nothing.

Use reusable components and consistent state management.

15. RESPONSIVE DESIGN

Desktop:

Full dashboard sidebar.

Multi-column scholarship grid.

Dashboard widgets.

Tablet:

Collapsible sidebar.

Two-column layouts where appropriate.

Mobile:

Compact navigation.

Single-column cards.

Mobile-friendly filters.

Readable typography.

Touch-friendly buttons.

Responsive forms.

Ensure there is no horizontal overflow.

16. FINAL QUALITY REQUIREMENTS

The final website should:

Look like a real startup product.

Have a consistent visual identity.

Be highly polished.

Be easy to navigate.

Use meaningful micro-interactions.

Have excellent spacing and typography.

Avoid generic AI-generated design patterns.

Avoid excessive gradients.

Avoid unnecessary illustrations.

Avoid lorem ipsum.

Use realistic sample content.

Include useful empty states.

Be accessible and keyboard-friendly.

Have functional navigation and interactions.

Be optimized for a hackathon presentation.

The most important screens are:

Landing Page.

Student Onboarding.

Student Dashboard.

Explore Scholarships.

Scholarship Details.

My Applications.

AI Scholarship Navigator.

Prioritize these screens over adding unnecessary features.

Final Product Goal

GRANTLY should feel like a platform that genuinely helps students move from confusion to clarity.

The experience should communicate:

"Finding financial assistance for your education should not be complicated. GRANTLY helps you discover opportunities, understand your eligibility, and manage your scholarship journey in one place."

Build the complete frontend with a polished, cohesive design and functional interactions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b051066a-08db-51fe-af03-2dae94582d66).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
