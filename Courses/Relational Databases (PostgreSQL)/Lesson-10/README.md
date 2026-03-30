# 🎓 Relational Databases (PostgreSQL) — ITI 9-Month Journey

## Lesson_10: Advanced PostgreSQL (Arrays, Ranges, PL/pgSQL, Triggers, Backup)

This lesson is based on **PostgreSQL_Lec4.pdf (Day 4)** and covers advanced PostgreSQL concepts used in real backend systems.

---

## 🧱 Arrays in PostgreSQL

PostgreSQL supports variable-length, multidimensional arrays.

### ✅ Example

```sql
CREATE TABLE sal_emp (
    name text,
    pay_by_quarter integer[4],
    schedule text[][]
);

INSERT INTO sal_emp (pay_by_quarter)
VALUES ('{10000,10000,10000,10000}');

SELECT pay_by_quarter[3] FROM sal_emp;
```

---

## 📏 Range Types

Range types represent intervals of values.

Built-in examples:

- `int4range`
- `int8range`
- `numrange`
- `tsrange`
- `daterange`

### ✅ Example

```sql
CREATE TABLE calls (
    id int,
    during tsrange
);

INSERT INTO calls
VALUES (1108, '[2017-01-01 14:30, 2017-01-01 15:30]');
```

---

## 🧬 Table Inheritance

A PostgreSQL table can inherit columns from another table.

### ✅ Example

```sql
CREATE TABLE video (
    video_id int,
    title text,
    duration interval
);

CREATE TABLE dvds (
    audio_tracks text[]
) INHERITS (video);

SELECT * FROM ONLY video; -- parent table rows only
SELECT * FROM video;      -- parent + inherited rows
```

---

## ⚙️ PL/pgSQL Functions

PL/pgSQL is PostgreSQL's procedural language for writing logic inside the database.

### ✅ Function Template

```sql
CREATE OR REPLACE FUNCTION function_name(arguments)
RETURNS return_datatype AS $$
DECLARE
    declaration;
BEGIN
    -- function body
    RETURN value;
END;
$$ LANGUAGE plpgsql;
```

### ✅ Example

```sql
CREATE FUNCTION sales_tax(subtotal int)
RETURNS float AS $$
BEGIN
    RETURN subtotal * 0.06;
END;
$$ LANGUAGE plpgsql;
```

### ✅ Control Structures (Examples)

```sql
IF number = 0 THEN
    result := 'zero';
ELSIF number > 0 THEN
    result := 'positive';
ELSE
    result := 'negative';
END IF;
```

```sql
FOR i IN 1..10 LOOP
    -- repeated logic
END LOOP;
```

---

## 🔔 Triggers

Triggers run automatically on events like `INSERT`, `UPDATE`, `DELETE`, and `TRUNCATE`.

### ✅ Basic Syntax

```sql
CREATE TRIGGER trigger_name
AFTER INSERT ON company
FOR EACH ROW
EXECUTE PROCEDURE logfunc();
```

### ✅ Trigger Function Example

```sql
CREATE OR REPLACE FUNCTION logfunc()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log(emp_id, entry_date)
    VALUES (NEW.id, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Useful trigger variables:

- `NEW`: new row value (`INSERT` / `UPDATE`)
- `OLD`: old row value (`UPDATE` / `DELETE`)

---

## 💾 Backup and Restore

### `pg_dump` / `psql`

```bash
pg_dump dbname > outfile
psql dbname -f infile
```

Note: The target database must exist before restore.

### `COPY` command

```sql
COPY country TO '/path/countryTableBk.bk';
COPY country FROM '/path/countryTableBk.bk';
COPY (
    SELECT * FROM country WHERE country_name LIKE 'A%'
) TO '/path/a_list_countryTableBk.bk';
```

---

## 🚀 Key Takeaways

- ✔️ Arrays and ranges model complex data effectively.
- ✔️ Inheritance supports table hierarchies.
- ✔️ PL/pgSQL adds procedural power inside PostgreSQL.
- ✔️ Triggers automate business rules and auditing.
- ✔️ Backup/restore strategies are essential for reliability.

---

## 🙏 Special Thanks

Thanks to [Zeyad Elmalky](https://www.linkedin.com/in/zeyad-elmalky-5a504620a/) and [Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/) for the practical and structured learning content.

#PostgreSQL #PLpgSQL #Triggers #BackupRestore #DatabaseEngineering #Backend #ITI
