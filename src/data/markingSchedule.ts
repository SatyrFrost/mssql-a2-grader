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
    "REGEX::WHERE_NOT_IN_OR_LEFT_JOIN_IS_NULL": { regex: "(WHERE\\s+(?:\\w+\\.)?ProductID\\s+NOT\\s+IN\\s*\\(|LEFT\\s+(?:OUTER\\s+)?JOIN\\s+\\w+\\s+ON\\s+\\w+\\.\\w+\\s*=\\s+\\w+\\.\\w+\\s+WHERE\\s+\\w+\\.\\w+\\s+IS\\s+NULL)", weight: 1 },
    "REGEX::SUBQUERY_OR_JOIN_CONDITION": { regex: "(SELECT\\s+(?:\\w+\\.)?ProductID\\s+FROM\\s+OrdersProduct|ON\\s+p\\.ProductID\\s*=\\s+op\\.ProductID)", weight: 1 }
  },
  "Q9": {
    "SELECT": 0.5,
    "FROM": 0.5,
    "REGEX::LEFT_OUTER_JOIN": { regex: "LEFT\\s+(?:OUTER\\s+)?JOIN", weight: 1 }, // Flexible for LEFT JOIN or LEFT OUTER JOIN, and multi-line
    "AND 1": 1,
    "AND 2": 1
  },
  "Q10": { // Total 4.0 points
    "CREATE": 1,
    "SELECT": 2, // Reduced from 3 to make total 4.0
    "FROM": 1
  },
  "Q11": { // Total 10.0 points
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+PROCEDURE\\s+\\w+\\s*(?:\\(|\\s+@\\w+)", weight: 1.0 },
    "REGEX::PARAM_INT": { regex: "@\\w+\\s+(?:AS\\s+)?INT", weight: 1.0 },
    "REGEX::DECLARE_VARCHAR_FN": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_LN": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A1": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_PH": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+(?=.*?\\b(?:\\w+\\.)?CustomerID\\b)(?=.*?\\b(?:\\w+\\.)?FirstName\\b)(?=.*?\\b(?:\\w+\\.)?FamilyName\\b)(?=.*?\\b(?:\\w+\\.)?Phone\\b)(?=.*?\\b(?:\\w+\\.)?Address1\\b)(?=.*?\\b(?:\\w+\\.)?Address2\\b)(?=.*?\\b(?:\\w+\\.)?Address3\\b).*?FROM\\s+Customer(?:\\s+\\w+)?", weight: 1.0 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer(?:\\s+\\w+)?", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+(?:\\w+\\.)?CustomerID\\s*=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){5,7}", weight: 0.0 }, // Flexible variable count, 0 points as per previous discussion
    "REGEX::PRINT_DETAILS_HEADER": { regex: "PRINT\\s+'CUSTOMER\\s+DETAILS:'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "PRINT\\s+'\\s*'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "PRINT\\s+'Customer\\s+ID:\\s*['\"]?\\s*\\+\\s*(?:CONVERT|CAST)\\s*\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\)\\s*\\+\\s*'.*?Phone:\\s*['\"]?\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_NAME": { regex: "PRINT\\s+'Customer\\s+Name:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]?\\s+['\"]?\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "PRINT\\s+'Address:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]?,\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]?,\\s*['\"]?\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){5,7}", weight: 0.0 }, // Flexible variable count, 0 points as per previous discussion
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+\\w+\\s+(?:@\\w+\\s*=\\s*)?\\w+(?:;)?", weight: 0.5 }
  },
  "Q12": { // Total 10.0 points
    "REGEX::PARAM_VARCHAR": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_INT": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_1": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_INT_2": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_INT_3": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_MONEY": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?MONEY", weight: 0.5 },
    "REGEX::SELECT_CAR_DETAILS": { regex: "SELECT\\s+(?=.*?\\b(?:\\w+\\.)?RegistrationID\\b)(?=.*?\\b(?:\\w+\\.)?CarYear\\b)(?=.*?\\b(?:\\w+\\.)?Make\\b)(?=.*?\\b(?:\\w+\\.)?Model\\b)(?=.*?\\b(?:\\w+\\.)?ColourName\\b)(?=.*?\\b(?:\\w+\\.)?NumOwners\\b)(?=.*?\\b(?:\\w+\\.)?Kilometres\\b)(?=.*?\\b(?:\\w+\\.)?Price\\b).*?FROM\\s+Car(?:\\s+\\w+)?", weight: 1.5 },
    "REGEX::FROM_CAR_JOIN_LU_COLOUR": { regex: "FROM\\s+Car\\s+(?:INNER\\s+)?JOIN\\s+LU_Colour(?:\\s+\\w+)?", weight: 0.5 },
    "ON Car.ColourID = LU_Colour.ColourID": 0.5,
    "REGEX::WHERE_REGISTRATION_ID": { regex: "WHERE\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@\\w+\\s*;?", weight: 1.5 }, // Increased to 1.5
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER": { regex: "PRINT\\s+'VEHICLE\\s+DETAILS:'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_2": { regex: "PRINT\\s+'\\s*'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_REGISTRATION_ID": { regex: "PRINT\\s+'Registration\\s+ID:\\s*['\"]?\\s*\\+\\s*@\\w+", weight: 0.0 }, // 0 points as per previous discussion
    "REGEX::PRINT_YEAR_MAKE_MODEL": { regex: "PRINT\\s+'Year:\\s*['\"]?\\s*\\+\\s*(?:CONVERT|CAST)\\s*\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\)\\s*\\+\\s*'.*?Make:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*'.*?Model:\\s*['\"]?\\s*\\+\\s*@\\w+", weight: 0.0 }, // 0 points as per previous discussion
    "REGEX::PRINT_COLOUR_OWNERS_KM": { regex: "PRINT\\s+'Colour:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*'.*?Owners:\\s*['\"]?\\s*\\+\\s*(?:CONVERT|CAST)\\s*\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\)\\s*\\+\\s*'.*?Kilometres:\\s*['\"]?\\s*\\+\\s*(?:CONVERT|CAST)\\s*\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\)\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE": { regex: "PRINT\\s+'Price:\\s*['\"]?\\s*\\+\\s*(?:CONVERT|CAST)\\s*\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\)\\s*", weight: 0.5 },
    "REGEX::FETCH_NEXT_CAR_DETAILS": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6,8}", weight: 0.0 }, // Flexible variable count, 0 points as per previous discussion
    "REGEX::EXEC_CAR_DETAILS": { regex: "EXEC\\s+\\w+\\s+(?:@\\w+\\s*=\\s*)?'[^']+'(?:;)?", weight: 0.5 }
  },
  "Q13": { // Total 10.0 points
    "REGEX::PARAM_SID_INT": { regex: "@\\w+\\s+(?:AS\\s+)?(?:INT|VARCHAR\\((?:\\d+)\\))", weight: 0.5 },
    "REGEX::DECLARE_SFNAME_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_SFAMNAME_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_SPH_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::SELECT_SP_COLUMNS": { regex: "SELECT\\s+(?=.*?\\b(?:\\w+\\.)?SalespersonID\\b)(?=.*?\\b(?:\\w+\\.)?Phone\\b)(?=.*?\\b(?:\\w+\\.)?FirstName\\b)(?=.*?\\b(?:\\w+\\.)?FamilyName\\b).*?FROM\\s+Salesperson(?:\\s+\\w+)?", weight: 2.0 }, // Increased to 2.0
    "REGEX::FROM_SALESPERSON": { regex: "FROM\\s+Salesperson(?:\\s+\\w+)?", weight: 0.5 },
    "REGEX::WHERE_SALESPERSONID_SID": { regex: "WHERE\\s+(?:\\w+\\.)?SalespersonID\\s*=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_1_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+Cursor\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){2,3}", weight: 0.0 }, // Flexible variable count, 0 points as per previous discussion
    "REGEX::PRINT_DETAILS_HEADER_Q13": { regex: "PRINT\\s+'SALESPERSON\\s+DETAILS:'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "PRINT\\s+'\\s*'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE_Q13": { regex: "PRINT\\s+'Salesperson\\s+ID:\\s*['\"]?\\s*\\+\\s*(?:CONVERT|CAST)\\s*\\(\\s*@\\w+\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\)\\s*\\+\\s*'.*?Phone:\\s*['\"]?\\s*\\+\\s*@\\w+", weight: 1.5 }, // Increased to 1.5
    "REGEX::PRINT_SP_NAME_Q13": { regex: "PRINT\\s+'Name:\\s*['\"]?\\s*\\+\\s*@\\w+\\s*\\+\\s*['\"]?\\s+['\"]?\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_2_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+Cursor\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){2,3}", weight: 0.0 }, // Flexible variable count, 0 points as per previous discussion
    "REGEX::EXEC_SP_DETAILS_Q13": { regex: "EXEC\\s+\\w+\\s+(?:@\\w+\\s*=\\s*)?\\w+(?:;)?", weight: 2.0 } // Increased to 2.0
  },
  "Q14": { // Total 10.0 points
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles\\s*\\(", weight: 1.0 },
    "REGEX::FUNCTION_PARAM_INT": { regex: "@km\\s+(?:INT|FLOAT)\\s*\\)", weight: 1.0 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1.0 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1.0 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1.0 },
    "REGEX::RETURN_CALCULATION": { regex: "RETURN\\s+@km\\s*\\*\\s*0\\.62", weight: 2.0 }, // Reduced from 2.5
    "REGEX::END_KEYWORD": { regex: "END", weight: 1.0 },
    "REGEX::PRINT_MILEAGE": { regex: "Mileage:\\s*['\"]?\\s*\\+\\s*(?:CONVERT|CAST)\\s*\\(\\s*(?:dbo\\.KmToMiles\\(@\\w+\\)|@\\w+)\\s+AS\\s+VARCHAR(?:\\s*\\(\\s*\\d+\\s*\\))?\\s*\\)\\s*\\+\\s*['\"]?\\s*miles['\"]?", weight: 2.0 }
  }
};