# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_2 — Part 1: Relational Database Structure

After understanding what databases and PostgreSQL are, the next step was learning how relational databases organize data internally.

In this lesson, I explored the core structural building blocks of relational databases 👇

---

### 🔹 Table (The Core Building Block)

A table is a structured collection of related data organized into:

- Columns → attributes
- Rows → records

Each table represents a real-world entity.

**Example:**

**Employees Table**

EmployeeID | Name | Salary | Department

Tables make data easy to store, search, and manage efficiently.

---

### 🔹 Column (Attribute / Field)

A column represents a property of an entity.

Each column:

- Has a unique name within the table
- Stores a specific type of data
- Enforces structure and validation

**Examples:**

EmployeeID → Integer

Name → Text

HireDate → Timestamp

Salary → Numeric

Choosing the correct data type improves performance and ensures data consistency.

---

### 🔹 Row (Record / Tuple)

A row represents one instance of an entity.

**Example:**

EmployeeID: 101

Name: Ahmed

Salary: 12000

Each row follows the structure defined by the table columns.

---

### 🔹 Value

A value is the smallest unit inside a database table.

**Example:**

Salary = 12000

Every stored value must match the column’s data type.

---

## 🔑 Key Takeaways

- ✔️ Tables store structured data
- ✔️ Columns define attributes with specific data types
- ✔️ Rows represent entity records
- ✔️ Values follow strict data-type rules

In Part 2, I’ll cover how tables connect together using keys and indexes for real-world scalable database design 🚀

#PostgreSQL #Databases #SQL #DatabaseDesign #BackendDevelopment #SoftwareEngineering #ITI #LearningJourney
