# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 4: Introduction to SQL & Its Categories  

Welcome to **Lesson 4** of my *Database Fundamentals* series, part of the **ITI 9-Month Professional Program (Software Development Track)**.

After learning about **database design and normalization**, we now move to the language that brings our databases to life — **SQL (Structured Query Language)**.

---

### 🧠 What is SQL?

**SQL** is a standard language used to communicate with databases — to **create**, **manage**, and **retrieve data** efficiently.  

Whether you're using **MySQL**, **SQL Server**, **PostgreSQL**, or **Oracle**, SQL provides a unified way to:

- Define database structures  
- Insert, update, and delete data  
- Query and analyze information  
- Control permissions and transactions  

---

### ⚙️ SQL Categories Overview

SQL is divided into several key types, each serving a specific purpose:

#### 🔹 DDL (Data Definition Language)
Defines and modifies the **database structure**.  
**Commands:** `CREATE`, `ALTER`, `DROP`, `TRUNCATE`

#### 🔹 DML (Data Manipulation Language)
Performs **operations on the data** (insert, update, delete, etc.).  
**Commands:** `INSERT`, `UPDATE`, `DELETE`, `MERGE`

#### 🔹 DQL (Data Query Language)
Retrieves and queries data.  
**Command:** `SELECT`

#### 🔹 DCL (Data Control Language)
Manages **user permissions and access control**.  
**Commands:** `GRANT`, `REVOKE`, `DENY`

#### 🔹 TCL (Transaction Control Language)
Handles **database transactions**, ensuring consistency and recovery in multi-step operations.  
**Commands:** `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`

---

### 💡 Example

```sql
-- Create a table
CREATE TABLE Students (
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Age INT
);

-- Insert data
INSERT INTO Students VALUES (1, 'Ahmed', 22);

-- Query data
SELECT * FROM Students;
```

This simple flow shows how SQL defines, manipulates, and queries data.

---

### 🚀 Next Steps

In the next lesson, we’ll dive deeper into **DQL (Data Query Language)** and learn how to **retrieve and filter data efficiently.**

---

### 🙏 Acknowledgment

Special thanks to **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Instructor) and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Teaching Assistant) for their outstanding guidance and mentorship throughout this course.



`#SQL` `#Databases` `#SoftwareEngineering` `#ITIScholarship` `#LearningJourney` `#WebDevelopment` `#FullStack` `#ITI` `#Egypt` `#CareerGrowth`