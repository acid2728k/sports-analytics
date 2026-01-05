# GitHub Repository Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `sports-analytics`
3. Description: `Sports Analytics v. 0.1 - Sports statistics and probability analysis platform`
4. Choose **Private** or **Public** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, run these commands:

```bash
cd C:\Users\acid2\CURSOR-APPS\sports-analytics-app

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sports-analytics.git

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/sports-analytics.git
git push -u origin main
```

## Quick Setup Script

If your GitHub username is known, you can run:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/sports-analytics.git
git push -u origin main
```

---

**Note:** You'll need to authenticate with GitHub when pushing. You can use:
- Personal Access Token (recommended)
- GitHub CLI (`gh auth login`)
- SSH keys

