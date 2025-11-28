# 🎓 Lesson 19 — Stored Procedures & User-Defined Functions (UDFs): Reusable Logic in SQL Server

*ITI 9-Month Professional Program — Database Fundamentals*

---

In this lesson, we explored how SQL Server allows developers to encapsulate complex logic into reusable components using **Stored Procedures** and **User-Defined Functions (UDFs)**.

These features introduce **modularity, reusability, maintainability, and security** into database operations — similar to functions or methods in programming languages.

---

## ⚙️ What Is a Stored Procedure?

A **Stored Procedure** is a precompiled collection of SQL statements stored inside the database.

It can:

* Accept parameters
* Execute multiple SQL statements
* Perform loops, conditions, transactions
* Return data or status codes

**Stored Procedures are ideal for performing actions and modifying data.**

---

## 🧠 Benefits of Stored Procedures

* ✔️ Reuse logic without rewriting SQL
* ✔️ Improve performance (precompiled execution plan)
* ✔️ Enhance security (restrict direct table access)
* ✔️ Simplify maintenance and debugging
* ✔️ Help enforce business logic at the database layer

---

## 📘 Basic Syntax

```sql
CREATE PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT EmpID, FName, LName, Salary, DeptID
    FROM Employee;
END;
```

Execute:

```sql
EXEC GetAllEmployees;
```

---

## 🧩 Stored Procedure with Parameters

```sql
CREATE PROCEDURE GetEmployeeByDept
    @DeptID INT
AS
BEGIN
    SELECT FName, LName, Salary
    FROM Employee
    WHERE DeptID = @DeptID;
END;
```

Execute:

```sql
Copy code
EXEC GetEmployeeByDept @DeptID = 2;
```

---

## ✏️ Modify or Drop a Stored Procedure

```sql
ALTER PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT EmpID, FName, LName, HireDate
    FROM Employee;
END;
```

```sql
DROP PROCEDURE GetEmployeeByDept;
```

---

## 🔐 Security Tip

You can grant users **EXECUTE** permissions on stored procedures instead of granting direct access to tables.
This protects your data and ensures controlled access.

---

## 🧮 User-Defined Functions (UDFs)

A **UDF** is a user-created function that accepts input parameters and returns **a single value** or **a table**.

UDFs are commonly used inside queries to encapsulate calculations or return filtered data sets.

### ⚙️ Types of UDFs

| Type | Description |
| :--- | :--- |
| **Scalar Function** | Returns a single value (string, number, date, etc.) |
| **Inline Table-Valued Function** | Returns a table using a single `SELECT` statement |
| **Multi-Statement Table-Valued Function** | Returns a table built through multiple SQL statements |

### 📘 Example — Scalar Function

```sql
CREATE FUNCTION GetAnnualSalary(@MonthlySalary DECIMAL(10,2))
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @MonthlySalary * 12;
END;
```

Usage:

```sql
SELECT FName, LName, dbo.GetAnnualSalary(Salary) AS AnnualSalary
FROM Employee;
```

---

## 📘 Example — Table-Valued Function

```sql
CREATE FUNCTION GetHighSalaryEmployees(@MinSalary DECIMAL(10,2))
RETURNS TABLE
AS
RETURN (
    SELECT FName, LName, Salary
    FROM Employee
    WHERE Salary > @MinSalary
);
```

Usage:
```sql
SELECT * FROM dbo.GetHighSalaryEmployees(10000);
```

---

## ⚡ Differences Between Stored Procedures and UDFs

| Feature | Stored Procedure | User-Defined Function |
| :--- | :--- | :--- |
| **Returns Value** | Optional | Mandatory (scalar or table) |
| **Can be used in `SELECT`** | ❌ No | ✅ Yes |
| **Supports Transactions** <br> (`COMMIT`/`ROLLBACK`) | ✅ Yes | ❌ No |
| **Output Parameters** | ✅ Yes | ❌ No |
| **Usage** | Executed independently | Used within queries |

### 🧭 Summary

* **Stored Procedures** → Best for performing actions, data manipulation, business logic, and controlled execution.
* **User-Defined Functions** → Best for calculations, returning values, or reusing query expressions.
* Together, they make SQL Server more modular, powerful, and secure.

---

### 🙏 Appreciation

Special thanks to:

- **[Dr. Ramy Abou-Nagi ↗](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** 
- **[Eng. Mahmoud Abdelaziz ↗](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)**

for delivering practical and industry-focused SQL Server training.

---

## 📌 Tags

`#DatabaseFundamentals` `#SQLServer` `#StoredProcedures` `#UDF` `#TSQL` `#BackendDevelopment` `#ITIScholarship` `#SoftwareEngineering` `#LearningJourney`