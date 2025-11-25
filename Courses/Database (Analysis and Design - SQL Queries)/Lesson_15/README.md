# 🎓 Database Fundamentals — ITI 9-Month Journey

## Lesson 15: Subqueries & Nested SELECT Statements — Query Inside a Query

Welcome to **Lesson 15** of the Database Fundamentals series — part of the ITI 9-Month Professional Program (Software Development Track).

After learning about **Joins** (which combine data across multiple tables), it’s time to explore another powerful SQL feature — **Subqueries** — which allow us to perform a query inside another query.

Subqueries make SQL more dynamic, flexible, and readable — especially when filtering or calculating based on the results of another query.

---

## 🧠 What Is a Subquery?

A **Subquery** (or Nested Query) is a SQL query embedded inside another query, enclosed within parentheses `()`.

It returns intermediate results that the outer query can use for filtering, comparison, or insertion.

### 🧩 Basic Syntax

```sql
SELECT column_name
FROM table_name
WHERE column_name OPERATOR (SELECT column_name FROM another_table);
```

---

## 🔹 1️⃣ Single-Row Subquery

Returns one value — used with comparison operators like =, >, <, etc.

**Example:**
```sql
SELECT Name, Salary
FROM Employee
WHERE Salary > (SELECT AVG(Salary) FROM Employee);
```

✅ Shows employees earning above the company average.

---

## 🔹 2️⃣ Multiple-Row Subquery

Returns multiple values — used with operators like IN, ANY, or ALL.

**Example using IN:**
```sql
SELECT Name
FROM Employee
WHERE DepartmentID IN (SELECT DeptID FROM Department WHERE Location = 'Cairo');
```

✅ Displays employees who work in departments located in Cairo.

**Example using ANY / ALL:**
```sql
SELECT Name, Salary
FROM Employee
WHERE Salary > ALL (SELECT Salary FROM Employee WHERE DepartmentID = 3);
```

✅ Lists employees who earn more than every employee in department 3.

---

## 🔹 3️⃣ Correlated Subquery

A Correlated Subquery depends on values from the outer query — it executes once per row of the outer query.

**Example:**
```sql
SELECT Name, Salary
FROM Employee AS E
WHERE Salary > (
    SELECT AVG(Salary)
    FROM Employee
    WHERE DepartmentID = E.DepartmentID
);
```

✅ For each department, it shows employees earning above the average salary of their department.

---

## 🔹 4️⃣ Subquery in SELECT Clause

Subqueries can appear in the SELECT list — often used for computed columns.

**Example:**
```sql
SELECT Name,
       (SELECT DeptName 
        FROM Department 
        WHERE Department.DeptID = Employee.DeptID) AS DepartmentName
FROM Employee;
```

✅ Retrieves each employee’s department name using a subquery instead of a JOIN.

---

## 🔹 5️⃣ Subquery in FROM Clause (Inline View)

Sometimes subqueries serve as temporary tables in the FROM clause.

**Example:**
```sql
SELECT DeptName, AvgSalary
FROM (
    SELECT DepartmentID, AVG(Salary) AS AvgSalary
    FROM Employee
    GROUP BY DepartmentID
) AS DeptStats
INNER JOIN Department AS D
ON DeptStats.DepartmentID = D.DeptID;
```

✅ Calculates average salary per department, then joins results with department names.

---

## 🧩 When to Use Subqueries vs. Joins

| Scenario | Recommended |
|----------|-------------|
| Combine related data | JOIN |
| Filter using another query result | Subquery |
| Need aggregation before filtering | Subquery |
| Optimize readability for simple lookups | Subquery |

💡 **Note:** In performance-critical queries, **Joins** can be faster — but Subqueries are often **clearer** and easier to maintain.

---

## ✅ Key Takeaways

- Subqueries are **queries inside other queries**.  
- They can return **single, multiple, or correlated results**.  
- Used in `WHERE`, `SELECT`, or `FROM` clauses.  
- Improve **readability** and **flexibility** of SQL queries.  
- In some cases, **Joins** offer better performance.

---

## 🙏 Appreciation


Special thanks to **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Instructor) and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Teaching Assistant) for their clear demonstrations — helping us understand how Subqueries power complex decision-making in SQL.

---

## 📌 Tags

`#Databases` `#SQL` `#Subquery` `#NestedQuery` `#CorrelatedSubquery` `#IN` `#ANY` `#ALL` `#SQLServer` `#DataRetrieval` `#SoftwareEngineering` `#ITIScholarship` `#LearningJourney` `#SoftwareDevelopment` `#ITI` `#Egypt`
