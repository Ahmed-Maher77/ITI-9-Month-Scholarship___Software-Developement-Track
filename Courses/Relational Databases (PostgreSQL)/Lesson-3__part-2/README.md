# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_3 — Part 2: ERD Relationships & Cardinality

After understanding entities and attributes, the next step was learning how relationships connect entities inside database systems.

Here’s what I explored 👇

---

### 🔹 Relationships Between Entities

A relationship defines how entities interact with each other.

**Example:**

Student enrolls in Course

Relationships connect tables logically inside relational databases.

---

### 🔹 Relationship Cardinality

Cardinality describes how many records from one entity relate to another.

- One-to-One (1:1)

Example:

Department ↔ Manager

One department has one manager.

- One-to-Many (1:M)

Example:

Department → Employees

One department has many employees.

- Many-to-Many (M:N)

Example:

Students ↔ Courses

A student enrolls in multiple courses.

A course contains multiple students.

This relationship is implemented using a junction table.

Example:

StudentCourses Table

---

### 🔹 Relationship Degree

Relationship degree describes how many entities participate in a relationship.

- Unary Relationship => Entity relates to itself

Example:

Employee manages Employee

- Binary Relationship => Relationship between two entities

Example:

Student enrolls in Course

- Ternary Relationship => Relationship between three entities

Example:

Doctor prescribes Medicine to Patient

---

### 🔹 Participation Types

Participation defines whether participation in a relationship is mandatory or optional.

- Total Participation => Entity must participate

Example:

Every employee must belong to a department

- Partial Participation => Entity may participate

Example:

Not every employee manages another employee

---

## 🔑 Key Takeaways

- ✔️ Relationships connect entities logically
- ✔️ Cardinality defines relationship size
- ✔️ Degree defines number of participating entities
- ✔️ Participation defines whether relationships are optional or mandatory

---

🙏 Special thanks to Eng.@Zeyad Ashraf for simplifying ERD concepts with clear real-world examples, and to the Information Technology Institute (ITI) for providing a structured and practical learning experience.

#PostgreSQL #DatabaseDesign #ERD #SQL #SoftwareEngineering #BackendDevelopment #ITI #LearningJourney
