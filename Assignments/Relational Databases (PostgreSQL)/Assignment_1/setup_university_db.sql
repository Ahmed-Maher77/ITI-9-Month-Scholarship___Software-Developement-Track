-- ============================================================
--  university_db  —  PostgreSQL Lab Database
--  Run this file first:  \i setup_university_db.sql
-- ============================================================

-- 1. Create & connect
DROP DATABASE IF EXISTS university_db;
CREATE DATABASE university_db
  ENCODING = 'UTF8'
  TEMPLATE = template0;

\c university_db

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE faculties (
    faculty_id   SERIAL PRIMARY KEY,
    faculty_name VARCHAR(100) NOT NULL UNIQUE,
    dean         VARCHAR(100),
    building     VARCHAR(50),
    budget       NUMERIC(15,2),
    established  DATE
);

CREATE TABLE departments (
    dept_id      SERIAL PRIMARY KEY,
    dept_name    VARCHAR(100) NOT NULL UNIQUE,
    faculty_id   INTEGER REFERENCES faculties(faculty_id),
    head_name    VARCHAR(100),
    location     VARCHAR(100),
    phone        VARCHAR(20)
);

CREATE TABLE students (
    student_id   SERIAL PRIMARY KEY,
    first_name   VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50) NOT NULL,
    email        VARCHAR(150) NOT NULL UNIQUE,
    phone        VARCHAR(20),
    birthdate    DATE,
    gender       VARCHAR(10) CHECK (gender IN ('Male','Female')),
    nationality  VARCHAR(50) DEFAULT 'Egyptian',
    dept_id      INTEGER REFERENCES departments(dept_id),
    enroll_date  DATE NOT NULL DEFAULT CURRENT_DATE,
    gpa          NUMERIC(3,2) CHECK (gpa BETWEEN 0.0 AND 4.0),
    is_active    BOOLEAN DEFAULT TRUE,
    address      TEXT,
    metadata     JSONB,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE professors (
    prof_id      SERIAL PRIMARY KEY,
    first_name   VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50) NOT NULL,
    email        VARCHAR(150) NOT NULL UNIQUE,
    title        VARCHAR(30) CHECK (title IN ('Lecturer','Asst. Professor','Associate Professor','Professor')),
    dept_id      INTEGER REFERENCES departments(dept_id),
    hire_date    DATE,
    salary       NUMERIC(10,2),
    is_active    BOOLEAN DEFAULT TRUE,
    manager_id   INTEGER REFERENCES professors(prof_id),
    metadata     JSONB,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE courses (
    course_id    SERIAL PRIMARY KEY,
    course_code  VARCHAR(10) NOT NULL UNIQUE,
    course_name  VARCHAR(150) NOT NULL,
    dept_id      INTEGER REFERENCES departments(dept_id),
    credit_hours INTEGER CHECK (credit_hours BETWEEN 1 AND 6),
    level        INTEGER CHECK (level IN (1,2,3,4)),
    max_students INTEGER DEFAULT 40,
    is_active    BOOLEAN DEFAULT TRUE,
    description  TEXT
);

CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id    INTEGER REFERENCES students(student_id) ON DELETE CASCADE,
    course_id     INTEGER REFERENCES courses(course_id),
    semester      VARCHAR(20) NOT NULL,
    year          INTEGER NOT NULL,
    grade         NUMERIC(4,2) CHECK (grade BETWEEN 0 AND 100),
    letter_grade  VARCHAR(2),
    enrolled_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester, year)
);

CREATE TABLE teaches (
    teach_id     SERIAL PRIMARY KEY,
    prof_id      INTEGER REFERENCES professors(prof_id),
    course_id    INTEGER REFERENCES courses(course_id),
    semester     VARCHAR(20) NOT NULL,
    year         INTEGER NOT NULL,
    room         VARCHAR(20),
    schedule     VARCHAR(100),
    UNIQUE(prof_id, course_id, semester, year)
);

