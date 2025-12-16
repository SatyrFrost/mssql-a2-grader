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
    "REGEX::SUBQUERY_OR_JOIN_CONDITION": { regex: "(SELECT\\s+(?:\\w+\\.)?ProductID\\s+FROM\\s+OrdersProduct|ON\\s+p\\.ProductID\\s*=\\s+op\\.ProductID)", weight: 1 }
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
    "REGEX::PARAM_INT": { regex: "@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_CFiN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:100|30)\\)", weight: 0.5 },
    "REGEX::DECLARE_CFaN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:100|30)\\)", weight: 0.5 },
    "REGEX::DECLARE_CA1_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:100|30)\\)", weight: 0.5 },
    "REGEX::DECLARE_CA2_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:100|30)\\)", weight: 0.5 },
    "REGEX::DECLARE_CA3_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:100|30)\\)", weight: 0.5 },
    "REGEX::DECLARE_Ph_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:20|30)\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+(?:\\w+\\.)?CustomerID,\\s*(?:\\w+\\.)?FirstName,\\s*(?:\\w+\\.)?FamilyName,\\s*(?:\\w+\\.)?Phone,\\s*(?:\\w+\\.)?Address1,\\s*(?:\\w+\\.)?Address2,\\s*(?:\\w+\\.)?Address3", weight: 0.5 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+CustomerID\\s*=\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "(?:PRINT|print)\\s+'CUSTOMER\\s+DETAILS(?:\\s*:)?'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "(?:PRINT|print)\\s+'Customer\\s+ID:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))?\\s*\\+\\s*'\\s*Phone:\\s*'(?:\\s*\\+\\s*@\\w+)?", weight: 1.0 },
    "REGEX::PRINT_NAME": { regex: "(?:PRINT|print)\\s+'Customer\\s+Name:\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+\\s*'\\s*'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "(?:PRINT|print)\\s+'Address:\\s*'(?:\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s*'){2}\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){6}", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+CustomerDetails\\s+1", weight: 0.5 }
  },
  "Q12": {
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CarDetails", weight: 0.5 },
    "REGEX::PARAM_VARCHAR": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\(20\\)", weight: 0.5 },
    "REGEX::DECLARE_Yr_INT": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?INT(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_Mk_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_Md_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_Col_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_Own_INT": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?INT(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_Km_INT": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?INT(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_Pr_MONEY": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?MONEY(?:;)?", weight: 0.5 },
    "REGEX::SELECT_CAR_DETAILS": { regex: "SELECT\\s+(?:\\w+\\.)?RegistrationID,\\s*(?:\\w+\\.)?CarYear,\\s*(?:\\w+\\.)?Make,\\s*(?:\\w+\\.)?Model,\\s*(?:\\w+\\.)?ColourName,\\s*(?:\\w+\\.)?NumOwners,\\s*(?:\\w+\\.)?Kilometres,\\s*(?:\\w+\\.)?Price", weight: 0.25 },
    "REGEX::FROM_CAR_JOIN_LU_COLOUR": { regex: "FROM\\s+Car\\s+(?:INNER\\s+)?JOIN\\s+LU_Colour", weight: 0.25 },
    "REGEX::ON_COLOURID": { regex: "ON\\s+(?:\\w+\\.)?Car\\.ColourID\\s*=\\s*(?:\\w+\\.)?LU_Colour\\.ColourID", weight: 0.25 },
    "REGEX::WHERE_REGISTRATIONID": { regex: "WHERE\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@\\w+", weight: 0.25 },
    "REGEX::FETCH_NEXT_1_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.5 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER": { regex: "(?:PRINT|print)\\s+'VEHICLE\\s+DETAILS(?:\\s*:)?'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_2": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.5 },
    "REGEX::PRINT_REGISTRATION_ID": { regex: "(?:PRINT|print)\\s+'Registration\\s+ID:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))?", weight: 0.5 },
    "REGEX::PRINT_YEAR_MAKE_MODEL": { regex: "(?:PRINT|print)\\s+'Year:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Make:\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Model:\\s*'(?:\\s*\\+\\s*@\\w+)", weight: 0.5 },
    "REGEX::PRINT_COLOUR_OWNERS_KM": { regex: "(?:PRINT|print)\\s+'Colour:\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Owners:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Kilometres:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE": { regex: "(?:PRINT|print)\\s+'Price:\\s*(?:\\$)?'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))?", weight: 0.5 },
    "REGEX::FETCH_NEXT_2_Q12": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.5 },
    "REGEX::EXEC_CAR_DETAILS": { regex: "EXEC\\s+CarDetails\\s+'ALP394'", weight: 0.5 }
  },
  "Q13": {
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+(?:SalespersonDetails|GetSalespersonDetails)", weight: 0.5 },
    "REGEX::PARAM_SPID_TYPE": { regex: "@\\w+\\s+(?:AS\\s+)?(?:VARCHAR\\(20\\)|INT)", weight: 0.5 },
    "REGEX::DECLARE_FiN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_FaN_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?", weight: 0.5 },
    "REGEX::DECLARE_Ph_VARCHAR": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:20|100)\\)(?:;)?", weight: 0.5 },
    "REGEX::SELECT_SP_COLUMNS": { regex: "SELECT\\s+(?:\\w+\\.)?SalesPersonID,\\s*(?:\\w+\\.)?FirstName,\\s*(?:\\w+\\.)?FamilyName,\\s*(?:\\w+\\.)?Phone", weight: 1.0 },
    "REGEX::FROM_SALESPERSON": { regex: "FROM\\s+Salesperson(?:\\s+\\w+)?", weight: 0.5 },
    "REGEX::WHERE_SALESPERSONID_SPID": { regex: "WHERE\\s+(?:\\w+\\.)?SalespersonID\\s*=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_1_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){3}", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER_Q13": { regex: "(?:PRINT|print)\\s+'SALESPERSON\\s+DETAILS(?:\\s*:)?'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE_Q13": { regex: "(?:PRINT|print)\\s+'Salesperson\\s+ID:\\s*'(?:\\s*\\+\\s*@\\w+)?\\s*\\+\\s*'\\s*Phone:\\s*'(?:\\s*\\+\\s*@\\w+)?", weight: 1.5 },
    "REGEX::PRINT_SP_NAME_Q13": { regex: "(?:PRINT|print)\\s+'Name:\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+\\s*'\\s*'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_2_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){3}", weight: 0.5 },
    "REGEX::EXEC_SP_DETAILS_Q13": { regex: "EXEC\\s+(?:SalespersonDetails|GetSalespersonDetails)\\s+(?:@SalespersonID\\s*=\\s*)?1", weight: 1.0 }
  },
  "Q14": {
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles", weight: 1.0 },
    "REGEX::FUNCTION_PARAM_TYPE": { regex: "@km\\s+(?:AS\\s+)?(?:INT|FLOAT)", weight: 1.0 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1.0 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1.0 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1.0 },
    "REGEX::RETURN_CALCULATION": { regex: "RETURN\\s+@km\\s*\\*\\s*0\\.62", weight: 1.5 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 1.0 },

    "REGEX::PRINT_COLOUR_OWNERS_KM_MILEAGE_Q14": { regex: "(?:PRINT|print)\\s+'Colour:\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Owners:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Kilometres:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))\\s*\\+\\s*'km,\\s*Mileage:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*dbo\\.KmToMiles\\(@\\w+\\)\\))\\s*\\+\\s*'\\s*miles'", weight: 0.5 },
    
    "REGEX::PROCEDURE_HEADER_Q14": { regex: "CREATE\\s+(?:PROCEDURE|PROC)\\s+CarDetails2", weight: 0.25 },
    "REGEX::PARAM_RID_Q14": { regex: "@\\w+\\s+(?:AS\\s+)?VARCHAR\\(20\\)", weight: 0.25 },
    "REGEX::DECLARE_VARS_Q14": { regex: "(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?INT(?:;)?\\s*(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?\\s*(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?\\s*(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?VARCHAR\\((?:50|100)\\)(?:;)?\\s*(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?INT(?:;)?\\s*(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?INT(?:;)?\\s*(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?MONEY(?:;)?(?:\\s*(?:DECLARE|declare)\\s+@\\w+\\s+(?:AS\\s+)?FLOAT(?:;))?", weight: 0.5 },
    "REGEX::SELECT_CAR_DETAILS_Q14": { regex: "SELECT\\s+(?:\\w+\\.)?RegistrationID,\\s*(?:\\w+\\.)?CarYear,\\s*(?:\\w+\\.)?Make,\\s*(?:\\w+\\.)?Model,\\s*(?:\\w+\\.)?ColourName,\\s*(?:\\w+\\.)?NumOwners,\\s*(?:\\w+\\.)?Kilometres,\\s*(?:\\w+\\.)?Price", weight: 0.25 },
    "REGEX::WHERE_RID_Q14": { regex: "WHERE\\s+(?:\\w+\\.)?RegistrationID\\s*=\\s*@\\w+", weight: 0.25 },
    "REGEX::FETCH_NEXT_Q14": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+CURSOR\\s+INTO\\s+@\\w+(?:,\\s*@\\w+){7}", weight: 0.25 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER_Q14": { regex: "(?:PRINT|print)\\s+'VEHICLE\\s+DETAILS(?:\\s*:)?'", weight: 0.0 },
    "REGEX::PRINT_EMPTY_LINE_Q14": { regex: "(?:PRINT|print)\\s+''|(?:PRINT|print)\\s+'\\s*'", weight: 0.0 },
    "REGEX::PRINT_REGISTRATION_ID_Q14": { regex: "(?:PRINT|print)\\s+'Registration\\s+ID:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))?", weight: 0.0 },
    "REGEX::PRINT_YEAR_MAKE_MODEL_Q14": { regex: "(?:PRINT|print)\\s+'Year:\\s*'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Make:\\s*'(?:\\s*\\+\\s*@\\w+)\\s*\\+\\s*'[^']+'\\s*\\+\\s*'Model:\\s*'(?:\\s*\\+\\s*@\\w+)", weight: 0.0 },
    "REGEX::PRINT_PRICE_Q14": { regex: "(?:PRINT|print)\\s+'Price:\\s*(?:\\$)?'(?:\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\))?", weight: 0.0 },
    "REGEX::EXEC_CAR_DETAILS2_Q14": { regex: "EXEC\\s+CarDetails2\\s+'ALP394'", weight: 0.25 }
  }
};