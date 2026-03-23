# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_4 — Part 1: Database, Schema & SQL Command Categories

After learning how relational databases are structured and designed using ERDs, the next step was understanding how database objects are organized and how SQL commands are categorized.

Here’s what I explored 👇

---

### 🔹 Database vs Schema

A Database is the main container that stores all system data and objects such as:

- Tables
- Views
- Indexes
- Functions
- Stored Procedures
- Types
- Triggers

Think of a database like a building 🏢

Inside that building, objects are organized using schemas.

---

A Schema is a namespace that groups related database objects together.

Think of schemas like floors inside the building.

**Example:**

hr.employees

sales.orders

accounting.transactions

**Benefits of using schemas:**

- ✔️ Better organization
- ✔️ Easier team collaboration
- ✔️ Improved security control
- ✔️ Prevents naming conflicts between objects

**Rule:**

Two tables cannot have the same name inside the same schema, but they can exist in different schemas.

Example:

hr.employees

sales.employees

Default schema in PostgreSQL: public

---

### 🔹 SQL Language Classifications

SQL commands are grouped into categories depending on their purpose:

- DDL (Data Definition Language) – Define or modify database structure

Examples: CREATE, ALTER, DROP

- DML (Data Manipulation Language) – Modify stored data

Examples: INSERT, UPDATE, DELETE, TRUNCATE

- DQL (Data Query Language) – Retrieve data

Example: SELECT

- DCL (Data Control Language) – Control access permissions

Examples: GRANT, REVOKE

- TCL (Transaction Control Language) – Manage transactions safely

Examples: COMMIT, ROLLBACK

---

## 🔑 Key Takeaways (Part 1)

- ✔️ Databases store all system objects
- ✔️ Schemas organize objects logically
- ✔️ SQL commands are grouped into 5 main categories

In Part 2, I’ll dive into DELETE, TRUNCATE, and DROP — their differences and practical use cases 🚀

#PostgreSQL #SQL #DatabaseEngineering #DatabaseDesign #BackendDevelopment #SoftwareEngineering #ITI #LearningJourney
