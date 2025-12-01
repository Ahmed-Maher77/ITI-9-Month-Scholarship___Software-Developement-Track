# Git Tasks Solutions

# Task 1: Install Git, Create Repos, Push File

## 1. Install Git
- Download Git from the official website:  
  https://git-scm.com/downloads
- Install with default settings.
- Verify installation:
```bash
git --version
```

## 2. Create a GitHub Account
- Go to https://github.com
- Sign up for a new account.

---

## 3. Create a New Local Repo and Remote Repo, Then Push a File

### Create a folder and initialize Git:
```bash
mkdir version-control-lab
cd version-control-lab
git init
```

### Create a file with your full name:
```bash
echo "Ahmed Maher Algohary" > name.txt
```

### Add and commit the file:
```bash
git add name.txt
git commit -m "Add name file"
```

### Create a new remote repo on GitHub:
- Go to GitHub → New **Repository** → Name: `my-repo` → Create.

### Add the remote repository:
```bash
git remote add origin https://github.com/Ahmed-Maher77/version-control-lab.git
```

### Push to GitHub:
```bash
git push -u origin main
```
*(If the default branch is `master`, use that instead.)*

---

# Task 2: Create Remote Repo, Clone It, Add Instructor as Contributor

### 1. Create a New Remote Repo
- Go to GitHub → **New Repository**
- Enter a repository name
- Click **Create Repository**

---

### 2. Clone the Repository
```bash
git https://github.com/Ahmed-Maher77/version-control-lab-cloning.git
cd version-control-lab-cloning
```

### 3. Add Instructor as a Contributor
- Open your repository on GitHub.
- Go to **Settings**.
- Select **Collaborators** (or **Collaborators and teams**).
- Click **Add people**.
- Enter the instructor’s GitHub username.
- Send the invitation.
