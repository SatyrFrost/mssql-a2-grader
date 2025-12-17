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
    "REGEX::PARAM_CID_TYPE": { regex: "@CID\\s+INT", weight: 0.5 },
    "REGEX::DECLARE_CFiN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@CFiN\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CFaN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@CFaN\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CA1_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@CA1\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CA2_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@CA2\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CA3_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@CA3\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_Ph_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@Ph\\s+(?:AS\\s+)?VARCHAR\\(20\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+(?=[^;]*\\bCustomerID\\b)(?=[^;]*\\bFirstName\\b)(?=[^;]*\\bFamilyName\\b)(?=[^;]*\\bPhone\\b)(?=[^;]*\\bAddress1\\b)(?=[^;]*\\bAddress2\\b)(?=[^;]*\\bAddress3\\b).*?FROM", weight: 0.5 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+(?:\\w+\\.)?CustomerID\\s*=\\s*@CID", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_1_Q11": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CustomerCursor\\s+INTO\\s+@CID,\\s*@CFiN,\\s*@CFaN,\\s*@Ph,\\s*@CA1,\\s*@CA2,\\s*@CA3", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_2_Q11": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CustomerCursor\\s+INTO\\s+@CID,\\s*@CFiN,\\s*@CFaN,\\s*@Ph,\\s*@CA1,\\s*@CA2,\\s*@CA3", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "(?:PRINT|print)\\s+'CUSTOMER\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "(?:PRINT|print)\\s+''", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "(?:PRINT|print)\\s+'Customer ID:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CID\\)\\s*\\+\\s*'\\s*Phone:\\s*'\\s*\\+\\s*@Ph", weight: 1.0 },
    "REGEX::PRINT_NAME": { regex: "(?:PRINT|print)\\s+'Customer Name:\\s*'\\s*\\+\\s*@CFiN\\s*\\+\\s*'\\s*'\\s*\\+\\s*@CFaN", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "(?:PRINT|print)\\s+'Address:\\s*'\\s*\\+\\s*@CA1\\s*\\+\\s*',\\s*'\\s*\\+\\s*@CA2\\s*\\+\\s*',\\s*'\\s*\\+\\s*@CA3", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+CustomerDetails\\s+1", weight: 0.5 }
  },
  "Q12": {
    "REGEX::CREATE_PROCEDURE_HEADER_Q12": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CarDetails", weight: 0.5 },
    "REGEX::PARAM_RID_TYPE_Q12": { regex: "@RID\\s+VARCHAR\\(20\\)", weight: 0.5 },
    "REGEX::DECLARE_YR_INT": { regex: "(?:DECLARE|declare)\\s+@Yr\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_MK_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@Mk\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_MD_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@Md\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_COL_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@Col\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_OWN_INT": { regex: "(?:DECLARE|declare)\\s+@Own\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_KM_INT": { regex: "(?:DECLARE|declare)\\s+@Km\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_PR_MONEY": { regex: "(?:DECLARE|declare)\\s+@Pr\\s+(?:AS\\s+)?MONEY", weight: 0.5 },
    "REGEX::SELECT_COLUMNS_Q12": { regex: "SELECT\\s+(?=[^;]*\\bRegistrationID\\b)(?=[^;]*\\bCarYear\\b)(?=[^;]*\\bMake\\b)(?=[^;]*\\bModel\\b)(?=[^;]*\\bColourName\\b)(?=[^;]*\\bNumOwners\\b)(?=[^;]*\\bKilometres\\b)(?=[^;]*\\bPrice\\b)", weight: 0.5 },
    "REGEX::FROM_JOIN_CLAUSE_Q12": { regex: "FROM\\s+Car\\s+JOIN\\s+LU_Colour\\s+ON\\s+(?:Car\\.)?ColourID\\s*=\\s*(?:LU_Colour\\.)?ColourID", weight: 0.5 },
    "REGEX::WHERE_RID_Q12": { regex: "WHERE\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@RID", weight: 0.5 },
    "REGEX::PRINT_HEADER_Q12": { regex: "(?:PRINT|print)\\s+'VEHICLE\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q12": { regex: "(?:PRINT|print)\\s+''", weight: 0.5 },
    "REGEX::PRINT_REGID_Q12": { regex: "(?:PRINT|print)\\s+'Registration\\s+ID:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@RID\\)", weight: 0.5 },
    "REGEX::PRINT_YEAR_MAKE_MODEL_Q12_TEMPLATE": { regex: "(?:PRINT|print)\\s+'Year:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Yr\\)\\s*\\+\\s*'.*?Make:\\s*'\\s*\\+\\s*@Mk\\s*\\+\\s*'.*?Model:\\s*'\\s*\\+\\s*@Md", weight: 0.5 },
    "REGEX::PRINT_COLOUR_OWNERS_KM_Q12_TEMPLATE": { regex: "(?:PRINT|print)\\s+'Colour:\\s*'\\s*\\+\\s*@Col\\s*\\+\\s*'.*?Owners:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Own\\)\\s*\\+\\s*'.*?Kilometres:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Km\\)\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE_Q12": { regex: "(?:PRINT|print)\\s+'Price:\\s*\\$'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Pr\\)", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_1_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CarCursor\\s+INTO\\s+@RID,\\s*@Yr,\\s*@Mk,\\s*@Md,\\s*@Col,\\s*@Own,\\s*@Km,\\s*@Pr", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_2_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CarCursor\\s+INTO\\s+@RID,\\s*@Yr,\\s*@Mk,\\s*@Md,\\s*@Col,\\s*@Own,\\s*@Km,\\s*@Pr", weight: 0.5 },
    "REGEX::EXEC_CARDETAILS_Q12": { regex: "EXEC\\s+CarDetails\\s+'ALP394'", weight: 0.5 }
  },
  "Q13": {
    "REGEX::CREATE_PROCEDURE_HEADER_Q13": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+SalespersonDetails", weight: 0.5 },
    "REGEX::PARAM_SPID_TYPE_Q13": { regex: "@SPID\\s+VARCHAR\\(20\\)", weight: 0.5 },
    "REGEX::DECLARE_FiN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@FiN\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_FaN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@FaN\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_Ph_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@Ph\\s+(?:AS\\s+)?VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS_Q13": { regex: "SELECT\\s+(?=[^;]*\\bSalesPersonID\\b)(?=[^;]*\\bFirstName\\b)(?=[^;]*\\bFamilyName\\b)(?=[^;]*\\bPhone\\b)", weight: 1.0 },
    "REGEX::FROM_SALESPERSON_Q13": { regex: "FROM\\s+Salesperson", weight: 0.5 },
    "REGEX::WHERE_SPID_Q13": { regex: "WHERE\\s+(?:\\w+\\.)?SalesPersonID\\s*=\\s*@SPID", weight: 1.0 },
    "REGEX::FETCH_NEXT_STATEMENT_1_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@SPCursor\\s+INTO\\s+@SPID,\\s*@FiN,\\s*@FaN,\\s*@Ph", weight: 0.5 },
    "REGEX::FETCH_NEXT_STATEMENT_2_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@SPCursor\\s+INTO\\s+@SPID,\\s*@FiN,\\s*@FaN,\\s*@Ph", weight: 0.5 },
    "REGEX::PRINT_HEADER_Q13": { regex: "(?:PRINT|print)\\s+'SALESPERSON\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "(?:PRINT|print)\\s+''", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE_Q13_TEMPLATE": { regex: "(?:PRINT|print)\\s+'Salesperson\\s+ID:\\s*'\\s*\\+\\s*@SPID\\s*\\+\\s*'\\s*Phone:\\s*'\\s*\\+\\s*@Ph", weight: 1.0 },
    "REGEX::PRINT_NAME_Q13": { regex: "(?:PRINT|print)\\s+'Name:\\s*'\\s*\\+\\s*@FiN\\s*\\+\\s*'\\s*'\\s*\\+\\s*@FaN", weight: 0.5 },
    "REGEX::EXEC_SALESPERSONDETAILS_Q13": { regex: "EXEC\\s+SalespersonDetails\\s+1", weight: 1.0 }
  },
  "Q14": {
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles\\s*\\(", weight: 1.0 },
    "REGEX::FUNCTION_PARAM_TYPE": { regex: "@km\\s+(?:AS\\s+)?INT\\s*\\)", weight: 1.0 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1.0 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1.0 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1.0 },
    "REGEX::RETURN_CALCULATION": { regex: "(?:RETURN\\s+@km\\s*\\*\\s*0\\.62|SET\\s+@\\w+\\s*=\\s*(?:ROUND\\s*\\(\\s*)?@km\\s*\\*\\s*0\\.62(?:,\\s*\\d+\\s*\\))?;\\s*RETURN\\s+@\\w+)", weight: 2.0 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 1.0 },
    "REGEX::PRINT_MILEAGE_CALCULATION": { regex: "PRINT\\s+.*?Mileage:\\s*'.*?CONVERT\\(VARCHAR\\((?:\\d+|MAX)\\),\\s*(?:dbo\\.KmToMiles\\(@km\\)|@\\w+)\\)\\s*\\+\\s*'(?:\\s*)?miles'" , weight: 2.0 }
  }
};