CREATE TABLE scholarships (
    scholarship_id SERIAL PRIMARY KEY,
    student_id     INTEGER REFERENCES students(student_id),
    amount         NUMERIC(10,2),
    type           VARCHAR(50),
    start_date     DATE,
    end_date       DATE,
    notes          TEXT
);

-- ============================================================
-- DATA — Faculties
-- ============================================================
INSERT INTO faculties (faculty_name, dean, building, budget, established) VALUES
('Faculty of Engineering',        'Dr. Tarek Mansour',  'A',  15000000, '1952-09-01'),
('Faculty of Computer Science',   'Dr. Mona Sherif',    'B',  12000000, '1990-01-15'),
('Faculty of Business',           'Dr. Hisham Farouk',  'C',   9500000, '1965-03-20'),
('Faculty of Science',            'Dr. Nadia Saleh',    'D',  11000000, '1950-06-10'),
('Faculty of Arts',               'Dr. Layla Ibrahim',  'E',   6000000, '1948-10-05');

-- ============================================================
-- DATA — Departments
-- ============================================================
INSERT INTO departments (dept_name, faculty_id, head_name, location, phone) VALUES
('Computer Engineering',      1, 'Dr. Sameh Adel',    'Cairo',       '0221001100'),
('Electronics',               1, 'Dr. Rania Fouad',   'Cairo',       '0221001101'),
('Computer Science',          2, 'Dr. Khaled Nour',   'Giza',        '0221002200'),
('Information Systems',       2, 'Dr. Dina Hassan',   'Giza',        '0221002201'),
('Business Administration',   3, 'Dr. Omar Saad',     'Alexandria',  '0221003300'),
('Accounting',                3, 'Dr. Sara Magdy',    'Alexandria',  '0221003301'),
('Mathematics',               4, 'Dr. Youssef Ali',   'Cairo',       '0221004400'),
('Physics',                   4, 'Dr. Hana Mostafa',  'Cairo',       '0221004401'),
('Arabic Literature',         5, 'Dr. Faten Wagdy',   'Luxor',       '0221005500'),
('History',                   5, 'Dr. Amr Galal',     'Luxor',       '0221005501');

-- ============================================================
-- DATA — Professors
-- ============================================================
INSERT INTO professors (first_name, last_name, email, title, dept_id, hire_date, salary, manager_id) VALUES
('Sameh',   'Adel',    'sameh.adel@uni.edu',    'Professor',          1, '2005-09-01', 28000, NULL),
('Rania',   'Fouad',   'rania.fouad@uni.edu',   'Associate Professor',2, '2008-03-15', 23000, 1),
('Khaled',  'Nour',    'khaled.nour@uni.edu',   'Professor',          3, '2003-01-10', 30000, NULL),
('Dina',    'Hassan',  'dina.hassan@uni.edu',   'Asst. Professor',    4, '2015-08-20', 18000, 3),
('Omar',    'Saad',    'omar.saad@uni.edu',     'Professor',          5, '2001-02-01', 32000, NULL),
('Sara',    'Magdy',   'sara.magdy@uni.edu',    'Associate Professor',6, '2010-07-01', 24000, 5),
('Youssef', 'Ali',     'youssef.ali@uni.edu',   'Professor',          7, '2000-09-01', 29000, NULL),
('Hana',    'Mostafa', 'hana.mostafa@uni.edu',  'Lecturer',           8, '2019-01-15', 14000, 7),
('Faten',   'Wagdy',   'faten.wagdy@uni.edu',   'Associate Professor',9, '2007-04-01', 22000, NULL),
('Amr',     'Galal',   'amr.galal@uni.edu',     'Asst. Professor',   10, '2016-09-01', 17000, 9),
('Nour',    'Samy',    'nour.samy@uni.edu',     'Lecturer',           3, '2021-02-01', 13000, 3),
('Karim',   'Zaki',    'karim.zaki@uni.edu',    'Asst. Professor',    1, '2018-06-15', 19000, 1),
('Maha',    'Lotfy',   'maha.lotfy@uni.edu',    'Lecturer',           5, '2022-09-01', 12000, 5),
('Tarek',   'Sobhi',   'tarek.sobhi@uni.edu',   'Associate Professor',2, '2012-03-01', 25000, 2),
('Eman',    'Farid',   'eman.farid@uni.edu',    'Lecturer',           4, '2020-08-01', 13500, 4);

