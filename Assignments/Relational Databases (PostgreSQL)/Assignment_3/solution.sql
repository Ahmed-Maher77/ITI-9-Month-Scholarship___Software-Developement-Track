-- Q1
SELECT prof_id, salary, 
RANK() OVER (ORDER BY salary DESC) AS RK, 
DENSE_RANK() OVER (ORDER BY salary DESC) AS DN
from professors

INSERT INTO professors VALUES
(200, 'ahmed', 'maher', 'ahmed@gmail.com', 'Asst. Professor', 3, '2020-09-01', 32000, true, 3, null, NOW()),
(201, 'mohamed', 'sayed', 'moh@gmail.com', 'Associate Professor', 4, '2021-04-01', 32000, true, 4, null, NOW());



-- Q2
SELECT student_id, first_name, enroll_date, gpa,
LAG(gpa) OVER (ORDER BY enroll_date) AS prev_gpa,
LEAD(gpa) OVER (ORDER BY enroll_date) AS next_gpa  
FROM students;


-- Q3
SELECT scholarship_id, amount, start_date,
SUM(amount) OVER (ORDER BY start_date) AS total_running_scholarships
from scholarships;



-- Q4
SELECT student_id, dept_id, gpa, 
NTILE(4) OVER (ORDER BY gpa) AS gpa_group
FROM students



-- Q5
SELECT course_id, 
SUBSTRING(course_code FROM 1 FOR 3) AS c_code,
POSITION((regexp_match(course_code, '[0-9]'))[1] IN course_code) AS first_digit_position
FROM courses;

-- Q6
CREATE OR REPLACE FUNCTION get_dept_student_count(p_dept_id INT) 
	RETURNS INT AS $$
	BEGIN
		SELECT dept_id, COUNT(*) AS students_count
		FROM students
		WHERE dept_id = p_dept_id;
	END;
$$ LANGUAGE plpgsql;

-- with dept_name
CREATE OR REPLACE FUNCTION get_dept_student_count(p_dept_id INT) 
RETURNS TABLE(dept_name TEXT, students_count INT) AS $$
	BEGIN
		SELECT d.dept_name, COUNT(s.*) AS students_count 
		FROM students s
		INNER JOIN departments d
		ON d.dept_id = s.dept_id
		WHERE dept_id = p_dept_id
		GROUP BY d.dept_id, d.dept_name;
END;
$$ LANGUAGE plpgsql;



-- Q7
CREATE OR REPLACE FUNCTION give_gpa_bonus(p_dept_id INT, p_bonus_percent NUMERIC)
	RETURNS TABLE(student_name TEXT, old_gpa NUMERIC, new_gpa NUMERIC)
	AS $$
		BEGIN
			RETURN QUERY
				SELECT CONCAT(first_name, ' ', last_name) as student_name,
						gpa AS old_gpa,
						LEAST(gpa * (1 + p_bonus_percent / 100), 4.0)  AS new_gpa
				FROM students
				WHERE dept_id = p_dept_id;
		END;
	$$ LANGUAGE plpgsql;

SELECT * FROM give_gpa_bonus(3, 10);


-- Q8
CREATE PROCEDURE transfer_student(p_student_id INT, p_new_dept_id INT)
	AS $$
		DECLARE 
			v_student_name TEXT;
			v_old_dept_id INT;
			v_new_dept_id INT := p_new_dept_id;
		BEGIN
			SELECT first_name || ' ' || last_name, dept_id 
			INTO v_student_name, v_old_dept_id
			FROM students
			WHERE student_id = p_student_id;
		
			UPDATE students SET dept_id = p_new_dept_id
			WHERE student_id = p_student_id;

			RAISE NOTICE 'Student % transferred from department: % to %',
	        v_student_name,
	        v_old_dept_id,
	        v_new_dept_id;
		END;
	$$ LANGUAGE plpgsql;


CALL transfer_student(1, 5);