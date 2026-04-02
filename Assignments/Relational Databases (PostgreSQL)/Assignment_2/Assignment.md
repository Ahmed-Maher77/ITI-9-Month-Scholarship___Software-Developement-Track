# PostgreSQL Lab 2 - university_db

## Questions

1. Insert a new faculty called `Faculty of Law` with `dean = 'Dr. Hany Aziz'`, `building = 'G'`, and `budget = 8000000`. Return the new `faculty_id` immediately.
2. Give all professors in department `3` a `15%` salary raise. Return each professor's name, old salary, and new salary.
3. Update all students whose GPA is below `2.0` and who enrolled before `2022`; set `is_active` to `FALSE`. Return their names.
4. Enroll `student_id = 5` in `course_id = 1` for `Fall 2023`. If the enrollment already exists, do nothing.
5. Update the grade of `student_id = 1` in `course_id = 3` for `Fall 2022` to `98`, and set `letter_grade` to `A+`.
6. Use `MERGE` (PostgreSQL 15+): if `student_id = 99` exists, update their address; if not, insert them as a new student.
7. Create a new table called `high_gpa_students` containing only students with `GPA >= 3.5`, using `SELECT INTO`.
8. Create a table `dept_summary` containing: `dept_name`, student count, average GPA, and total scholarship amount per department, using `CREATE TABLE AS`.
9. Make two copies of the `enrollments` table: one with structure only (no data), and another with structure + data + all constraints.
10. Create a table `exam_results` with default values: `status = 'pending'`, `score = 0`, `exam_date = CURRENT_DATE`, `created_by = CURRENT_USER`. Insert two rows: one using defaults, one overriding them.
11. Show all students who have metadata stored. Display: their first hobby, the number of languages they speak, and whether they have a laptop.
12. Create an ENUM type called `student_level` with values: `Freshman`, `Sophomore`, `Junior`, `Senior`. Add it as a column on `students` and update it based on GPA ranges.
13. Create a composite type called `contact_info` with fields (`phone TEXT`, `email TEXT`, `city TEXT`). Use it in a `student_contacts` table.
