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
   DECLARE @CustID AS INT
   DECLARE @CPh AS VARCHAR(100)
   DECLARE @CFName AS VARCHAR(100)
   DECLARE @CFamName AS VARCHAR(100)
   DECLARE @CA1 AS VARCHAR(100)
   DECLARE @CA2 AS VARCHAR(100)
   DECLARE @CA3 AS VARCHAR(100)

   --Declare the cursor
   DECLARE @CustomerCursor AS CURSOR

   --Put a query in the cursor
   SET @CustomerCursor = CURSOR FOR 
      SELECT CustomerID, FirstName, FamilyName, Address1, Address2, Address3, Phone
      FROM Customer
      WHERE CustomerID = @CID

   --Open the cursor
   OPEN @CustomerCursor

   --Get the first row
   FETCH NEXT FROM @CustomerCursor INTO @CustID, @CFName, @CFamName, @CA1, @CA2, @CA3, @CPh
	
   PRINT 'CUSTOMER DETAILS:'
   PRINT ''
   
   --Loop until there are no more rows
   WHILE @@FETCH_STATUS = 0
      BEGIN		 		
		 PRINT 'Customer ID: ' + CONVERT(VARCHAR(10), @CustID)  + '        Phone: ' + @CPh
		 PRINT 'Customer Name: ' + @CFName + ' ' + @CFamName
		 PRINT 'Address: ' + @CA1 + ', ' + @CA2 + ', ' + @CA3
		 PRINT ''
		 FETCH NEXT FROM @CustomerCursor INTO @CustID, @CPh, @CFName, @CFamName, @CA1, @CA2, @CA3
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
   @RID VARCHAR(10)
)

AS

BEGIN

   --Declare the variables   
   DECLARE @RegID AS VARCHAR(10)
   DECLARE @CColour AS VARCHAR(100)
   DECLARE @CMake AS VARCHAR(100)
   DECLARE @CModel AS VARCHAR(100)
   DECLARE @CYear AS INT
   DECLARE @CNumOwn AS INT
   DECLARE @CPrice AS MONEY
   DECLARE @CKm AS INT

   --Declare the cursor
   DECLARE @CarCursor AS CURSOR

   --Put a query in the cursor
   SET @CarCursor = CURSOR FOR 
      SELECT RegistrationID, ColourName, Make, Model, CarYear, NumOwners, Price, Kilometres
      FROM Car, LU_Colour
      WHERE Car.ColourID = LU_Colour.ColourID
      AND RegistrationID = @RID

   --Open the cursor
   OPEN @CarCursor

   --Get the first row
   FETCH NEXT FROM @CarCursor INTO @RegID, @CColour, @CMake, @CModel, @CYear, @CNumOwn, @CPrice, @CKm
	
   PRINT 'VEHICLE DETAILS:'
   PRINT ''
	
   --Loop until there are no more rows
   WHILE @@FETCH_STATUS = 0
      BEGIN		 
		 PRINT 'Registration ID: ' + @RegID 
		 PRINT 'Year: ' + CONVERT(VARCHAR(10), @CYear) + '       ' + 'Make: ' + @CMake + '       ' + 'Model: ' + @CModel
		 PRINT 'Colour: ' + @CColour + '       ' + 'Owners: ' + CONVERT( VARCHAR(10), @CNumOwn ) + '       ' + 'Kilometres: ' + CONVERT(VARCHAR(10), @CKm  ) + 'km'
		 PRINT 'Price: $' + CONVERT(VARCHAR(10), @CPrice) 
	     PRINT ''
		 FETCH NEXT FROM @CarCursor INTO @RegID, @CColour, @CMake, @CModel, @CYear, @CNumOwn, @CPrice, @CKm
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
   @SID INT
)

AS

BEGIN

   --Declare the variables     
   DECLARE @SPID AS INT
   DECLARE @SFname AS VARCHAR(100)
   DECLARE @SFamName AS VARCHAR(100)
   DECLARE @SPh AS VARCHAR(100)

   --Declare the cursor
   DECLARE @SalespersonCursor AS CURSOR

   --Put a query in the cursor
   SET @SalespersonCursor = CURSOR FOR 
      SELECT SalespersonID, FirstName, FamilyName, Phone
      FROM SalesPerson
      WHERE SalespersonID = @SID

   --Open the cursor
   OPEN @SalespersonCursor

   --Get the first row
   FETCH NEXT FROM @SalespersonCursor INTO @SPID, @SFname, @SFamName, @SPh
	
   PRINT 'SALESPERSON DETAILS:'
   PRINT ''
	
   --Loop until there are no more rows
   WHILE @@FETCH_STATUS = 0
      BEGIN		 
		 PRINT 'Salesperson ID: ' + CONVERT( VARCHAR(10), @SPID ) + '        Phone: ' + @SPh
		 PRINT 'Name: ' + @SFname + ' ' + @SFamName
	     PRINT ''
		 FETCH NEXT FROM @SalespersonCursor INTO @SPID, @SFname, @SFamName, @SPh
	END

   --Close the cursor
   CLOSE @SalespersonCursor

   --Delete the cursor
   DEALLOCATE @SalespersonCursor

END

GO 

EXEC SalespersonDetails 1





--Q14

GO

DROP FUNCTION KmToMiles

GO

CREATE FUNCTION KmToMiles (
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
		 PRINT 'Colour: ' + @Col + '       ' + 'Owners: ' + CONVERT(VARCHAR(10), @Own) + '       ' + 'Kilometres: ' + CONVERT(VARCHAR(10),@Km) + 'km, Mileage: ' + CONVERT(VARCHAR(10), dbo.KmToMiles(@Km)) + ' miles'	
		 PRINT 'Price: $' + CONVERT(VARCHAR(10), @Pr)
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