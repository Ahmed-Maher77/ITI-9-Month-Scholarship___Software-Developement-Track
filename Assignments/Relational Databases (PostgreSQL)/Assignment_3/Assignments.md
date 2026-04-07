# PostgreSQL

Good luck

## Lab3

1. Show the difference between `RANK` and `DENSE_RANK` on professor salaries; observe the gap behavior when salaries are tied.
2. For each student, show the GPA of the student enrolled immediately before and after them using `LAG` and `LEAD`, ordered by `enroll_date`.
3. Calculate a running total of scholarship amounts ordered by `start_date`.
4. Divide all students into 4 GPA quartiles. Add a label for each quartile.
5. Show the first 3 characters of each `course_code`, and find the position of the first digit in it.
6. Create a function `get_dept_student_count(dept_id)` that returns the number of students in that department.
7. Create a function `give_gpa_bonus(dept_id, bonus_percent)` that returns a table of: student name, old_gpa, new_gpa, without actually updating any rows.
8. Create a stored procedure `transfer_student(student_id, new_dept_id)` that moves a student to a new department and confirms with `RAISE NOTICE`.
