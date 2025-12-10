export const rawMarkingSchedule = `
--Q1
SELECT 1
FROM 1
WHERE 1
ORDER 1

--Q2
SELECT 1
FROM 1
WHERE 1
ORDER 1

--Q3
SELECT 1
JOIN 1 1
JOIN 2 1
ORDER 1

--Q4
SELECT 1
FROM 1
JOIN 2

--Q5
MAX 0.5
MIN 0.5
COUNT 0.5
SUM 0.5
AVG 0.5
FROM 0.5
[labels] 1

--Q6
SELECT 1
FROM 0.5
JOIN 1
GROUP BY 1
ORDER 0.5

--Q7
SELECT 0.5
FROM 0.5
JOIN 1 1
JOIN 2 1
GROUP 0.5
ORDER 0.5

--Q8
SELECT 1
FROM 1
WHERE .. NOT IN 1
Subquery 1

--Q9
SELECT 0.5
FROM 0.5
LEFT OUTER JOIN 1
AND 1 1
AND 2 1

--Q10
CREATE 1
SELECT 2
FROM 1

--Q11
@CID INT 0.5
DECLARE @CustID AS INT 0.5
DECLARE @CPh AS VARCHAR(100) 0.5
DECLARE @CFName AS VARCHAR(100) 0.5
DECLARE @CFamName AS VARCHAR(100) 0.5
DECLARE @CA1 AS VARCHAR(100) 0.5
DECLARE @CA2 AS VARCHAR(100) 0.5
DECLARE @CA3 AS VARCHAR(100) 0.5
SELECT CustomerID, FirstName, FamilyName, Address1, Address2, Address3, Phone 0.5
FROM Customer 0.5
WHERE CustomerID = @CID 1
FETCH NEXT FROM @CustomerCursor INTO @CustID, @CFName, @CFamName, @CA1, @CA2, @CA3, @CPh 0.5
PRINT 'CUSTOMER DETAILS' 0.5
PRINT '' 0.5
PRINT 'Customer ID: ' + CONVERT(VARCHAR(10), @CustID) + ' Phone: ' + @CPh 0.5
PRINT 'Customer Name: ' + @CFName + ' ' + @CFamName 0.5
PRINT 'Address: ' + @CA1 + ', ' + @CA2 + ', ' + @CA3 0.5
FETCH NEXT FROM @CustomerCursor INTO @CustID, @CPh, @CFName, @CFamName, @CA1, @CA2, @CA3 0.5
EXEC CustomerDetails 1 0.5

--Q12
REGEX::@\\w+\\s+VARCHAR\\(20\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+INT 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+INT 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+INT 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+MONEY 0.5
SELECT RegistrationID, CarYear, Make, Model, ColourName, NumOwners, Kilometres, Price 0.5
FROM Car JOIN LU_Colour 0.5
ON Car.ColourID = LU_Colour.ColourID 0.5
REGEX::WHERE RegistrationID = @\\w+ 1
REGEX::PRINT 'VEHICLE DETAILS:' 0.5
REGEX::PRINT '' 0.5
REGEX::PRINT 'Registration ID: ' \\+ CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)\\s+\\+\\s+'       ' \\+ 'Make: ' \\+ @\\w+\\s+\\+\\s+'       ' \\+ 'Model: ' \\+ @\\w+ 0.5
REGEX::PRINT 'Colour: ' \\+ @\\w+\\s+\\+\\s+'       ' \\+ 'Owners: ' \\+ CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)\\s+\\+\\s+'       ' \\+ 'Kilometres: ' \\+ CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)\\s+\\+\\s+'km' 0.5
REGEX::PRINT 'Price:  \\+ CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\) 0.5
REGEX::FETCH NEXT FROM @\\w+ INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::EXEC\\s+\\w+\\s+'ALP394' 0.5

--Q13
REGEX::@\\w+\\s+VARCHAR\\(20\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
SELECT SalespersonID, FirstName, FamilyName, Phone 1
FROM Salesperson 0.5
REGEX::WHERE SalespersonID = @\\w+ 1
REGEX::FETCH NEXT FROM @\\w+ INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::PRINT 'SALESPERSON DETAILS:' 0.5
REGEX::PRINT '' 0.5
REGEX::PRINT 'Salesperson ID: ' \\+ @\\w+\\s+\\+\\s+'        Phone: ' \\+ @\\w+ 1
REGEX::PRINT 'Name: ' \\+ @\\w+\\s+\\+\\s+' ' \\+ @\\w+ 0.5
REGEX::FETCH NEXT FROM @\\w+ INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::EXEC\\s+\\w+\\s+1 1

--Q14
REGEX::CREATE FUNCTION \\w+ \\( 1
REGEX::@\\w+\\s+INT \\) 1
REGEX::RETURNS FLOAT 1
REGEX::AS 1
REGEX::BEGIN 1
REGEX::RETURN @\\w+\\s+\\*\\s+0\\.62 2
REGEX::END 1
REGEX::"CONVERT\\(VARCHAR\\(10\\),\\s+dbo\\.\\w+\\(@\\w+\\)\\)\\s+\\+\\s+' miles' " 2
`;

export const parseMarkingSchedule = (scheduleText: string) => {
  const parsedSchedule: { [key: string]: { [key: string]: number } } = {};
  const lines = scheduleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let currentQuestionId = '';
  const questionRegex = /^--(Q\d+)$/; // Matches --Q1, --Q2, etc.
  // Updated regex to handle both "KEYWORD POINTS" and "REGEX::PATTERN POINTS"
  const itemRegex = /^(.+?)\s+(\d+(\.\d+)?)$/;

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