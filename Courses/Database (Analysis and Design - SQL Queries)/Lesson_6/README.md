# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson_6: Data Manipulation Language (DML)

Welcome to **Lesson 6** of my *Database Fundamentals* series — part of the **ITI 9-Month Professional Program (Software Development Track)**.  

After defining our database structure using **DDL**, it’s time to work with the **data itself** — inserting, updating, and deleting records.  
That’s where **DML (Data Manipulation Language)** comes into play.  

---

### ⚙️ What is DML?

**DML (Data Manipulation Language)** is a subset of SQL used to **interact with the data** stored in database tables.  
It enables you to **add, modify, or remove data** while keeping the database structure intact.  

🧠 *Think of DML as the hands-on layer — managing what goes inside the tables we defined earlier with DDL.*  

---

### 🔹 Core DML Commands

| Command | Description |
|----------|--------------|
| **INSERT** | Add new records into a table. |
| **UPDATE** | Modify existing records. |
| **DELETE** | Remove records from a table. |
| **MERGE** | (Optional) Combine insert and update actions in one step. |

---

### 🟢 INSERT — Add New Data

```sql
INSERT INTO Employee (EmpID, Name, Salary, Department)
VALUES (1, 'Ahmed', 8500, 'IT');
```

✅ Adds a new employee to the Employee table.


You can also insert multiple rows:

```sql
INSERT INTO Employee (EmpID, Name, Salary, Department)
VALUES 
(2, 'Sara', 9200, 'HR'),
(3, 'Omar', 7800, 'Finance');
```

---

### 🟡 UPDATE — Modify Data

```sql
UPDATE Employee
SET Salary = Salary * 1.10
WHERE Dno = 5;
```

✅ Increases salaries by 10% for employees in department 5.

---

### 🔴 DELETE — Remove Data

```sql
DELETE FROM Employee
WHERE Salary < 3000;
```

✅ Removes employees earning less than 3000.


⚠️ Be careful — if you omit the WHERE clause:

```sql
DELETE FROM Employee;
```

It will remove all rows from the table!

---

### 💡 Tips for Safe DML Use

✅ Always use WHERE carefully in UPDATE and DELETE to avoid unintended changes.
✅ Try using SELECT first to preview affected rows before modifying them.
✅ Use transactions (BEGIN TRANSACTION, ROLLBACK, COMMIT) when making multiple related changes.

---

## 🧠 DQL vs DML — Quick Comparison

| Feature | DQL | DML |
| :--- | :--- | :--- |
| **Purpose** | Retrieve data | Modify data |
| **Common Command** | `SELECT` | `INSERT`, `UPDATE`, `DELETE` |
| **Affects** | View only | Actual stored data |

---

### 👏 Acknowledgment

Special thanks to **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Instructor) and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Teaching Assistant)
for their continued support and guidance in mastering database manipulation. 🙏

---

### 🔖 Hashtags

`#SQL` `#DML` `#DatabaseFundamentals` `#DataManipulation`
`#ITIScholarship` `#WebDevelopment` `#FullStack`
`#SoftwareEngineering` `#CareerGrowth` `#LearningJourney`
`#ITI` `#Egypt`