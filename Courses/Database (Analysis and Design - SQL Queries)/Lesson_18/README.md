# 🎓 Database Fundamentals — ITI 9-Month Journey  
## **Lesson 18: Views & Indexes — Optimizing Data Access and Performance**

In this lesson, we explored two powerful database features that enhance data management, security, and query performance:

**➡️ Views**  
**➡️ Indexes**

---

## 🧠 What Is a View?

A **View** is a *virtual table* based on a `SELECT` query.  
It does **not** store data physically — it represents data from one or more base tables.

---

## 📘 Why Use Views?

- ✅ Simplify complex queries  
- ✅ Enhance security by exposing limited columns/rows  
- ✅ Provide a consistent interface even if underlying tables change  
- ✅ Help manage data access for different users or applications  

---

## ⚙️ Creating a View

```sql
CREATE VIEW EmployeeDetails AS
SELECT E.EmpID, E.FName, E.LName, D.DeptName, E.Salary
FROM Employee E
JOIN Department D ON E.DeptID = D.DeptID;
```

Query the view like any table:

```sql
SELECT * FROM EmployeeDetails;
```

---

## ✏️ Updating and Dropping Views

### Modify an existing view

```sql
ALTER VIEW EmployeeDetails AS
SELECT E.EmpID, E.FName, E.LName, E.Salary
FROM Employee E;
```

### Delete a view

```sql
DROP VIEW EmployeeDetails;
```

---

## 🔒 Updatable Views

A view is **updatable** if:

- It is based on **one table**
- It does **not** include:
    - **GROUP BY**
    - **DISTINCT**
    - Aggregate functions
    - **JOIN**, **UNION**, or subqueries


### Example

```sql
UPDATE SimpleView
SET Salary = Salary + 1000
WHERE EmpID = 1;
```

---

## ⚡ Indexed View (SQL Server)

SQL Server allows creating **Indexed (Materialized) Views**, which store results physically for performance.

```sql
CREATE VIEW vw_SalesSummary
WITH SCHEMABINDING AS
SELECT ProductID, COUNT_BIG(*) AS TotalSales
FROM dbo.Sales
GROUP BY ProductID;
```

Create a clustered index on the view:

```sql
CREATE UNIQUE CLUSTERED INDEX IX_SalesSummary
ON vw_SalesSummary(ProductID);
```

---

## 🧩 What Is an Index?

An **Index** is a data structure (similar to a book index) that speeds up data retrieval in tables or views.

---

## ⚙️ Types of Indexes

- **Clustered Index**
Sorts and stores table data physically according to the key. (One per table)

- **Non-Clustered Index**
A separate lookup structure without changing the table’s physical order.

- **Unique Index**
Ensures indexed column values are unique.

- **Composite Index**
Built on multiple columns.

- **Full-Text Index**
Used for searching words/phrases in text fields.

---

## 🧱 Creating and Dropping Indexes

### Clustered Index

```sql
CREATE CLUSTERED INDEX IX_Employee_EmpID 
ON Employee(EmpID);
```

### Non-Clustered Index

```sql
CREATE NONCLUSTERED INDEX IX_Employee_Name 
ON Employee(LName, FName);
```

### Drop Index

```sql
DROP INDEX IX_Employee_Name ON Employee;
```

---

## ⚡ Benefits of Indexes

- ✅ Faster query performance
- ✅ Efficient sorting and filtering
- ✅ Speed up joins and search operations

---

## ⚠️ Drawbacks of Indexes

- ❌ Slower **INSERT/UPDATE/DELETE** operations
- ❌ Increased storage usage
- ❌ Requires maintenance as data changes

---

## 🧭 Summary

- **Views** simplify SQL logic and improve security.
- **Indexes** boost performance and make data retrieval faster.
- Combined, they help build **scalable**, **efficient**, and **secure** database systems.

---

## 👨‍🏫 Instructors

Special thanks to: **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Instructor and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Teaching Assistant

Their clear explanations helped make aggregate functions and grouping concepts intuitive and valuable for real-world SQL data analysis.

--- 

## 🏷️ Tags

`#Databases` `#SQL` `#Views` `#Indexes` `#Performance` `#RDBMS`
`#SQLServer` `#ITIScholarship` `#SoftwareEngineering` `#LearningJourney` `#Egypt`