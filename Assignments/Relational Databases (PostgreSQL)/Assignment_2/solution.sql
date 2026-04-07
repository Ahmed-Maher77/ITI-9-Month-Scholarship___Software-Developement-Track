(select * from students where gender = 'Female' and metadata IS NOT NULL)
EXCEPT
(select * from professors where first_name ILIKE 'N%')


CREATE TABLE test (
	info jsonb
)

INSERT INTO test VALUES ('{"skills": ["JavaScript", "SQL"], "experience": 5, "contacts": {"email": "john@example.com"}}')

SELECT info#>'{skills}' FROM test
SELECT info->'skills' FROM test


SELECT CURRENT_USER


-- Q1
INSERT INTO faculties 
VALUES (20, 'Faculty of Law', 'Dr. Hany Aziz', 'G', 8000000, NOW())
RETURNING faculty_id;

-- Q2
UPDATE professors SET salary = salary * 1.15
WHERE dept_id = 3
RETURNING CONCAT(first_name, ' ', last_name) AS prof_name, salary AS old_salary,  salary * 1.15  AS new_salary;

-- Q3
UPDATE students SET is_active = false
WHERE gpa < 2.0 
AND enroll_date < DATE '2022-01-01'
RETURNING CONCAT(first_name, ' ', last_name) AS student_name;

-- Q4
INSERT INTO enrollments (student_id, course_id, semester, year)
VALUES (5, 1, 'Fall', 2023)
ON CONFLICT (student_id, course_id) DO NOTHING;


-- Q5
UPDATE enrollments SET letter_grade = 'A+', grade = 98
WHERE student_id = 1 AND course_id = 3 AND semester = 'Fall';


-- Q6
MERGE INTO students t
USING (VALUES(99, 'new address')) AS s(student_id, address)
ON t.student_id = s.student_id
WHEN MATCHED THEN
UPDATE SET address = s.address
WHEN NOT MATCHED THEN
INSERT (student_id, first_name, last_name,email, address)
VALUES (s.student_id, 'Ahmed', 'Maher', 'a@gmail.com', s.address)


-- Q7
SELECT * INTO high_gpa_students
FROM students
WHERE gpa >= 3.5;

-- Q8
CREATE TABLE dept_summary AS
SELECT d.dept_name, COUNT(s.*) AS student_count, AVG(s.gpa) AS average_GPA
FROM departments d
JOIN students s
ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name;


-- Q9
-- structure + no data
-- way 1:
SELECT * INTO enrollments_copy
FROM enrollments
WHERE 1 = 2;
-- way 2:
CREATE TABLE enrollments_copy AS
SELECT * FROM enrollments WITH NO DATA;

-- structure + constraints + data
CREATE TABLE enrollments_copy 
(LIKE enrollments INCLUDING ALL);
INSERT INTO enrollments_copy
SELECT * FROM enrollments;


-- Q10
CREATE TABLE exam_results (
	result_id SERIAL PRIMARY KEY,
	status VARCHAR(50) DEFAULT 'pending',
	score NUMERIC(5,2) DEFAULT 0,
	exam_date DATE DEFAULT CURRENT_DATE,
	created_by TEXT DEFAULT CURRENT_USER,
	notes TEXT
)

INSERT INTO exam_results (notes)
VALUES ('Auto-generated row');

INSERT INTO exam_results (status, score, exam_date, created_by)
VALUES ('on progress', 8, '2026-3-25', 'ahmed maher');


-- Q11
SELECT metadata->'hobbies'->>0, jsonb_array_length(metadata->'languages'), metadata ? 'laptop' AS has_laptop FROM students
WHERE metadata IS NOT NULL;


-- Q12
CREATE TYPE student_level AS ENUM 
('Freshman', 'Sophomore', 'Junior', 'Senior');

ALTER TABLE students ADD COLUMN level student_level DEFAULT 'Freshman';

UPDATE students SET level = 
CASE
	WHEN gpa >= 3.5 THEN 'Senior'
    WHEN gpa >= 3.0 THEN 'Junior'
    WHEN gpa >= 2.5 THEN 'Sophomore'
    ELSE 'Freshman'
END::student_level;

SELECT * FROM students;


-- Q13
CREATE TYPE contact_info AS (
	phone TEXT,
	email TEXT,
	city TEXT
);

CREATE TABLE student_contacts (
	student_contact_id SERIAL PRIMARY KEY,
	student_id INT REFERENCES students(student_id),
	contact_info contact_info
);

INSERT INTO student_contacts (student_id, contact_info) 
VALUES (3, ROW('010-1234-5678', 'ali@example.com', 'Cairo'));

SELECT student_id, (contact_info).phone, (contact_info).email, (contact_info).city
FROM student_contacts;