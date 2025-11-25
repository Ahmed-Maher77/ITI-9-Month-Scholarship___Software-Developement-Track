# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 16: Set Operators — Combining Results from Multiple Queries

Set Operators in SQL allow us to combine, compare, and analyze the results of multiple `SELECT` statements. They are powerful tools for handling complex queries and producing unified result sets.

---

## 🧠 What Are Set Operators?

Set Operators are used to merge the results of two or more queries.

Each query must satisfy the following rules:

- Return the **same number of columns**
- Have **compatible data types**
- Columns must appear in the **same order**

---

## ⚙️ Common SQL Set Operators

| Operator      | Description |
|---------------|-------------|
| **UNION**     | Combines results of two queries and removes duplicates. |
| **UNION ALL** | Combines results and *keeps duplicates*. |
| **INTERSECT** | Returns only rows that exist in *both* queries. |
| **EXCEPT / MINUS** | Returns rows from the *first* query not found in the second (`EXCEPT` for SQL Server, `MINUS` for Oracle). |

---

## 🧩 Syntax Examples

### 🟢 `UNION`
```sql
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers;
```

✔ Returns all unique cities from both tables.

---

## 🟢 UNION ALL

```sql
SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers;
```

✔ Returns all cities including duplicates.

---

## 🟢 INTERSECT

```sql
SELECT City FROM Customers
INTERSECT
SELECT City FROM Suppliers;
```

✔ Returns only cities that appear in both tables.

---

## 🟢 EXCEPT (SQL Server) / MINUS (Oracle)

```sql
SELECT City FROM Customers
EXCEPT
SELECT City FROM Suppliers;
```

✔ Returns cities found in Customers but not in Suppliers.

---

## 💡 Notes & Best Practices

- **UNION** applies an implicit `DISTINCT`.  
  → If performance is important and duplicates are acceptable, use **UNION ALL**.

- **INTERSECT** and **EXCEPT** are not supported in all database systems.  
  → For example, older MySQL versions (before 8.0) do not support them.

- Use **parentheses** when combining multiple set operators to control evaluation order and avoid ambiguity.

- All `SELECT` statements must:  
  ✔ Return the same number of columns  
  ✔ Have matching or compatible data types  
  ✔ Follow the same column order  

---

## 🧭 Summary Table

| Operator       | Removes Duplicates | Returns Common Rows | Returns Unique Rows from 1st |
|----------------|--------------------|----------------------|-------------------------------|
| **UNION**      | ✅ | ❌ | ❌ |
| **UNION ALL**  | ❌ | ❌ | ❌ |
| **INTERSECT**  | ✅ | ✅ | ❌ |
| **EXCEPT**     | ✅ | ❌ | ✅ |

---

## 👨‍🏫 Instructors

Special thanks to: **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Instructor and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Teaching Assistant

Their clear explanations helped make aggregate functions and grouping concepts intuitive and valuable for real-world SQL data analysis.


---

## 🏷️ Tags  

`#Databases` `#SQL` `#Set_Operators` `#UNION` `#UNION_ALL` `#INTERSECT` `#EXCEPT` `#MINUS`  
`#SQLServer` `#DatabaseProgramming` `#ITIScholarship` `#SoftwareDevelopment`  
`#LearningJourney` `#Egypt`
