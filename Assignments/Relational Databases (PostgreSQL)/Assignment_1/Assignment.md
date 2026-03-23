# PostgreSQL Lab 1 - university_db

## Database

Use database: `university_db`

Tables included:

- faculties
- departments
- students
- professors
- courses
- enrollments
- teaches
- scholarships

The dataset contains:

- 5 faculties
- 10 departments
- 15 professors
- 30 students
- 20 courses
- 60+ enrollments

Run setup file first:

```sql
\i setup_university_db.sql
```

## Questions

1. Create a new schema called `archive`, create a table inside it, then drop everything inside the schema.
2. Find all active female students enrolled after `2021-01-01`.
3. Find all professors whose first name starts with `S` or `K`, and who are active.
4. Find students who have no phone number on record.
5. Show the top 5 highest-paid professors and the bottom 5 lowest-paid in one result set.

    Hint: Use `UNION ALL` with two separate queries, each with `LIMIT 5`.

6. List courses whose name contains the word `Systems` or `Analysis` (case-insensitive).
7. Find all students not in departments 1, 3, or 5, who have a GPA above 3.0.
8. Show each department name with: number of students, average GPA, min GPA, max GPA. Include departments with 0 students.
9. What is the total salary budget per faculty (by joining departments and professors)?
10. Show each professor and the name of their manager. Professors with no manager should still appear.
11. Find students enrolled in departments that are located in `Cairo`.
12. Update the grade of `student_id = 1` in `course_id = 3` for `Fall 2022` to `98`, and set `letter_grade` to `A+`.
13. Add a new column `phone_verified` (`BOOLEAN DEFAULT FALSE`) to the `students` table.
14. Add a `CHECK` constraint to the `professors` table that salary must be between `5000` and `100000`.
15. Rename the column `phone_verified` to `is_phone_verified`, then drop it.
