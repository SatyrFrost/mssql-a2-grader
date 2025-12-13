export const markingSchedule: {
  [key: string]: {
    [key: string]: number | { regex: string; weight: number };
  };
} = {
  "Q1": {
    "SELECT": 1,
    "FROM": 1,
    "WHERE": 1,
    "ORDER": 1
  },
  "Q2": {
    "SELECT": 1,
    "FROM": 1,
    "WHERE": 1,
    "ORDER": 1
  },
  "Q3": {
    "SELECT": 1,
    "JOIN 1": 1,
    "JOIN 2": 1,
    "ORDER": 1
  },
  "Q4": {
    "SELECT": 1,
    "FROM": 1,
    "JOIN": 2 // Changed name and weight to reflect a single join worth 2 marks
  },
  "Q5": {
    "MAX": 0.5,
    "MIN": 0.5,
    "COUNT": 0.5,
    "SUM": 0.5,
    "AVG": 0.5,
    "FROM": 0.5,
    "[labels]": 1
  },
  "Q6": {
    "SELECT": 1,
    "FROM": 0.5,
    "JOIN 1": 1,
    "GROUP BY": 1,
    "ORDER": 0.5
  },
  "Q7": {
    "SELECT": 0.5,
    "FROM": 0.5,
    "JOIN 1": 1,
    "JOIN 2": 1,
    "GROUP": 0.5,
    "ORDER": 0.5
  },
  "Q8": {
    "SELECT": 1,
    "FROM": 1,
    "WHERE .. NOT IN": 1,
    "Subquery": 1
  },
  "Q9": {
    "SELECT": 0.5,
    "FROM": 0.5,
    "LEFT OUTER JOIN": 1,
    "AND 1": 1,
    "AND 2": 1
  },
  "Q10": {
    "CREATE": 1,
    "SELECT": 2,
    "FROM": 1
  },
  "Q11": {
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+PROCEDURE\\s+\\w+\\s*\\n\\s*\\(", weight: 0.5 },
    "REGEX::PARAM_INT": { regex: "@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_FN": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_LN": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A1": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_PH": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 }, // Flexible for any VARCHAR length
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+(?=.*CustomerID)(?=.*FirstName)(?=.*FamilyName)(?=.*Phone)(?=.*Address1)(?=.*Address2)(?=.*Address3).*FROM\\s+Customer", weight: 0.5 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+CustomerID\\s*=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "PRINT\\s+'CUSTOMER\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "PRINT\\s+''", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "PRINT\\s+'Customer\\s+ID:['\\s]*\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)\\s*\\+\\s*'.*?'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_NAME": { regex: "PRINT\\s+'Customer\\s+Name:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]\\s+['\"]\\s*\\+\\s*@\\w+", weight: 0.5 }, // Corrected for ' '+@FamilyName
    "REGEX::PRINT_ADDRESS": { regex: "PRINT\\s+'Address:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]\\s*,\\s+['\"]\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]\\s*,\\s+['\"]\\s*\\+\\s*@\\w+", weight: 0.5 }, // Corrected for ', '+@Add2 and ', '+@Add3
    "REGEX::FETCH_NEXT_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+\\w+\\s+1", weight: 0.5 }
  },
  "Q12": {
    "REGEX::PARAM_VARCHAR": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 }, // Flexible for any VARCHAR length
    "REGEX::DECLARE_INT": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_1": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_INT_2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_INT_3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_MONEY": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?MONEY", weight: 0.5 },
    "SELECT RegistrationID, CarYear, Make, Model, ColourName, NumOwners, Kilometres, Price": 0.5,
    "FROM Car JOIN LU_Colour": 0.5,
    "ON Car.ColourID = LU_Colour.ColourID": 0.5,
    "REGEX::WHERE_REGISTRATION_ID": { regex: "WHERE\\s+RegistrationID\\s*=\\s*@\\w+", weight: 1 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER": { regex: "PRINT\\s+'VEHICLE\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_2": { regex: "PRINT\\s+''", weight: 0.5 },
    "REGEX::PRINT_REGISTRATION_ID": { regex: "PRINT\\s+'Registration\\s+ID:['\\s]*\\s*\\+\\s*(?:CONVERT\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?", weight: 0.25 },
    "REGEX::PRINT_YEAR_MAKE_MODEL": { regex: "PRINT\\s+'Year:['\\s]*\\s*\\+\\s*CAST\\(@\\w+\\s+AS\\s+VARCHAR\\)\\s*\\+\\s*'.*?Make:['\\s]*\\s*\\+\\s*@\\w+\\s*\\+\\s*'.*?Model:['\\s]*\\s*\\+\\s*@\\w+", weight: 0.25 },
    "REGEX::PRINT_COLOUR_OWNERS_KM": { regex: "PRINT\\s+'Colour:['\\s]*\\s*\\+\\s*@\\w+\\s*\\+\\s*'.*?Owners:['\\s]*\\s*\\+\\s*CAST\\(@\\w+\\s+AS\\s+VARCHAR\\)\\s*\\+\\s*'.*?Kilometres:['\\s]*\\s*\\+\\s*CAST\\(@\\w+\\s+AS\\s+VARCHAR\\)\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE": { regex: "PRINT\\s+'Price:['\\s]*\\s*\\+\\s*CAST\\(@\\w+\\s+AS\\s+VARCHAR\\)", weight: 0.5 },
    "REGEX::FETCH_NEXT_CAR_DETAILS": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.5 },
    "REGEX::EXEC_CAR_DETAILS": { regex: "EXEC\\s+\\w+\\s+'ALP394'", weight: 0.5 }
  },
  "Q13": {
    "REGEX::CREATE_PROCEDURE_HEADER_Q13": { regex: "CREATE\\s+PROCEDURE\\s+\\w+\\s*\\n\\s*\\(", weight: 0 },
    "REGEX::PARAM_SPID_VARCHAR": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 }, // Corrected to VARCHAR and flexible length
    "REGEX::DECLARE_VARCHAR_FiN": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 1 },
    "REGEX::DECLARE_VARCHAR_FaN": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 1 },
    "REGEX::DECLARE_VARCHAR_Ph": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "SELECT SalespersonID, FirstName, FamilyName, Phone": 1,
    "FROM Salesperson": 0.5,
    "REGEX::WHERE_SALESPERSONID_SPID": { regex: "WHERE\\s+SalespersonID\\s*=\\s*@\\w+", weight: 1 },
    "REGEX::FETCH_NEXT_SP_DETAILS_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){3}", weight: 0.5 },
    "PRINT 'SALESPERSON DETAILS:'": 0.5,
    "PRINT ''": 0.5,
    "REGEX::PRINT_SPID_PHONE": { regex: "PRINT\\s+'Salesperson\\s+ID:['\\s]*\\s*\\+\\s*(?:CAST\\(@\\w+\\s+AS\\s+VARCHAR\\(10\\)\\)|@\\w+)\\s*\\+\\s*'.*?Phone:['\\s]*\\s*\\+\\s*@\\w+", weight: 1 },
    "REGEX::PRINT_SP_NAME": { regex: "PRINT\\s+'Name:['\\s]*\\s*\\+\\s*@\\w+\\s*\\+\\s*['\\s]*\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_SP_DETAILS_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){3}", weight: 0.5 },
    "REGEX::EXEC_SALESPERSON_DETAILS": { regex: "EXEC\\s+\\w+\\s+1", weight: 1 }
  },
  "Q14": {
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles\\s*\\(", weight: 1 },
    "REGEX::FUNCTION_PARAM_INT": { regex: "@km\\s+(?:INT|FLOAT)\\s*\\)", weight: 1 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1 },
    "REGEX::RETURN_CALCULATION": { regex: "RETURN\\s+@km\\s+\\*\\s+0\\.62", weight: 2 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 1 },
    "REGEX::PRINT_MILEAGE": { regex: "Mileage:['\\s]*\\s*\\+\\s*(?:CONVERT\\(VARCHAR\\(10\\),\\s+dbo\\.KmToMiles\\(@\\w+\\)\\)|CAST\\(@\\w+\\s+AS\\s+VARCHAR\\))\\s+\\+\\s+' miles'", weight: 2 }
  }
};