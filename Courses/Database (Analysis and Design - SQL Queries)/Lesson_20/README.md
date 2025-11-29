# 🎓 Lesson 20 — Triggers & Advanced Database Concepts  
*ITI 9-Month Professional Program — Database Fundamentals*

In this final lesson of the Database Fundamentals series, we explored **Triggers** — one of SQL Server’s most powerful automation features — along with several advanced database concepts that strengthen data consistency, auditing, and automation.

---

## ⚙️ What Is a Trigger?

A **Trigger** is a special type of stored procedure that **executes automatically** in response to database events such as:

- `INSERT`  
- `UPDATE`  
- `DELETE`  

Triggers are commonly used to enforce rules, maintain logs, and synchronize data between tables — without manual intervention.

---

## 🧩 Types of Triggers

| Type | Description |
|------|-------------|
| **AFTER Trigger** | Executes after the triggering action (most common). |
| **INSTEAD OF Trigger** | Executes *instead* of the triggering action. |
| **BEFORE Trigger** | Executes before the action (*not supported in SQL Server*, available in MySQL/Oracle). |

---

## 🧠 Common Use Cases

✔ Automatically log changes to audit tables  
✔ Validate or enforce business rules  
✔ Cascade changes between related tables  
✔ Maintain derived or summary data (e.g., totals, balances)  

---

## 📘 Example — AFTER INSERT Trigger

```sql
CREATE TRIGGER trg_AfterInsert_Employee
ON Employee
AFTER INSERT
AS
BEGIN
    INSERT INTO AuditLog (ActionType, TableName, ActionDate)
    VALUES ('INSERT', 'Employee', GETDATE());
END;
```

**✔ Effect:**
Whenever a new employee is added, the event is automatically recorded in `AuditLog`.

---

## 🔍 Working with Pseudo Tables: `inserted` & `deleted`

SQL Server provides two virtual tables inside triggers:

- `inserted` → Contains new records (after `INSERT` or `UPDATE`)
- `deleted` → Contains old records (before `DELETE` or `UPDATE`)

---


## 💡 Example: Auditing Salary Changes

```sql
CREATE TRIGGER trg_UpdateSalaryAudit
ON Employee
AFTER UPDATE
AS
BEGIN
    INSERT INTO SalaryAudit (EmpID, OldSalary, NewSalary, ChangeDate)
    SELECT d.EmpID, d.Salary, i.Salary, GETDATE()
    FROM deleted d
    JOIN inserted i ON d.EmpID = i.EmpID;
END;
```

**✔ Effect:**
Logs old and new salary values whenever an update occurs.

---

## 💡 Advanced Database Concepts

* **Sequences & Identity Columns**
    Used to auto-generate unique numeric keys.

* **Schemas**
    Logical containers for organizing database objects (improves clarity and security).

* **Synonyms**
    Alternative names for objects — useful for abstraction layers.

* **Cursors**
    Process rows one at a time (use sparingly due to performance impact).

* **Dynamic SQL**
    Execute SQL strings constructed at runtime.

---

## ⚠️ Best Practices for Using Triggers

* ✔️ Use triggers only for essential automatic tasks
* ⚡ Keep trigger logic simple — avoid heavy computations
* 📋 Always document and test triggers carefully
* 🚫 Avoid recursive or nested triggers unless absolutely necessary

---

## 🧭 Summary

* **Triggers** automate actions in response to data changes (INSERT, UPDATE, DELETE).
* They help maintain **data integrity, auditing**, and **automatic rule enforcement**.
* When combined with **Stored Procedures** and **UDFs**, they form the backbone of advanced database programming.

---

## 🙏 Appreciation

This lesson marks the conclusion of the **Database Fundamentals** series in the ITI 9-Month Professional Scholarship (Software Development Track).

A special thank you to:

* **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Instructor ↗
* **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** — Teaching Assistant ↗