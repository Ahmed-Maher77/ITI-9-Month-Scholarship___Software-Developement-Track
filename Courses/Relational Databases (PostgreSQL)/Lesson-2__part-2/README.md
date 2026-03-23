# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_2 — Part 2: Keys, Relationships & Indexing

After learning how relational databases structure data internally, the next step was understanding how tables connect together and how performance is optimized.

Here’s what I explored 👇

---

### 🔹 Primary Key (PK)

A Primary Key uniquely identifies each record in a table.

**Rules:**

- ✔️ Must be unique
- ✔️ Cannot be NULL
- ✔️ Only one primary key per table (can include multiple columns)

**Example:**

EmployeeID

Primary Keys ensure reliable access to every record.

---

### 🔹 Foreign Key (FK)

A Foreign Key connects one table to another.

It references the Primary Key of another table.

**Example:**

Orders Table → CustomerID references Customers.CustomerID

This creates structured relationships between entities.

---

### 🔹 Referential Integrity

Referential Integrity ensures relationships between tables remain valid.

**Example:**

You cannot assign an order to a customer that does not exist.

This protects consistency across the database.

---

### 🔹 Composite Key

A Composite Key is a Primary Key made from multiple columns.

**Example:**

**StudentCourses Table**

StudentID + CourseID

Together they uniquely identify each enrollment record.

Commonly used in Many-to-Many relationships.

---

### 🔹 Index (Performance Optimization Tool)

An Index improves the speed of data retrieval operations.

Instead of scanning the entire table, PostgreSQL can locate records faster using indexes.

**Example:**

Searching employees by NationalID becomes significantly faster when indexed.

**Trade-off:**

- ✔️ Faster SELECT queries
- ❗ Slightly slower INSERT / UPDATE operations
- ❗ Uses additional storage space

Indexes are essential in production-level database systems.

---

## 🔑 Key Takeaways

- ✔️ Primary Keys uniquely identify records
- ✔️ Foreign Keys connect related tables
- ✔️ Referential Integrity protects relationships
- ✔️ Composite Keys support complex structures
- ✔️ Indexes improve query performance

---

🙏 Special thanks to Eng.@Zeyad Ashraf for the clear explanations and practical database design insights, and to Information Technology Institute (ITI) for providing a strong practical learning experience.

#PostgreSQL #Databases #SQL #DatabaseDesign #BackendDevelopment #SoftwareEngineering #ITI #LearningJourney
