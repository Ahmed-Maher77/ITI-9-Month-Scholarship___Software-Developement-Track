# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson_5: Data Definition Language (DDL) — Defining the Database Structure  

Welcome to **Lesson 5** of my *Database Fundamentals* series — part of the **ITI 9-Month Professional Program (Software Development Track)**.  

In our previous lessons, we explored how databases are designed and structured conceptually.  
Now, it’s time to move from **design to implementation** — using SQL commands that define and modify the structure of our database.  

That’s where **DDL (Data Definition Language)** comes in.  

---

### ⚙️ What is DDL?

**DDL** stands for *Data Definition Language*, a subset of SQL used to **create, modify, and delete** database structures — such as **tables, schemas, views, and indexes**.  

These commands don’t manipulate the actual data, but rather define **how and where that data will be stored**.  

🧠 *Think of DDL as the blueprint stage of your database.*  

---

### 🔹 Core DDL Commands

| Command | Description |
|----------|--------------|
| **CREATE** | Defines new database objects (e.g., tables, views, schemas). |
| **ALTER** | Modifies the structure of existing objects (e.g., adding or changing columns). |
| **DROP** | Deletes database objects permanently. |
| **TRUNCATE** | Removes all rows from a table quickly, without deleting the structure itself. |

---

### 1️⃣ 🏗️ CREATE TABLE — Defining a Table

```sql
CREATE TABLE Employee (
 SSN INT PRIMARY KEY,
 Fname VARCHAR(30),
 Lname VARCHAR(30),
 Salary DECIMAL(10,2),
 Dno INT
);
```

✅ Creates a new table with columns, data types, and constraints.

---

### 2️⃣ 🔧 ALTER TABLE — Changing Structure

```sql
ALTER TABLE Employee
ADD Email VARCHAR(50);
```

✅ Adds a new column to the Employee table.

---

### 3️⃣ ❌ DROP TABLE — Deleting a Table

```sql
DROP TABLE Employee;
```

⚠️ Deletes both the structure and data — irreversible!

---

### 4️⃣ 🧹 TRUNCATE TABLE — Clearing Data

```sql
TRUNCATE TABLE Employee;
```


✅ Removes all records but keeps the table structure intact.
💡 Faster than DELETE because it doesn’t log each row deletion.

---


### 🍀 DDL vs DML — Quick Recap

| Feature | DDL | DML |
| :--- | :--- | :--- |
| **Purpose** | Define structure | Manage data |
| **Examples** | `CREATE`, `ALTER`, `DROP` | `INSERT`, `UPDATE`, `DELETE` |
| **Affects** | Schema | Records |
| **Rollback** | Sometimes not supported | Fully supported |

---

### 🌸 Key Notes

* ✅ DDL statements are **auto-committed** — changes are permanent once executed.
* ✅ Mainly used by **database administrators or developers** defining schema structures.
* ✅ DDL commands define the foundation of **relational integrity** and **database performance**.

---

### 🌼 Acknowledgment

Special thanks to **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** *(Instructor)* and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** *(Teaching Assistant)*

for their continued mentorship and guidance throughout this learning journey. 🙏


---

### 🔖 Hashtags

`#SQL` `#DDL` `#DatabaseDesign` `#DatabaseFundamentals` `#ITIScholarship`
`#SoftwareEngineering` `#WebDevelopment` `#FullStack` `#LearningJourney`
`#CareerGrowth` `#ITI` `#Egypt`