-- ============================================================
-- DATA — Students (30 students)
-- ============================================================
INSERT INTO students (first_name, last_name, email, phone, birthdate, gender, nationality, dept_id, enroll_date, gpa, is_active, address) VALUES
('Ahmed',   'Hassan',   'ahmed.hassan@student.edu',   '01001111111', '2002-03-10', 'Male',   'Egyptian', 1, '2021-09-01', 3.80, TRUE,  'Cairo, Nasr City'),
('Nour',    'Ibrahim',  'nour.ibrahim@student.edu',   '01002222222', '2003-07-22', 'Female', 'Egyptian', 3, '2022-09-01', 3.60, TRUE,  'Giza, Dokki'),
('Omar',    'Farouk',   'omar.farouk@student.edu',    '01003333333', '2001-11-05', 'Male',   'Egyptian', 1, '2020-09-01', 2.90, TRUE,  'Alexandria'),
('Sara',    'Magdy',    'sara.magdy@student.edu',     '01004444444', '2002-01-18', 'Female', 'Egyptian', 4, '2021-09-01', 3.20, TRUE,  'Cairo, Maadi'),
('Khaled',  'Nasser',   'khaled.nasser@student.edu',  '01005555555', '2003-05-30', 'Male',   'Egyptian', 2, '2022-09-01', 3.50, TRUE,  'Cairo, Heliopolis'),
('Mona',    'Sherif',   'mona.sherif@student.edu',    '01006666666', '2001-09-14', 'Female', 'Egyptian', 5, '2020-09-01', 3.10, TRUE,  'Alexandria'),
('Youssef', 'Ali',      'youssef.ali@student.edu',    '01007777777', '2002-12-03', 'Male',   'Jordanian',3, '2021-09-01', 2.75, TRUE,  'Giza, 6th October'),
('Layla',   'Mostafa',  'layla.mostafa@student.edu',  '01008888888', '2003-04-25', 'Female', 'Egyptian', 6, '2022-09-01', 3.90, TRUE,  'Cairo, Zamalek'),
('Hassan',  'Gamal',    'hassan.gamal@student.edu',   '01009999999', '2001-08-17', 'Male',   'Egyptian', 7, '2020-09-01', 3.40, FALSE, 'Cairo, Shubra'),
('Dina',    'Kamal',    'dina.kamal@student.edu',     '01011111111', '2002-06-08', 'Female', 'Egyptian', 8, '2021-09-01', 2.50, TRUE,  'Giza, Mohandessin'),
('Amr',     'Sayed',    'amr.sayed@student.edu',      '01012222222', '2003-02-14', 'Male',   'Egyptian', 3, '2022-09-01', 3.70, TRUE,  'Cairo, Helwan'),
('Heba',    'Fawzy',    'heba.fawzy@student.edu',     '01013333333', '2001-10-29', 'Female', 'Egyptian', 1, '2020-09-01', 3.00, TRUE,  'Alexandria'),
('Tarek',   'Mansour',  'tarek.mansour@student.edu',  '01014444444', '2002-07-11', 'Male',   'Egyptian', 4, '2021-09-01', 2.20, FALSE, 'Cairo, Nasr City'),
('Rana',    'Wahba',    'rana.wahba@student.edu',     '01015555555', '2003-03-19', 'Female', 'Saudi',    5, '2022-09-01', 3.85, TRUE,  'Giza, Dokki'),
('Mahmoud', 'Saber',    'mahmoud.saber@student.edu',  '01016666666', '2001-12-01', 'Male',   'Egyptian', 2, '2020-09-01', 3.15, TRUE,  'Cairo, Maadi'),
('Yasmin',  'Helmy',    'yasmin.helmy@student.edu',   '01017777777', '2002-09-06', 'Female', 'Egyptian', 6, '2021-09-01', 3.55, TRUE,  'Alexandria'),
('Karim',   'Anwar',    'karim.anwar@student.edu',    '01018888888', '2003-01-23', 'Male',   'Egyptian', 3, '2022-09-01', 2.95, TRUE,  'Cairo, Heliopolis'),
('Reem',    'Fathy',    'reem.fathy@student.edu',     '01019999999', '2001-05-16', 'Female', 'Egyptian', 7, '2020-09-01', 3.25, TRUE,  'Giza, 6th October'),
('Ziad',    'Lotfy',    'ziad.lotfy@student.edu',     '01021111111', '2002-11-28', 'Male',   'Lebanese', 1, '2021-09-01', 3.65, TRUE,  'Cairo, Zamalek'),
('Nada',    'Wagdy',    'nada.wagdy@student.edu',     '01022222222', '2003-08-09', 'Female', 'Egyptian', 8, '2022-09-01', 2.80, TRUE,  'Cairo, Shubra'),
('Sherif',  'Badr',     'sherif.badr@student.edu',    '01023333333', '2001-04-02', 'Male',   'Egyptian', 5, '2020-09-01', 3.45, TRUE,  'Giza, Mohandessin'),
('Mariam',  'Sobhi',    'mariam.sobhi@student.edu',   '01024444444', '2002-02-20', 'Female', 'Egyptian', 4, '2021-09-01', 3.05, TRUE,  'Alexandria'),
('Fares',   'Zaki',     'fares.zaki@student.edu',     '01025555555', '2003-06-15', 'Male',   'Egyptian', 6, '2022-09-01', 2.60, TRUE,  'Cairo, Nasr City'),
('Salma',   'Nabil',    'salma.nabil@student.edu',    '01026666666', '2001-01-07', 'Female', 'Egyptian', 3, '2020-09-01', 3.75, TRUE,  'Giza, Dokki'),
('Adam',    'Youssef',  'adam.youssef@student.edu',   '01027777777', '2002-10-13', 'Male',   'Egyptian', 2, '2021-09-01', 3.30, TRUE,  'Cairo, Maadi'),
('Hana',    'Samir',    'hana.samir@student.edu',     '01028888888', '2003-04-01', 'Female', 'Egyptian', 7, '2022-09-01', 2.40, FALSE, 'Alexandria'),
('Bassem',  'Ramzy',    'bassem.ramzy@student.edu',   '01029999999', '2001-07-25', 'Male',   'Egyptian', 1, '2020-09-01', 3.10, TRUE,  'Cairo, Heliopolis'),
('Nadia',   'Selim',    'nadia.selim@student.edu',    '01031111111', '2002-05-17', 'Female', 'Egyptian', 5, '2021-09-01', 3.95, TRUE,  'Giza, 6th October'),
('Mostafa', 'Gamal',    'mostafa.gamal@student.edu',  '01032222222', '2003-09-04', 'Male',   'Egyptian', 6, '2022-09-01', 2.85, TRUE,  'Cairo, Zamalek'),
('Farah',   'Essam',    'farah.essam@student.edu',    '01033333333', '2001-03-28', 'Female', 'Syrian',   3, '2020-09-01', 3.55, TRUE,  'Cairo, Shubra');

