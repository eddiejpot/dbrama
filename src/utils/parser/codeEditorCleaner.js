// =====================================================================================
// ==================================================================== HELPER FUNCTIONS
// =====================================================================================

// takes in array and returns an array
const cleanUpComments = (codeToClean) => {
  const removedComments = codeToClean
    .filter((ele) => !ele.includes("/"))
    .filter((ele) => ele !== "");
  // console.log("comments removed", removedComments);
  return removedComments;
};

// takes in array and returns an object with 2 keys {tableRelationships: , cleanedCodeWithCompletedTables:, toCleanCodeTableRelationships:}
const removeIncompleteTableCodeAndGetDelcaredTables = (codeToClean) => {
  let startPoint = 0;
  let declaredTableObj = {};
  let completedTables = [];
  let relationships = [];
  let tempTableAttributesArr = [];

  for (let i = 0; i < codeToClean.length; i += 1) {
    if (codeToClean[i].includes("{")) {
      startPoint = i;
    } else if (codeToClean[i].includes("}")) {
      // if code reaches here it means table is complete
      // add completed table to completedTablesArray
      for (let j = startPoint; j <= i; j += 1) {
        // ignore if its incomplete. e.g. 'id'
        if (
          codeToClean[j].trim().split(" ").length >= 2 ||
          codeToClean[j].trim() === "}"
        ) {
          completedTables.push(codeToClean[j]);
        }
      }

      // collect table name and attributes
      // extract 'users' from 'Table users{'
      const declaredTable = codeToClean[startPoint]
        .replace("Table", "")
        .replace("{", "")
        .replace(/\s/g, "");
      // create obj key and push attributes inside it
      declaredTableObj[declaredTable] = [];
      for (let i = 0; i < tempTableAttributesArr.length; i += 1) {
        declaredTableObj[declaredTable].push(tempTableAttributesArr[i]);
      }
      tempTableAttributesArr = [];
    } else if (codeToClean[i].includes("Ref")) {
      // add relationships to relationships array
      relationships.push(codeToClean[i]);
    } else {
      // ignore if its incomplete. e.g. 'id'
      if (
        codeToClean[i].trim().split(" ").length >= 2 ||
        codeToClean[i].trim() === "}"
      ) {
        // extract 'id' from 'id int [pk]'
        const tableAttritbute = codeToClean[i].trim().split(" ")[0];
        tempTableAttributesArr.push(tableAttritbute);
      }
    }
  }

  // console.log("removed incomplete tables", completedTables);

  return {
    tableRelationships: declaredTableObj,
    cleanedCodeWithCompletedTables: completedTables,
    toCleanCodeTableRelationships: relationships
  };
};

// takes in an object and returns an array
const removeIncompleteRefCode = (codeToCleanOj) => {
  const { tableRelationships, cleanedCodeWithCompletedTables, toCleanCodeTableRelationships } = codeToCleanOj;
  // console.log(toCleanCodeTableRelationships)

  const completedRelationships = toCleanCodeTableRelationships.filter((relationship) => {
    // check if relationhip is complete and if it exists
    let output;
    const splitRef = relationship.split(' '); // ["Ref:", "users.id", "<", "orders.user_id"]
    if (splitRef.length === 4) {
      const [relationShipOneKey, relationshipOneValue] = splitRef[1]?.split('.'); // users id"
      const [relationshipTwoKey,relationshipTwoValue] = splitRef[3]?.split('.'); // orders user_id
      if ( tableRelationships[relationShipOneKey]?.includes(relationshipOneValue) && 
      tableRelationships[relationshipTwoKey]?.includes(relationshipTwoValue)) {
        output = relationship
      }
    }
    return output;
    });
  
    const cleanedCode = [...cleanedCodeWithCompletedTables, ...completedRelationships]
    // console.log('removed incomplete refs', cleanedCode)
    return cleanedCode;
};

// =====================================================================================
// ================================================================ MAIN CLEANER FUNCTION
// =====================================================================================
// main function that uses the helper functions to clean up code
const cleanUpCodeFromEditor = (codeToClean) => {
  // concert string to array
  const codeToCleanArr = codeToClean.split("\n");
  // console.log(codeToCleanArr);

  // clean up commets
  const removedCommentsArr = cleanUpComments(codeToCleanArr);

  // remove incomplete table code and get tables declared
  const cleanCodeAndTablesObj = removeIncompleteTableCodeAndGetDelcaredTables(
    removedCommentsArr
  );
  // clean up incomplete refs
  const removedIncompleteRefCode = removeIncompleteRefCode(cleanCodeAndTablesObj);

  // convert array back to string
  const finalCleanedCode = removedIncompleteRefCode.join("\n");
  // console.log('finalCleanedCode')
  // console.log(finalCleanedCode)
  return finalCleanedCode
}

export default cleanUpCodeFromEditor;