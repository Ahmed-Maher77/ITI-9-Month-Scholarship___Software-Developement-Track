# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_9: Built-in Functions in PostgreSQL

PostgreSQL provides powerful built-in functions to manipulate data efficiently.

---

## 🔢 Mathematical Functions

### ✅ Examples

```sql
SELECT abs(-17.4);      -- 17.4
SELECT round(42.438,2); -- 42.44
SELECT sqrt(9);         -- 3
```

---

## 🔤 String Functions

### ✅ Examples

```sql
SELECT concat('Hello', ' World'); -- Hello World
SELECT length('Ahmed');           -- 5
SELECT substr('PostgreSQL',1,4);  -- Post
SELECT replace('abcabc','a','X'); -- XbcXbc
```

---

## 📅 Date/Time Functions

### ✅ Examples

```sql
SELECT now();
SELECT age('2001-04-10','1957-06-13');
SELECT date_part('year', now());
SELECT to_char(now(), 'YYYY-MM-DD');
```

---

## 💡 Why Functions Matter

- Reduce application logic
- Improve query efficiency
- Enable powerful data transformations

---

## 🚀 Key Takeaways

- ✔️ PostgreSQL functions are extremely rich
- ✔️ Cover math, strings, dates, and more
- ✔️ Essential for real-world applications

---

## 🙏 Special Thanks

Huge thanks to [Zeyad Elmalky](https://www.linkedin.com/in/zeyad-elmalky-5a504620a/) for this insightful session.  
[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)

#PostgreSQL #SQLFunctions #BackendDevelopment #DataProcessing #ITI
