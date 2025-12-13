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
    "SELECT": 2,
    "FROM": 1
  },
  "Q11": { // Total 10.0 points
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+PROCEDURE\\s+\\w+\\s*(?:\\(|\\s+@\\w+)", weight: 0.5 },
    "REGEX::PARAM_INT": { regex: "@CID\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_FN": { regex: "DECLARE\\s+@CFiN\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_LN": { regex: "DECLARE\\s+@CFaN\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A1": { regex: "DECLARE\\s+@CA1\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A2": { regex: "DECLARE\\s+@CA2\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_A3": { regex: "DECLARE\\s+@CA3\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_PH": { regex: "DECLARE\\s+@Ph\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+CustomerID,\\s*FirstName,\\s*FamilyName,\\s*Phone,\\s*Address1,\\s*Address2,\\s*Address3\\s+FROM\\s+Customer", weight: 0.5 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer(?:\\s+\\w+)?", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+CustomerID\\s*=\\s*@CID", weight: 1.0 },
    "REGEX::FETCH_NEXT_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CustomerCursor\\s+INTO\\s+@CID,\\s*@CFiN,\\s*@CFaN,\\s*@Ph,\\s*@CA1,\\s*@CA2,\\s*@CA3", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "PRINT\\s+'CUSTOMER\\s+DETAILS:'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "PRINT\\s+'\\s*'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "PRINT\\s+'Customer\\s+ID:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CID\\)\\s*\\+\\s*'\\s{8}Phone:\\s*'\\s*\\+\\s*@Ph", weight: 0.5 },
    "REGEX::PRINT_NAME": { regex: "PRINT\\s+'Customer\\s+Name:\\s*'\\s*\\+\\s*@CFiN\\s*\\+\\s*'\\s+'\\s*\\+\\s*@CFaN", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "PRINT\\s+'Address:\\s*'\\s*\\+\\s*@CA1\\s*\\+\\s*',\\s*'\\s*\\+\\s*@CA2\\s*\\+\\s*',\\s*'\\s*\\+\\s*@CA3", weight: 0.5 },
    "REGEX::FETCH_NEXT_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CustomerCursor\\s+INTO\\s+@CID,\\s*@CFiN,\\s*@CFaN,\\s*@Ph,\\s*@CA1,\\s*@CA2,\\s*@CA3", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+CustomerDetails\\s+1(?:;)?", weight: 0.5 }
  },
  "Q12": { // Total 10.0 points
    "REGEX::PARAM_VARCHAR": { regex: "@RID\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_INT": { regex: "DECLARE\\s+@Yr\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_1": { regex: "DECLARE\\s+@Mk\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_2": { regex: "DECLARE\\s+@Md\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR_3": { regex: "DECLARE\\s+@Col\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_INT_2": { regex: "DECLARE\\s+@Own\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_INT_3": { regex: "DECLARE\\s+@Km\\s+(?:AS\\s+)?INT", weight: 0.5 },
    "REGEX::DECLARE_MONEY": { regex: "DECLARE\\s+@Pr\\s+(?:AS\\s+)?MONEY", weight: 0.5 },
    "REGEX::SELECT_CAR_DETAILS": { regex: "SELECT\\s+RegistrationID,\\s*CarYear,\\s*Make,\\s*Model,\\s*ColourName,\\s*NumOwners,\\s*Kilometres,\\s*Price\\s+FROM\\s+Car\\s+JOIN\\s+LU_Colour", weight: 0.5 },
    "REGEX::FROM_CAR_JOIN_LU_COLOUR": { regex: "FROM\\s+Car\\s+(?:INNER\\s+)?JOIN\\s+LU_Colour(?:\\s+\\w+)?", weight: 0.5 },
    "ON Car.ColourID = LU_Colour.ColourID": 0.5,
    "REGEX::WHERE_REGISTRATION_ID": { regex: "WHERE\\s+RegistrationID\\s*=\\s*@RID\\s*;?", weight: 0.5 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER": { regex: "PRINT\\s+'VEHICLE\\s+DETAILS:'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_2": { regex: "PRINT\\s+'\\s*'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_REGISTRATION_ID": { regex: "PRINT\\s+'Registration\\s+ID:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@RID\\)\\s*", weight: 0.5 },
    "REGEX::PRINT_YEAR_MAKE_MODEL": { regex: "PRINT\\s+'Year:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Yr\\)\\s*\\+\\s*'\\s{7}Make:\\s*'\\s*\\+\\s*@Mk\\s*\\+\\s*'\\s{7}Model:\\s*'\\s*\\+\\s*@Md", weight: 0.5 },
    "REGEX::PRINT_COLOUR_OWNERS_KM": { regex: "PRINT\\s+'Colour:\\s*'\\s*\\+\\s*@Col\\s*\\+\\s*'\\s{7}Owners:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Own\\)\\s*\\+\\s*'\\s{7}Kilometres:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Km\\)\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE": { regex: "PRINT\\s+'Price:\\s*\\$'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Pr\\)\\s*", weight: 0.5 },
    "REGEX::FETCH_NEXT_CAR_DETAILS": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CarCursor\\s+INTO\\s+@RID,\\s*@Yr,\\s*@Mk,\\s*@Md,\\s*@Col,\\s*@Own,\\s*@Km,\\s*@Pr", weight: 0.5 },
    "REGEX::EXEC_CAR_DETAILS": { regex: "EXEC\\s+CarDetails\\s+'ALP394'(?:;)?", weight: 0.5 }
  },
  "Q13": { // Total 10.0 points
    "REGEX::PARAM_SID_INT": { regex: "@SPID\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_SFNAME_VARCHAR": { regex: "DECLARE\\s+@FiN\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_SFAMNAME_VARCHAR": { regex: "DECLARE\\s+@FaN\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_SPH_VARCHAR": { regex: "DECLARE\\s+@Ph\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::SELECT_SP_COLUMNS": { regex: "SELECT\\s+SalesPersonID,\\s*FirstName,\\s*FamilyName,\\s*Phone\\s+FROM\\s+SalesPerson", weight: 1.5 },
    "REGEX::FROM_SALESPERSON": { regex: "FROM\\s+Salesperson(?:\\s+\\w+)?", weight: 0.5 },
    "REGEX::WHERE_SALESPERSONID_SID": { regex: "WHERE\\s+SalesPersonID\\s*=\\s*@SPID", weight: 1.0 },
    "REGEX::FETCH_NEXT_1_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@SPCursor\\s+INTO\\s+@SPID,\\s*@FiN,\\s*@FaN,\\s*@Ph", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER_Q13": { regex: "PRINT\\s+'SALESPERSON\\s+DETAILS:'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_Q13": { regex: "PRINT\\s+'\\s*'(?:;)?", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE_Q13": { regex: "PRINT\\s+'Salesperson\\s+ID:\\s*'\\s*\\+\\s*@SPID\\s*\\+\\s*'\\s{8}Phone:\\s*'\\s*\\+\\s*@Ph", weight: 1.5 },
    "REGEX::PRINT_SP_NAME_Q13": { regex: "PRINT\\s+'Name:\\s*'\\s*\\+\\s*@FiN\\s*\\+\\s*'\\s+'\\s*\\+\\s*@FaN", weight: 0.5 },
    "REGEX::FETCH_NEXT_2_Q13": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@SPCursor\\s+INTO\\s+@SPID,\\s*@FiN,\\s*@FaN,\\s*@Ph", weight: 0.5 },
    "REGEX::EXEC_SP_DETAILS_Q13": { regex: "EXEC\\s+SalespersonDetails\\s+1(?:;)?", weight: 1.5 }
  },
  "Q14": { // Total 10.0 points
    // KmToMiles Function (5.0 points)
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+KmToMiles\\s*\\(", weight: 0.5 },
    "REGEX::FUNCTION_PARAM_INT": { regex: "@km\\s+(?:AS\\s+)?INT\\s*\\)", weight: 0.5 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 0.5 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 0.5 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 0.5 },
    "REGEX::RETURN_CALCULATION": { regex: "RETURN\\s+@km\\s*\\*\\s*0\\.62", weight: 2.0 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 0.5 },

    // CarDetails2 Procedure (5.0 points)
    "REGEX::PROCEDURE_HEADER_Q14": { regex: "CREATE\\s+PROCEDURE\\s+CarDetails2\\s*\\(", weight: 0.5 },
    "REGEX::PARAM_RID_Q14": { regex: "@RID\\s+(?:AS\\s+)?VARCHAR\\((?:\\d+)\\)", weight: 0.5 },
    "REGEX::DECLARE_VARS_Q14": { regex: "DECLARE\\s+@Yr\\s+AS\\s+INT\\s+DECLARE\\s+@Mk\\s+AS\\s+VARCHAR\\(100\\)\\s+DECLARE\\s+@Md\\s+AS\\s+VARCHAR\\(100\\)\\s+DECLARE\\s+@Col\\s+AS\\s+VARCHAR\\(100\\)\\s+DECLARE\\s+@Own\\s+AS\\s+INT\\s+DECLARE\\s+@Km\\s+AS\\s+INT\\s+DECLARE\\s+@Pr\\s+AS\\s+MONEY", weight: 0.5 }, // Grouped declarations
    "REGEX::SELECT_CAR_DETAILS_Q14": { regex: "SELECT\\s+RegistrationID,\\s*CarYear,\\s*Make,\\s*Model,\\s*ColourName,\\s*NumOwners,\\s*Kilometres,\\s*Price\\s+FROM\\s+Car\\s+JOIN\\s+LU_Colour", weight: 0.5 },
    "REGEX::WHERE_RID_Q14": { regex: "WHERE\\s+RegistrationID\\s*=\\s*@RID", weight: 0.5 },
    "REGEX::FETCH_NEXT_Q14": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CarCursor\\s+INTO\\s+@RID,\\s*@Yr,\\s*@Mk,\\s*@Md,\\s*@Col,\\s*@Own,\\s*@Km,\\s*@Pr", weight: 0.25 },
    "REGEX::PRINT_VEHICLE_DETAILS_HEADER_Q14": { regex: "PRINT\\s+'VEHICLE\\s+DETAILS:'", weight: 0.25 },
    "REGEX::PRINT_EMPTY_LINE_Q14": { regex: "PRINT\\s+''", weight: 0.25 },
    "REGEX::PRINT_REGISTRATION_ID_Q14": { regex: "PRINT\\s+'Registration\\s+ID:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@RID\\)\\s*", weight: 0.25 },
    "REGEX::PRINT_YEAR_MAKE_MODEL_Q14": { regex: "PRINT\\s+'Year:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Yr\\)\\s*\\+\\s*'\\s{7}Make:\\s*'\\s*\\+\\s*@Mk\\s*\\+\\s*'\\s{7}Model:\\s*'\\s*\\+\\s*@Md", weight: 0.5 },
    "REGEX::PRINT_COLOUR_OWNERS_KM_MILEAGE_Q14": { regex: "PRINT\\s+'Colour:\\s*'\\s*\\+\\s*@Col\\s*\\+\\s*'\\s{7}Owners:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Own\\)\\s*\\+\\s*'\\s{7}Kilometres:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Km\\)\\s*\\+\\s*'km,\\s*Mileage:\\s*'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*dbo\\.KmToMiles\\(@Km\\)\\)\\s*\\+\\s*'\\s*miles'", weight: 0.75 },
    "REGEX::PRINT_PRICE_Q14": { regex: "PRINT\\s+'Price:\\s*\\$'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@Pr\\)\\s*", weight: 0.25 },
    "REGEX::EXEC_CAR_DETAILS2_Q14": { regex: "EXEC\\s+CarDetails2\\s+'ALP394'", weight: 0.25 }
  }
};