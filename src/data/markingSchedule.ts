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
REGEX::@\\w+\\s+INT 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(20\\) 0.5
REGEX::DECLARE\\s+@\\w+\\s+AS\\s+CURSOR 0.5
REGEX::SET\\s+@\\w+\\s+=\\s+CURSOR\\s+FOR 0.5
REGEX::SELECT\\s+CustomerID,\\s*FirstName,\\s*FamilyName,\\s*Phone,\\s*Address1,\\s*Address2,\\s*Address3 0.5
REGEX::FROM\\s+Customer 0.5
REGEX::WHERE\\s+CustomerID\\s+=\\s*@\\w+ 1
REGEX::OPEN\\s+@\\w+ 0.5
REGEX::FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::PRINT\\s+'CUSTOMER\\s+DETAILS:' 0.5
REGEX::PRINT\\s+'' 0.5
REGEX::PRINT\\s+'Customer\\s+ID:\\s+'\\s*\\+\\s*CONVERT\\s*\\(\\s*VARCHAR\\s*\\(\\s*10\\s*\\)\\s*,\\s*@\\w+\\s*\\)\\s*\\+\\s*'\\s+Phone:\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::PRINT\\s+'Customer\\s+Name:\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*'\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::PRINT\\s+'Address:\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::WHILE\\s+@@FETCH_STATUS\\s*=\\s*0 0.5
REGEX::FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::CLOSE\\s+@\\w+ 0.5
REGEX::DEALLOCATE\\s+@\\w+ 0.5
REGEX::END 0.5
REGEX::EXEC\\s+\\w+\\s+1 0.5

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
  const itemRegex = /^(.+?)\s+(\d+(\.\d+)?)$/; // Matches "KEYWORD POINTS" and "REGEX::PATTERN POINTS"

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