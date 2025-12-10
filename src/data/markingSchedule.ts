export const rawMarkingSchedule = `
--Q1
SELECT		1
FROM		1
WHERE		1
ORDER		1
		
		
--Q2
SELECT		1
FROM		1
WHERE		1
ORDER		1
		
		
--Q3
SELECT		1
JOIN 1		1
JOIN 2		1
ORDER		1
		
		
--Q4
SELECT		1
FROM		1
JOIN		2
		
		
--Q5
MAX		0.5
MIN		0.5
COUNT		0.5
SUM		0.5
AVG		0.5
FROM		0.5
[labels]		1
		
		
--Q6
SELECT		1
FROM		0.5
JOIN		1
GROUP BY		1
ORDER		0.5
		
		
--Q7
SELECT		0.5
FROM		0.5
JOIN 1		1
JOIN 2		1
GROUP		0.5
ORDER		0.5
		
		
--Q8
SELECT		1
FROM		1
WHERE .. NOT IN		1
Subquery		1
		
		
--Q9
SELECT		0.5
FROM		0.5
LEFT OUTER JOIN		1
AND 1		1
AND 2		1
		
		
--Q10
CREATE		1
SELECT		2
FROM		1
		
		
--Q11
@CID INT		0.5
DECLARE @CFiN AS VARCHAR(100)		0.5
DECLARE @CFaN AS VARCHAR(100)		0.5
DECLARE @CA1 AS VARCHAR(100)		0.5
DECLARE @CA2 AS VARCHAR(100)		0.5
DECLARE @CA3 AS VARCHAR(100)		0.5
DECLARE @Ph AS VARCHAR(20)		0.5
SELECT CustomerID, FirstName, FamilyName, Phone, Address1, Address2, Address3		0.5
FROM Customer		0.5
WHERE CustomerID = @CID		1
FETCH NEXT FROM @CustomerCursor INTO @CID, @CFiN, @CFaN, @Ph, @CA1, @CA2, @CA3		0.5
PRINT 'CUSTOMER DETAILS:'		0.5
PRINT ''		0.5
PRINT 'Customer ID: ' + CONVERT(VARCHAR(10), @CID) + '        Phone: ' + @Ph		0.5
PRINT 'Customer Name: ' + @CFiN + ' ' + @CFaN		0.5
PRINT 'Address: ' + @CA1 + ', ' + @CA2 + ', ' + @CA3		0.5
FETCH NEXT FROM @CustomerCursor INTO @CID, @CFiN, @CFaN, @Ph, @CA1, @CA2, @CA3		0.5
EXEC CustomerDetails 1		0.5
		
		
		
--Q12		
@RID VARCHAR(20)		0.5
DECLARE @Yr AS INT		0.5
DECLARE @Mk AS VARCHAR(100)		0.5
DECLARE @Md AS VARCHAR(100)		0.5
DECLARE @Col AS VARCHAR(100)		0.5
DECLARE @Own AS INT		0.5
DECLARE @Km AS INT		0.5
DECLARE @Pr AS MONEY		0.5
SELECT RegistrationID, CarYear, Make, Model, ColourName, NumOwners, Kilometres, Price		0.5
FROM Car JOIN LU_Colour		0.5
ON Car.ColourID = LU_Colour.ColourID		0.5
WHERE RegistrationID = @RID		1
PRINT 'VEHICLE DETAILS:'		0.5
PRINT ''		0.5
PRINT 'Registration ID: ' + CONVERT(VARCHAR(10), @RID)		0.5
PRINT 'Year: ' + CONVERT(VARCHAR(10), @Yr) + '       ' + 'Make: ' + @Mk + '       ' + 'Model: ' + @Md		0.5
PRINT 'Colour: ' + @Col + '       ' + 'Owners: ' + CONVERT(VARCHAR(10), @Own) + '       ' + 'Kilometres: ' + CONVERT(VARCHAR(10),@Km) + 'km'		0.5
PRINT 'Price:  + CONVERT(VARCHAR(10), @Pr)		0.5
FETCH NEXT FROM @CarCursor INTO @RID, @Yr, @Mk, @Md, @Col, @Own, @Km, @Pr		0.5
EXEC CarDetails 'ALP394'		0.5


--Q13		
@SPID VARCHAR(20)		0.5
DECLARE @FiN AS VARCHAR(100)		0.5
DECLARE @FaN AS VARCHAR(100)		0.5
DECLARE @Ph AS VARCHAR(100)		0.5
SELECT SalespersonID, FirstName, FamilyName, Phone		1
FROM Salesperson		0.5
WHERE SalespersonID = @SPID		1
FETCH NEXT FROM @SPCursor INTO @SPID, @FiN, @FaN, @Ph		0.5
PRINT 'SALESPERSON DETAILS:'		0.5
PRINT ''		0.5
PRINT 'Salesperson ID: ' + @SPID + '        Phone: ' + @Ph		1
PRINT 'Name: ' + @FiN + ' ' + @FaN		0.5
FETCH NEXT FROM @SPCursor INTO @SPID, @FiN, @FaN, @Ph		0.5
EXEC SalespersonDetails 1		1
		
		
		
		
		
--Q14		
CREATE FUNCTION KmToMiles (		1
@km INT )		1
RETURNS FLOAT		1
AS		1
BEGIN		1
RETURN @km * 0.62		2
END		1
"CONVERT(VARCHAR(10), dbo.KmToMiles(@km)) + ' miles'	"		2
`;

export const parseMarkingSchedule = (scheduleText: string) => {
  const parsedSchedule: { [key: string]: { [key: string]: number } } = {};
  const lines = scheduleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let currentQuestionId = '';
  const questionRegex = /^--(Q\d+)$/; // Matches --Q1, --Q2, etc.
  const itemRegex = /^(.+?)\s+(\d+(\.\d+)?)$/; // Matches "KEYWORD 1", "KEYWORD 0.5"

  for (const line of lines) {
    const questionMatch = line.match(questionRegex);
    if (questionMatch) {
      currentQuestionId = questionMatch[1]; // e.g., "Q1", "Q11"
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