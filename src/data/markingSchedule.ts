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
    "JOIN_CLAUSES": 2,
    "GROUP": 0.5,
    "ORDER": 0.5
  },
  "Q8": {
    "SELECT": 1,
    "FROM": 1,
    "REGEX::UNSOLD_PRODUCTS_LOGIC": { regex: "(?=.*(?:WHERE\\s+(?:\\w+\\.)?ProductID\\s+NOT\\s+IN\\s*\\(|LEFT\\s+(?:OUTER\\s+)?JOIN\\s+\\w+\\s+ON\\s+\\w+\\.\\w+\\s*=\\s+\\w+\\.\\w+\\s+WHERE\\s+\\w+\\.\\w+\\s+IS\\s+NULL))(?=.*(?:SELECT\\s+(?:DISTINCT\\s+)?(?:\\w+\\.)?ProductID\\s+FROM\\s+OrdersProduct|ON\\s+p\\.ProductID\\s*=\\s+op\\.ProductID))", weight: 2 }
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
    "REGEX::FETCH_NEXT_STATEMENT_1_Q11": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:\\s*,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_2_Q11": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+(?:\\s*,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "(?:PRINT|print)\\s+'CUSTOMER\\s+DETAILS(?:\\s*:)?'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "(?:PRINT|print)\\s+'Customer ID:\\s*'\\s*\\+\\s*(?:CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)|@\\w+)\\s*\\+\\s*'\\s*Phone:\\s*'\\s*\\+\\s*@\\w+", weight: 1.0 },
    "REGEX::PRINT_NAME": { regex: "(?:PRINT|print)\\s+'(?:Customer\\s+Name|CustomerName):\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+?\\s*'(?:\\s*)?'?\\s*\\+\\s*@\\w+(?:;)?", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "(?:PRINT|print)\\s+'(?:Address|CUSTOMER\\s+ADDRESS):\\s*'(?:\\s*\\+\\s*@\\w+)(?:\\s*\\+\\s*',\\s*'\\s*\\+\\s*@\\w+){2}(?:;)?", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+CustomerDetails\\s+(?:@\\w+\\s*=\\s*)?(?:\\d+|'\\d+')", weight: 0.5 }
  },
  "Q12": {
    "REGEX::PARAM_RID_TYPE_Q12": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\(10\\)", weight: 0.5 },
    "REGEX::DECLARE_REGID_Q12": { regex: "(?:DECLARE|declare)\\s+@RegID\\s+(?:AS\\s+)?VARCHAR\\(10\\)", weight: 0.5 },
    "REGEX::DECLARE_CCOLOUR_Q12": { regex: "(?:DECLARE|declare)\\s+@CColour\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CMAKE_Q12": { regex: "(?:DECLARE|declare)\\s+@CMake\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CMODEL_Q12": { regex: "(?:DECLARE|declare)\\s+@CModel\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CYEAR_Q12": { regex: "(?:DECLARE|declare)\\s+@CYear\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_CNUMOWN_Q12": { regex: "(?:DECLARE|declare)\\s+@CNumOwn\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_CPRICE_Q12": { regex: "(?:DECLARE|declare)\\s+@CPrice\\s+(?:AS\\s+)?MONEY", weight: 0.5 },
    "REGEX::DECLARE_CKM_Q12": { regex: "(?:DECLARE|declare)\\s+@CKm\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::SELECT_COLUMNS_Q12": { regex: "SELECT\\s+(?=[^;]*\\bRegistrationID\\b)(?=[^;]*\\bColourName\\b)(?=[^;]*\\bMake\\b)(?=[^;]*\\bModel\\b)(?=[^;]*\\bCarYear\\b)(?=[^;]*\\bNumOwners\\b)(?=[^;]*\\bPrice\\b)(?=[^;]*\\bKilometres\\b)", weight: 0.5 },
    "REGEX::FROM_CLAUSE_Q12": { regex: "FROM\\s+Car\\s*,\\s*LU_Colour", weight: 0.5 },
    "REGEX::JOIN_CONDITION_Q12": { regex: "WHERE\\s+(?:Car\\.)?ColourID\\s*=\\s*(?:LU_Colour\\.)?ColourID", weight: 0.5 },
    "REGEX::WHERE_RID_Q12": { regex: "AND\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_HEADER_Q12": { regex: "(?:PRINT|print)\\s+'VEHICLE\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_REGID_Q12": { regex: "(?:PRINT|print)\\s+'Registration\\s+ID:\\s*'\\s*\\+\\s*@RegID", weight: 0.5 },
    "REGEX::PRINT_YEAR_MAKE_MODEL_Q12_TEMPLATE": { regex: "(?:PRINT|print)\\s+'Year:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CYear\\)\\s*\\+\\s*'.*?Make:\\s*'\\s*\\+\\s*@CMake\\s*\\+\\s*'.*?Model:\\s*'\\s*\\+\\s*@CModel", weight: 0.5 },
    "REGEX::PRINT_COLOUR_OWNERS_KM_Q12_TEMPLATE": { regex: "(?:PRINT|print)\\s+'Colour:\\s*'\\s*\\+\\s*@CColour\\s*\\+\\s*'.*?Owners:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CNumOwn\\)\\s*\\+\\s*'.*?Kilometres:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CKm\\)\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE_Q12": { regex: "(?:PRINT|print)\\s+'Price:\\s*\\$'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CPrice\\)", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CarCursor\\s+INTO\\s+@RegID,\\s*@CColour,\\s*@CMake,\\s*@CModel,\\s*@CYear,\\s*@CNumOwn,\\s*@CPrice,\\s*@CKm", weight: 0.5 },
    "REGEX::EXEC_CARDETAILS_Q12": { regex: "EXEC\\s+CarDetails\\s+'ALP394'", weight: 0.5 }
  },
  "Q13": {
    "REGEX::PARAM_SID_TYPE_Q13": { regex: "@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_SPID_Q13": { regex: "(?:DECLARE|declare)\\s+@SPID\\s+(?:AS\\s+)?INT", weight: 1.0 },
    "REGEX::DECLARE_SFNAME_Q13": { regex: "(?:DECLARE|declare)\\s+@SFname\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_SFAMNAME_Q13": { regex: "(?:DECLARE|declare)\\s+@SFamName\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_SPH_Q13": { regex: "(?:DECLARE|declare)\\s+@SPh\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS_Q13": { regex: "SELECT\\s+(?=[^;]*\\bSalespersonID\\b)(?=[^;]*\\bFirstName\\b)(?=[^;]*\\bFamilyName\\b)(?=[^;]*\\bPhone\\b)", weight: 1.0 },
    "REGEX::FROM_SALESPERSON_Q13": { regex: "FROM\\s+Salesperson", weight: 0.5 },
    "REGEX::WHERE_SID_Q13": { regex: "WHERE\\s+(?:\\w+\\.)?SalespersonID\\s*=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_STATEMENT_1_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@SalespersonCursor\\s+INTO\\s+@SPID,\\s*@SFname,\\s*@SFamName,\\s*@SPh", weight: 0.5 },
    "REGEX::PRINT_HEADER_Q13": { regex: "(?:PRINT|print)\\s+'SALESPERSON\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "(?:PRINT|print)\\s+''", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE_Q13_TEMPLATE": { regex: "(?:PRINT|print)\\s+'Salesperson\\s+ID:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@SPID\\)\\s*\\+\\s*'.*?Phone:\\s*'\\s*\\+\\s*@SPh", weight: 1.0 },
    "REGEX::PRINT_NAME_Q13": { regex: "(?:PRINT|print)\\s+'Name:\\s*'\\s*\\+\\s*@SFname\\s*\\+\\s*'.*?'\\s*\\+\\s*@SFamName", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_2_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@SalespersonCursor\\s+INTO\\s+@SPID,\\s*@SFname,\\s*@SFamName,\\s*@SPh", weight: 0.5 },
    "REGEX::EXEC_SALESPERSONDETAILS_Q13": { regex: "EXEC\\s+SalespersonDetails\\s+1", weight: 1.0 }
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