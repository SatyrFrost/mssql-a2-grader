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
    "REGEX::LEFT_OUTER_JOIN": { regex: "LEFT\\s+(?:OUTER\\s+)?JOIN", weight: 1 }, // Flexible for LEFT JOIN or LEFT OUTER JOIN, and multi-line
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
    "REGEX::DECLARE_VARCHAR_PH": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+(?=.*CustomerID)(?=.*FirstName)(?=.*FamilyName)(?=.*Phone)(?=.*Address1)(?=.*Address2)(?=.*Address3).*FROM\\s+Customer", weight: 0.5 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+CustomerID\\s*=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "PRINT\\s+'CUSTOMER\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "PRINT\\s+''", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "PRINT\\s+'Customer\\s+ID:['\\s]*\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*@\\w+\\s*\\)|CAST\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s*\\+\\s*'.*?'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_NAME": { regex: "PRINT\\s+'Customer\\s+Name:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]\\s+['\"]\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "PRINT\\s+'Address:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]?,\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]?,\\s*['\"]?\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+\\w+\\s+1", weight: 0.5 }
  },
  "Q12": {
    "REGEX::PARAM_VARCHAR": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_INT": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_1": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_INT_2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_INT_3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_MONEY": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?MONEY", weight: 0.5 },
    "REGEX::SELECT_CAR_DETAILS": { regex: "SELECT\\s+(?:Car\\.)?RegistrationID\\s*,\\s*(?:Car\\.)?CarYear\\s*,\\s*(?:Car\\.)?Make\\s*,\\s*(?:Car\\.)?Model\\s*,\\s*(?:LU_Colour\\.)?ColourName\\s*,\\s*(?:Car\\.)?NumOwners\\s*,\\s*(?:Car\\.)?Kilometres\\s*,\\s*(?:Car\\.)?Price", weight: 0.5 },
    "REGEX::FROM_CAR_JOIN_LU_COLOUR": { regex: "FROM\\s+Car\\s+(?:INNER\\s+)?JOIN\\s+LU_Colour", weight: 0.5 },
    "ON Car.ColourID = LU_Colour.ColourID": 0.5,
    "REGEX::WHERE_REGISTRATION_ID": { regex: "WHERE\\s+(?:Car\\.)?RegistrationID\\s*=\\s*@\\w+\\s*;?", weight: 1 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER": { regex: "PRINT\\s+'VEHICLE\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_2": { regex: "PRINT\\s+''", weight: 0.5 },
    "REGEX::PRINT_REGISTRATION_ID": { regex: "PRINT\\s+'Registration\\s+ID:['\\s]*\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*@\\w+\\s*\\)|CAST\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s*", weight: 0.25 },
    "REGEX::PRINT_YEAR_MAKE_MODEL": { regex: "PRINT\\s+'Year:['\\s]*\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*@\\w+\\s*\\)|CAST\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s*\\+\\s*'.*?Make:['\\s]*\\s*\\+\\s*@\\w+\\s*\\+\\s*'.*?Model:['\\s]*\\s*\\+\\s*@\\w+'", weight: 0.25 },
    "REGEX::PRINT_COLOUR_OWNERS_KM": { regex: "PRINT\\s+'Colour:['\\s]*\\s*\\+\\s*@\\w+\\s*\\+\\s*'.*?Owners:['\\s]*\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*@\\w+\\s*\\)|CAST\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s*\\+\\s*'.*?Kilometres:['\\s]*\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*@\\w+\\s*\\)|CAST\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE": { regex: "PRINT\\s+'Price:\\s*['\\s]*\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*@\\w+\\s*\\)|CAST\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s*", weight: 0.5 },
    "REGEX::FETCH_NEXT_CAR_DETAILS": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.5 },
    "REGEX::EXEC_CAR_DETAILS": { regex: "EXEC\\s+\\w+\\s+'ALP394'", weight: 0.5 }
  },
  "Q13": {
    "REGEX::PARAM_SID_INT": { regex: "@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_SPID_INT": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 1 },
    "REGEX::DECLARE_SFNAME_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_SFAMNAME_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_SPH_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::SELECT_SP_COLUMNS": { regex: "SELECT\\s+SalespersonID,\\s*FirstName,\\s*FamilyName,\\s*Phone", weight: 1 },
    "REGEX::FROM_SALESPERSON": { regex: "FROM\\s+Salesperson", weight: 0.5 },
    "REGEX::WHERE_SALESPERSONID_SID": { regex: "WHERE\\s+SalespersonID\\s*=\\s*@\\w+", weight: 1 },
    "REGEX::FETCH_NEXT_1_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+Cursor\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER_Q13": { regex: "PRINT\\s+'SALESPERSON\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "PRINT\\s+''", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE_Q13": { regex: "PRINT\\s+'Salesperson\\s+ID:\\s*'\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*@SPID\\s*\\)|CAST\\(\\s*@SPID\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s*\\+\\s*'.*?Phone:\\s*'\\s*\\+\\s*@SPh", weight: 1 },
    "REGEX::PRINT_SP_NAME_Q13": { regex: "PRINT\\s+'Name:\\s*'\\s*\\+\\s*@SFname\\s*\\+\\s*'.*?'\\s*\\+\\s*@SFamName", weight: 0.5 },
    "REGEX::FETCH_NEXT_2_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+Cursor\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+", weight: 0.5 },
    "REGEX::EXEC_SP_DETAILS_Q13": { regex: "EXEC\\s+SalespersonDetails\\s+1", weight: 1 }
  },
  "Q14": {
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles\\s*\\(", weight: 1 },
    "REGEX::FUNCTION_PARAM_INT": { regex: "@km\\s+(?:INT|FLOAT)\\s*\\)", weight: 1 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1 },
    "REGEX::RETURN_CALCULATION": { regex: "RETURN\\s+@km\\s+\\*\\s+0\\.62", weight: 2 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 1 },
    "REGEX::PRINT_MILEAGE": { regex: "Mileage:['\\s]*\\s*\\+\\s*(?:CONVERT\\(\\s*VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*,\\s*dbo\\.KmToMiles\\(@km\\)\\s*\\)|CAST\\(\\s*dbo\\.KmToMiles\\(@km\\)\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\))\\s+\\+\\s+' miles'", weight: 2 }
  }
};