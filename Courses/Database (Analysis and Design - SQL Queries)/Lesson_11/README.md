# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 11: Aggregate Functions & GROUP BY — Summarizing Data in SQL  

Welcome to **Lesson 11** of my *Database Fundamentals* series — part of the **ITI 9-Month Professional Program (Software Development Track)**.

After mastering how to join tables and retrieve detailed records, it’s time to explore how to **summarize and analyze data** using **aggregate functions** and the **GROUP BY** clause.

These tools allow us to transform raw data into meaningful insights — totals, averages, counts, and more.

---

## ⚙️ What Are Aggregate Functions?

Aggregate functions perform calculations on multiple rows of a table and return **one summarized value**.  

They are often used with **GROUP BY** to summarize data by category (e.g., per department, per project).

---

## 🧩 Common Aggregate Functions

| Function | Description | Example |
|----------|-------------|---------|
| **COUNT()** | Counts number of rows | `COUNT(*)` |
| **SUM()** | Adds numbers | `SUM(Salary)` |
| **AVG()** | Calculates average | `AVG(Salary)` |
| **MIN()** | Smallest value | `MIN(Salary)` |
| **MAX()** | Largest value | `MAX(Salary)` |

---

## 💡 Example 1 — Counting Employees

```sql
SELECT COUNT(*) AS TotalEmployees
FROM Employee;
```

✅ Returns the total number of employees.

---

## 💡 Example 2 — Summing Salaries

```sql
SELECT SUM(Salary) AS TotalSalaries
FROM Employee;
```

✅ Calculates the total payroll cost.

---

## 💡 Example 3 — Average Salary by Department

```sql
SELECT DepartmentID, AVG(Salary) AS AvgSalary
FROM Employee
GROUP BY DepartmentID;
```

✅ Groups employees by department and finds the average salary for each.

---

## 💡 Example 4 — Filtering Groups with HAVING

The **HAVING** clause filters the results after aggregation.
(WHERE filters rows **before** grouping.)

```sql
SELECT DepartmentID, COUNT(*) AS EmpCount
FROM Employee
GROUP BY DepartmentID
HAVING COUNT(*) > 5;
```

✅ Shows only departments with more than 5 employees.

---

## 🧠 GROUP BY vs HAVING

| Clause | Purpose | 
|----------|-------------|
| **GROUP BY** | Divides rows into groups |
| **HAVING** | Filters groups after aggregation |

---

## 💬 Example 5 — Combining WHERE, GROUP BY, and HAVING

```sql
SELECT DepartmentID, SUM(Salary) AS TotalSalary
FROM Employee
WHERE JobTitle = 'Developer'
GROUP BY DepartmentID
HAVING SUM(Salary) > 50000;
```


✅ Filters developers first → groups by department → returns departments where developers' total salaries exceed 50,000.

---

## 📊 Key Points to Remember

✅ Aggregate functions summarize multiple rows</br>
✅ GROUP BY organizes results into groups</br>
✅ HAVING filters aggregated groups</br>
✅ Use WHERE before grouping and HAVING after</br>

---


## 🙏 Special Thanks

Special thanks to: **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Instructor and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Teaching Assistant

Their clear explanations helped make aggregate functions and grouping concepts intuitive and valuable for real-world SQL data analysis.

---


## 📘 Tags

`#Databases` `#SQL` `#AggregateFunctions` `#GroupBy` `#Having` `#Count` `#Sum` `#Avg` `#DataAnalysis` `#RDBMS` `#SoftwareDevelopment` `#SoftwareEngineering` `#ITIScholarship` `#LearningJourney` `#ITI` `#Egypt`