-- ============================================================
-- DATA — Courses
-- ============================================================
INSERT INTO courses (course_code, course_name, dept_id, credit_hours, level, max_students, description) VALUES
('CS101', 'Introduction to Programming',      3, 3, 1, 50, 'Python basics, variables, loops, functions'),
('CS201', 'Data Structures',                  3, 3, 2, 40, 'Arrays, linked lists, stacks, queues, trees'),
('CS301', 'Database Systems',                 3, 3, 3, 35, 'Relational databases, SQL, normalization'),
('CS401', 'Software Engineering',             3, 3, 4, 30, 'SDLC, UML, design patterns, testing'),
('CE101', 'Circuit Analysis',                 1, 3, 1, 45, 'Kirchhoff laws, resistors, capacitors'),
('CE201', 'Digital Logic',                    1, 3, 2, 40, 'Boolean algebra, gates, flip-flops'),
('CE301', 'Computer Architecture',            1, 3, 3, 35, 'CPU design, memory hierarchy, pipelines'),
('IS201', 'Systems Analysis',                 4, 3, 2, 40, 'Requirements, modeling, feasibility'),
('IS301', 'IT Project Management',            4, 3, 3, 30, 'Planning, tracking, Agile, Scrum'),
('BA101', 'Principles of Management',         5, 3, 1, 60, 'Management functions, leadership, motivation'),
('BA201', 'Marketing Fundamentals',           5, 3, 2, 50, 'Market analysis, 4Ps, consumer behavior'),
('ACC101','Financial Accounting',             6, 3, 1, 55, 'Journal entries, ledger, trial balance'),
('ACC201','Cost Accounting',                  6, 3, 2, 40, 'Job costing, process costing, variance'),
('MATH101','Calculus I',                      7, 4, 1, 70, 'Limits, derivatives, integrals'),
('MATH201','Linear Algebra',                  7, 3, 2, 55, 'Vectors, matrices, eigenvalues'),
('PHY101','Physics I',                        8, 3, 1, 65, 'Mechanics, kinematics, energy'),
('PHY201','Electromagnetism',                 8, 3, 2, 50, 'Electric fields, magnetic fields, waves'),
('EL201', 'Electronics I',                   2, 3, 2, 40, 'Diodes, BJTs, amplifier basics'),
('EL301', 'Signal Processing',               2, 3, 3, 35, 'Fourier, Laplace, Z-transforms'),
('ARAB101','Arabic Language',                 9, 2, 1, 80, 'Grammar, writing, literature basics');

