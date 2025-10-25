use Company_SD

-- 1
select * from Employee;

-- 2
select Fname, Lname, Salary, Dno from Employee;

-- 3
select Pname, Plocation, Dnum from Project;   
-- or: 
select P.Pname, P.Plocation, D.Dname FROM Project AS P INNER JOIN Departments AS D ON P.Dnum = D.Dnum;

-- 4
select Fname+' '+Lname AS fullName, (Salary * 0.1) AS 'ANNUAL COMM' from Employee;

-- 5
select * from Employee where Salary > 1000;

-- 6
select * from Employee where (Salary * 12) > 10000;

-- 7
select * from Employee where Sex = 'F';

-- 8
select Dnum, Dname from Departments where MGRSSN = 968574;

-- 9
select Pnumber, Pname, Plocation from Project where Dnum = 10;