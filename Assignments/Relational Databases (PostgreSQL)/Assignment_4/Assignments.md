# Assignment 4 - PostgreSQL Solutions

This document provides professional SQL answers for Q1 to Q17.

## Q1

Use COALESCE to display each student's nationality. If nationality is NULL, show 'Unknown'.

    SELECT
    	student_id,
    	CONCAT(first_name, ' ', last_name) AS student_name,
    	COALESCE(nationality, 'Unknown') AS nationality
    FROM students;

## Q2

Use NULLIF to treat a GPA of 0.0 as NULL. Show student name, their real GPA, and a cleaned version where 0.0 becomes NULL.

    SELECT
    	CONCAT(first_name, ' ', last_name) AS student_name,
    	gpa AS real_gpa,
    	NULLIF(gpa, 0.0) AS cleaned_gpa
    FROM students;

## Q3

Combine COALESCE + NULLIF: show each student's GPA. If GPA is NULL or 0.0, display 'Not Evaluated'.

    SELECT
    	student_id,
    	CONCAT(first_name, ' ', last_name) AS student_name,
    	COALESCE(NULLIF(gpa, 0.0)::TEXT, 'Not Evaluated') AS gpa_status
    FROM students;

## Bonus

Use NULLIF to calculate average GPA per department, avoiding division by zero. Use COALESCE to replace NULL results with 0. Show dept_name, student count, and safe average GPA.

    SELECT
    	d.dept_name,
    	COUNT(s.student_id) AS student_count,
    	COALESCE(SUM(NULLIF(s.gpa, 0.0)) / NULLIF(COUNT(NULLIF(s.gpa, 0.0)), 0), 0) AS safe_avg_gpa
    FROM departments d
    LEFT JOIN students s ON s.dept_id = d.dept_id
    GROUP BY d.dept_id, d.dept_name
    ORDER BY d.dept_name;

## Q4

Create a temporary table temp_course_stats with: course_code, course_name, enrolled_count, avg_grade. Then find courses where avg_grade is above 75.

    CREATE TEMP TABLE temp_course_stats AS
    SELECT
    	c.course_code,
    	c.course_name,
    	COUNT(e.enrollment_id) AS enrolled_count,
    	AVG(e.grade) AS avg_grade
    FROM courses c
    LEFT JOIN enrollments e ON e.course_id = c.course_id
    GROUP BY c.course_id, c.course_code, c.course_name;

    SELECT
    	course_code,
    	course_name,
    	enrolled_count,
    	avg_grade
    FROM temp_course_stats
    WHERE avg_grade > 75
    ORDER BY avg_grade DESC;

## Q5

Create a B-tree index on dept_id in the students table.

    CREATE INDEX idx_students_dept_id_btree
    ON students USING BTREE (dept_id);

## Q6

Create a UNIQUE index on the email column of students. Then try to insert a duplicate email and observe the error.

    CREATE UNIQUE INDEX idx_students_email_unique
    ON students (email);

    -- Example duplicate test (replace with an existing email in your DB)
    INSERT INTO students (first_name, last_name, email)
    VALUES ('Duplicate', 'Email', 'existing_email@student.edu');

Expected result: PostgreSQL raises a unique constraint/index violation error.

## Q7

Create a Partial index on salary in professors, only for active professors (is_active = TRUE).

    CREATE INDEX idx_professors_salary_active
    ON professors (salary)
    WHERE is_active = TRUE;

## Q8

Create a view called v_student_details showing: student_id, full_name, email, gpa, dept_name, faculty_name. Query it to list students in dept_id = 3.

    CREATE OR REPLACE VIEW v_student_details AS
    SELECT
    	s.student_id,
    	CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    	s.email,
    	s.gpa,
    	d.dept_name,
    	f.faculty_name
    FROM students s
    JOIN departments d ON d.dept_id = s.dept_id
    JOIN faculties f ON f.faculty_id = d.faculty_id;

    SELECT
    	student_id,
    	full_name,
    	email,
    	gpa,
    	dept_name,
    	faculty_name
    FROM v_student_details
    WHERE student_id IN (
    	SELECT student_id FROM students WHERE dept_id = 3
    );

## Q9

Create an audit table enrollment_audit. Then create a BEFORE UPDATE trigger on enrollments: if the grade changed, log old_grade, new_grade, student_id, changed_at, changed_by into the audit table.

    CREATE TABLE IF NOT EXISTS enrollment_audit (
    	audit_id SERIAL PRIMARY KEY,
    	student_id INTEGER NOT NULL,
    	old_grade NUMERIC,
    	new_grade NUMERIC,
    	changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    	changed_by TEXT NOT NULL DEFAULT CURRENT_USER
    );

    CREATE OR REPLACE FUNCTION fn_audit_enrollment_grade_change()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
    	IF OLD.grade IS DISTINCT FROM NEW.grade THEN
    		INSERT INTO enrollment_audit (student_id, old_grade, new_grade)
    		VALUES (OLD.student_id, OLD.grade, NEW.grade);
    	END IF;

    	RETURN NEW;
    END;
    $$;

    DROP TRIGGER IF EXISTS trg_audit_enrollment_grade_change ON enrollments;

    CREATE TRIGGER trg_audit_enrollment_grade_change
    BEFORE UPDATE ON enrollments
    FOR EACH ROW
    EXECUTE FUNCTION fn_audit_enrollment_grade_change();

## Q10

