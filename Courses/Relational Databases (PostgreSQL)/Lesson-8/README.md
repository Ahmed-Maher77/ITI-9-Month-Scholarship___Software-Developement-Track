# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_8: Views — Simplifying Complex Queries

Views help simplify complex queries and enhance security by exposing only required data.

---

## 👁️ What is a View?

A view is a virtual table based on a query.

It does NOT store data — it retrieves it dynamically.

---

## ✅ Example

```sql
CREATE VIEW v_company AS
SELECT id, name, age
FROM company;

SELECT * FROM v_company;
```

---

## 🎯 Benefits

- Simplifies complex queries
- Improves readability
- Restricts access to sensitive data

---

## ⚠️ Updatable Views Conditions

- Must use ONE table
- No `GROUP BY` / `HAVING`
- No `DISTINCT`
- No computed columns

---

## ✏️ Updating a View

```sql
UPDATE v_company
SET name = 'Ahmed'
WHERE id = 1;
```

---

## 🗑️ Drop View

```sql
DROP VIEW v_company;
```

---

## 🚀 Key Takeaways

- ✔️ Views simplify development
- ✔️ Improve security and abstraction
- ✔️ Not all views are updatable

---

## 🙏 Special Thanks

Appreciation to [Zeyad Elmalky](https://www.linkedin.com/in/zeyad-elmalky-5a504620a/) for clear explanation and practical examples.  
[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)

#SQLViews #PostgreSQL #DatabaseDesign #Backend #ITI #SoftwareDevelopment
