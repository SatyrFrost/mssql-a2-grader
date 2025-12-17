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
    "JOIN": 2
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
    "REGEX::SUBQUERY_OR_JOIN_CONDITION": { regex: "(SELECT\\s+(?:DISTINCT\\s+)?(?:\\w+\\.)?ProductID\\s+FROM\\s+OrdersProduct(?:\\s+\\w+)?|ON\\s+p\\.ProductID\\s*=\\s+op\\.ProductID)", weight: 1 }
  },
  "Q9": {
    "SELECT": 0.5,
    "FROM": 0.5,
    "REGEX::LEFT_OUTER_JOIN": { regex: "LEFT\\s+(?:OUTER\\s+)?JOIN", weight: 1 },
    "AND 1": 1,
    "AND 2": 1
  },
  "Q10": {
    "CREATE": 1,
    "SELECT": 2,
    "FROM": 1
  },
  "Q11": {
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CustomerDetails", weight: 0.5 },
    "REGEX::PARAM_CID_TYPE": { regex: "@\\w+\\s+(?:AS\\s+)?(?:INT|VARCHAR\\((?:\\d+|MAX)\\))", weight: 0.5 },
    "REGEX::DECLARE_CFiN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@(FirstName|CFiN|cfi)\\s+(?:AS\\s+)?(?:VARCHAR|CHAR)\\(\\d+\\)", weight: 0.5 },
    "REGEX::DECLARE_CFaN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@(FamilyName|CFaN|cfa)\\s+(?:AS\\s+)?(?:VARCHAR|CHAR)\\(\\d+\\)", weight: 0.5 },
    "REGEX::DECLARE_CA1_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@(Address1|A1|CA1|adr)\\s+(?:AS\\s+)?(?:VARCHAR|CHAR)\\(\\d+\\)", weight: 0.5 },
    "REGEX::DECLARE_CA2_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@(Address2|A2|CA2)\\s+(?:AS\\s+)?(?:VARCHAR|CHAR)\\(\\d+\\)", weight: 0.5 },
    "REGEX::DECLARE_CA3_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@(Address3|A3|CA3)\\s+(?:AS\\s+)?(?:VARCHAR|CHAR)\\(\\d+\\)", weight: 0.5 },
    "REGEX::DECLARE_Ph_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@(Phone|Ph|pho)\\s+(?:AS\\s+)?(?:VARCHAR|CHAR)\\(\\d+\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s*(?=[^;]*\\bPhone\\b)(?=[^;]*\\bFirstName\\b)(?=[^;]*\\bFamilyName\\b)(?=[^;]*\\bAddress1\\b)(?=[^;]*\\bAddress2\\b)(?=[^;]*\\bAddress3).*?FROM", weight: 0.5 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+(?:\\w+\\.)?CustomerID\\s*=\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_COUNT_Q11": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:\\s*,\\s*@\\w+){6}", weight: 1.0 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "(?:PRINT|print)\\s+'CUSTOMER\\s+DETAILS(?:\\s*:)?'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "(?:PRINT|print)\\s+'Customer ID:\\s*'\\s*\\+\\s*(?:CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)|@\\w+)\\s*\\+\\s*'\\s*Phone:\\s*'\\s*\\+\\s*@\\w+", weight: 1.0 },
    "REGEX::PRINT_NAME": { regex: "(?:PRINT|print)\\s+'(?:Customer\\s+Name|CustomerName):\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+?\\s*'(?:\\s*)?'?\\s*\\+\\s*@\\w+(?:;)?", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "(?:PRINT|print)\\s+'(?:Address|CUSTOMER\\s+ADDRESS):\\s*'(?:\\s*\\+\\s*@\\w+)(?:\\s*\\+\\s*',\\s*'\\s*\\+\\s*@\\w+){2}(?:;)?", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+CustomerDetails\\s+(?:@\\w+\\s*=\\s*)?(?:\\d+|'\\d+')", weight: 0.5 }
  },
  "Q12": {
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CarDetails", weight: 0.5 },
    "REGEX::PARAM_VARCHAR": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+|MAX)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARS_Q12": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?(?:INT|VARCHAR\\((?:\\d+|MAX)\\)|MONEY|FLOAT)(?:;?\\s*){6,9}", weight: 1.0 },
    "REGEX::CURSOR_SELECT_COLUMNS": { regex: "(?=.*\\bMake\\b)(?=.*\\bModel\\b)(?=.*\\bCarYear\\b)(?=.*\\bNumOwners\\b)(?=.*\\bPrice\\b)(?=.*\\bKilometres\\b)(?=.*\\bColourName\\b)SELECT\\s+(?:\\w+\\.)?(?:RegistrationID,\\s*)?(?:\\w+\\.)?Make,\\s*(?:\\w+\\.)?Model,\\s*(?:\\w+\\.)?CarYear,\\s*(?:\\w+\\.)?NumOwners,\\s*(?:\\w+\\.)?Price,\\s*(?:\\w+\\.)?Kilometres,\\s*(?:\\w+\\.)?ColourName", weight: 0.5 },
    "REGEX::CURSOR_FROM_CLAUSE": { regex: "FROM\\s+Car(?:\\s+\\w+)?", weight: 0.25 },
    "REGEX::COLOUR_RETRIEVAL_LOGIC_Q12": { regex: "JOIN\\s+LU_Colour\\s+(?:\\w+)?\\s+ON\\s+(?:\\w+\\.)?ColourID\\s*=\\s*(?:\\w+\\.)?ColourID", weight: 0.5 },
    "REGEX::CURSOR_WHERE_CLAUSE": { regex: "(?:AND|WHERE)\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@\\w+", weight: 0.25 },
    "REGEX::FETCH_NEXT_COUNT_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:\\s*,\\s*@\\w+){6}", weight: 1.0 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER": { regex: "(?:PRINT|print)\\s+'VEHICLE\\s+DETAILS(?:\\s*:)?'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_2": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.5 },
    "REGEX::PRINT_REGISTRATION_ID": { regex: "(?:PRINT|print)\\s+'Registration\\s+ID:\\s*'(?:\\s*\\+\\s*(?:CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*)?@\\w+\\)?)(?:;)?", weight: 1.25 },
    "REGEX::PRINT_YEAR_MAKE_MODEL_Q12": { regex: "(?:PRINT|print)\\s+'Year:\\s*'(?:\\s*\\+\\s*(?:CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*)?@\\w+\\)?)(?:\\s*\\+\\s*'(?:\\s*)?Make:\\s*'(?:\\s*\\+\\s*@\\w+))?(?:\\s*\\+\\s*'(?:\\s*)?Model:\\s*'(?:\\s*\\+\\s*@\\w+))?(?:;)?", weight: 1.25 },
    "REGEX::PRINT_COLOUR_OWNERS_KM_Q12": { regex: "(?=.*(?:PRINT|print).*?(?:Colour|Color).*?(?:CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*)?@\\w+\\)?)(?=.*(?:PRINT|print).*?(?:Owners).*?(?:CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*)?@\\w+\\)?)(?=.*(?:PRINT|print).*?(?:Kilometres|Kilometers).*?(?:CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*)?@\\w+\\)?)", weight: 1.0 },
    "REGEX::PRINT_PRICE": { regex: "(?:PRINT|print)\\s+'Price:\\s*\\$?'(?:\\s*\\+\\s*(?:CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*)?@\\w+\\)?)(?:;)?", weight: 0.5 },
    "REGEX::EXEC_CAR_DETAILS": { regex: "EXEC\\s+CarDetails\\s+(?:@\\w+\\s*=\\s*)?'ALP394'", weight: 0.5 }
  },
  "Q13": {
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+(?:SalespersonDetails|GetSalespersonDetails)", weight: 0.5 },
    "REGEX::PARAM_SPID_TYPE": { regex: "@\\w+\\s+(?:AS\\s+)?(?:VARCHAR\\(20\\)|INT)", weight: 0.5 },
    "REGEX::DECLARE_ALL_VARS_Q13": { regex: "(?=(?:.*DECLARE\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:10|20|50|100)\\)){3})", weight: 1.5 },
    "REGEX::SELECT_SP_COLUMNS": { regex: "SELECT\\s*(?=[^;]*\\b(?:Salesperson\\.)?Phone\\b)(?=[^;]*\\b(?:Salesperson\\.)?FirstName\\b)(?=[^;]*\\b(?:Salesperson\\.)?FamilyName\\b)", weight: 1.5 },
    "REGEX::FROM_SALESPERSON": { regex: "FROM\\s+Salesperson(?:\\s+\\w+)?", weight: 0.5 },
    "REGEX::WHERE_SALESPERSONID_SPID": { regex: "WHERE\\s+(?:\\w+\\.)?SalespersonID\\s*=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_COUNT_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){2,3}", weight: 1.0 },
    "REGEX::PRINT_DETAILS_HEADER_Q13": { regex: "(?:PRINT|print)\\s+'(?:Sal(?:e|a)person\\s+Details|SALESPERSON\\s+DETAILS)(?:\\s*:)?'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE_Q13": { regex: "(?:PRINT|print)\\s*(?=[^;]*\\b(?:Salesperson\\s+ID|SalespersonID)(?:\\s*:)?)(?=[^;]*@\\w+)(?=[^;]*\\b(?:Phone|phone)(?:\\s*:)?)(?=[^;]*@\\w+)", weight: 1.0 },
    "REGEX::PRINT_SP_NAME_Q13": { regex: "(?:PRINT|print)\\s*(?=[^;]*\\b(?:Name|NAME)(?:\\s*:)?)(?=[^;]*@\\w+)(?=[^;]*@\\w+)", weight: 0.5 },
    "REGEX::EXEC_SP_DETAILS_Q13": { regex: "EXEC\\s+(?:SalespersonDetails|GetSalespersonDetails)\\s+(?:@SalespersonID\\s*=\\s*)?1", weight: 1.0 }
  },
  "Q14": {
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles\\s*\\(", weight: 1.0 },
    "REGEX::FUNCTION_PARAM_TYPE": { regex: "@km\\s+(?:AS\\s+)?(?:INT|FLOAT)\\s*\\)", weight: 1.0 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1.0 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1.0 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1.0 },
    "REGEX::RETURN_CALCULATION": { regex: "(?:RETURN\\s+@km\\s*\\*\\s*0\\.62|SET\\s+@\\w+\\s*=\\s*(?:ROUND\\s*\\(\\s*)?@km\\s*\\*\\s*0\\.62(?:,\\s*\\d+\\s*\\))?;\\s*RETURN\\s+@\\w+)", weight: 2.0 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 1.0 },
    "REGEX::PRINT_MILEAGE_CALCULATION": { regex: "PRINT\\s+.*?Mileage:\\s*'.*?CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*(?:dbo\\.KmToMiles\\(@\\w+\\)|@\\w+)\\)\\s*\\+\\s*'(?:\\s*)?miles'" , weight: 2.0 }
  }
};