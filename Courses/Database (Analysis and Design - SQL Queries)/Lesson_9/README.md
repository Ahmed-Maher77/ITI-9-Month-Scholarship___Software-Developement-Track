# 🎓 Database Fundamentals — ITI 9-Month Journey  
## Lesson 9: Transaction Control Language (TCL)

Welcome to **Lesson 9** of the Database Fundamentals series — part of the ITI 9-Month Professional Program (Software Development Track).

After learning how to manage user permissions using **DCL**, it’s time to explore how databases ensure data accuracy and consistency — even when something goes wrong.  
That’s where **Transaction Control Language (TCL)** comes in.

---

## 🧠 What is TCL?

**TCL (Transaction Control Language)** is used to manage database transactions — groups of SQL operations that execute together as a single logical unit.

If one part of the transaction fails, the entire transaction can be **rolled back** to maintain data integrity.  
This concept follows the **ACID properties**:

- **A — Atomicity:** All or nothing (complete success or failure)  
- **C — Consistency:** Keeps the database in a valid state  
- **I — Isolation:** Transactions don’t interfere with each other  
- **D — Durability:** Committed data is permanently saved  

---

## ⚙️ Core TCL Commands

| Command | Description | Example |
|---------|-------------|---------|
| `COMMIT` | Save all changes permanently | `COMMIT;` |
| `ROLLBACK` | Undo uncommitted changes | `ROLLBACK;` |
| `SAVEPOINT` | Set a rollback point within a transaction | `SAVEPOINT sp1;` |
| `SET TRANSACTION` | Define transaction properties (e.g., READ ONLY) | `SET TRANSACTION READ ONLY;` |

---

### ✅ COMMIT — Save Changes

```sql
UPDATE Employee
SET Salary = Salary + 1000
WHERE DeptID = 10;

COMMIT;
```

✔ Confirms and permanently saves the salary increase for all employees in Department 10.

---

### ❌ ROLLBACK — Undo Changes

```sql
UPDATE Employee
SET Salary = Salary - 5000
WHERE DeptID = 20;

ROLLBACK;
```

✔ Cancels the update and restores all data to its last committed state.

---

### 🔖 SAVEPOINT — Partial Rollback

```sql
START TRANSACTION;

INSERT INTO Employee (EID, Fname, Lname, Salary, DeptID)
VALUES (110, 'Sara', 'Ali', 14000, 30);

SAVEPOINT sp_before_update;

UPDATE Employee
SET Salary = 16000
WHERE EID = 110;

ROLLBACK TO sp_before_update;

COMMIT;
```

✔ The **SAVEPOINT** allows partial rollback — undoing only the update while keeping the insert.

---

### ⚙️ SET TRANSACTION — Define Properties

```sql
SET TRANSACTION READ ONLY;
```

✔ Ensures the current transaction can only **read data** — perfect for reporting or analysis operations.

---

### 💡 Why TCL Matters

- ✅ Maintains data integrity across multiple operations
- ✅ Ensures consistency during failures or system crashes
- ✅ Supports multi-user environments safely
- ✅ Gives developers full control over when and how changes are applied


---

### 🧠 Real-Life Analogy

- Imagine an **online payment system**:
- You transfer money from Account A → Account B.
- The system deducts from A and adds to B.
- If any part fails (e.g., connection drops), the transaction **rolls back** — ensuring no partial updates occur.

That’s **TCL in action** — protecting both the user and the data.

---

### ✅ Summary

- TCL ensures **reliable and consistent data operations**.
- Core commands: `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `SET TRANSACTION`.
- Works closely with DML statements like `INSERT`, `UPDATE`, and `DELETE`.
- Key to building **safe, dependable, and recoverable database systems**.

---

Special thanks to **[Dr. Ramy Abou-Nagi](https://www.linkedin.com/in/ramy-abou-nagi-057158a7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Instructor) and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)** (Teaching Assistant) for their guidance and expertise throughout the Databases course.



<br/>


`#Databases` `#SQL` `#TCL` `#Transactions` `#DataIntegrity` `#ACID` `#Commit` `#Rollback` `#SoftwareEngineering` `#SoftwareDevelopment` `#ITIScholarship` `#LearningJourney` `#ITI` `#Egypt` `#FullStack`


