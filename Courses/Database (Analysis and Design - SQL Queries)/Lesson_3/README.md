🎓 **Database Fundamentals — ITI 9-Month Journey**  

# Lesson_3: Normalization  

Welcome to **Lesson 3** of my *Database Fundamentals* series — part of the **ITI 9-Month Professional Program (Software Development Track)**.  

In previous lessons, we explored **data models**, **entities**, and **database design**. Now, we move to one of the most essential design topics — **Normalization**.  

After completing the ERD and mapping entities to tables, we apply normalization to ensure the design is efficient, consistent, and free from redundancy or anomalies — a final quality check before implementation.  

---

🧠 **What is Normalization?**  
Normalization organizes data to reduce redundancy and improve integrity.  
Each fact is stored only once, and relationships between tables are clear and consistent.  

In simple terms — it’s about structuring your tables for **accuracy**, **scalability**, and **efficiency**.  

---

⚙️ **Why Normalize?**  
✅ Avoid duplication  
✅ Maintain consistency  
✅ Simplify updates & deletions  
✅ Improve storage  
✅ Strengthen integrity  

---

🔹 **1NF (First Normal Form)**  
➡ Every column holds atomic (indivisible) values.  
➡ Each record is unique.  

**Fix:** Split repeating values into separate rows.  

**Example:**  
| StudentID | Name  | Course |
|------------|-------|--------|
| 1          | Ahmed | DB     |
| 1          | Ahmed | OS     |
| 1          | Ahmed | AI     |

---

🔹 **2NF (Second Normal Form)**  
➡ Table is already in 1NF.  
➡ All non-key attributes depend on the **entire primary key**, not part of it.  
*(Used mainly when there’s a composite key.)*  

**Problem Example:**  
| StudentID | Course | Instructor | StudentName |
|------------|---------|------------|--------------|

Here, `StudentName` depends only on `StudentID` (part of the key), not the full key (`StudentID + Course`).  
✅ **Solution:** Separate student info into its own table.  

---

🔹 **3NF (Third Normal Form)**  
➡ Already in 2NF  
➡ No transitive dependency — non-key attributes should depend only on the **primary key**, not on other non-key attributes.  

**Example:**  
| EmployeeID | Name | DeptID | DeptName |
|-------------|------|--------|-----------|

`DeptName` depends on `DeptID`, not directly on `EmployeeID`.  
✅ **Solution:** Separate departments into their own table.  

---

💡 **Functional Dependencies (FDs)**  
A *functional dependency* defines a relationship between attributes.  

If **A → B**, then attribute **B** depends on **A**.  
It’s the foundation for identifying normalization issues.  

**Example:**  
`StudentID → StudentName` means each student ID determines exactly one name.  

---

⚠️ **Common Design Mistakes**  
• Multiple values in one column (breaks 1NF)  
• Partial dependencies (breaks 2NF)  
• Transitive dependencies (breaks 3NF)  
• Over-normalizing (too many tables = complexity)  

---

🧩 **From Unnormalized → 3NF**  

**Unnormalized Table:**  
| OrderID | Customer | Product | Price | City |

**3NF Tables:**  
1️⃣ **Customers** → (CustomerID, Name, City)  
2️⃣ **Orders** → (OrderID, CustomerID)  
3️⃣ **Products** → (ProductID, ProductName, Price)  
4️⃣ **OrderDetails** → (OrderID, ProductID, Quantity)  

Each table now serves a single purpose — clean, efficient, and consistent.  

---

`#Databases` `#Normalization` `#SQL` `#RDBMS` `#SoftwareEngineering` `#ITIScholarship` `#LearningJourney` `#SoftwareDevelopment` `#ITI` `#Egypt` `#CareerGrowth` `#FullStack`
