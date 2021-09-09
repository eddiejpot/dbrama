// ================================================================ IMPORT
const { Parser } = require("@dbml/core");

// ================================================================ HELPER FUNCTIONS
const getRelationshipType = (relationship) => {
  return relationship === '1' ? "O" : "M"
}

const checkIfPrimaryKey = (pk) => {
  return pk === true ? true : false
}

const parseRelationships = (relationshipsArr) => {
  const outputRelationshipsArr = relationshipsArr.map(rel => {
    const fromEndPoint = rel.endpoints[0];
    const toEndPoint = rel.endpoints[1];
    const text = getRelationshipType(fromEndPoint.relation);
    const toText = getRelationshipType(toEndPoint.relation);

    const relatioshipObj = 
    {
      from: fromEndPoint.tableName, 
      fromPort: fromEndPoint.fieldNames[0], 
      to: toEndPoint.tableName, 
      toPort: toEndPoint.fieldNames[0], 
      text,  
      toText,
    }
    return relatioshipObj
  });

  return outputRelationshipsArr;
}

const parseTables = (tablesArr) => {
  const finalTablesArr = []
  for (let i = 0; i< tablesArr.length; i+=1) {
    const table = tablesArr[i];
    // make table object
    const tableObj = 
      {
        key: table.name,
        items: []
      }
    // get fields and add to items array
    const tableFields = table.fields
    for (let j = 0; j < tableFields.length; j+=1) {
      const field = tableFields[j];
      const fieldObj = 
      {
        name: field.name,
        isKey: checkIfPrimaryKey(field.pk),
        type: field.type.type_name,
      }
      tableObj.items.push(fieldObj);
    }

    // add to finalTableArr
    finalTablesArr.push(tableObj)
  }
  return finalTablesArr;
}

// =====================================================================================
// ================================================================ MAIN PARSER FUNCTION
// =====================================================================================
/**
 * Returns an object with 2 keys tables and relationships
 *
 * @param {string} schema the schema in dbml or string
 * @return {number} an object with 2 keys tables and relationships, if failure it will return 'error'
 * E.g. 
 * {  
 *  nodeDataArray: [...]
 *  linkDataArray: [...]
 * }
 * see "../../components/Diagram/diagramInitialState.js" for more info on the object returned
 */
export const dbmlToGoJs = (schema) => {
  try {
    // parse DBML to Database object
    const database = Parser.parse(schema, "dbml");

    // table relationships
    const parsedRelationships = parseRelationships(database.schemas[0].refs)

    // tables and their contents
    const parsedTables= parseTables(database.schemas[0].tables)

    // wrap in object and return
    const parsedObj =  
    {
      nodeDataArray: parsedTables,
      linkDataArray: parsedRelationships,
    }

    return parsedObj;

  } catch (error) {
    console.log('error in parse', error)
    return 'error'
  }
}