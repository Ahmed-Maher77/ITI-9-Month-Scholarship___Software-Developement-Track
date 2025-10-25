use Company_SD;

-- 1
SELECT D.Dependent_name, D.Sex 
FROM Dependent as D

INNER JOIN Employee as E
ON D.ESSN = E.SSN AND E.Sex = 'F' and D.Sex = 'F'

UNION ALL

SELECT D.Dependent_name, D.Sex 
FROM Dependent as D

INNER JOIN Employee as E
ON D.ESSN = E.SSN AND E.Sex = 'M'

WHERE D.Sex = 'M';


-- 2
SELECT P.Pname, SUM(WF.Hours) AS Total_Hours
FROM Project AS P
INNER JOIN Works_for AS WF
    ON P.Pnumber = WF.Pno
GROUP BY P.Pname;



-- 3
SELECT * FROM Departments
WHERE Dnum = (SELECT Min(Dnum) FROM Departments);


SELECT D.*
FROM Departments AS D
WHERE D.Dnum = (
    SELECT E.Dno
    FROM Employee AS E
    WHERE E.SSN = (SELECT MIN(SSN) FROM Employee)
);

-- 4
SELECT 
    D.Dname, 
    MIN(E.Salary) AS Min_Salary, 
    MAX(E.Salary) AS Max_Salary, 
    AVG(E.Salary) AS Avg_Salary
FROM Departments AS D
INNER JOIN Employee AS E
    ON D.Dnum = E.Dno
GROUP BY D.Dname;



-- 5
SELECT CONCAT_WS(' ', E.Fname, E.Lname) AS Manager_Full_Name
FROM Employee AS E

INNER JOIN Departments AS D
ON E.SSN = D.MGRSSN;


-- 6
SELECT 
    D.Dnum, 
    D.Dname, 
    COUNT(E.SSN) AS Employee_Count
FROM Departments AS D

INNER JOIN Employee AS E
    ON D.Dnum = E.Dno

GROUP BY D.Dnum, D.Dname

HAVING AVG(E.Salary) < (SELECT AVG(Salary) FROM Employee);


-- 7
SELECT CONCAT_WS(' ', E.Fname, E.Lname) AS Full_Name, P.Pname
FROM Employee AS E

INNER JOIN Works_for AS WF
    ON E.SSN = WF.ESSN

INNER JOIN Project AS P
    ON WF.Pno = P.Pnumber

ORDER BY E.Dno, E.Fname, E.Lname;



-- 8
SELECT MAX(Salary) AS Max_Salary_1 FROM Employee  -- HIGHEST SALARY

UNION

SELECT MAX(Salary) FROM Employee  -- SECOND HIGHEST SALARY
WHERE Salary < (SELECT MAX(Salary) FROM Employee)

ORDER BY Max_Salary_1 DESC;

------ or: ------
SELECT Top 2 Salary FROM Employee ORDER BY Salary DESC;


-- 9
SELECT CONCAT_WS(' ', Fname, Lname) AS Full_Name
FROM Employee

INTERSECT

SELECT Dependent_name
FROM Dependent;




-- 10
SELECT E.SSN, CONCAT_WS(' ', E.Fname, E.Lname) AS Full_Name
FROM Employee AS E

WHERE EXISTS (SELECT 1 FROM Dependent AS D WHERE D.ESSN = E.SSN)

-- INNER JOIN Dependent AS D
--    ON E.SSN = D.ESSN




-- 11
INSERT INTO Departments (Dname, Dnum, MGRSSN, [MGRStart Date])
VALUES
('DEPT IT', 100, 112233, '2006-11-01');

SELECT * FROM Departments WHERE Dnum = 100;


-- 12
------------- a
UPDATE Departments SET MGRSSN = 968574, [MGRStart Date] = GETDATE()
WHERE Dnum = 100;

select * from Departments WHERE Dnum = 100;

------------- b
UPDATE Employee SET Dno = 20
WHERE SSN = 102672;

select * from Employee WHERE SSN = 102672;

------------- c
UPDATE Employee SET Superssn = 102660
WHERE SSN = 102672;



-- 13: Mr.Kamel Mohamed Deletion
-- 1. Reassign department manager
UPDATE Departments 
SET MGRSSN = 102672, [MGRStart Date] = GETDATE()
WHERE MGRSSN = 223344;

-- 2. Reassign supervisor
UPDATE Employee 
SET Superssn = 102672 
WHERE Superssn = 223344;

-- 3. Reassign his projects
UPDATE Works_for 
SET ESSn = 102672 
WHERE ESSn = 223344;

-- 4. Delete dependents
DELETE FROM Dependent 
WHERE ESSN = 223344;

-- 5. Finally, delete the employee
DELETE FROM Employee 
WHERE SSN = 223344;



-- 14
UPDATE Employee
SET Salary = Salary * 1.3
    FROM Employee AS E
    INNER JOIN Works_for AS WF ON WF.ESSn = E.SSN
    INNER JOIN Project AS P ON WF.Pno = P.Pnumber
    WHERE P.Pname = 'Al Rabwah'
;



-- 14
-- 9
-- 2