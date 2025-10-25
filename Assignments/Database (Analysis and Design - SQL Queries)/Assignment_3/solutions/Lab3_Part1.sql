use Company_SD;

-- 1
select D.Dnum, D.Dname, M.SSN, CONCAT_WS(' ', M.Fname,M.Lname) AS Manager_Name
from Departments AS D inner join Employee AS M
ON D.MGRSSN = M.SSN;


-- 2
select D.Dname, P.Pname 
from Departments AS D inner join Project AS P
ON P.Dnum = D.Dnum;

-- 3
-- select D.*, CONCAT_WS(' ', E.Fname, E.Lname) AS Employee_Name
select D.Dependent_name, D.Sex, D.Bdate, CONCAT_WS(' ', E.Fname, E.Lname) AS Employee_Name
from Dependent AS D inner join Employee AS E
ON D.ESSN = E.SSN;

-- 4
select Pnumber, Pname, Plocation from Project WHERE City in ('Cairo', 'Alex');

-- 5
select * from Project where Pname LIKE 'a%';

-- 6
select * from Employee WHERE Dno = 30 AND (Salary Between 1000 and 2000);

-- 7
SELECT CONCAT_WS(' ', Fname, Lname) AS Ename from Employee AS E

inner join Works_for AS WF
ON WF.ESSn = E.SSN AND WF.Hours >= 10

inner join Project AS P
ON WF.Pno = P.Pnumber AND P.Pname = 'AL Rabwah'

WHERE Dno = 10; 

-- 8
select CONCAT_WS(' ', E.Fname, E.Lname) AS Employee_Name, CONCAT_WS(' ', S.Fname, S.Lname) AS Supervisor_Name
from Employee AS E
inner join Employee AS S
ON S.SSN = E.Superssn AND CONCAT_WS(' ', S.Fname, S.Lname) = 'Kamel Mohamed';

-- 9
SELECT CONCAT_WS(' ', E.Fname, E.Lname) AS Employee_Name, P.Pname
from Employee AS E 

inner join Works_for AS WF
ON WF.ESSn = E.SSN

inner join Project AS P
ON WF.Pno = P.Pnumber

ORDER BY P.Pname ASC;


-- 10
SELECT P.Pnumber, D.Dname, CONCAT_WS(' ', E.Fname, E.Lname) AS Department_Manager_Lname
from Project AS P

inner join Departments AS D
ON D.Dnum = P.Dnum

inner join Employee AS E
ON D.MGRSSN = E.SSN

where P.City = 'Cairo'

-- 11
SELECT E.SSN, CONCAT_WS(' ', E.Fname, E.Lname) as Manger_Name, E.Dno, E.Sex, E.Bdate , E.Address, E.Salary
FROM Employee AS E

inner join Departments AS D
ON D.MGRSSN = E.SSN;


-- 12
SELECT E.*, D.*
FROM Employee AS E
FULL OUTER JOIN Dependent AS D
    ON D.ESSN = E.SSN;

-- 13
INSERT INTO Employee (SSN, Fname, Lname, Bdate, Address, Sex, Superssn, Salary, Dno) 
VALUES 
(102672, 'ahmed', 'maher', '2/4/2003', 'Shirbin, Daqahlia Governrate, egypt', 'M', 112233, 3000, 30);

SELECT * FROM Employee WHERE SSN = 102672;

-- 14
INSERT INTO Employee (SSN, Fname, Lname, Bdate, Address, Sex, Dno) 
VALUES 
(102660, 'aya', 'maher', '1/1/2001', 'Shirbin, Daqahlia Governrate, egypt', 'F', 30);

SELECT * FROM Employee WHERE SSN = 102660;

-- 15
UPDATE Employee SET Salary+=Salary*0.2 WHERE SSN = 102672;