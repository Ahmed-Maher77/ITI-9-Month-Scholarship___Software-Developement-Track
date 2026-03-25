# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_7: Users & Privileges — Database Security

Managing access control is essential in any system. PostgreSQL provides powerful tools to control who can access what.

---

## 👤 Creating Users

### ✅ Example

```sql
CREATE USER username
WITH PASSWORD 'password';
```

---

## 🔐 Granting Permissions

### ✅ Example

```sql
GRANT SELECT, INSERT
ON company
TO user1;
```

---

## ❌ Revoking Permissions

### ✅ Example

```sql
REVOKE ALL
ON company
FROM user1;
```

---

## 🧠 Types of Privileges

- `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- `CREATE`, `CONNECT`
- `ALL` (full access)

---

## 💡 Real-World Example

- Admin: full access
- Analyst: read-only
- Developer: limited write access

---

## 🚀 Key Takeaways

- ✔️ Security is as important as functionality
- ✔️ Always apply the least privilege principle
- ✔️ Control access per user role

---

## 🙏 Special Thanks

Grateful to [Zeyad Elmalky](https://www.linkedin.com/in/zeyad-elmalky-5a504620a/) for emphasizing security best practices.  
[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)

#DatabaseSecurity #PostgreSQL #AccessControl #CyberSecurity #SQL #ITI
