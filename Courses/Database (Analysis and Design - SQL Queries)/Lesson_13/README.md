# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 13: T-SQL Functions — Mastering SQL Server Built-ins

In Lesson 12, we explored the standard SQL built-in functions used across different database systems (MySQL, PostgreSQL, Oracle, etc.).

Now, in **Lesson 13**, we dive into **T-SQL (Transact-SQL)** — Microsoft SQL Server’s enhanced SQL dialect that introduces powerful features for data manipulation, logic, formatting, and error handling.

---

## ⚙️ What Is T-SQL?

**T-SQL (Transact-SQL)** is Microsoft SQL Server’s proprietary extension of SQL.  
It supports all standard SQL commands plus additional capabilities:

- Advanced built-in functions  
- Procedural programming constructs (`IF`, `WHILE`, `BEGIN...END`, etc.)  
- Error handling (`TRY...CATCH`)  
- Transaction control  

These make T-SQL more expressive and ideal for business-driven logic inside SQL Server.

---

## 🧩 1️⃣ String Functions

| Function | Description | Example | Output |
|---------|-------------|---------|--------|
| `LEN()` | Returns string length (ignores trailing spaces) | `LEN('SQL Server')` | `10` |
| `CHARINDEX()` | Finds substring position | `CHARINDEX('a','Database')` | `2` |
| `LEFT()` | Extracts characters from the left | `LEFT('Database',4)` | `'Data'` |
| `RIGHT()` | Extracts characters from the right | `RIGHT('Database',4)` | `'base'` |
| `REPLACE()` | Replaces substring | `REPLACE('SQL','Q','T')` | `'STL'` |
| `REVERSE()` | Reverses a string | `REVERSE('DBMS')` | `'SMBD'` |
| `LTRIM()` | Removes leading spaces | `LTRIM(' SQL')` | `'SQL'` |
| `RTRIM()` | Removes trailing spaces | `RTRIM('SQL ')` | `'SQL'` |

### Example
```sql
SELECT CHARINDEX('e', 'Developer') AS Position;
```

---

## 🔢 Numeric Functions

| Function | Description | Example | Output |
| :--- | :--- | :--- | :--- |
| **ROUND()** | Rounds to specified decimals | `ROUND(123.456,2)` | `123.46` |
| **CEILING()** | Rounds up | `CEILING(10.2)` | `11` |
| **FLOOR()** | Rounds down | `FLOOR(10.9)` | `10` |
| **POWER()** | Exponent | `POWER(3,3)` | `27` |
| **SQRT()** | Square root | `SQRT(49)` | `7` |
| **RAND()** | Random number (0–1) | `RAND()` | `0.xxx` |

---

## Example

```sql
SELECT CEILING(AVG(Salary)) AS RoundedAvgSalary
FROM Employee;
```

---

## 📅 Date & Time Functions

| Function | Description | Example |
| :--- | :--- | :--- |
| **GETDATE()** | Current datetime | `GETDATE()` |
| **SYSDATETIME()** | Higher precision datetime | `SYSDATETIME()` |
| **DATEPART()** | Returns date part (integer) | `DATEPART(YEAR, GETDATE())` |
| **DATENAME()** | Returns date part as text | `DATENAME(MONTH, GETDATE())` |
| **DATEADD()** | Adds interval to a date | `DATEADD(DAY, 10, GETDATE())` |
| **DATEDIFF()** | Difference between two dates | `DATEDIFF(DAY, HireDate, GETDATE())` |

## Example

```sql
SELECT Name, DATEPART(YEAR, HireDate) AS HireYear
FROM Employee;
```

---

## 🔁 Conversion & Conditional Functions
| Function | Description | Example |
| :--- | :--- | :--- |
| **CAST()** | Converts data type | `CAST('2025-10-29' AS DATE)` |
| **CONVERT()** | Converts with formatting style | `CONVERT(VARCHAR, GETDATE(), 103)` |
| **ISNULL()** | Replaces NULL | `ISNULL(Phone, 'N/A')` |
| **COALESCE()** | First non-null value | `COALESCE(Phone, Email, 'N/A')` |
| **IIF()** | Inline IF | `IIF(Salary > 5000, 'High', 'Low')` |
| **CHOOSE()** | Selects by index | `CHOOSE(2, 'Red', 'Blue', 'Green')` |

---

## Example

```sql
SELECT Name, IIF(Gender = 'M', 'Male', 'Female') AS GenderFull
FROM Employee;
```

---

## 🧠 Logical & Utility Functions

| Function | Description | Example |
| :--- | :--- | :--- |
| **NULLIF()** | Returns NULL if values equal | `NULLIF(Salary, 0)` |
| **FORMAT()** | Formats numbers/dates | `FORMAT(GETDATE(), 'dd-MM-yyyy')` |
| **NEWID()** | Generates GUID | `NEWID()` |

---

## Example

```sql
SELECT FORMAT(Salary, 'N2') AS FormattedSalary
FROM Employee;
```

---

## 💡 Key Takeaways

- **T-SQL extends SQL** with richer logic and manipulation tools.
- Use functions like **CHARINDEX, ISNULL, IIF**, and **DATEPART** for clearer and more maintainable queries.
- T-SQL functions help build powerful business logic directly in SQL Server.
- These features are optimized for **SQL Server** environments.

---

## 🙏 Special Thanks

Special thanks to **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Instructor) and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Teaching Assistant) for their guidance and expertise throughout the Databases course.

---

## 🏷️ Tags

`#Databases` `#TSQL` `#SQLServer` `#SQLFunctions` `#ISNULL` `#IIF` `#DATEPART` `#FORMAT`
`#DatabaseDevelopment` `#SoftwareDevelopment` `#ITIScholarship` `#LearningJourney` `#ITI` `#Egypt`