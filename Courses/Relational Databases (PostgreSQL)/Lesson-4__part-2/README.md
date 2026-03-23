# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

#Lesson_4 — Part 2: DELETE vs TRUNCATE vs DROP

Continuing from database structure and SQL categories, one common question in real-world systems and interviews is understanding DELETE, TRUNCATE, and DROP.

Here’s what I learned 👇

---

🔹 DELETE

Removes selected rows from a table.

Example:

DELETE FROM employees

WHERE id = 10;

Features:

✔️ Supports WHERE condition

✔️ Deletes specific rows

✔️ Works inside transactions (can rollback)

✔️ Table structure remains unchanged

❗ Slower because deletion happens row by row

---

🔹 TRUNCATE

Removes all rows from a table quickly.

Example:

TRUNCATE TABLE employees;

Features:

✔️ Very fast operation

✔️ Removes all rows at once

✔️ Resets identity counters

✔️ Table structure remains unchanged

❗ Cannot filter rows using WHERE

---

🔹 DROP

Removes the entire object from the database.

Example:

DROP TABLE employees;

Features:

✔️ Deletes table structure and data

✔️ Removes indexes and constraints

✔️ Frees storage space completely

❗ Cannot be recovered after execution (outside transactions)

---

🔑 Key Takeaways (Part 2)

✔️ DELETE removes selected rows

✔️ TRUNCATE removes all rows quickly

✔️ DROP removes the entire object permanently

---

🙏 Special thanks to Eng.@Zeyad Ashraf for the structured explanations and practical comparisons, and to the Information Technology Institute (ITI) for providing a strong learning environment.

#PostgreSQL #SQL #DatabaseEngineering #DatabaseDesign #BackendDevelopment #SoftwareEngineering #ITI #LearningJourney
