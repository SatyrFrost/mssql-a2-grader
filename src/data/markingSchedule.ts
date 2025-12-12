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
REGEX::CREATE_PROCEDURE_HEADER::CREATE\\s+PROCEDURE\\s+\\w+\\s+\\\\(` 0.5
REGEX::PARAM_INT::@\\w+\\s+INT 0.5
REGEX::DECLARE_VARCHAR100_CFiN::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_VARCHAR100_CFaN::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_VARCHAR100_CA1::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_VARCHAR100_CA2::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_VARCHAR100_CA3::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_VARCHAR20_Ph::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(20\\\\) 0.5
REGEX::SELECT_COLUMNS::SELECT\\s+(?=.*CustomerID)(?=.*FirstName)(?=.*FamilyName)(?=.*Phone)(?=.*Address1)(?=.*Address2)(?=.*Address3).*FROM 0.5
REGEX::FROM_CUSTOMER::FROM\\s+Customer 0.5
REGEX::WHERE_CID::WHERE\\s+CustomerID\\s+=\\s*@\\w+ 1.5
REGEX::FETCH_NEXT_1::FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+\\s* 0.5
REGEX::PRINT_DETAILS_HEADER::PRINT\\s+'CUSTOMER\\s+DETAILS:' 0.5
REGEX::PRINT_EMPTY_LINE_1::PRINT\\s+'' 0.5
REGEX::PRINT_CID_PHONE::PRINT\\s+'Customer\\s+ID:\\s+'\\s*\\+\\s*CONVERT\\\\(VARCHAR\\\\(10\\\\),\\s*@\\w+\\\\)\\s*\\+\\s*'\\s+Phone:\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::PRINT_NAME::PRINT\\s+'Customer\\s+Name:\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*'\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::PRINT_ADDRESS::PRINT\\s+'Address:\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::FETCH_NEXT_2::FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+\\s* 0.5
REGEX::EXEC_CUSTOMER_DETAILS::EXEC\\s+\\w+\\s+1 0.5

--Q12
REGEX::PARAM_VARCHAR20::@\\w+\\s+VARCHAR\\\\(20\\\\) 0.5
REGEX::DECLARE_INT::DECLARE\\s+@\\w+\\s+AS\\s+INT 0.5
REGEX::DECLARE_VARCHAR100_1::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_VARCHAR100_2::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_VARCHAR100_3::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_INT_2::DECLARE\\s+@\\w+\\s+AS\\s+INT 0.5
REGEX::DECLARE_INT_3::DECLARE\\s+@\\w+\\s+AS\\s+INT 0.5
REGEX::DECLARE_MONEY::DECLARE\\s+@\\w+\\s+AS\\s+MONEY 0.5
SELECT RegistrationID, CarYear, Make, Model, ColourName, NumOwners, Kilometres, Price 0.5
FROM Car JOIN LU_Colour 0.5
ON Car.ColourID = LU_Colour.ColourID 0.5
REGEX::WHERE_REGISTRATION_ID::WHERE\\s+RegistrationID\\s+=\\s*@\\w+ 1
REGEX::PRINT_VEHICLE_DETAILS_HEADER::PRINT\\s+'VEHICLE\\s+DETAILS:' 0.5
REGEX::PRINT_EMPTY_LINE_2::PRINT\\s+'' 0.5
REGEX::PRINT_REG_MAKE_MODEL::PRINT\\s+'Registration\\s+ID:\\s+'\\s*\\+\\s*CONVERT\\\\(VARCHAR\\\\(10\\\\),\\s*@\\w+\\\\)\\s+\\+\\s+'\\s+Make:\\s+'\\s*\\+\\s*@\\w+\\s+\\+\\s+'\\s+Model:\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::PRINT_COLOUR_OWNERS_KM::PRINT\\s+'Colour:\\s+'\\s*\\+\\s*@\\w+\\s+\\+\\s+'\\s+Owners:\\s+'\\s*\\+\\s*CONVERT\\\\(VARCHAR\\\\(10\\\\),\\s*@\\w+\\\\)\\s+\\+\\s+'\\s+Kilometres:\\s+'\\s*\\+\\s*CONVERT\\\\(VARCHAR\\\\(10\\\\),\\s*@\\w+\\\\)\\s+\\+\\s+'km' 0.5
REGEX::PRINT_PRICE::PRINT\\s+'Price:\\s+\\s*\\+\\s*CONVERT\\\\(VARCHAR\\\\(10\\\\),\\s*@\\w+\\\\)` 0.5
REGEX::FETCH_NEXT_CAR_DETAILS::FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::EXEC_CAR_DETAILS::EXEC\\s+\\w+\\s+'ALP394' 0.5

--Q13
REGEX::PARAM_SPID_VARCHAR20::@\\w+\\s+VARCHAR\\\\(20\\\\) 0.5
REGEX::DECLARE_FIN_VARCHAR100::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_FAN_VARCHAR100::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
REGEX::DECLARE_PH_VARCHAR100::DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\\\(100\\\\) 0.5
SELECT SalespersonID, FirstName, FamilyName, Phone 1
FROM Salesperson 0.5
REGEX::WHERE_SALESPERSON_ID::WHERE\\s+SalespersonID\\s+=\\s*@\\w+ 1
REGEX::FETCH_NEXT_SP_DETAILS::FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::PRINT_SALESPERSON_DETAILS_HEADER::PRINT\\s+'SALESPERSON\\s+DETAILS:' 0.5
REGEX::PRINT_EMPTY_LINE_3::PRINT\\s+'' 0.5
REGEX::PRINT_SPID_PHONE::PRINT\\s+'Salesperson\\s+ID:\\s+'\\s*\\+\\s*@\\w+\\s+\\+\\s+'\\s+Phone:\\s+'\\s*\\+\\s*@\\w+ 1
REGEX::PRINT_SP_NAME::PRINT\\s+'Name:\\s+'\\s*\\+\\s*@\\w+\\s+\\+\\s*'\\s+'\\s*\\+\\s*@\\w+ 0.5
REGEX::FETCH_NEXT_SP_DETAILS_2::FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+ 0.5
REGEX::EXEC_SALESPERSON_DETAILS::EXEC\\s+\\w+\\s+1 1

--Q14
REGEX::CREATE_FUNCTION_HEADER::CREATE\\s+FUNCTION\\s+\\w+\\s+\\\\(` 1
REGEX::FUNCTION_PARAM_INT::@\\w+\\s+INT\\s+\\\\) 1
REGEX::RETURNS_FLOAT::RETURNS\\s+FLOAT 1
REGEX::AS_KEYWORD::AS 1
REGEX::BEGIN_KEYWORD::BEGIN 1
REGEX::RETURN_CALCULATION::RETURN\\s+@\\w+\\s+\\*\\s+0\\\\.62 2
REGEX::END_KEYWORD::END 1
REGEX::PRINT_PRICE_Q14::PRINT\\s+'Price:\\s+\\s*\\+\\s*CONVERT\\\\(VARCHAR\\\\(10\\\\),\\s*@\\w+\\\\)` 0.5
REGEX::PRINT_MILEAGE::CONVERT\\\\(VARCHAR\\\\(10\\\\),\\s+dbo\\\\.\\\\w+\\\\(@\\w+\\\\)\\\\)\\s+\\+\\s+' miles' 2
`;

export const parseMarkingSchedule = (scheduleText: string) => {
  const parsedSchedule: { [key: string]: { [key: string]: number } } = {};
  const lines = scheduleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let currentQuestionId = '';
  const questionRegex = /^--(Q\d+)$/; // Matches --Q1, --Q2, etc.
  const itemRegex = /^(REGEX::[^:]+::.+?|[^:]+?)\s+(\d+(\.\d+)?)$/; 

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