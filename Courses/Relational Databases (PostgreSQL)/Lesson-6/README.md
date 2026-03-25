# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_6: Transactions — Ensuring Data Integrity

One of the most critical concepts in databases is transactions, ensuring that operations are executed safely and reliably.

---

## 🔁 What is a Transaction?

A transaction is a group of SQL statements executed as a single unit.

Either all statements succeed or all fail, with no partial updates.

---

## 💳 Real-World Example (Bank Transfer)

### ✅ Example

```sql
BEGIN;

UPDATE account
SET balance = balance - 100
WHERE name = 'Moataz';

UPDATE account
SET balance = balance + 100
WHERE name = 'Ali';

COMMIT;
```

---

## ❗ Why Transactions Matter

If a failure happens in the middle:

- ❌ Money is deducted but not added
- ❌ Data becomes inconsistent

Transactions prevent this using:

- `COMMIT` to save changes
- `ROLLBACK` to undo changes

---

## 🔄 Rollback Example

### ✅ Example

```sql
BEGIN;

INSERT INTO t VALUES (1);
ROLLBACK;
```

---

## 🎯 Savepoints (Partial Rollback)

PostgreSQL allows rolling back to a specific point.

### ✅ Example

```sql
BEGIN;

INSERT INTO t VALUES (1);

SAVEPOINT sp1;

INSERT INTO t VALUES (2);

ROLLBACK TO sp1;

COMMIT;
```

Result: only value `1` is saved.

---

## ⚠️ Important Notes

- Some operations wait until the transaction ends (e.g., `DROP TABLE`)
- Transactions ensure data consistency and isolation

---

## 🚀 Key Takeaways

- ✔️ Transactions protect your data
- ✔️ Always use them in critical operations
- ✔️ Savepoints give more control

---

## 🙏 Special Thanks

Thanks to [Zeyad Elmalky](https://www.linkedin.com/in/zeyad-elmalky-5a504620a/) for simplifying such a critical concept with real-life examples.  
[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)

#Transactions #PostgreSQL #DataIntegrity #BackendDevelopment #SQL #ITI
