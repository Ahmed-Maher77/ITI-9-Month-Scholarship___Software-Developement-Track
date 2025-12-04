# Solutions: Git Workflow Task

Below are the detailed, step-by-step solutions for completing the Git assignment.

---

## ✅ 1. Create and Push a New Project

### **Steps:**

1. Create a new project folder:

   ```bash
   mkdir git-project
   cd git-project
   ```

2. Initialize a Git repository:

   ```bash
   git init
   ```

3. Create your first file:

   ```bash
   echo "# My Git Project" > README.md
   ```

4. Add and commit the file:

   ```bash
   git add .
   git commit -m "Initial commit"
   ```

5. Create a new GitHub repository (empty).

6. Add the remote repo:

   ```bash
   git remote add origin https://github.com/Ahmed-Maher77/REPO.git
   ```

7. Push the project:

   ```bash
   git push -u origin main
   ```

---

## ✅ 2. Create and Manage Branches

### **Create branches:**

```bash
git branch dev
git branch test
```

### **Create a file on each branch:**

#### On `dev` branch:

```bash
git checkout dev
echo "Dev branch file" > dev.txt
git add dev.txt
git commit -m "Add dev file"
git push -u origin dev
```

#### On `test` branch:

```bash
git checkout test
echo "Test branch file" > test.txt
git add test.txt
git commit -m "Add test file"
git push -u origin test
```

---

## ✅ 3. Merge Changes Into Main

1. Switch to main:

   ```bash
   git checkout main
   ```

2. Merge both branches:

   ```bash
   git merge dev
   git merge test
   ```

3. Push updated main to the remote repo:

   ```bash
   git push origin main
   ```

---

## ✅ 4. Create an Annotated Tag

### Create tag:

```bash
git tag -a v1.7 -m "Release version 1.7"
```

### Push tag:

```bash
git push origin v1.7
```

---

## ✅ 5. Add Contributor

### On GitHub:

1. Go to your repository.
2. Open **Settings**.
3. Go to **Collaborators & Teams**.
4. Enter your instructor's GitHub username.
5. Click **Add collaborator**.
6. Send invitation.
