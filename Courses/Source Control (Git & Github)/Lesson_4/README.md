# 🎓 Git & GitHub — ITI 9-Month Journey  
## Lesson 4: Essential Git Commands — Status, Add, Commit, Logs, Diff & Clean

In this lesson, we move into the heart of daily Git usage —  
the commands developers rely on every single day.

These commands help you:  
- Track changes  
- Prepare commits  
- Compare versions  
- View change history  
- Keep your project clean and organized  

This is where Git starts to feel natural and intuitive.

---

## 🔍 1. `git status` — Your Daily Checkpoint

If Git were a car, **`git status` is the dashboard**.

It shows:
- Untracked files  
- Modified files  
- Staged files  
- Current branch  
- Whether your repo is ahead/behind the remote  

**Example:**
```bash
git status
```

Use this frequently to avoid mistakes before committing.

---

## ➕ 2. `git add` — Preparing Changes for Commit

The staging area is where you choose what will be included in your next commit.

**Add a single file:**
```bash
git add index.html
```

**Add multiple files:**
```bash
git add css/main.css index.html
```

**Add everything:**
```bash
git add .
```


### 🔹 Shortcut: `git commit -am "msg"`

Stages tracked files and commits in one go:
```bash
git commit -am "Updated UI"
```

⚠️ Does NOT stage new untracked files.

---

## 📝 3. `git commit` — Saving a Snapshot

A commit is a snapshot of your project at a specific moment.

**Create a commit with a message:**
```bash
git commit -m "Created home page layout"
```

**Why commit messages matter**
- Your teammates will understand your changes
- Your future self will thank you

**Good example:**
```bash
git commit -m "Fix: Navbar alignment issue on mobile"
```

---

## 📜 4. `git log` — Viewing Project History

Displays a list of all commits in the repository.

**Full detailed log:**
```bash
git log
```

**Clean one-line version:**
```bash
git log --oneline
```

**Visual graph of branches:**
```bash
git log --graph --oneline --all
```

This is extremely useful for understanding branch structures.

---

## 📊 5. `git diff` — Inspecting What Changed

Before committing, you may ask:
**"What exactly did I modify?"**

**Working directory → Last commit:**
```bash
git diff
```

**Staging area → Last commit:**
```bash
git diff --staged
```

---

## 🧹 6. `git clean` — Remove Untracked Files Safely

Useful for deleting temporary or experimental files.

**Preview what will be deleted:**
```bash
git clean -n
```

**Delete untracked files:**
```bash
git clean -f    
```

---

## 🧪 Real-World Workflow Example

Imagine you're working on a contact form:

1. Modify `contact.html`
2. Check status:
    ```bash
    git status
    ```
3. Stage the changes:
    ```bash
    git add contact.html
    ```
4. Review the staged differences:
    ```bash
    git diff --staged
    ```
5. Commit:
    ```bash
    git commit -m "Added form validation and UI improvements"
    ```
6. Push:
    ```bash
    git push
    ```

This workflow becomes second nature in daily development.

---

## 🔑 Key Takeaways

- `git status` keeps you oriented
- `git add` moves changes to staging
- `git commit` permanently saves snapshots
- `git log` helps you review history
- `git diff` compares changes clearly
- `git clean` removes untracked clutter

These commands form the foundation of every developer’s Git workflow.

---

## 🙏 Special Thanks

A big thank you to Eng. Nada Mostafa for the clear and practical explanation,
and appreciation to ITI for providing such high-quality, hands-on training.<br/>

**[Eng. Nada Mostafa](https://www.linkedin.com/in/nada-mostafa-mohamed/)**<br/>

**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)**<br/>

---

## 📌 Tags

`#ITINineMonth` `#SoftwareEngineering` `#Git` `#GitCommands` `#GitStatus` `#GitCommit` `#VersionControl` `#GitHub` `#LearnGit` `#DevTools` `#CleanCode` `#ProgrammingBasics` `#AhmedMaherJourney`