-- ============================================================
-- DATA — Enrollments  (students enrolled in courses)
-- ============================================================
INSERT INTO enrollments (student_id, course_id, semester, year, grade, letter_grade) VALUES
-- Ahmed Hassan (CS dept)
(1,  1,  'Fall',   2021, 92, 'A'),
(1,  2,  'Spring', 2022, 87, 'B+'),
(1,  3,  'Fall',   2022, 95, 'A+'),
(1,  14, 'Fall',   2021, 78, 'B'),
-- Nour Ibrahim (CS dept)
(2,  1,  'Fall',   2022, 88, 'B+'),
(2,  2,  'Spring', 2023, 91, 'A'),
(2,  14, 'Fall',   2022, 85, 'B+'),
-- Omar Farouk (CE dept)
(3,  5,  'Fall',   2020, 72, 'C+'),
(3,  6,  'Spring', 2021, 68, 'C'),
(3,  14, 'Fall',   2020, 81, 'B'),
(3,  16, 'Fall',   2020, 76, 'B-'),
-- Sara Magdy (IS dept)
(4,  8,  'Fall',   2021, 83, 'B'),
(4,  9,  'Spring', 2022, 79, 'B-'),
(4,  14, 'Fall',   2021, 90, 'A-'),
-- Khaled Nasser (Electronics dept)
(5,  18, 'Fall',   2022, 86, 'B+'),
(5,  16, 'Fall',   2022, 80, 'B'),
(5,  17, 'Spring', 2023, 74, 'C+'),
-- Mona Sherif (BA dept)
(6,  10, 'Fall',   2020, 77, 'B-'),
(6,  11, 'Spring', 2021, 82, 'B'),
(6,  12, 'Fall',   2020, 88, 'B+'),
-- Youssef Ali (CS dept)
(7,  1,  'Fall',   2021, 65, 'C'),
(7,  2,  'Spring', 2022, 71, 'C+'),
(7,  14, 'Fall',   2021, 69, 'C'),
-- Layla Mostafa (Accounting dept)
(8,  12, 'Fall',   2022, 96, 'A+'),
(8,  13, 'Spring', 2023, 93, 'A'),
-- Hassan Gamal (Math dept) - inactive
(9,  14, 'Fall',   2020, 55, 'D+'),
(9,  15, 'Spring', 2021, 60, 'D+'),
-- Dina Kamal (Physics dept)
(10, 16, 'Fall',   2021, 63, 'C-'),
(10, 17, 'Spring', 2022, 58, 'D+'),
-- Amr Sayed (CS dept)
(11, 1,  'Fall',   2022, 94, 'A'),
(11, 2,  'Spring', 2023, 89, 'B+'),
(11, 3,  'Fall',   2023, 91, 'A'),
-- Heba Fawzy (CE dept)
(12, 5,  'Fall',   2020, 84, 'B'),
(12, 6,  'Spring', 2021, 79, 'B-'),
(12, 7,  'Fall',   2021, 77, 'B-'),
-- Rana Wahba (BA dept)
(14, 10, 'Fall',   2022, 97, 'A+'),
(14, 11, 'Spring', 2023, 94, 'A'),
-- Mahmoud Saber (Electronics)
(15, 18, 'Fall',   2020, 73, 'C+'),
(15, 19, 'Spring', 2021, 68, 'C'),
-- Yasmin Helmy (Accounting)
(16, 12, 'Fall',   2021, 89, 'B+'),
(16, 13, 'Spring', 2022, 85, 'B+'),
-- Karim Anwar (CS)
(17, 1,  'Fall',   2022, 78, 'B'),
(17, 2,  'Spring', 2023, 75, 'B-'),
-- Ziad Lotfy (CE)
(19, 5,  'Fall',   2021, 90, 'A-'),
(19, 6,  'Spring', 2022, 88, 'B+'),
(19, 7,  'Fall',   2022, 85, 'B+'),
-- Nada Wagdy (Physics)
(20, 16, 'Fall',   2022, 70, 'C+'),
(20, 17, 'Spring', 2023, 66, 'C'),
-- Sherif Badr (BA)
(21, 10, 'Fall',   2020, 80, 'B'),
(21, 11, 'Spring', 2021, 76, 'B-'),
-- Salma Nabil (CS)
(24, 1,  'Fall',   2020, 91, 'A'),
(24, 2,  'Spring', 2021, 93, 'A'),
(24, 3,  'Fall',   2021, 88, 'B+'),
-- Nadia Selim (BA)
(28, 10, 'Fall',   2021, 99, 'A+'),
(28, 11, 'Spring', 2022, 96, 'A+'),
-- Farah Essam (CS)
(30, 1,  'Fall',   2020, 87, 'B+'),
(30, 2,  'Spring', 2021, 90, 'A-'),
(30, 3,  'Fall',   2021, 94, 'A');

