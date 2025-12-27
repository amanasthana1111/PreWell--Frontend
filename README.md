
# 🌟 Folify – AI Career Preparation Platform

Folify is a full-stack AI-powered career preparation platform that helps users become job-ready by combining **ATS resume scanning**, **AI interview preparation**, and **AI-generated portfolio websites** in one place.

---

## 🚀 Features

- ✅ **ATS Resume Scanner**
  - Resume score analysis
  - Keyword matching & missing keyword detection
  - Section completeness & readability scoring
  - Actionable AI feedback

- ✅ **AI Interview Preparation**
  - Resume-based interview questions
  - Mock interview practice

- ✅ **AI Portfolio Website Generator**
  - Convert resume into a professional portfolio website

- ✅ **Subscription System**
  - Free & paid plans
  - Usage-based access control
  - Math-based verification before payment

- ✅ **Authentication**
  - Login / Signup
  - Protected routes
  - Cookie-based authentication

- ✅ **Responsive UI**
  - Folify custom theme
  - Tailwind CSS styling
  - Clean SaaS-style design

---

## 🛠 Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**

### Backend (connected)
- **Node.js**
- **Express.js**
- **MongoDB**
- **Redis**
- **JWT Authentication**
- **Zod Validation**
- **AI APIs (ATS & Interview logic)**

---

## 📂 Project Folder Structure

```txt
folify/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   └── BeforeAuth/
│   │       ├── assets/
│   │       │   ├── Resumstoportfoilo.png
│   │       │   └── atsimag.png
│   │       │
│   │       ├── context/
│   │       │   └── userContext.jsx
│   │       │
│   │       ├── hooks/
│   │       │   └── useAuth.jsx
│   │       │
│   │       ├── About.jsx
│   │       ├── Ats.jsx
│   │       ├── Banner.jsx
│   │       ├── BlurLoading.jsx
│   │       ├── Footer.jsx
│   │       ├── Home.jsx
│   │       ├── Home2.jsx
│   │       ├── HowItWork.jsx
│   │       ├── Interview.jsx
│   │       ├── Loading.jsx
│   │       ├── Login.jsx
│   │       ├── MyAccount.jsx
│   │       ├── Navbar.jsx
│   │       ├── NoPageFound.jsx
│   │       ├── PaymentPage.jsx
│   │       ├── Portfolio.jsx
│   │       ├── Profile.jsx
│   │       ├── SignUp.jsx
│   │       └── Subscription.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── vite.config.js
````

---

## 🔐 Authentication Flow

* User logs in / signs up
* Auth state stored using `userContext`
* Protected routes use `useAuth` hook
* Backend validates session via cookies

---

## 💳 Subscription & Payment Flow

1. User selects a plan:

   * **$10 → 1 access**
   * **$20 → 2 accesses**
   * **$30 → 3 accesses**
2. Redirect to payment page
3. User solves a math challenge (anti-bot verification)
4. Backend validates:

   * Numbers
   * Sum
   * Plan amount
5. Access is granted based on plan

---

## 🧠 ATS Scanner Logic (High Level)

* Resume uploaded by user
* AI analyzes:

  * Keywords
  * Sections
  * Readability
  * Structure
* Frontend displays:

  * Scores
  * Matched / missing keywords
  * Improvement suggestions

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/amanasthana1111/PreWell--Frontend

```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start development server

```bash
npm run dev
```

---

## 🌍 Deployment

* Frontend deployed on **Vercel**
* Backend hosted separately
* `vercel.json` handles SPA routing

---

## 📌 Environment Notes

* Uses `withCredentials: true` for auth
* Backend must allow CORS with credentials
* Cookies set as `httpOnly`, `secure`, `sameSite=None`

---

## 🧪 Validation & Error Handling

* **Zod** used for strict backend validation
* Frontend normalizes data before API calls
* Safe rendering to avoid React object-rendering errors

---

## 📈 Future Enhancements

* Stripe / Razorpay integration
* Resume vs Job Description comparison
* ATS score history
* Admin dashboard
* Download ATS report (PDF)
* Dark mode

---

## 👨‍💻 Author

**Aman Asthana**
Made with ❤️ for building job-ready careers using AI.

---

## 📄 License

This project is licensed under the **MIT License**.

```

---

If you want, I can also:
- ✨ Add badges (Vercel, React, Tailwind)
- 📸 Add screenshots section
- 🧠 Rewrite README for recruiters
- 🌍 Make it open-source ready

Just say **next** 👍
```
