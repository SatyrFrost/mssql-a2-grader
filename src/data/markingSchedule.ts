export const rawMarkingSchedule = `
Q1		
SELECT		1
FROM		1
WHERE		1
ORDER		1
		
		
Q2		
SELECT		1
FROM		1
WHERE		1
ORDER		1
		
		
Q3		
SELECT		1
FROM		1
WHERE		1
ORDER		1
		
		
Q4		
SELECT		1
FROM		1
WHERE		2
		
		
Q5		
MAX		0.5
MIN		0.5
COUNT		0.5
SUM		0.5
AVG		0.5
FROM		0.5
[labels]		1
		
		
Q6		
SELECT		1
FROM		0.5
WHERE		1
GROUP		1
ORDER		0.5
		
		
Q7		
SELECT		1
FROM		0.5
WHERE		1
GROUP		1
ORDER		0.5
		
		
Q8		
SELECT		1
FROM		1
WHERE		2
		
		
Q9		
SELECT		0.5
FROM		0.5
LEFT		1
AND		1
AND		1
		
		
Q10		
CREATE		1
SELECT		2
FROM		1
		
		
Q11		
@CID INT		0.5
DECLARE @CustID AS INT		0.5
DECLARE @CPh AS VARCHAR(100)		0.5
DECLARE @CFName AS VARCHAR(100)		0.5
DECLARE @CFamName AS VARCHAR(100)		0.5
DECLARE @CA1 AS VARCHAR(100)		0.5
DECLARE @CA2 AS VARCHAR(100)		0.5
DECLARE @CA3 AS VARCHAR(100)		0.5
SELECT CustomerID, FirstName, FamilyName, Address1, Address2, Address3, Phone		0.5
FROM Customer		0.5
WHERE CustomerID = @CID		1
FETCH NEXT FROM @CustomerCursor INTO @CustID, @CFName, @CFamName, @CA1, @CA2, @CA3, @CPh 		0.5
PRINT 'CUSTOMER DETAILS'		0.5
PRINT ''		0.5
PRINT 'Customer ID: ' + CAST(@CustID AS VARCHAR(10) + '        Phone: ' + @CPh		0.5
PRINT 'Customer Name: ' + @CFName + ' ' + @CFamName		0.5
PRINT 'Address: ' + @CA1 + ', ' + @CA2 + ', ' + @CA3		0.5
FETCH NEXT FROM @CustomerCursor INTO @CustID, @CPh, @CFName, @CFamName, @CA1, @CA2, @CA3 		0.5
EXEC CustomerDetails 1		0.5
		
		
		
Q12		
@RID VARCHAR(10)		0.5
DECLARE @RegID AS VARCHAR(10)		0.5
DECLARE @CColour AS VARCHAR(100)		0.5
DECLARE @CMake AS VARCHAR(100)		0.5
DECLARE @CModel AS VARCHAR(100)		0.5
DECLARE @CYear AS INT		0.5
DECLARE @CNumOwn AS INT		0.5
DECLARE @CPrice AS MONEY		0.5
DECLARE @CKm AS INT		0.5
SELECT RegistrationID, ColourName, Make, Model, CarYear, NumOwners, Price, Kilometres		0.5
FROM Car, LU_Colour		0.5
WHERE Car.ColourID = LU_Colour.ColourID		0.5
AND RegistrationID = @RID		0.5
PRINT 'VEHICLE DETAILS:'		0.5
PRINT 'Registration ID: ' + @RegID 		0.5
PRINT 'Year: ' + CAST(@CYear AS VARCHAR(10)) + '       ' + 'Make: ' + @CMake + '       ' + 'Model: ' + @CModel		0.5
PRINT 'Colour: ' + @CColour + '       ' + 'Owners: ' + CAST(@CNumOwn AS VARCHAR(10)) + '       ' + 'Kilometres: ' + CAST(@CKm AS VARCHAR(10)) + 'km'		0.5
PRINT 'Price: $' + CAST(@CPrice AS VARCHAR(10)) 		0.5
FETCH NEXT FROM @CarCursor INTO @RegID, @CColour, @CMake, @CModel, @CYear, @CNumOwn, @CPrice, @CKm		0.5
EXEC CarDetails 'ALP394'		0.5
		
		
		
Q13		
@SID INT		0.5
DECLARE @SPID AS INT		1
DECLARE @SFname AS VARCHAR(100)		0.5
DECLARE @SFamName AS VARCHAR(100)		0.5
DECLARE @SPh AS VARCHAR(100)		0.5
SELECT SalespersonID, FirstName, FamilyName, Phone 		1
FROM Salesperson		0.5
WHERE SalespersonID = @SID		1
FETCH NEXT FROM @SalespersonCursor INTO @SPID, @SFname, @SFamName, @SPh		0.5
PRINT 'SALESPERSON DETAILS:'		0.5
PRINT ''		0.5
PRINT 'Salesperson ID: ' + CAST(@SPID AS VARCHAR(10)) + '        Phone: ' + @SPh		1
PRINT 'Name: ' + @SFname + ' ' + @SFamName		0.5
FETCH NEXT FROM @SalespersonCursor INTO @SPID, @SFname, @SFamName, @SPh		0.5
EXEC SalespersonDetails 1		1
		
		
		
		
		
Q14		
CREATE FUNCTION KmToMiles (		1
@km INT )		1
RETURNS FLOAT		1
AS		1
BEGIN		1
RETURN @km * 0.62		2
END		1
CAST(dbo.KmToMiles(@km) AS VARCHAR(10)) + ' miles'		2
`;

export const parseMarkingSchedule = (scheduleText: string) => {
  const parsedSchedule: { [key: string]: { [key: string]: number } } = {};
  const lines = scheduleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let currentQuestionId = '';
  const questionRegex = /^Q(\d+)$/; // Matches Q1, Q2, etc.
  const itemRegex = /^(.+?)\s+(\d+(\.\d+)?)$/; // Matches "KEYWORD 1", "KEYWORD 0.5"

  for (const line of lines) {
    const questionMatch = line.match(questionRegex);
    if (questionMatch) {
      currentQuestionId = `Q${questionMatch[1]}`;
      parsedSchedule[currentQuestionId] = {};
    } else if (currentQuestionId) {
      const itemMatch = line.match(itemRegex);
      if (itemMatch) {
        const keyword = itemMatch[1].trim();
        const points = parseFloat(itemMatch[2]);
        if (!isNaN(points)) {
          parsedSchedule[currentQuestionId][keyword] = points;
        }
      }
    }
  }
  return parsedSchedule;
};

export const markingSchedule = parseMarkingSchedule(rawMarkingSchedule);