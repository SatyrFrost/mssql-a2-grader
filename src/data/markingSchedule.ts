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
    "REGEX::CREATE_PROCEDURE_HEADER": { regex: "CREATE\\s+PROCEDURE\\s+\\w+\\s*\\n\\s*\\(", weight: 0.5 }, // Updated regex for newline flexibility
    "REGEX::PARAM_INT": { regex: "@\\w+\\s+(?:AS\\s+)?INT", weight: 0.5 }, // Updated regex to allow 'AS'
    "REGEX::DECLARE_VARCHAR100_CFiN": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR100_CFaN": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR100_CA1": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR100_CA2": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR100_CA3": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_VARCHAR20_Ph": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(20\\)", weight: 0.5 },
    "REGEX::SELECT_COLUMNS": { regex: "SELECT\\s+(?=.*CustomerID)(?=.*FirstName)(?=.*FamilyName)(?=.*Phone)(?=.*Address1)(?=.*Address2)(?=.*Address3).*FROM", weight: 0.5 },
    "REGEX::FROM_CUSTOMER": { regex: "FROM\\s+Customer", weight: 0.5 },
    "REGEX::WHERE_CID": { regex: "WHERE\\s+CustomerID\\s+=\\s*@\\w+", weight: 1.0 },
    "REGEX::FETCH_NEXT_1": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+\\s*", weight: 0.5 },
    "REGEX::PRINT_DETAILS_HEADER": { regex: "PRINT\\s+'CUSTOMER\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_1": { regex: "PRINT\\s+''", weight: 0.5 },
    "REGEX::PRINT_CID_PHONE": { regex: "PRINT\\s+'Customer\\s+ID:\\s+'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)\\s*\\+\\s*'.*?'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_NAME": { regex: "PRINT\\s+'Customer\\s+Name:\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*'\\s+'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_ADDRESS": { regex: "PRINT\\s+'Address:\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*',\\s+'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+\\s*", weight: 0.5 },
    "REGEX::EXEC_CUSTOMER_DETAILS": { regex: "EXEC\\s+\\w+\\s+1", weight: 0.5 }
  },
  "Q12": {
    "REGEX::PARAM_RID_VARCHAR10": { regex: "@RID\\s+VARCHAR\\(10\\)", weight: 0.5 },
    "REGEX::DECLARE_RegID_VARCHAR10": { regex: "DECLARE\\s+@RegID\\s+AS\\s+VARCHAR\\(10\\)", weight: 0.5 },
    "REGEX::DECLARE_CColour_VARCHAR100": { regex: "DECLARE\\s+@CColour\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CMake_VARCHAR100": { regex: "DECLARE\\s+@CMake\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CModel_VARCHAR100": { regex: "DECLARE\\s+@CModel\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_CYear_INT": { regex: "DECLARE\\s+@CYear\\s+AS\\s+INT", weight: 0.5 },
    "REGEX::DECLARE_CNumOwn_INT": { regex: "DECLARE\\s+@CNumOwn\\s+AS\\s+INT", weight: 0.5 },
    "REGEX::DECLARE_CPrice_MONEY": { regex: "DECLARE\\s+@CPrice\\s+AS\\s+MONEY", weight: 0.5 },
    "REGEX::DECLARE_CKm_INT": { regex: "DECLARE\\s+@CKm\\s+AS\\s+INT", weight: 0.5 },
    "SELECT RegistrationID, ColourName, Make, Model, CarYear, NumOwners, Price, Kilometres": 0.5,
    "FROM Car, LU_Colour": 0.5,
    "WHERE Car.ColourID = LU_Colour.ColourID": 0.5,
    "AND RegistrationID = @RID": 0.5,
    "PRINT 'VEHICLE DETAILS:'": 0.5,
    "REGEX::PRINT_REGID": { regex: "PRINT\\s+'Registration\\s+ID:\\s+'\\s*\\+\\s*@RegID", weight: 0.5 },
    "REGEX::PRINT_YEAR_MAKE_MODEL_NEW": { regex: "PRINT\\s+'Year:\\s+'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CYear\\)\\s*\\+\\s*'.*?'\\s*\\+\\s*'Make:\\s+'\\s*\\+\\s*@CMake\\s*\\+\\s*'.*?'\\s*\\+\\s*'Model:\\s+'\\s*\\+\\s*@CModel", weight: 0.5 },
    "REGEX::PRINT_COLOUR_OWNERS_KM_NEW": { regex: "PRINT\\s+'Colour:\\s+'\\s*\\+\\s*@CColour\\s*\\+\\s*'.*?'\\s*\\+\\s*'Owners:\\s+'\\s*\\+\\s*CONVERT\\(\\s*VARCHAR\\(10\\),\\s*@CNumOwn\\s*\\)\\s*\\+\\s*'.*?'\\s*\\+\\s*'Kilometres:\\s+'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CKm\\s*\\)\\s*\\+\\s*'km'", weight: 0.5 },
    "REGEX::PRINT_PRICE_NEW": { regex: "PRINT\\s+'Price:\\s*\\$'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@CPrice\\)", weight: 0.5 },
    "REGEX::FETCH_NEXT_CAR_DETAILS_NEW": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@CarCursor\\s+INTO\\s+@RegID,\\s*@CColour,\\s*@CMake,\\s*@CModel,\\s*@CYear,\\s*@CNumOwn,\\s*@CPrice,\\s*@CKm", weight: 0.5 },
    "EXEC CarDetails 'ALP394'": 0.5
  },
  "Q13": {
    "REGEX::PARAM_SPID_VARCHAR20": { regex: "@\\w+\\s+VARCHAR\\(20\\)", weight: 0.5 },
    "REGEX::DECLARE_FIN_VARCHAR100": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_FAN_VARCHAR100": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "REGEX::DECLARE_PH_VARCHAR100": { regex: "DECLARE\\s+@\\w+\\s+AS\\s+VARCHAR\\(100\\)", weight: 0.5 },
    "SELECT SalespersonID, FirstName, FamilyName, Phone": 1,
    "FROM Salesperson": 0.5,
    "REGEX::WHERE_SALESPERSON_ID": { regex: "WHERE\\s+SalespersonID\\s+=\\s*@\\w+", weight: 1 },
    "REGEX::FETCH_NEXT_SP_DETAILS": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+", weight: 0.5 },
    "REGEX::PRINT_SALESPERSON_DETAILS_HEADER": { regex: "PRINT\\s+'SALESPERSON\\s+DETAILS:'", weight: 0.5 },
    "REGEX::PRINT_EMPTY_LINE_3": { regex: "PRINT\\s+''", weight: 0.5 },
    "REGEX::PRINT_SPID_PHONE": { regex: "PRINT\\s+'Salesperson\\s+ID:\\s+'\\s*\\+\\s*@\\w+\\s*\\+\\s*'.*?'\\s*\\+\\s*@\\w+", weight: 1 },
    "REGEX::PRINT_SP_NAME": { regex: "PRINT\\s+'Name:\\s+'\\s*\\+\\s*@\\w+\\s+\\+\\s*'\\s+'\\s*\\+\\s*@\\w+", weight: 0.5 },
    "REGEX::FETCH_NEXT_SP_DETAILS_2": { regex: "FETCH\\s+NEXT\\s+FROM\\s+@\\w+\\s+INTO\\s+@\\w+,\\s*@\\w+,\\s*@\\w+,\\s*@\\w+", weight: 0.5 },
    "REGEX::EXEC_SALESPERSON_DETAILS": { regex: "EXEC\\s+\\w+\\s+1", weight: 1 }
  },
  "Q14": {
    "REGEX::CREATE_FUNCTION_HEADER": { regex: "CREATE\\s+FUNCTION\\s+\\w+\\s+\\(`", weight: 1 },
    "REGEX::FUNCTION_PARAM_INT": { regex: "@\\w+\\s+INT\\s+\\)`", weight: 1 },
    "REGEX::RETURNS_FLOAT": { regex: "RETURNS\\s+FLOAT", weight: 1 },
    "REGEX::AS_KEYWORD": { regex: "AS", weight: 1 },
    "REGEX::BEGIN_KEYWORD": { regex: "BEGIN", weight: 1 },
    "REGEX::RETURN_CALCULATION": { regex: "RETURN\\s+@\\w+\\s+\\*\\s+0\\.62", weight: 2 },
    "REGEX::END_KEYWORD": { regex: "END", weight: 1 },
    "REGEX::PRINT_PRICE_Q14": { regex: "PRINT\\s+'Price:\\s*\\$'\\s*\\+\\s*CONVERT\\(VARCHAR\\(10\\),\\s*@\\w+\\)'", weight: 0.5 },
    "REGEX::PRINT_MILEAGE": { regex: "CONVERT\\(VARCHAR\\(10\\),\\s+dbo\\.\\w+\\(@\\w+\\)\\)\\s+\\+\\s+' miles'", weight: 2 }
  }
};