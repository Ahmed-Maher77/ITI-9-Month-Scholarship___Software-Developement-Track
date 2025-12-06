# 🎓 Source Control (Git & GitHub) — ITI 9-Month Journey  
## Lesson 3: Starting Your First Git Project — Local & Remote Workflows

After learning how Git works internally, we moved on to the practical side every developer uses daily:
- How to create a Git project  
- How to link it with GitHub  
- How to work using both **local-first** and **GitHub-first** workflows  

These workflows form the foundation of clean, organized, and professional version control.

---

## 🛠 Step 1 — Setting Up Git on Your Machine

Before writing your first commit, Git must know who you are.  
This identity is attached to every commit — essential for collaboration and accountability.

### ✔ Configure your username
```bash
git config --global user.name "Ahmed Maher"
```

### ✔ Configure your email
```bash
git config --global user.email "ahmedmaheraljwhry057@gmail.com"
```

### ✔ Verify your configuration
```bash
git config --list
```

This ensures your contributions are properly recorded in any project you work on.

---

## 🧱 Step 2 — Creating a Repository (Two Main Workflows)

Git offers two primary workflows depending on where the project begins:

- Start locally, then push to GitHub  
- Start on GitHub, then clone locally  

Both workflows are widely used in real development environments.

---

## 🅰️ Workflow 1: Start Locally → Then Upload to GitHub

Use this workflow when your code already exists on your machine and you want to publish it to GitHub.

### 1️⃣ Initialize Git in your project
```bash
git init
```

### 2️⃣ Create a README file
```bash
echo "# Project Name" >> README.md
```

### 3️⃣ Stage and commit your files
```bash
git add .
git commit -m "Initial commit + added main files"
```

### 4️⃣ Connect your local repository to GitHub
```bash
git remote add origin <repo-link>
```

### 5️⃣ Push your project to the main branch
```bash
git push -u origin main
```

After the upstream branch is set, future pushes become simple:
```bash
git push
```

---

## 🅱️ Workflow 2: Create the Repository on GitHub → Then Clone Locally

This is the most common workflow in real-world teams, company projects, and collaborative environments.  
The repository starts on GitHub, then developers clone it locally to continue the work.

---

### 1️⃣ Create a New Repository on GitHub

When creating a repo on GitHub, you can optionally include:
- A `README.md`
- A `LICENSE`
- A `.gitignore` file

These files help document and structure your project right from the start.

---

### 2️⃣ Clone the Repository to Your Local Machine

Use the repository link provided by GitHub:

```bash
git clone <repo-link>
```

This downloads:

- The entire project files  
- The full commit history  
- All branches (when using `git fetch --all` or cloning with additional flags)  
- The `.git` directory that contains all internal Git objects and metadata  

Once the repository is cloned, you're ready to start working on your local copy while staying connected to the remote project on GitHub.

---

### 3️⃣ Move Into the Project Directory

After cloning, navigate into your newly downloaded repository:

```bash
cd repo-name
```

Now you are inside the working directory of your cloned project.

---

### 4️⃣ Add Your Project Files → Stage → Commit → Push

Once your files are added to the project folder, you can start tracking them.

**Stage your files:**
```bash
git add .   
```

**Commit your changes:**
```bash
git commit -m "Added project structure"
```

**Push to GitHub:**
```bash
git push -u origin main
```

The `-u` flag sets **upstream tracking**, so future pushes can be done simply using:
```bash
git push
```

---

## 📁 Bonus: README.md & Markdown Essentials

Your `README.md` is the face of your repository.
It tells other developers (and recruiters!) what your project is about.


### Common Markdown elements:

- # → H1 heading
- ## → H2 heading
- * item → Bullet list
- **bold text**
- *italic text*
- [text](link) → Clickable link
- Drag images into GitHub → Automatically embedded

A clean README makes your repository professional, readable, and more inviting.

---

## 🧪 Real-World Example

Creating a portfolio website:
1. Build your project locally
2. Add your HTML/CSS/JS files
3. Run:
    ```bash
    git init
    git add .
    git commit -m "Initial portfolio structure"
    git remote add origin <GitHub URL>
    git push -u origin main```

Your project goes from local → GitHub in just a few minutes.

---

## 🌱 Key Takeaways

- Git must know your name and email before creating commits
- Two major workflows:
    - Start locally → push to GitHub
    - Start on GitHub → clone locally
- `git init` creates a new local repository
- `git clone` downloads an existing repo
- Using `-u` sets the upstream branch for future pushes
- Commit early, commit often
- A professional README improves the quality of your repository

---

## 🙏 Special Thanks

Special thanks to<br/>
**[Eng. Nada Mostafa](https://www.linkedin.com/in/nada-mostafa-mohamed/)** <br/>

for her clear explanation and hands-on guidance throughout the Git & GitHub lessons.

And gratitude to<br/>
**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)**<br/>

for building a strong foundation in software engineering tools.

---

## 📌 Tags

`#ITINineMonth` `#SoftwareEngineering` `#Git` `#GitHub` `#VersionControl` `#GitBasics` `#DeveloperTools` `#Markdown` `#ProgrammingJourney` `#WebDevelopment` `#CleanCode` `#AhmedMaherJourney`