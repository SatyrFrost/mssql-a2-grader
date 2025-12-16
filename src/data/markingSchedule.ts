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
    "REGEX::WHERE_NOT_IN_OR_LEFT_JOIN_IS_NULL": { regex: "(WHERE\\s+(?:\\w+\\.)?ProductID\\s+NOT\\s+IN\\s*\\(|LEFT\\s+(?:OUTER\\s+)?JOIN\\s+\\w+\\s+ON\\s+\\w+\\.\\w+\\s*=\\s+\\w+\\.\\w+\\s+WHERE\\s+\\w+\\.\\w+\\s+IS\\s+NULL)", weight: 1 }
,
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
    "SELECT": 2,
    "FROM": 1
  },
  "Q11": { // Total 10.0 points
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CustomerDetails", weight: 0.5 },
    "REGEX::PARAM_INT": { regex: "@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 }, // Flexible param name, optional AS
    "REGEX::DECLARE_CFiN_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_CFaN_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_CA1_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_CA2_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_CA3_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_Ph_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(20|30\\)", weight: 0.5 }, // Flexible var name, optional AS, 20 or 30 length
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+(?:\\w+\\s*,\\s*){6}\\w+", weight: 0.5 }, // Checks for 7 columns selected
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+CustomerID\\s*=\\s*@\\w+", weight: 1.0 }, // Flexible param name
    "REGEX::FETCH_NEXT_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 }, // Flexible cursor/var names, checks 7 vars
    "REGEX::PRINT_DETAILS_HEADER": { regex: "PRINT\\s+'CUSTOMER\\s+DETAILS(?:\\s*:)?'", weight: 0.5 }, // Optional colon
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "PRINT\\s+''|PRINT\\s+'\\s*'", weight: 0.5 }, // Empty or whitespace line
    "REGEX::PRINT_CID_PHONE": { regex: "PRINT\\s+'Customer\\s+ID:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?\\s*\\+\\s*'\\s{2,8}Phone:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?", weight: 0.5 }, // Flexible spacing, CONVERT/CAST, var names
    "REGEX::PRINT_NAME": { regex: "PRINT\\s+'Customer\\s+Name:\\s*'(?:\\s*\\+\\s*@\\w+){2}", weight: 0.5 }, // Flexible var names
    "REGEX::PRINT_ADDRESS": { regex: "PRINT\\s+'Address:\\s*'(?:\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s*'){2}\\s*\\+\\s*@\\w+", weight: 0.5 }, // Flexible var names
    "REGEX::FETCH_NEXT_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 }, // Flexible cursor/var names, checks 7 vars
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+CustomerDetails\\s+1", weight: 0.5 }
  },
  "Q12": { // Total 10.0 points
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CarDetails", weight: 0.5 },
    "REGEX::PARAM_VARCHAR": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\(20\\)", weight: 0.5 }, // Flexible param name, optional AS
    "REGEX::DECLARE_Yr_INT": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_Mk_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)", weight: 0.5 }, // Flexible var name, optional AS, 50 or 100 length
    "REGEX::DECLARE_Md_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)", weight: 0.5 }, // Flexible var name, optional AS, 50 or 100 length
    "REGEX::DECLARE_Col_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)", weight: 0.5 }, // Flexible var name, optional AS, 50 or 100 length
    "REGEX::DECLARE_Own_INT": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_Km_INT": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::DECLARE_Pr_MONEY": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?MONEY", weight: 0.5 }, // Flexible var name, optional AS
    "REGEX::SELECT_CAR_DETAILS": { regex: "SELECT\\s+(?:\\w+\\.)?RegistrationID,\\s*(?:\\w+\\.)?CarYear,\\s*(?:\\w+\\.)?Make,\\s*(?:\\w+\\.)?Model,\\s*(?:\\w+\\.)?ColourName,\\s*(?:\\w+\\.)?NumOwners,\\s*(?:\\w+\\.)?Kilometres,\\s*(?:\\w+\\.)?Price", weight: 0.5 }, // Flexible table aliases
    "REGEX::FROM_CAR_JOIN_LU_COLOUR": { regex: "FROM\\s+Car\\s+(?:INNER\\s+)?JOIN\\s+LU_Colour", weight: 0.5 }, // Optional INNER
    "REGEX::ON_COLOURID": { regex: "ON\\s+(?:\\w+\\.)?Car\\.ColourID\\s*=\\s*(?:\\w+\\.)?LU_Colour\\.ColourID", weight: 0.5 }, // Flexible table aliases
    "REGEX::WHERE_REGISTRATIONID": { regex: "WHERE\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@\\w+", weight: 0.5 }, // Flexible table alias, param name
    "REGEX::FETCH_NEXT_1_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.5 }, // Flexible cursor/var names, checks 8 vars
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER": { regex: "PRINT\\s+'VEHICLE\\s+DETAILS(?:\\s*:)?'", weight: 0.5 }, // Optional colon
    "REGEX::PRINT_EMPTY_LINE_2": { regex: "PRINT\\s+''|PRINT\\s+'\\s*'", weight: 0.5 }, // Empty or whitespace line
    "REGEX::PRINT_REGISTRATION_ID": { regex: "PRINT\\s+'Registration\\s+ID:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10|50\\),\\s*)?@\\w+(?:\\))?)?", weight: 0.5 }, // Flexible CONVERT/CAST, var name
    "REGEX::PRINT_YEAR_MAKE_MODEL": { regex: "PRINT\\s+'Year:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?\\s*\\+.*'Make:\\s*'(?:\\s*\\+\\s*@\\w+)?\\s*\\+.*'Model:\\s*'(?:\\s*\\+\\s*@\\w+)?", weight: 0.5 }, // Flexible CONVERT/CAST, var names, spacing
    "REGEX::PRINT_COLOUR_OWNERS_KM": { regex: "PRINT\\s+'Colour:\\s*'(?:\\s*\\+\\s*@\\w+)?\\s*\\+.*'Owners:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?\\s*\\+.*'Kilometres:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?\\s*\\+\\s*'km'", weight: 0.5 }, // Flexible CONVERT/CAST, var names, spacing
    "REGEX::PRINT_PRICE": { regex: "PRINT\\s+'Price:\\s*(?:\\$)?'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?", weight: 0.5 }, // Optional $, flexible CONVERT/CAST, var name
    "REGEX::FETCH_NEXT_2_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.5 }, // Flexible cursor/var names, checks 8 vars
    "REGEX::EXEC_CAR_DETAILS": { regex: "EXEC\\s+CarDetails\\s+'ALP394'", weight: 0.5 }
  },
  "Q13": { // Total 10.0 points
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+(?:SalespersonDetails|GetSalespersonDetails)", weight: 0.5 }, // Flexible proc name
    "REGEX::PARAM_SPID_TYPE": { regex: "@\\w+\\s+(?:AS\\s+)?(?:VARCHAR\\(20\\)|INT)", weight: 0.5 }, // Flexible param name, type (VARCHAR or INT)
    "REGEX::DECLARE_FiN_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)", weight: 0.5 }, // Flexible var name, optional AS, 50 or 100 length
    "REGEX::DECLARE_FaN_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)", weight: 0.5 }, // Flexible var name, optional AS, 50 or 100 length
    "REGEX::DECLARE_Ph_VARCHAR": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(20|100\\)", weight: 0.5 }, // Flexible var name, optional AS, 20 or 100 length
    "REGEX::SELECT_SP_COLUMNS": { regex: "SELECT\\s+(?:\\w+\\.)?SalespersonID,\\s*(?:\\w+\\.)?Phone,\\s*(?:\\w+\\.)?FirstName,\\s*(?:\\w+\\.)?FamilyName", weight: 1.0 }, // Flexible table aliases, order
    "REGEX::FROM_SALESPERSON": { regex: "FROM\\s+Salesperson(?:\\s+\\w+)?", weight: 0.5 }, // Optional alias
    "REGEX::WHERE_SALESPERSONID_SPID": { regex: "WHERE\\s+(?:\\w+\\.)?SalespersonID\\s*=\\s*@\\w+", weight: 1.0 }, // Flexible table alias, param name
    "REGEX::FETCH_NEXT_1_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){3}", weight: 0.5 }, // Flexible cursor/var names, checks 4 vars
    "REGEX::PRINT_DETAILS_HEADER_Q13": { regex: "PRINT\\s+'SALESPERSON\\s+DETAILS(?:\\s*:)?'", weight: 0.5 }, // Optional colon
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "PRINT\\s+''|PRINT\\s+'\\s*'", weight: 0.5 }, // Empty or whitespace line
    "REGEX::PRINT_SPID_PHONE_Q13": { regex: "PRINT\\s+'Salesperson\\s+ID:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?\\s*\\+\\s*'\\s{2,8}Phone:\\s*'(?:\\s*\\+\\s*@\\w+)?", weight: 2.0 }, // Flexible CONVERT/CAST, var names, spacing
    "REGEX::PRINT_SP_NAME_Q13": { regex: "PRINT\\s+'Name:\\s*'(?:\\s*\\+\\s*@\\w+){2}", weight: 0.5 }, // Flexible var names
    "REGEX::FETCH_NEXT_2_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){3}", weight: 0.5 }, // Flexible cursor/var names, checks 4 vars
    "REGEX::EXEC_SP_DETAILS_Q13": { regex: "EXEC\\s+(?:SalespersonDetails|GetSalespersonDetails)\\s+(?:@SalespersonID\\s*=\\s*)?1", weight: 1.0 } // Flexible proc name, optional param name
  },
  "Q14": { // Total 10.0 points
    // KmToMiles Function (8.0 points)
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles", weight: 1.0 },
    "REGEX::FUNCTION_PARAM_TYPE": { regex: "@km\\s+(?:AS\\s+)?(?:INT|FLOAT)", weight: 1.0 }, // Flexible param type (INT or FLOAT)
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1.0 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1.0 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1.0 },
    "REGEX::RETURN_CALCULATION": { regex: "RETURN\\s+@km\\s*\\*\\s*0\\.62", weight: 2.0 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 1.0 },

    // CarDetails2 Procedure (2.0 points for the specific line)
    "REGEX::PRINT_COLOUR_OWNERS_KM_MILEAGE_Q14": { regex: "(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*(?:dbo\\.)?KmToMiles\\((?:CONVERT|CAST)\\(INT,\\s*)?@\\w+(?:\\))?\\)\\)\\s*\\+\\s*'\\s*miles'|Mileage:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?\\s*\\+\\s*'\\s*miles'", weight: 2.0 }, // Flexible for direct variable or function call, CAST/CONVERT
    
    // Other CarDetails2 Procedure elements (0.0 points) - These are kept for structure but have 0 weight
    "REGEX::PROCEDURE_HEADER_Q14": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CarDetails2", weight: 0.0 },
    "REGEX::PARAM_RID_Q14": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\(20\\)", weight: 0.0 },
    "REGEX::DECLARE_VARS_Q14": { regex: "DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT\\s*;?\\s*DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)\\s*;?\\s*DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)\\s*;?\\s*DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\(50|100\\)\\s*;?\\s*DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT\\s*;?\\s*DECLARE\\s+@\\w+\\s+(?:AS\\s+)?INT\\s*;?\\s*DECLARE\\s+@\\w+\\s+(?:AS\\s+)?MONEY", weight: 0.0 },
    "REGEX::SELECT_CAR_DETAILS_Q14": { regex: "SELECT\\s+(?:\\w+\\.)?RegistrationID,\\s*(?:\\w+\\.)?CarYear,\\s*(?:\\w+\\.)?Make,\\s*(?:\\w+\\.)?Model,\\s*(?:\\w+\\.)?ColourName,\\s*(?:\\w+\\.)?NumOwners,\\s*(?:\\w+\\.)?Kilometres,\\s*(?:\\w+\\.)?Price", weight: 0.0 },
    "REGEX::WHERE_RID_Q14": { regex: "WHERE\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@\\w+", weight: 0.0 },
    "REGEX::FETCH_NEXT_Q14": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.0 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER_Q14": { regex: "PRINT\\s+'VEHICLE\\s+DETAILS(?:\\s*:)?'", weight: 0.0 },
    "REGEX::PRINT_EMPTY_LINE_Q14": { regex: "PRINT\\s+''|PRINT\\s+'\\s*'", weight: 0.0 },
    "REGEX::PRINT_REGISTRATION_ID_Q14": { regex: "PRINT\\s+'Registration\\s+ID:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10|50\\),\\s*)?@\\w+(?:\\))?)?", weight: 0.0 },
    "REGEX::PRINT_YEAR_MAKE_MODEL_Q14": { regex: "PRINT\\s+'Year:\\s*'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?\\s*\\+.*'Make:\\s*'(?:\\s*\\+\\s*@\\w+)?\\s*\\+.*'Model:\\s*'(?:\\s*\\+\\s*@\\w+)?", weight: 0.0 },
    "REGEX::PRINT_PRICE_Q14": { regex: "PRINT\\s+'Price:\\s*(?:\\$)?'(?:\\s*\\+\\s*(?:CONVERT|CAST)\\(VARCHAR\\(10\\),\\s*)?@\\w+(?:\\))?)?", weight: 0.0 },
    "REGEX::EXEC_CAR_DETAILS2_Q14": { regex: "EXEC\\s+CarDetails2\\s+'ALP394'", weight: 0.0 }
  }
};