Test the grade trigger: update the grade of enrollment_id = 1. Verify the audit log was written. Then update again with the SAME grade and confirm no new audit row.

    -- First update: should create 1 audit row
    UPDATE enrollments
    SET grade = 80
    WHERE enrollment_id = 1;

    SELECT *
    FROM enrollment_audit
    WHERE student_id = (SELECT student_id FROM enrollments WHERE enrollment_id = 1)
    ORDER BY audit_id DESC;

    -- Second update with same grade: should create 0 new rows
    UPDATE enrollments
    SET grade = 80
    WHERE enrollment_id = 1;

    SELECT COUNT(*) AS audit_rows_after_same_grade_update
    FROM enrollment_audit
    WHERE student_id = (SELECT student_id FROM enrollments WHERE enrollment_id = 1);

## Q11

Create a BEFORE INSERT trigger on professors: if salary is NULL or below 5000, set it to 5000 automatically.

    CREATE OR REPLACE FUNCTION fn_professors_min_salary()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
    	IF NEW.salary IS NULL OR NEW.salary < 5000 THEN
    		NEW.salary := 5000;
    	END IF;

    	RETURN NEW;
    END;
    $$;

    DROP TRIGGER IF EXISTS trg_professors_min_salary ON professors;

    CREATE TRIGGER trg_professors_min_salary
    BEFORE INSERT ON professors
    FOR EACH ROW
    EXECUTE FUNCTION fn_professors_min_salary();

## Q12

Run a transaction that:

1.  increases all professor salaries in dept_id = 1 by 10%
2.  inserts a log record into salary_log table
    Then verify both changes and COMMIT.

        CREATE TABLE IF NOT EXISTS salary_log (
        	log_id SERIAL PRIMARY KEY,
        	prof_id INTEGER,
        	old_salary NUMERIC,
        	new_salary NUMERIC,
        	changed_by TEXT DEFAULT CURRENT_USER,
        	changed_at TIMESTAMPTZ DEFAULT NOW()
        );

        BEGIN;

        WITH base AS (
        	SELECT prof_id, salary AS old_salary
        	FROM professors
        	WHERE dept_id = 1
        	FOR UPDATE
        ),
        updated AS (
        	UPDATE professors p
        	SET salary = b.old_salary * 1.10
        	FROM base b
        	WHERE p.prof_id = b.prof_id
        	RETURNING p.prof_id, b.old_salary, p.salary AS new_salary
        )
        INSERT INTO salary_log (prof_id, old_salary, new_salary)
        SELECT prof_id, old_salary, new_salary
        FROM updated;

        -- Verification before commit
        SELECT prof_id, salary
        FROM professors
        WHERE dept_id = 1
        ORDER BY prof_id;

        SELECT log_id, prof_id, old_salary, new_salary, changed_at
        FROM salary_log
        ORDER BY log_id DESC;

        COMMIT;

## Q13

Demonstrate ROLLBACK: delete all enrollments for student_id = 1 inside a transaction, then ROLLBACK. Confirm rows are still there.

    BEGIN;

    DELETE FROM enrollments
    WHERE student_id = 1;

    -- Check count inside transaction (after delete)
    SELECT COUNT(*) AS rows_after_delete_in_tx
    FROM enrollments
    WHERE student_id = 1;

    ROLLBACK;

    -- Confirm rows are restored
    SELECT COUNT(*) AS rows_after_rollback
    FROM enrollments
    WHERE student_id = 1;

## Q14

Use SAVEPOINTs: in one transaction, increase faculty_id = 1 budget by 500,000, save SAVEPOINT, then increase faculty_id = 2 budget by 500,000. Undo only the second update using ROLLBACK TO SAVEPOINT, then COMMIT.

    BEGIN;

    UPDATE faculties
    SET budget = budget + 500000
    WHERE faculty_id = 1;

    SAVEPOINT after_faculty_1;

    UPDATE faculties
    SET budget = budget + 500000
    WHERE faculty_id = 2;

    ROLLBACK TO SAVEPOINT after_faculty_1;

    COMMIT;

    -- Verify result: faculty 1 changed, faculty 2 unchanged
    SELECT faculty_id, budget
    FROM faculties
    WHERE faculty_id IN (1, 2)
    ORDER BY faculty_id;

## Q15

Test SET ROLE: as registrar_user (readwrite), switch to uni_readonly only. Try a SELECT (should work) and an INSERT (should fail). Then RESET ROLE.

    -- Assumes current session is logged in as registrar_user
    SET ROLE uni_readonly;

    -- Should work
    SELECT * FROM students LIMIT 5;

    -- Should fail (permission denied)
    INSERT INTO students (first_name, last_name, email)
    VALUES ('Role', 'Test', 'role.test@student.edu');

    RESET ROLE;

## Q16

Revoke DELETE on students table from uni_readwrite. Verify privilege is gone. Then revoke ALL privileges and remove student_portal from uni_readonly.

    REVOKE DELETE ON students FROM uni_readwrite;

    -- Verify DELETE privilege is gone
    SELECT
    	grantee,
    	table_name,
    	privilege_type
    FROM information_schema.role_table_grants
    WHERE table_schema = 'public'
      AND table_name = 'students'
      AND grantee = 'uni_readwrite'
      AND privilege_type = 'DELETE';

    REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM student_portal;
    REVOKE uni_readonly FROM student_portal;

## Q17

Write pg_dump commands for:

1. full backup of university_db
2. schema-only backup
3. data-only backup

    -- 1) Full backup (custom format)
    pg_dump -U postgres -d university_db -F c -f "D:/backups/university_full.dump"

    -- 2) Schema-only backup
    pg_dump -U postgres -d university_db --schema-only -F c -f "D:/backups/university_schema.dump"

    -- 3) Data-only backup
    pg_dump -U postgres -d university_db --data-only -F c -f "D:/backups/university_data.dump"
