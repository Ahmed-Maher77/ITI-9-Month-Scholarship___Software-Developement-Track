# 🎓 Git & GitHub — ITI 9-Month Journey  
## Lesson 6: Tags, Releases, Stashing & Undoing Changes — Mastering Project Versions

In this lesson, we explored Git’s advanced essentials — the tools that help you version your project, temporarily store work, and safely undo mistakes.

These skills turn you from someone who *knows Git commands* into someone who can confidently manage **real-world, production-level repositories**.

---

## 🏷 1. Tags — Marking Important Versions

Git tags act like bookmarks in your project’s timeline.  
They highlight important commits — typically **releases**.

### 🔹 Lightweight Tag  
Simple pointer to a commit:
```bash
git tag v1.0
```

### 🔹 Annotated Tag (Recommended)

Includes metadata like message, author, and timestamp:
```bash
git tag -a v1.0 -m "Initial Release"
```

#### List all tags:
```bash
git tag
```

#### Push a specific tag:
```bash
git push origin v1.0
```

#### Push all tags:
```bash
git push --tags
```

#### Delete a tag:
```bash
git tag -d v1.0
git push origin --delete v1.0
```

Tags are crucial for versioning: ***v1.0***, **v1.1**, **v2.0**, etc.

---

## 🚀 2. GitHub Releases — Professional Project Versioning

After tagging, GitHub Releases let you share:
- Features
- Fixes
- Improvements
- Downloadable assets
- Changelogs

Releases are what real teams use to publish stable versions to users.

---

## 📦 3. Stash — Temporarily Store Your Work

When you're in the middle of coding and suddenly need to switch branches —
but you're not ready to commit — **stash saves the day**.


### Save current changes:
```bash
git stash
```

### Save with a message:
```bash
git stash save "WIP: Form validation"
```

### List stashes:
```bash
git stash list
```

### Apply stash (keep it):
```bash
git stash apply
```

### Apply & remove stash:
```bash
git stash pop
```

### Show stash details:
```bash
git stash show
```

### Delete a specific stash:
```bash
git stash drop stash@{2}
```

### Clear all stashes:
```bash
git stash clear
```

Stashing keeps your commit history **clean and meaningful**.

---

## ⛔ 4. Undoing Changes — Safe & Dangerous Commands

Git provides multiple ways to undo changes — safely or permanently.


### 🔄 `git restore` — Safe Undo
Undo changes in files:
```bash
git restore file.txt
```

Unstage files:
```bash
git restore --staged file.txt
```

---

## 🔄 `git reset` — Soft, Mixed & Hard Reset


Three modes with increasing danger:

### ⭕ Soft Reset (Safe)

Moves commit changes to staging:
```bash
git reset --soft HEAD~1
```

### 🟡 Mixed Reset (Default)

Moves changes to working directory:
```bash
git reset HEAD~1
```

### ❌ Hard Reset (Dangerous!)

Deletes changes permanently:
```bash
git reset --hard HEAD~1
```


⚠️ Use hard reset only when absolutely certain.

---

## 🔙 Revert a Commit (Team-Safe)

Creates a new commit that reverses the previous one:
```bash
git revert <sha>
```

Best method for collaborative environments.

---

## 📌 5. Real-World Examples

### 🌟 Scenario 1 — Wrong commit message
```bash
git commit --amend -m "Correct message"
```

### 🌟 Scenario 2 — Undo last commit but keep changes
```bash
git reset --soft HEAD~1
```

### 🌟 Scenario 3 — Undo multiple commits permanently
```bash
git reset --hard <sha>
```

### 🌟 Scenario 4 — Pause work & switch branches
```bash
git stash save "Working on navbar fix"
git checkout main
```


These tools make Git **flexible**, **forgiving**, and **production-ready**.

---

## 🔑 Key Takeaways

- Tags mark important project versions
- Use annotated tags for professional releases
- GitHub Releases publish official versions
- Stashing keeps your work safe without messy commits
- Restore, Reset, and Revert offer multiple undo strategies
- Hard resets delete work permanently — use with caution
- These tools are essential in **real production environments**

---

🙏 Special Thanks

Deep appreciation to **Eng. Nada Mostafa** for explaining these advanced Git features clearly and practically.
And thanks to **ITI** for building strong, industry-level version control skills.
<br/>

**[Eng. Nada Mostafa](https://www.linkedin.com/in/nada-mostafa-mohamed/)**<br/>

**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)**<br/>

---

## 🌟 Tags

`#ITINineMonth` `#SoftwareEngineering` `#Git` `#GitTags` `#GitStash` `#GitReset` `#VersionControl` `#GitHub` `#CleanCode` `#DevWorkflow` `#ProgrammingSkills` `#TechTraining` `#AhmedMaherJourney`


