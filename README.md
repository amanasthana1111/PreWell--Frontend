# Folify - AI Career Preparation Frontend

Folify is a React + Vite frontend for an AI-powered career preparation platform. It helps users scan resumes for ATS readiness, generate interview questions, compare resumes, view resume rankings, and create downloadable portfolio websites from PDF resumes.

## Features

- ATS resume scanner
  - PDF resume upload
  - ATS score, readability score, keyword match score, and section completeness score
  - Resume summary, primary stack, missing sections, matched keywords, missing keywords, final verdict, and improvement suggestions
  - Subscription fallback when the free limit is reached

- AI interview preparation
  - Custom instruction input
  - Difficulty selection: easy, medium, hard
  - Question count selection: 10, 20, or 30
  - User answer collection
  - Interview report generation with overall score, verdict, and English level

- Portfolio builder
  - PDF resume upload
  - AI-generated portfolio website preview
  - Supports generated HTML, CSS, JavaScript, or file-list responses
  - Download generated source code as `folify-portfolio.zip`

- Resume comparer
  - Upload two PDF resumes
  - Optional job description input
  - AI comparison for ATS score, strengths, weaknesses, recommendations, and stronger resume

- Resume leaderboard
  - Authenticated leaderboard page
  - Ranks users by best ATS score
  - Shows user profile type, skills, scan count, and score
  - Uses demo fallback rows if the leaderboard backend is unavailable

- Authentication and account flow
  - Signup and login pages
  - Cookie-based auth checks with `withCredentials: true`
  - Auth context provider
  - Auth-gated feature routes
  - Logout flow

- Subscription and payment flow
  - Starter, Pro, and Premium plans
  - Math challenge verification before activating a plan
  - Redirect handling when payment page is opened without selected plan state

- UI and navigation
  - Responsive Tailwind CSS interface
  - Navbar, banner, footer, loading states, and 404 page
  - Scroll-to-top behavior between routes
  - Background audio player component
  - Vercel SPA routing support

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4 with `@tailwindcss/vite`
- React Router DOM 7
- Axios
- JSZip
- File Saver
- React Audio Player
- React Icons
- Heroicons
- Recharts
- Styled Components
- ESLint

## Project Structure

```txt
vite-project/
|-- public/
|   |-- logo.png
|   `-- vite.svg
|-- src/
|   |-- assets/
|   |   `-- react.svg
|   |-- components/
|   |   `-- BeforeAuth/
|   |       |-- assets/
|   |       |   |-- Resumstoportfoilo.png
|   |       |   |-- a.png
|   |       |   |-- atsimg.png
|   |       |   |-- music.mp3
|   |       |   `-- video1.mp4
|   |       |-- context/
|   |       |   `-- userContext.jsx
|   |       |-- hooks/
|   |       |   `-- useAuth.jsx
|   |       |-- About.jsx
|   |       |-- Ats.jsx
|   |       |-- Banner.jsx
|   |       |-- BlurLoading.jsx
|   |       |-- Footer.jsx
|   |       |-- Home.jsx
|   |       |-- Home2.jsx
|   |       |-- HowItWork.jsx
|   |       |-- Interview.jsx
|   |       |-- InterviewForm.jsx
|   |       |-- Leaderboard.jsx
|   |       |-- Loader.jsx
|   |       |-- LoaderData.jsx
|   |       |-- Loading.jsx
|   |       |-- Login.jsx
|   |       |-- MyAccount.jsx
|   |       |-- Navbar.jsx
|   |       |-- NoPageFound.jsx
|   |       |-- PaymentPage.jsx
|   |       |-- Portfolio.jsx
|   |       |-- Profile.jsx
|   |       |-- Report.jsx
|   |       |-- ResumeComparer.jsx
|   |       |-- ScrollToTop.jsx
|   |       |-- SignUp.jsx
|   |       |-- Song.jsx
|   |       `-- Subscription.jsx
|   |-- App.css
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- eslint.config.js
|-- index.html
|-- package.json
|-- package-lock.json
|-- vercel.json
`-- vite.config.js
```

## Routes

| Route | Component | Access |
| --- | --- | --- |
| `/` | `Home` | Public |
| `/sign-up` | `SignUp` | Public |
| `/login` | `Login` | Public |
| `/about` | `About` | Public |
| `/how-it-works` | `HowItWork` | Public |
| `/contact` | `Profile` | Public |
| `/ats-resume-checker` | `Ats` | Auth required |
| `/interview-prep` | `Interview` | Auth required |
| `/portfolio-builder` | `Portfolio` | Auth required |
| `/resume-comparer` | `ResumeComparer` | Auth required |
| `/leaderboard` | `Leaderboard` | Auth required |
| `/my-account` | `MyAccount` | Auth required |
| `/subscription` | `Subscription` | Auth required |
| `/payment` | `PaymentPage` | Auth required through plan flow |
| `/report` | `Report` | Requires interview state |
| `*` | `NoPageFound` | Public |

## Backend Integrations

The frontend currently calls these hosted APIs:

| Purpose | Endpoint |
| --- | --- |
| Auth check | `GET https://folify.onrender.com/api/auth` |
| Login | `POST https://folify.onrender.com/api/login` |
| Signup | `POST https://folify.onrender.com/api/register` |
| Logout | `GET https://folify.onrender.com/api/logout` |
| Upload resume | `POST https://folify.onrender.com/resumes/upload` |
| ATS scanner | `GET https://folify.onrender.com/start/atsScanner` |
| Interview questions | `POST https://folify.onrender.com/start/interview` |
| Interview report | `POST https://folify.onrender.com/api/google` |
| Buy plan | `POST https://folify.onrender.com/user/buy` |
| Compare resumes | `POST https://folify.onrender.com/resumes/compare` |
| Leaderboard | `GET https://folify.onrender.com/resumes/leaderboard` |
| Portfolio generator | `POST https://prewell-backend-2.onrender.com/resumes/generate-website` |

Auth-related requests use cookies with `withCredentials: true`, so the backend must allow credentialed CORS and set cookies correctly.

## Installation

```bash
git clone https://github.com/amanasthana1111/PreWell--Frontend
cd PreWell--Frontend/vite-project
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Deployment

The app is configured for Vercel. `vercel.json` rewrites all routes to `/` so React Router can handle SPA routes after refresh.

## Notes

- The app currently uses hosted backend URLs directly in components.
- PDF uploads are validated on the frontend before requests are sent.
- Protected feature pages use `useUserAuth`, which redirects unauthenticated users to `/login`.
- `AuthProvider` wraps the app in `main.jsx` and stores auth state in React context.
- Portfolio downloads are generated in the browser with JSZip and File Saver.

## Author

Aman Asthana

## License

This project is licensed under the MIT License.
