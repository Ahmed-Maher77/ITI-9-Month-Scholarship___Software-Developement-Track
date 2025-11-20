# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 14: SQL Operators & Expressions — Building Logical Conditions

In previous lessons, we explored SQL and T-SQL functions that help process and transform data.  
In this lesson, we focus on **SQL Operators and Expressions** — the foundation for writing conditions, filters, and logical expressions in queries.

---

## ⚙️ What Are SQL Operators?

**Operators** are symbols or keywords that tell the database how to compare, calculate, or combine values.  
They are essential inside **WHERE**, **HAVING**, and other conditional expressions.

---

## 🔢 1️⃣ Arithmetic Operators

Used to perform basic mathematical calculations.

| Operator | Purpose        | Example          |
|----------|----------------|------------------|
| +        | Addition       | `Salary + 500`   |
| -        | Subtraction    | `Salary - 200`   |
| *        | Multiplication | `Salary * 1.1`   |
| /        | Division       | `Salary / 12`    |
| %        | Modulus        | `10 % 3 → 1`     |

### ✅ Example
```sql
SELECT Name, Salary, Salary * 0.10 AS Bonus
FROM Employee;
```

---

## ⚖️ 2️⃣ Comparison Operators

Used for comparing values — mainly inside the `WHERE` clause.

| Operator | Meaning         | Example                    |
|----------|------------------|----------------------------|
| =        | Equal            | `Salary = 3000`            |
| <> , !=  | Not equal        | `Department <> 'HR'`       |
| >        | Greater than     | `Salary > 5000`            |
| <        | Less than        | `Salary < 4000`            |
| >=       | Greater or equal | `Salary >= 7000`           |
| <=       | Less or equal    | `Salary <= 2000`           |

### ✅ Example
```sql
SELECT *
FROM Employee
WHERE Salary >= 6000;
```

---

## 🧠 3️⃣ Logical Operators

Used to combine multiple conditions.

| Operator | Meaning | Example |
|----------|---------|---------|
| AND | All conditions must be true | `Salary > 4000 AND Department = 'IT'` |
| OR  | At least one condition must be true | `Department = 'HR' OR Department = 'Admin'` |
| NOT | Negates a condition | `NOT Department = 'Finance'` |

### ✅ Example
```sql
SELECT *
FROM Employee
WHERE Department = 'IT'
  AND Salary BETWEEN 5000 AND 9000;
```

---

## 🔍 4️⃣ Special Operators

### 🔸 BETWEEN
Checks if a value falls within a range (inclusive).

```sql
SELECT *
FROM Employee
WHERE Salary BETWEEN 4000 AND 8000;
```

### 🔸 IN

Matches a value against a list.

```sql
SELECT *
FROM Employee
WHERE Department IN ('IT', 'HR', 'Finance');
```

### 🔸 LIKE
Pattern matching using wildcards.

| Wildcard | Meaning |
|----------|---------|
| % | Any number of characters |
| _ | Single character |

Examples:  
- `'A%'` → names starting with A  
- `'M_n'` → matches Man, Men, Min  

```sql
SELECT *
FROM Employee
WHERE Name LIKE 'A%';
```


### 🔸 IS NULL / IS NOT NULL

Checks for missing values.

```sql
SELECT *
FROM Employee
WHERE Phone IS NULL;
```

---

## 🧮 5️⃣ Bitwise Operators (SQL Server Only)

Rarely used in standard queries.

| Operator | Purpose        |
|----------|----------------|
| &        | Bitwise AND    |
| \|       | Bitwise OR     |
| ^        | Bitwise XOR    |

---

## 💬 6️⃣ Expression Examples

Expressions combine columns, operators, and functions.

```sql
SELECT 
    Name,
    Salary * 1.15 AS NewSalary,
    IIF(Salary > 8000, 'High', 'Normal') AS SalaryLevel
FROM Employee
WHERE Department IN ('IT', 'Finance');
```

✔ Calculates a new salary<br/>
✔ Classifies employees by salary level<br/>
✔ Filters by department<br/>

---

## ✅ Key Takeaways

- Use **LIKE**, **IN**, **BETWEEN**, and **IS NULL** for flexible filtering.
- Operators and expressions form the logic behind every SQL query.
- Combine expressions to build readable and powerful SQL statements.

---

## 🙏 Special Thanks

Special thanks to **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Instructor) and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Teaching Assistant) for their guidance and expertise throughout the Databases course.

---

## 📌 Tags

`#Databases` `#SQL` `#SQLServer` `#Operators` `#Expressions`
`#LIKE` `#BETWEEN` `#IN` `#WHEREClause` `#DQL`
`#ITIScholarship` `#SoftwareDevelopment` `#LearningJourney`