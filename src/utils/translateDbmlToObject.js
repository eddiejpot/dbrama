// =====================================================================
// ========================================== TRANSLATION FOR REFERENCES
// =====================================================================
const cleanUpStringToArray = (str) => {
  let result = str
     // remove ref:
    .slice(str.lastIndexOf(':')+1)
     // remove spaces
    .replace(/\s+/g, '')
    // split 
    .split(/(\w+)/)
  result = result.slice(1, result.length-1)
  return result
}

const isCleanUpSuccessful = (arr) => {
  if (arr.length === 7 && ['>','<','-'].includes(arr[3])) {
    return true;
  }
  return false;
}

const convertStrToObj = (arr) => {
  // console.log(arr)
  //["users",".","id","<","orders",".","user_id"]
 
  // check relationship
  let text;
  let toText;
  switch(arr[3]) {
  case '>':
    // > many-to-one;
    text = 'M'
    toText = 'O'
    break;
  case '<':
    // < one-to-many;
    text = 'O'
    toText = 'M'
    break;
  default:
    //- one-to-one
    text = 'O'
    toText = 'O'
  }
  
  const convertedStrToObj =  {
    from: arr[0],
    fromPort: arr[2],
    to: arr[4],
    toPort: arr[6],
    text,
    toText,
  }
  
  return convertedStrToObj;
}

/* 
  'Ref: users.id < orders.user_id'
  {  
    from: "users", 
    fromPort: "id", 
    to: "orders", 
    toPort: "user_id", 
    text: "O", 
    toText: "M" 
  },
*/
export const translateDbmlRef = (dbmlStr) => {
  const convert = cleanUpStringToArray(dbmlStr);
  if (isCleanUpSuccessful(convert)) {
    return convertStrToObj(convert)
  }
  return 'error'
// check if convert is a success 
// if it is create object if not return error
}

// =====================================================================
// ============================================== TRANSLATION FOR TABLES
// =====================================================================

/* 
  'Table users{
  id int [pk, increment] // auto-increment
  user_name varchar
  password varchar
  email email
  }'
  {
    key: "users",
    items:[
      {
        name: "id",
        isKey: true,
        type: "int",
      },
      {
        name: "name",
        isKey: false,
        type: "varchar",
      },
      {
        name: "password",
        isKey: false,
        type: "varchar",
      },
      {
        name: "email",
        isKey: false,
        type: "email",
      }
    ]
  }
*/
export const translateDbmlTable = (dbmlStr) => {

};