export const modelAnswersSql = `
--Q1
SELECT InvoiceID, DateSold, RegistrationID, Price, Customer.FirstName, Customer.FamilyName, Salesperson.FirstName, 
Salesperson.FamilyName 
FROM Sale JOIN Customer 
ON Sale.CustomerID = Customer.CustomerID JOIN Salesperson 
ON Salesperson.SalespersonID = Sale.SalespersonID
WHERE MONTH(DateSold) = 7
ORDER BY DateSold DESC

--Q2
SELECT PaymentInvoiceID, PaymentDate, Amount, Sale.InvoiceID, RegistrationID
FROM Payment JOIN Sale ON Payment.InvoiceID = Sale.InvoiceID
WHERE Payment.CustomerID = 2
ORDER BY PaymentDate

--Q3
SELECT  FirstName,  FamilyName, Make, Sale.RegistrationID, Sale.Price
FROM Customer JOIN Sale ON Customer.CustomerID = Sale.CustomerID
JOIN Car ON Sale.RegistrationID = Car.RegistrationID
ORDER BY Make

--Q4
SELECT OrderID, Salesperson.SalespersonID, FirstName, FamilyName, OrderDate, Total
FROM Orders JOIN Salesperson
ON Orders.SalespersonID = Salesperson.SalespersonID

--Q5
SELECT MAX(Price) AS 'Max', MIN(Price) AS 'Min', COUNT(InvoiceID) AS 'Count', SUM(Price) AS 'Total', AVG(Price) AS 'Average'
FROM Sale

--Q6
SELECT Make, SUM(Quantity) AS 'Total Quantity', SUM(SubTotal) AS 'Total', MAX(SubTotal) AS 'Max', AVG(SubTotal) AS 'AVG', COUNT(DISTINCT OrderID) AS 'Count'
FROM Product JOIN OrdersProduct
ON Product.ProductID = OrdersProduct.ProductID
GROUP BY Make
ORDER BY SUM(Quantity) DESC

--Q7
SELECT ColourName AS 'Colour Name', COUNT(InvoiceID) AS 'Count'
FROM Sale JOIN Car 
ON Sale.RegistrationID = Car.RegistrationID
JOIN LU_Colour
ON Car.ColourID = LU_Colour.ColourID
GROUP BY ColourName
ORDER BY COUNT(InvoiceID) DESC

--Q8
SELECT Make, Model, ProductYear, Price
FROM Product 
WHERE ProductID NOT IN (
	SELECT ProductID FROM OrdersProduct
)

--Q9
SELECT FirstName, FamilyName, DateSold
FROM Salesperson LEFT OUTER JOIN Sale
ON Salesperson.SalespersonID = Sale.SalespersonID
AND MONTH(DateSold) = 7 AND YEAR(DateSold) = 2015

--Q10

CREATE VIEW Sale_Summary
AS
SELECT MAX(Price) AS 'Max', MIN(Price) AS 'Min', COUNT(InvoiceID) AS 'Count', SUM(Price) AS 'Total', AVG(Price) AS 'Average'
FROM Sale


--------------------------------------------

--Q11

GO

DROP PROCEDURE CustomerDetails

GO

CREATE PROCEDURE CustomerDetails
(
   @CID INT
)

AS

BEGIN

   --Declare the variables   
   DECLARE @CFiN AS VARCHAR(100)
   DECLARE @CFaN AS VARCHAR(100)
   DECLARE @CA1 AS VARCHAR(100)
   DECLARE @CA2 AS VARCHAR(100)
   DECLARE @CA3 AS VARCHAR(100)
   DECLARE @Ph AS VARCHAR(20)

   --Declare the cursor
   DECLARE @CustomerCursor AS CURSOR

   --Put a query in the cursor
   SET @CustomerCursor = CURSOR FOR 
      SELECT CustomerID, FirstName, FamilyName, Phone, Address1, Address2, Address3
      FROM Customer
      WHERE CustomerID = @CID

   --Open the cursor
   OPEN @CustomerCursor

   --Get the first row
   FETCH NEXT FROM @CustomerCursor INTO @CID, @CFiN, @CFaN, @Ph, @CA1, @CA2, @CA3
	
   PRINT 'CUSTOMER DETAILS:'
   PRINT ''
   
   --Loop until there are no more rows
   WHILE @@FETCH_STATUS = 0
      BEGIN		 		
		 PRINT 'Customer ID: ' + CONVERT(VARCHAR(10), @CID) + '        Phone: ' + @Ph
		 PRINT 'Customer Name: ' + @CFiN + ' ' + @CFaN
		 PRINT 'Address: ' + @CA1 + ', ' + @CA2 + ', ' + @CA3
		 PRINT ''
		 FETCH NEXT FROM @CustomerCursor INTO @CID, @CFiN, @CFaN, @Ph, @CA1, @CA2, @CA3
	END

   --Close the cursor
   CLOSE @CustomerCursor

   --Delete the cursor
   DEALLOCATE @CustomerCursor

END

GO 

EXEC CustomerDetails 1



--Q12

GO

DROP PROCEDURE CarDetails

GO

CREATE PROCEDURE CarDetails
(
   @RID VARCHAR(20)
)

AS

BEGIN

   --Declare the variables   
   DECLARE @Yr AS INT
   DECLARE @Mk AS VARCHAR(100)
   DECLARE @Md AS VARCHAR(100)
   DECLARE @Col AS VARCHAR(100)
   DECLARE @Own AS INT
   DECLARE @Km AS INT
   DECLARE @Pr AS MONEY

   --Declare the cursor
   DECLARE @CarCursor AS CURSOR

   --Put a query in the cursor
   SET @CarCursor = CURSOR FOR 
      SELECT RegistrationID, CarYear, Make, Model, ColourName, NumOwners, Kilometres, Price
      FROM Car JOIN LU_Colour
      ON Car.ColourID = LU_Colour.ColourID
      WHERE RegistrationID = @RID

   --Open the cursor
   OPEN @CarCursor

   --Get the first row
   FETCH NEXT FROM @CarCursor INTO @RID, @Yr, @Mk, @Md, @Col, @Own, @Km, @Pr
	
   PRINT 'VEHICLE DETAILS:'
   PRINT ''
	
   --Loop until there are no more rows
   WHILE @@FETCH_STATUS = 0
      BEGIN		 
		 PRINT 'Registration ID: ' + CONVERT(VARCHAR(10), @RID)
		 PRINT 'Year: ' + CONVERT(VARCHAR(10), @Yr) + '       ' + 'Make: ' + @Mk + '       ' + 'Model: ' + @Md
		 PRINT 'Colour: ' + @Col + '       ' + 'Owners: ' + CONVERT(VARCHAR(10), @Own) + '       ' + 'Kilometres: ' + CONVERT(VARCHAR(10),@Km) + 'km'	
		 PRINT 'Price:  + CONVERT(VARCHAR(10), @Pr)
	     PRINT ''
		 FETCH NEXT FROM @CarCursor INTO @RID, @Yr, @Mk, @Md, @Col, @Own, @Km, @Pr
	END

   --Close the cursor
   CLOSE @CarCursor

   --Delete the cursor
   DEALLOCATE @CarCursor

END

GO 

EXEC CarDetails 'ALP394'


--Q13

GO

DROP PROCEDURE SalespersonDetails

GO

CREATE PROCEDURE SalespersonDetails
(
   @SPID VARCHAR(20)
)

AS

BEGIN

   --Declare the variables     
   DECLARE @FiN AS VARCHAR(100)
   DECLARE @FaN AS VARCHAR(100)
   DECLARE @Ph AS VARCHAR(100)

   --Declare the cursor
   DECLARE @SPCursor AS CURSOR

   --Put a query in the cursor
   SET @SPCursor = CURSOR FOR 
      SELECT SalesPersonID, FirstName, FamilyName, Phone
      FROM SalesPerson
      WHERE SalesPersonID = @SPID

   --Open the cursor
   OPEN @SPCursor

   --Get the first row
   FETCH NEXT FROM @SPCursor INTO @SPID, @FiN, @FaN, @Ph
	
   PRINT 'SALESPERSON DETAILS:'
   PRINT ''
	
   --Loop until there are no more rows
   WHILE @@FETCH_STATUS = 0
      BEGIN		 
		 PRINT 'Salesperson ID: ' + @SPID + '        Phone: ' + @Ph
		 PRINT 'Name: ' + @FiN + ' ' + @FaN
	     PRINT ''
		 FETCH NEXT FROM @SPCursor INTO @SPID, @FiN, @FaN, @Ph
	END

   --Close the cursor
   CLOSE @SPCursor

   --Delete the cursor
   DEALLOCATE @SPCursor

END

GO 

EXEC SalespersonDetails 1





--Q14

GO

DROP FUNCTION KmToMiles

GO

CREATE FUNCTION KmToMiles
(
   @km INT
)

RETURNS FLOAT

AS

BEGIN

   RETURN @km * 0.62

END


GO

DROP PROCEDURE CarDetails2

GO

CREATE PROCEDURE CarDetails2
(
   @RID VARCHAR(20)
)

AS

BEGIN

   --Declare the variables   
   DECLARE @Yr AS INT
   DECLARE @Mk AS VARCHAR(100)
   DECLARE @Md AS VARCHAR(100)
   DECLARE @Col AS VARCHAR(100)
   DECLARE @Own AS INT
   DECLARE @Km AS INT
   DECLARE @Pr AS MONEY

   --Declare the cursor
   DECLARE @CarCursor AS CURSOR

   --Put a query in the cursor
   SET @CarCursor = CURSOR FOR 
      SELECT RegistrationID, CarYear, Make, Model, ColourName, NumOwners, Kilometres, Price
      FROM Car JOIN LU_Colour
      ON Car.ColourID = LU_Colour.ColourID
      WHERE RegistrationID = @RID

   --Open the cursor
   OPEN @CarCursor

   --Get the first row
   FETCH NEXT FROM @CarCursor INTO @RID, @Yr, @Mk, @Md, @Col, @Own, @Km, @Pr
	
   PRINT 'VEHICLE DETAILS:'
   PRINT ''
	
   --Loop until there are no more rows
   WHILE @@FETCH_STATUS = 0
      BEGIN		 
		 PRINT 'Registration ID: ' + CONVERT(VARCHAR(10), @RID)
		 PRINT 'Year: ' + CONVERT(VARCHAR(10), @Yr) + '       ' + 'Make: ' + @Mk + '       ' + 'Model: ' + @Md
		 PRINT 'Colour: ' + @Col + '       ' + 'Owners: ' + CONVERT(VARCHAR(10), @Own) + '       ' + 'Kilometres: ' + CONVERT(VARCHAR(10),@Km) + 'km, Mileage: ' + CONVERT(VARCHAR(10), dbo.KmToMiles(@km)) + ' miles'	
		 PRINT 'Price:  + CONVERT(VARCHAR(10), @Pr)
	     PRINT ''
		 FETCH NEXT FROM @CarCursor INTO @RID, @Yr, @Mk, @Md, @Col, @Own, @Km, @Pr
	END

   --Close the cursor
   CLOSE @CarCursor

   --Delete the cursor
   DEALLOCATE @CarCursor

END

GO 

EXEC CarDetails2 'ALP394'
`;