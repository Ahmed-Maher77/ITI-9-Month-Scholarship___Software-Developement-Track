# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 12: SQL Built-in Functions — String, Numeric, Date & Conversion Functions

In previous lessons, we explored how to retrieve and analyze data using DQL and aggregate functions.  
Now, it's time to enhance our queries using SQL **built-in functions** — powerful tools that transform and manipulate data directly inside your queries.

---

## ⚙️ What Are Built-in Functions?

SQL offers many **single-row functions** that operate on individual records and return one result per row.

These functions allow you to:

- Manipulate strings  
- Perform numeric operations  
- Handle date and time values  
- Convert data types  

All *without* modifying the underlying stored data.

---

## 🧩 1️⃣ String Functions

String functions are used to process and modify text values.

| Function | Description | Example | Result |
|----------|-------------|---------|--------|
| `UPPER()` | Converts text to uppercase | `UPPER('ahmed')` | `AHMED` |
| `LOWER()` | Converts text to lowercase | `LOWER('ITI')` | `iti` |
| `LENGTH()` / `LEN()` | Returns length of string | `LENGTH('Database')` | `8` |
| `SUBSTRING()` | Extracts part of a string | `SUBSTRING('Database', 1, 4)` | `Data` |
| `CONCAT()` | Joins strings | `CONCAT(FName, ' ', LName)` | Full name |
| `TRIM()` | Removes leading/trailing spaces | `TRIM(' SQL ')` | `SQL` |

### ✅ Example

```sql
SELECT CONCAT(UPPER(FirstName), ' ', LastName) AS FullName
FROM Employee;
```

---

## 🔢 Numeric Functions

Numeric functions help perform mathematical calculations.

| Function | Description | Example | Result |
| :--- | :--- | :--- | :--- |
| `ROUND()` | Rounds to specific decimals | `ROUND(123.456, 2)` | 123.46 |
| `CEIL()` / `CEILING()` | Rounds up | `CEIL(4.2)` | 5 |
| `FLOOR()` | Rounds down | `FLOOR(4.8)` | 4 |
| `ABS()` | Absolute value | `ABS(-15)` | 15 |
| `POWER()` | Exponent power | `POWER(3, 2)` | 9 |
| `MOD()` | Remainder | `MOD(10, 3)` | 1 |

### ✅ Example

```sql
SELECT Salary, ROUND(Salary * 0.1, 0) AS Bonus
FROM Employee;
```

---

## 📅 Date & Time Functions

Used to extract or manipulate date and time information.

| Function | Description |
| :--- | :--- |
| `CURRENT_DATE` / `GETDATE()` | Returns today's date |
| `YEAR()`, `MONTH()`, `DAY()` | Extracts date components |
| `DATEDIFF()` | Difference between two dates |
| `DATEADD()` | Adds interval to a date |
| `FORMAT()` | Formats date output (SQL Server) |

---

### ✅ Example

```sql
SELECT Name, DATEDIFF(YEAR, HireDate, GETDATE()) AS YearsOfService
FROM Employee;
```

---

## 🔁 Conversion Functions

These functions convert values between different data types.

| Function | Description | Example |
| :--- | :--- | :--- |
| `CAST()` | Converts data type | `CAST('2025-10-01' AS DATE)` |
| `CONVERT()` | Converts with formatting | `CONVERT(VARCHAR, GETDATE(), 103)` |

---

### ✅ Example

```sql
SELECT CONVERT(VARCHAR, GETDATE(), 103) AS FormattedDate;
```

---

## 💡 Key Takeaways

- Built-in functions process and transform data efficiently.
- String, numeric, date/time, and conversion functions are essential in daily SQL operations.
- Functions can be nested for more advanced transformations.
- They make your queries cleaner, more flexible, and more powerful.

---



## 🙏 Special Thanks

Special thanks to: **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Instructor and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Teaching Assistant

Their clear explanations helped make aggregate functions and grouping concepts intuitive and valuable for real-world SQL data analysis.

---


## 🏷️ Tags
`#Databases` `#SQL` `#StringFunctions` `#NumericFunctions` `#DateFunctions` `#CAST` `#CONVERT` `#DataTransformation` `#ITIScholarship` `#SoftwareDevelopment` `#LearningJourney` `#Egypt` 