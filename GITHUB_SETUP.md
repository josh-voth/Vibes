# Get Your Vibes Project on GitHub

## 1. Install Git (if you haven’t)

- Download: https://git-scm.com/download/win  
- Run the installer (defaults are fine).  
- **Restart Cursor** (or your terminal) so it picks up Git.

---

## 2. Create a new repo on GitHub

1. Go to **https://github.com** and sign in.  
2. Click the **+** (top right) → **New repository**.  
3. **Repository name:** e.g. `vibes` or `oil-gas-vibes`.  
4. Choose **Public**.  
5. **Do not** check “Add a README” (you already have files).  
6. Click **Create repository**.

---

## 3. Push your project from your computer

Open **PowerShell** or **Command Prompt**, then:

```powershell
cd "c:\Users\vothjo\OneDrive - Continental Resources\Desktop\Cursor\Vibes"
```

Then run (replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name):

```powershell
git init
git add index.html styles.css app.js .gitignore
git commit -m "Initial commit: Oil & Gas Vibe Picker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

When it asks for credentials, use your GitHub username and a **Personal Access Token** (not your password).  
To create a token: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**. Give it “repo” scope.

---

## 4. (Optional) Put it live with GitHub Pages

1. On GitHub, open your repo.  
2. **Settings** → **Pages** (left sidebar).  
3. Under **Source**, choose **Deploy from a branch**.  
4. Branch: **main**, folder: **/ (root)** → **Save**.  
5. After a minute or two, your site will be at:  
   **https://YOUR_USERNAME.github.io/YOUR_REPO/**

Share that link to let others use your Vibes app.
