use ITI;


-- 1
SELECT COUNT(St_Age) AS Student_Num 
FROM Student;
-- OR --
SELECT COUNT(*) AS Student_Num
FROM Student WHERE St_Age IS NOT NULL;


-- 2
SELECT DISTINCT CONCAT_WS(' ', St_Fname, St_Lname) AS Student_Name
FROM Student;

-- 3
SELECT 
    S.St_Id AS 'Student ID',
    CONCAT_WS(' ', ISNULL(S.St_Fname, ''), ISNULL(S.St_Lname, '')) AS 'Student Full Name',
    ISNULL(D.Dept_Name, 'No Department') AS 'Department Name'
FROM Student AS S
LEFT JOIN Department AS D
    ON S.Dept_Id = D.Dept_Id;



-- 4
SELECT I.Ins_Name, D.Dept_Name
FROM Instructor AS I

LEFT JOIN Department AS D
ON I.Dept_Id = D.Dept_Id;


-- 5
SELECT CONCAT_WS(' ', S.St_Fname, S.St_Lname) AS Student_Name, C.Crs_Name
FROM Student AS S

INNER JOIN Stud_Course AS SC
ON S.St_Id = SC.St_Id AND SC.Grade IS NOT NULL

INNER JOIN Course AS C
ON SC.Crs_Id = C.Crs_Id;


-- 6
SELECT T.Top_Name, COUNT(C.Crs_Id) AS Course_Num
FROM Topic AS T

INNER JOIN Course AS C
ON T.Top_Id = C.Top_Id

GROUP BY T.Top_Name;


-- 7
SELECT Ins_Name, MIN(Salary) AS Min_Salary, MAX(Salary) AS Max_Salary
FROM Instructor

GROUP BY Ins_Name;


-- 8
SELECT Ins_Name, Salary
FROM Instructor
WHERE Salary < (SELECT AVG(Salary) FROM Instructor);



-- 9
SELECT D.Dept_Name
FROM Department AS D
INNER JOIN Instructor AS I
    ON D.Dept_Id = I.Dept_Id
WHERE I.Salary = (SELECT MIN(Salary) FROM Instructor);


-- 10
SELECT *
FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY Salary DESC) AS RN
    FROM Instructor
) AS Ranked
WHERE RN <= 2;


-- 11
SELECT Ins_Name, COALESCE(CAST(Salary AS VARCHAR(20)), 'Bonus') AS Salary_Status
FROM Instructor;


-- 12
SELECT AVG(Salary) AS Average_Salary
FROM Instructor;


-- 13
SELECT ST.St_Fname AS Student_Name, SUPER.*
FROM Student AS ST

INNER JOIN Student AS SUPER
ON ST.St_Super = SUPER.St_Id;


-- 14
SELECT *
FROM (
    SELECT 
        Ins_Id,
        Ins_Name,
        Dept_Id,
        Salary,
        DENSE_RANK() OVER (PARTITION BY Dept_Id ORDER BY Salary DESC) AS DR
    FROM Instructor
    WHERE Salary IS NOT NULL
) AS Ranked
WHERE DR <= 2;


-- 15
SELECT *
FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY Dept_Id ORDER BY NEWID()) AS RN
    FROM Student
) AS Randomized
WHERE RN = 1;


--------------------------------------------------------------------------
--------------------------------------------------------------------------
--------------------------------------------------------------------------

USE AdventureWorks2012;


-- 1
SELECT SalesOrderID, ShipDate
FROM Sales.SalesOrderHeader
WHERE ShipDate BETWEEN '7/28/2002' AND '7/29/2014';


-- 2
SELECT ProductID, Name
FROM Production.Product
WHERE StandardCost < 110.00;


-- 3
SELECT ProductID, Name
FROM Production.Product
WHERE Weight IS NULL;


-- 4
SELECT *
FROM Production.Product
WHERE Color IN ('Silver', 'Black', 'Red');


-- 5
SELECT *
FROM Production.Product
WHERE Name LIKE 'B%';
--- OR ---
SELECT * FROM Production.Product
WHERE SUBSTRING(Name, 1, 1) = 'B';


-- 6
UPDATE Production.ProductDescription
SET Description = 'Chromoly steel_High of defects'
WHERE ProductDescriptionID = 3;

SELECT * FROM Production.ProductDescription
WHERE Description LIKE '%[_]%';


-- 7
SELECT OrderDate, SUM(TotalDue) AS TotalDueSum
FROM Sales.SalesOrderHeader
WHERE OrderDate BETWEEN '2001-07-01' AND '2014-07-31'
GROUP BY OrderDate;


-- 8
SELECT DISTINCT HireDate FROM HumanResources.Employee;


-- 9
SELECT AVG(DISTINCT ListPrice) AS AvgUniqueListPrice
FROM Production.Product;


-- 10
SELECT 
    'The ' + Name + ' is only! ' + CAST(ListPrice AS varchar(20)) AS ProductInfo
FROM Production.Product
WHERE ListPrice BETWEEN 100 AND 120
ORDER BY ListPrice;


-- 11
--------- A
CREATE TABLE Sales.store_Archive;


SELECT rowguid, Name, SalesPersonID, Demographics
INTO Sales.store_Archive
FROM Sales.Store;
--------- B (transfer only structure)
SELECT rowguid ,Name, SalesPersonID, Demographics 
INTO Sales.store_Archive2
FROM Sales.Store
WHERE 1 = 0;



-- 12
SELECT CONVERT(varchar, GETDATE(), 101) AS [Date_Style]   -- mm/dd/yyyy
UNION ALL
SELECT CONVERT(varchar, GETDATE(), 103)                   -- dd/mm/yyyy
UNION ALL
SELECT CONVERT(varchar, GETDATE(), 105)                   -- dd-mm-yyyy
UNION ALL
SELECT FORMAT(GETDATE(), 'dddd, MMMM dd, yyyy')           -- Wednesday, October 23, 2025
UNION ALL
SELECT FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm:ss');          -- 2025-10-23 07:30:00


