# 🎓 Database Fundamentals — ITI 9-Month Journey
## Lesson 7: Data Query Language (DQL) — Retrieving Data with SELECT

Welcome to **Lesson 7** of the Database Fundamentals series — part of the ITI 9-Month Professional Program (Software Development Track).  

After learning how to create tables (DDL) and manipulate data (DML), it’s time to explore one of the most important SQL categories — **DQL**, which allows us to retrieve and view data efficiently.

---

## 🧠 What is DQL?

**DQL (Data Query Language)** is used to fetch and view data from database tables.  
It helps us extract meaningful information using queries — filtering, sorting, grouping, and joining data across multiple tables.  
DQL focuses primarily on one command:

### 👉 SELECT

---

## 🔹 Core DQL Command: SELECT

The **SELECT** statement retrieves data from one or more tables.  

**Basic Syntax:**
```sql
SELECT column1, column2, ...
FROM table_name;
```

#### Example:
```sql
SELECT Name, Salary
FROM Employee;
```

✅ Displays the names and salaries of all employees.

---

## 🧩 Retrieving All Columns

To display all columns:
```sql
SELECT * FROM Employee;
```

> ⚠️ Note: Avoid using * in large applications — specify only the needed columns for performance and clarity.

---

🎯 Filtering Data with WHERE

```sql
SELECT Name, Salary
FROM Employee
WHERE Department = 'IT';
```

✅ Shows only employees in the IT department.

#### Common operators:
`=`, `!=`, `<`, `>`, `<=`, `>=`, `BETWEEN`, `LIKE`, `IN`, `AND`, `OR`, `NOT`

#### Additional useful operators:
- TOP / LIMIT — Control how many rows are returned
- BETWEEN — Filters within a range
- IN — Matches a list of values
- LIKE — Matches patterns using wildcards

---

## 🔢 Sorting Results with ORDER BY
```sql
SELECT Name, Salary
FROM Employee
ORDER BY Salary DESC;
```

✅ Sorts employees by salary in descending order (ASC for ascending).

---

## 🧠 Eliminating Duplicates with DISTINCT

```sql
SELECT DISTINCT Department
FROM Employee;
```

✅ Returns unique department names only.

---

## 📊 Aggregating Data with Functions

DQL supports powerful aggregate functions for analysis:
- COUNT() — Returns the number of records
- SUM() — Calculates total sum of a numeric column
- AVG() — Finds average value
- MIN() — Gets smallest value
- MAX() — Gets largest value

#### Example:

```sql
SELECT Department, AVG(Salary) AS AvgSalary
FROM Employee
GROUP BY Department;
```

✅ Calculates the average salary for each department.

---

## 🔗 Combining Conditions — HAVING & GROUP BY

Filter grouped data using HAVING:
```sql
SELECT Department, COUNT(*) AS EmpCount
FROM Employee
GROUP BY Department
HAVING COUNT(*) > 5;
```

✅ Shows departments with more than 5 employees.

---

## 🧩 Joining Tables

When data is distributed across tables, joins let us combine it:
```sql
SELECT E.Name, D.DeptName
FROM Employee AS E
INNER JOIN Department AS D
ON E.DeptID = D.DeptID;
```

✅ Displays each employee with their department name.

---

## 💡 Summary

- ✅ DQL focuses on data retrieval, not modification.
- ✅ The SELECT command is the core of all data queries.
- ✅ Works seamlessly with aggregate functions, joins, and subqueries for complex analysis.

---


Special thanks to: **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Instructor) **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Teaching Assistant) for their excellent guidance and clear explanations throughout the Databases course.

<br/>

`#Databases` `#SQL` `#DQL` `#SELECT` `#DataRetrieval` `#SoftwareEngineering` `#SoftwareDevelopment` `#ITIScholarship` `#LearningJourney` `#ITI` `#Egypt` `#FullStack`