-- ============================================================
-- DATA — Teaches
-- ============================================================
INSERT INTO teaches (prof_id, course_id, semester, year, room, schedule) VALUES
(3,  1,  'Fall',   2021, 'B-101', 'Sun/Tue 10:00-11:30'),
(3,  1,  'Fall',   2022, 'B-101', 'Sun/Tue 10:00-11:30'),
(3,  2,  'Spring', 2022, 'B-102', 'Mon/Wed 12:00-13:30'),
(3,  2,  'Spring', 2023, 'B-102', 'Mon/Wed 12:00-13:30'),
(11, 3,  'Fall',   2022, 'B-201', 'Tue/Thu 09:00-10:30'),
(11, 3,  'Fall',   2023, 'B-201', 'Tue/Thu 09:00-10:30'),
(4,  8,  'Fall',   2021, 'B-301', 'Wed/Sat 11:00-12:30'),
(4,  9,  'Spring', 2022, 'B-302', 'Sun/Tue 14:00-15:30'),
(1,  5,  'Fall',   2020, 'A-101', 'Mon/Wed 08:00-09:30'),
(1,  5,  'Fall',   2021, 'A-101', 'Mon/Wed 08:00-09:30'),
(12, 6,  'Spring', 2021, 'A-102', 'Tue/Thu 10:00-11:30'),
(12, 6,  'Spring', 2022, 'A-102', 'Tue/Thu 10:00-11:30'),
(1,  7,  'Fall',   2021, 'A-201', 'Sun/Tue 13:00-14:30'),
(5,  10, 'Fall',   2020, 'C-101', 'Mon/Wed 09:00-10:30'),
(5,  10, 'Fall',   2021, 'C-101', 'Mon/Wed 09:00-10:30'),
(5,  10, 'Fall',   2022, 'C-101', 'Mon/Wed 09:00-10:30'),
(13, 11, 'Spring', 2021, 'C-102', 'Sun/Tue 11:00-12:30'),
(6,  12, 'Fall',   2020, 'C-201', 'Wed/Sat 10:00-11:30'),
(6,  12, 'Fall',   2021, 'C-201', 'Wed/Sat 10:00-11:30'),
(7,  14, 'Fall',   2020, 'D-101', 'Sun/Mon/Tue 09:00-10:00'),
(7,  14, 'Fall',   2021, 'D-101', 'Sun/Mon/Tue 09:00-10:00'),
(7,  14, 'Fall',   2022, 'D-101', 'Sun/Mon/Tue 09:00-10:00'),
(7,  15, 'Spring', 2021, 'D-102', 'Mon/Wed 11:00-12:30'),
(8,  16, 'Fall',   2020, 'D-201', 'Tue/Thu 08:00-09:30'),
(8,  16, 'Fall',   2021, 'D-201', 'Tue/Thu 08:00-09:30'),
(8,  16, 'Fall',   2022, 'D-201', 'Tue/Thu 08:00-09:30'),
(14, 18, 'Fall',   2022, 'A-301', 'Wed/Sat 13:00-14:30'),
(2,  19, 'Spring', 2021, 'A-302', 'Mon/Wed 15:00-16:30');

