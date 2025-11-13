# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 10: SQL Joins — Combining Data from Multiple Tables  

Welcome to **Lesson 10** of my *Database Fundamentals* series — part of the **ITI 9-Month Professional Program (Software Development Track)**.  

After learning how to query individual tables using **DQL**, it’s time to explore one of the most powerful SQL concepts — **JOINS**, which allow us to combine data from multiple related tables.

---

## ⚙️ What Are Joins?

A **JOIN** is used to retrieve data from two or more tables based on a related column between them — usually a **primary key** in one table and a **foreign key** in another.  

👉 This enables you to view connected information in a single query — such as employees and their departments, or students and their courses.

---

## 🧩 Basic Syntax

```sql
SELECT columns
FROM table1
JOIN table2
ON table1.column = table2.column;
```

---

## 🔹 1️⃣ INNER JOIN

Returns only the rows that have matching values in both tables.

```sql
SELECT E.Name, D.DeptName
FROM Employee AS E
INNER JOIN Department AS D
ON E.DeptID = D.DeptID;
```

✅ Shows employees along with their department names (only those who belong to a valid department).

---

## 🔹 2️⃣ LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the left table, and matching rows from the right table (if any).

```sql
SELECT E.Name, D.DeptName
FROM Employee AS E
LEFT JOIN Department AS D
ON E.DeptID = D.DeptID;
```

✅ Includes all employees, even those without a department (NULL shown for missing matches).

---

## 🔹 3️⃣ RIGHT JOIN (RIGHT OUTER JOIN)

Returns all rows from the right table, and matching rows from the left table.

```sql
SELECT E.Name, D.DeptName
FROM Employee AS E
RIGHT JOIN Department AS D
ON E.DeptID = D.DeptID;
```

✅ Displays all departments, even those without assigned employees.

---

## 🔹 4️⃣ FULL JOIN (FULL OUTER JOIN)

Returns all records from both tables — matched or unmatched.

```sql
SELECT E.Name, D.DeptName
FROM Employee AS E
FULL JOIN Department AS D
ON E.DeptID = D.DeptID;
```

✅ Combines both unmatched employees and departments into one result.

---

## 🔹 5️⃣ SELF JOIN

A table joined with itself — useful for hierarchical or related data within the same table.

```sql
SELECT E1.Name AS Employee, E2.Name AS Manager
FROM Employee AS E1
INNER JOIN Employee AS E2
ON E1.ManagerID = E2.EmployeeID;
```

✅ Displays each employee with their manager’s name.

---

# 📊 Visual Summary

This table provides a quick reference for the different types of SQL JOINs.

| Join Type | Description |
| :--- | :--- |
| **INNER JOIN** | Matching rows only |
| **LEFT JOIN** | All left records + matched right records |
| **RIGHT JOIN** | All right records + matched left records |
| **FULL JOIN** | All records from both sides (Left and Right) |
| **SELF JOIN** | A regular join where a table is joined to itself |

---

## 💡 Why Joins Matter

✅ Combine related data efficiently</br>
✅ Simplify complex queries</br>
✅ Reduce redundancy by normalizing data into related tables</br>
✅ Essential for relational database design</br>

---

## 🙏 Special Thanks

Special thanks to: **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Instructor and  **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Teaching Assistant

Their excellent explanations and practical SQL exercises made mastering joins both intuitive and enjoyable.


---

## 📘 Tags

`#Databases` `#SQL` `#Joins` `#InnerJoin` `#LeftJoin` `#RightJoin` `#FullJoin` `#SelfJoin` `#RDBMS` `#SoftwareDevelopment` `#SoftwareEngineering` `#ITIScholarship` `#LearningJourney` `#ITI` `#Egypt`