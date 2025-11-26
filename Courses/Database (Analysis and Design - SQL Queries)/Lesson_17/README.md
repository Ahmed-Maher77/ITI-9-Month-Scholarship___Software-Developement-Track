# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 17: Constraints & Data Integrity — Enforcing Rules in Databases  

This lesson covers **Constraints** — the built-in rules that protect your database from invalid, inconsistent, or incomplete data.

---

## 🧠 What Are Constraints?

**Constraints** are rules applied to columns or tables that ensure data follows specific conditions.  
They help maintain the accuracy, reliability, and consistency of stored data.

---

## 🧩 Why Are Constraints Important?

- ✔️ Maintain data accuracy (no invalid values)  
- ✔️ Maintain consistency across tables  
- ✔️ Prevent accidental deletions or updates  
- ✔️ Enforce business rules at the database level  

---

## ⚙️ Types of Constraints in SQL

### **1. NOT NULL**
Ensures a column cannot store `NULL` values.  

```sql
Name VARCHAR(50) NOT NULL
```

---

### **2. UNIQUE**

Ensures all values in a column are unique.

```sql
Email VARCHAR(100) UNIQUE

```

---

### **3. PRIMARY KEY**

Uniquely identifies each row. Combines NOT NULL + UNIQUE.

```sql
PRIMARY KEY (StudentID)
```

---

### **4. FOREIGN KEY**

Links two tables and enforces referential integrity.

```sql
FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
```

---

### **5. CHECK**

Validates data based on a condition.

```sql
CHECK (Age >= 18)
```

---

**6. DEFAULT**

Provides a default value when none is specified.

```sql
DEFAULT 'Active'
```

---

## 🧱 Example: Creating a Table with Constraints

```sql
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Age INT CHECK (Age >= 18),
    Status VARCHAR(10) DEFAULT 'Active',
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)
);
```

---

## 🔄 ALTER TABLE — Managing Constraints

### Add a Constraint

```sql
ALTER TABLE Students
ADD CONSTRAINT chk_Age CHECK (Age >= 18);
```


### Drop a Constraint

```sql
ALTER TABLE Students
DROP CONSTRAINT chk_Age;
```

### Rename a Constraint (T-SQL Example)

```sql
EXEC sp_rename 'chk_Age', 'chk_StudentAge', 'OBJECT';
```

---

## ⚡ Types of Data Integrity

**1. Entity Integrity**</br>
Ensures each table has a unique primary key.

**2. Referential Integrity**</br>
Ensures relationships between tables are consistent (foreign keys).

**3. Domain Integrity**</br>
Ensures data follows valid rules (types, ranges, formats).

**4. User-Defined Integrity**</br>
Custom business rules enforced at the database level.

---

## 💡 Notes & Best Practices

- Always name constraints clearly (e.g., `PK_Students`, `FK_DeptID`).
- Use `ON DELETE` / `ON UPDATE` actions to control cascading behavior:

```sql
FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
ON DELETE CASCADE
ON UPDATE CASCADE;
```

---

## 🧭 Summary

Constraints act as guards that maintain data quality and prevent invalid data from entering your system.
They ensure accuracy, reliability, consistency, and proper enforcement of business rules across all applications.

---

## 👨‍🏫 Instructors

Special thanks to: **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Instructor and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Teaching Assistant

Their clear explanations helped make aggregate functions and grouping concepts intuitive and valuable for real-world SQL data analysis.

---

🏷️ Keywords

`#Databases` `#SQL` `#Constraints` `#DataIntegrity` `#ForeignKey`
`#SQLServer` `#SoftwareDevelopment` `#ITIScholarship` `#LearningJourney`