-- ============================================================
-- DATA — Scholarships
-- ============================================================
INSERT INTO scholarships (student_id, amount, type, start_date, end_date, notes) VALUES
(1,  5000,  'Merit',       '2022-09-01', '2023-08-31', 'Top student in CS'),
(8,  8000,  'Merit',       '2022-09-01', '2023-08-31', 'Highest GPA in Accounting'),
(14, 6000,  'Need-Based',  '2022-09-01', '2023-08-31', 'Financial support'),
(28, 10000, 'Merit',       '2022-09-01', '2023-08-31', 'National honor student'),
(24, 4000,  'Merit',       '2021-09-01', '2022-08-31', 'Excellence award'),
(11, 3000,  'Need-Based',  '2023-09-01', '2024-08-31', 'Partial support'),
(7,  5000,  'International','2021-09-01','2022-08-31', 'International student support');

-- ============================================================
-- JSONB metadata for some students
-- ============================================================
UPDATE students SET metadata = '{
  "hobbies": ["chess","reading","coding"],
  "languages": ["Arabic","English"],
  "extra_activities": "Student Union President",
  "laptop": true
}' WHERE student_id = 1;

UPDATE students SET metadata = '{
  "hobbies": ["painting","music"],
  "languages": ["Arabic","English","French"],
  "extra_activities": "Drama Club",
  "laptop": true
}' WHERE student_id = 8;

UPDATE students SET metadata = '{
  "hobbies": ["sports","gaming"],
  "languages": ["Arabic","English"],
  "laptop": false
}' WHERE student_id = 7;

UPDATE students SET metadata = '{
  "hobbies": ["reading","volunteering"],
  "languages": ["Arabic","English","German"],
  "extra_activities": "Research Assistant",
  "laptop": true
}' WHERE student_id = 28;

-- ============================================================
-- VERIFY
-- ============================================================
SELECT 'faculties'    AS tbl, COUNT(*) FROM faculties
UNION ALL SELECT 'departments', COUNT(*) FROM departments
UNION ALL SELECT 'professors',  COUNT(*) FROM professors
UNION ALL SELECT 'students',    COUNT(*) FROM students
UNION ALL SELECT 'courses',     COUNT(*) FROM courses
UNION ALL SELECT 'enrollments', COUNT(*) FROM enrollments
UNION ALL SELECT 'teaches',     COUNT(*) FROM teaches
UNION ALL SELECT 'scholarships',COUNT(*) FROM scholarships;

\echo '✅  university_db setup complete!'
