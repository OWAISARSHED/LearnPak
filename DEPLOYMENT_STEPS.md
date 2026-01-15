# LearnPak Vercel Deployment Guide 🚀

Follow these steps to deploy your **LearnPak** project to Vercel.

## Prerequisites

1.  A [Vercel Account](https://vercel.com).
2.  A [GitHub Account](https://github.com).
3.  Your MongoDB Atlas Connection String (Database URL).

---

## Part 1: Prepare Your Code (Already Done by AI) ✅

I have already added the necessary configuration files for you:
*   `backend/vercel.json`: Configure the backend API.
*   `frontend/vercel.json`: Configure the React frontend.
*   `frontend/.env`: Setup local environment variables.

**IMPORTANT:** I cannot access your GitHub account directly for security reasons. You must manually push the code.

### Step 0: Install Git (Required First!) ⚠️
It looks like you don't have Git installed yet.
1.  **Download Git:** Go to [git-scm.com/download/win](https://git-scm.com/download/win) and download the "64-bit Git for Windows Setup".
2.  **Install:** Run the installer. You can just keep clicking "Next" for all options.
3.  **Restart Terminal:** Configuration only takes effect after a restart. Close this terminal and open a new one.

### How to Upload to GitHub (Step-by-Step):

1.  **Create a Repository:** Go to [GitHub.com/new](https://github.com/new), name it `LearnPak`, and click **Create repository**.
2.  **Open Terminal:** Open a terminal in this project folder.
3.  **Run these commands** (copy and paste one by one):
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    git remote add origin https://github.com/OWAISARSHED/LearnPak.git
    git branch -M main
    git push -u origin main
    ```
4.  **Authenticate:** If asked, log in with your browser or GitHub token.

---

## Part 2: Deploy the Backend (API)

1.  Log in to Vercel and click **"Add New"** > **"Project"**.
2.  Import your **LearnPak** repository from GitHub.
3.  **Configure Project:**
    *   **Project Name:** `learnpak-api` (or similar)
    *   **Framework Preset:** Other
    *   **Root Directory:** Click "Edit" and select `backend`.
4.  **Environment Variables:**
    Expand the "Environment Variables" section and add:
    *   `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb+srv://...`)
    *   `JWT_SECRET`: A secure secret key (e.g., `mysecretkey123`).
    *   `PORT`: `5000` (Optional, Vercel handles this mostly).
5.  Click **Deploy**.
6.  **Copy URL:** Once deployed, copy your new backend URL (e.g., `https://learnpak-api.vercel.app`).

---

## Part 3: Deploy the Frontend (UI)

1.  Go back to the Vercel Dashboard.
2.  Click **"Add New"** > **"Project"**.
3.  Import the **SAME** LearnPak repository again.
4.  **Configure Project:**
    *   **Project Name:** `learnpak-web`
    *   **Framework Preset:** Vite
    *   **Root Directory:** Click "Edit" and select `frontend`.
5.  **Environment Variables:**
    *   `VITE_API_URL`: Paste your **Backend URL** from Part 2 (e.g., `https://learnpak-api.vercel.app`).
    *   **Note:** Do NOT add a trailing slash `/` at the end of the URL.
6.  Click **Deploy**.

---

## Part 4: Final Connection 🔌

1.  Go to your **Frontend** deployment on Vercel.
2.  Click the domain (e.g., `https://learnpak-web.vercel.app`).
3.  Try to Log In or Sign Up.
4.  If it works, congratulations! Your app is live! 🎉

### Troubleshooting
*   **White Screen?** Check the Console (F12) for errors. If it says "Network Error" or "CORS", you might need to update the `cors` settings in `backend/index.js` to allow your new frontend domain.
*   **Images not loading?** Local image uploads (`/uploads`) **WILL NOT WORK** seamlessly on Vercel because it's serverless (files are deleted after execution). For a production app, you need to set up **Cloudinary** or **AWS S3** for image storage.
