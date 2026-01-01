# Upskillr Project

A team-based web application built using **React (Vite)** and **Tailwind CSS**.  
This repository contains the frontend setup and project structure. Backend will be added later.

---

## 🚀 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Language:** JavaScript
- **Version Control:** Git & GitHub
- **Package Manager:** npm

---

## 📁 Project Structure

```text
frontend/
├─ src/
│  ├─ components/
│  ├─ assets/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ public/
├─ .env            # local only (not pushed)
├─ .env.example    # sample env file
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
└─ README.md
backend/
└─ README.md
README.md # this file
```

## 📥 How to Pull & Run the Project

Follow these steps to run the project locally.

### 1️⃣ Clone the Repository

```
git clone https://github.com/Madhu-Wala/Upskillr-project-repo.git
cd Upskillr-project-repo
```

### 2️⃣ Install Dependencies

```
cd frontend
npm install
```

Similarly for backend:

```
cd backend
npm install
```

This installs all required node modules.

### 3️⃣ Setup Environment Variables

Create a .env file in the project root (same level as package.json). This will be used in the project to store environment variables as and when required.

### ⚠️ IMPORTANT

Do NOT push .env files to GitHub

Use .env.example as a reference

### 4️⃣ Run the Development Server

```
cd frontend
npm run dev
```

### Open the URL shown in the terminal (usually):

```
http://localhost:5173
```

## 🔄 Daily Git Workflow (For Team Members)

Before starting work each day:

```
git pull origin main
```

After making changes:

```
git add .
git commit -m "Meaningful commit message by YOUR NAME"
git push
```

## 📌 Git Rules

- Do NOT commit .env files
- Do NOT push directly to main **Notify Team members working on project first**
- Keep commits small and meaningful
- Always pull before starting work

## 🛠 Development Guidelines

- Use reusable components
- Follow consistent naming conventions (ex. use of camelcase in namimg small functions)
- Use Tailwind utility classes only 
- Keep code readable and clean

## 📄 Environment Variables

All environment variables must start with VITE_. (for frontend)

.env

```
VITE_API_URL=http://localhost....
```

Example usage:

```
const apiUrl = import.meta.env.VITE_API_URL
```

## 📌 Quick Start Summary

### Clone → npm install → create .env → npm run dev

## Database Structure (Scehma Tab) : 

[Upskillr Plan](https://docs.google.com/document/d/1miNNdWp-rjMoEyrDmCoMTg3PLcWgIoJbDTyQ5ZU-_L0/edit?usp=sharing)

## Figma Prototype:

[Figma](https://www.figma.com/design/bfWu7QR509N2vF33pywHcf/UpSkiller?node-id=35-44&p=f&t=INEAQH7lplvSLnBk-0)
