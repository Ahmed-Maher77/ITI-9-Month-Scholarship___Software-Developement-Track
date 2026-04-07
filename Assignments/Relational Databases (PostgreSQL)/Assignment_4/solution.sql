-- Q1
SELECT student_id, CONCAT(first_name, last_name) AS student_name, 
	COALESCE(nationality, 'Unkown') AS nationality
FROM students;

-- Q2
SELECT CONCAT(first_name, last_name) AS student_name, 
	gpa as real_gpa, NULLIF(gpa, 0.0) AS cleaned_gpa
FROM students;

-- Q3
SELECT student_id, COALESCE(NULLIF(gpa, 0.0)::TEXT, 'Not Evaluated') AS gpa
FROM students;

-- BONUS
SELECT d.dept_name, COUNT(s.*) AS student_count, 
	COALESCE(SUM(s.gpa)/NULLIF(COUNT(s.*), 0), 0) AS gpa_avg
FROM students s
JOIN departments d ON d.dept_id = s.dept_id
GROUP BY d.dept_id;


-- Q4
CREATE TEMP TABLE temp_course_stats AS
SELECT c.course_code, c.course_name, COUNT(e.*) AS enrolled_count, AVG(e.grade) AS avg_grade

FROM enrollments e
JOIN courses c ON c.course_id = e.course_id

GROUP BY e.course_id, c.course_code, c.course_name;


-- Q5
CREATE INDEX idx_students_dept_id ON students(dept_id);
-- or: CREATE INDEX idx_students_dept_id ON students USING BTREE(dept_id);


-- Q6
CREATE UNIQUE INDEX idx_students_unique_email ON students (email);

INSERT INTO students (first_name, last_name, email)
VALUES ('ahmed78', 'maher88', 'nour.ibrahim@student.edu');


-- Q7
CREATE INDEX idx_professors_salary 
ON professors(salary)
WHERE is_active = true;


-- Q8
CREATE VIEW v_student_details AS
SELECT s.student_id, CONCAT(s.first_name, s.last_name) AS full_name, s.email, s.gpa, d.dept_name, f.faculty_name
FROM students s
JOIN departments d
ON d.dept_id = s.dept_id
JOIN faculties f
ON d.faculty_id = f.faculty_id;


select s.* from v_student_details s 
JOIN departments d
ON d.dept_name = s.dept_name
WHERE d.dept_id = 3;


-- Q9
CREATE TABLE enrollment_audit (
	audit_id SERIAL PRIMARY KEY,
	old_grade NUMERIC, 
	new_grade NUMERIC, 
	student_id INT, 
	changed_at  TIMESTAMPTZ DEFAULT NOW(),
	changed_by TEXT DEFAULT CURRENT_USER
);


CREATE OR REPLACE FUNCTION log_enrollment_audit_grade_change()
	RETURNS TRIGGER AS $$
		BEGIN
			IF old.grade IS DISTINCT FROM new.grade THEN
				INSERT INTO enrollment_audit (old_grade, new_grade, student_id)
				VALUES (old.grade, new.grade, old.student_id);
				RAISE NOTICE 'student with id: %, his grade changed from % to %', old.student_id, old.grade, new.grade;
			END IF;
			RETURN new;
		END;
	$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_log_enrollment_audit_grade_change
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION log_enrollment_audit_grade_change();




-- Q10
UPDATE enrollments SET grade = 80
WHERE enrollment_id = 1;

select * from enrollment_audit;


-- Q11
CREATE OR REPLACE FUNCTION check_professors_salary_validity()
	RETURNS TRIGGER AS $$
		BEGIN
			IF old.salary IS NULL OR old.salary < 5000 THEN
				new.salary = 5000;
			END IF;
		RETURN NEW;	
		END;
	$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_professors_check_salary_validity
BEFORE INSERT ON professors
FOR EACH ROW
EXECUTE FUNCTION check_professors_salary_validity();


INSERT INTO professors (prof_id, first_name, last_name, email, salary)
VALUES (202, 'ahmed888', 'maher888', 'ahm@gmail.com', 4999);

select * from professors WHERE prof_id  = 202;


-- Q12
CREATE TABLE IF NOT EXISTS salary_log ( log_id SERIAL PRIMARY KEY, prof_id INTEGER, old_salary NUMERIC, new_salary NUMERIC, changed_by TEXT DEFAULT CURRENT_USER, changed_at TIMESTAMPTZ DEFAULT NOW() );

BEGIN;
	UPDATE professors 
	SET salary = salary * 1.1
	WHERE dept_id = 1;
	
	INSERT INTO salary_log (prof_id, old_salary, new_salary)
	SELECT prof_id, salary / 1.1, salary 
	FROM professors 
	WHERE dept_id = 1;
	
	select * from professors WHERE dept_id = 1;
	select * from salary_log;
COMMIT;



-- Q13
BEGIN;
	DELETE FROM enrollments WHERE student_id = 1;
ROLLBACK;

SELECT * FROM enrollments;


-- Q14
BEGIN;
	UPDATE faculties SET budget = budget + 500000
	WHERE faculty_id = 1;
	SAVEPOINT after_increase_faculty_1;
	UPDATE faculties SET budget = budget + 500000
	WHERE faculty_id = 2;
	SAVEPOINT after_increase_faculty_2;
	ROLLBACK TO after_increase_faculty_1;
	SELECT faculty_id, budget FROM faculties
    WHERE faculty_id IN (1, 2);
COMMIT;


-- Q15
CREATE ROLE uni_readonly;

GRANT SELECT ON ALL TABLES IN SCHEMA public
TO uni_readonly;

CREATE USER register_user WITH PASSWORD 'pass123';

GRANT uni_readonly TO register_user;

-- Should WORK:
SELECT * FROM students;
-- Should FAIL:
INSERT INTO students (first_name) VALUES ('Test');

RESET ROLE;

-- Should work:
INSERT INTO students (first_name) VALUES ('Test');



-- Q16
CREATE ROLE uni_readwrite;

GRANT DELETE ON ALL TABLES IN SCHEMA public
TO uni_readwrite;

-- Verify privilege is gone:
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'students'
  AND grantee = 'uni_readwrite';

GRANT uni_readwrite TO student_portal;

REVOKE DELETE ON students FROM uni_readwrite;
DELETE FROM students WHERE student_id = 2;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public
FROM student_portal;

REVOKE uni-readonly FROM student_portal;



-- Q17
pg_dump -U postgres -D university_db -F "D:/backup.sql"
pg_dump -U postgres -D university_db -F "D:/backup.sql" --schema-only
pg_dump -U postgres -D university_db -F "D:/backup.sql" --data-only
