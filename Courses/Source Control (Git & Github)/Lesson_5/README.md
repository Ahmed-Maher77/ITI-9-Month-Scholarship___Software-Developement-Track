# 🎓 Git & GitHub — ITI 9-Month Journey  
## Lesson 5: Branching, Switching & Merging — The Power of Parallel Development

One of Git’s greatest strengths is the ability to work on multiple ideas safely and independently through **branches**.  
This lesson explains branching, switching, and merging — the core tools that make teamwork smooth, fast, and conflict-free.

If you’ve ever wondered how teams work on dozens of features at the same time…  
➡ **This is how.**

---

## 🌱 What Is a Branch?

A branch is simply a **separate timeline** of your project.  
You use it to work on new features, fix bugs, or experiment — *without affecting the main product*.

### ✔ Why branches are essential:
- You isolate changes  
- You avoid breaking the main codebase  
- You work faster without fear  
- You collaborate smoothly  
- You keep the repo organized  

👉 In real software teams, **every feature lives in its own branch**.

---

## 🏗 Creating & Switching Branches

### ➕ Create a new branch
```bash
git branch feature-login
```

### 🔀 Switch to that branch
```bash
git checkout feature-login
```

## Modern alternative:
```bash
git switch feature-login
```

## ⚡ Create and switch in one step
```bash
git checkout -b feature-login
```

## 📋 List all local branches
```bash
git branch
```

## 🛰 List remote branches
```bash
git branch -r
```

## ✏️ Rename the current branch
```bash
git branch -m new-name
```

---

## 🧹 Deleting Branches (Locally & Remotely)

After merging a branch, delete it to keep your repo clean.

### ❌ Delete local branch (safe — only if merged)
```bash
git branch -d feature-login
```

### ❌ Force delete local branch (even if not merged)
```bash
git branch -D feature-login
```

### 🌐 Delete remote branch
```bash
git push origin --delete feature-login
```

Keeping old, unused branches around causes confusion — especially in large teams.

---

## 🔀 Merging — Bringing Your Changes Back

When your feature is ready, merge it into the target branch (usually `main` or `development`).

### 🟦 Step 1 — Switch to the target branch
```bash
git checkout main
```

### 🔁 Step 2 — Merge the feature branch
```bash
git merge feature-login
```

If both branches changed different parts of the project → Git merges automatically.
If they changed the same lines → Git asks you to resolve a **merge conflict**.

---

## ⚔ Understanding Merge Conflicts (Friendly Explanation)

Conflicts happen when Git cannot decide which change should win.

Example:
You change line 20 of `style.css`, and your teammate also changes line 20.

Git says:
> “I can’t choose — you decide.”

You open the file, select the correct version, then finalize the merge:
```bash
git add style.css
git commit
```

### VS Code makes this easy:

You’ll see options to pick:

- **Current Change**
- **Incoming Change**
- **Both**

---

## 🍒 Bonus: Cherry-Pick Specific Commits

Sometimes you want only a **single commit**, not an entire branch.
```bash
git cherry-pick <commit-sha>
```

This copies that commit into your current branch.
Perfect for quick hotfixes.

---

## 🧪 Real-World Workflow Example

Imagine you're adding a dark mode feature.

### 1️⃣ Create a new branch
```bash
git checkout -b feature-dark-mode
```

### 2️⃣ Develop & commit your work
```bash
git add .
git commit -m "Added dark mode styles"
```

### 3️⃣ Switch to main
```bash
git checkout main
```

### 4️⃣ Merge your feature
```bash
git merge feature-dark-mode
```

### 5️⃣ Delete the feature branch
```bash
git branch -d feature-dark-mode
```

Clean. Organized. Professional.

---

## 🔑 Key Takeaways

- Branches enable safe, parallel development
- Always create a new branch for each feature or bug fix
- Switching and merging are essential daily operations
- Merge conflicts are normal and easy to resolve
- Clean branch management keeps your repo healthy
- Cherry-picking moves specific commits precisely

---

🙏 Special Thanks

Massive appreciation to **Eng. Nada Mostafa** for teaching branching and merging using practical, real-world scenarios.
And thanks to **ITI** for building strong collaborative development skills.
<br/>

**[Eng. Nada Mostafa](https://www.linkedin.com/in/nada-mostafa-mohamed/)**<br/>

**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)**<br/>

---

## 📌 Tags

`#ITINineMonth` `#SoftwareEngineering` `#Git` `#GitBranching` `#GitMerge` `#VersionControl` `#GitHub` `#DevWorkflow` `#CleanCode` `#ProgrammingSkills` `#TechTraining` `#AhmedMaherJourney`