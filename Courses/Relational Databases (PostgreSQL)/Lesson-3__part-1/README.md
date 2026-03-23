# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_3 — Part 1: ERD Fundamentals (Entities & Attributes)

Before building a database, we must first design it correctly.

In this lesson, I learned how Entity Relationship Diagrams (ERDs) help transform real-world systems into structured database models before implementation.

Here’s what I explored 👇

---

### 🔹 What is an ERD?

An Entity Relationship Diagram (ERD) is a visual representation used to design databases before creating tables.

It illustrates:

- Entities (objects in the system)
- Attributes (properties of those objects)
- Relationships between entities

ERDs act as the blueprint of database structure, helping developers design scalable and consistent systems.

---

### 🔹 Entities

An Entity represents a real-world object stored inside the database.

**Examples:**

Student

Course

Instructor

Department

Typically, each entity maps directly to a table in the database.

**Types of Entities:**

- Strong Entity → exists independently

Example: Student

- Weak Entity → depends on another entity

Example: Enrollment depends on Student

---

### 🔹 Attributes

Attributes describe properties of entities.

**Example:**

**Student Entity Attributes:**

StudentID

Name

Email

DateOfBirth

In implementation, attributes become table columns.

---

### 🔹 Types of Attributes

- Single-valued Attribute => Stores one value only

Example:

NationalID

- Multi-valued Attribute => Stores multiple values

Example:

PhoneNumbers

Usually implemented using a separate table in relational databases.

- Derived Attribute => Calculated from another attribute

Example:

Age derived from DateOfBirth

Derived attributes are typically calculated during queries instead of being stored directly.

---

## 🔑 Key Takeaways

- ✔️ ERD helps design databases before implementation
- ✔️ Entities usually become tables
- ✔️ Attributes become columns
- ✔️ Attributes can be single-valued, multi-valued, or derived

In Part 2, I’ll explore relationships between entities and how databases model real-world interactions 🚀

#PostgreSQL #DatabaseDesign #ERD #SQL #SoftwareEngineering #BackendDevelopment #ITI #LearningJourney
