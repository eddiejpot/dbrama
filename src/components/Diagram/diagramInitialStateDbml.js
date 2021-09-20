
const diagramDataInitialStateInDbml = `
//// -- TABLES AND REFERENCES (TEMPLATE)

// Creating tables
Table users{
  id int [pk]
  user_name varchar
  password varchar
  email email
  country_code int
}

Table orders {
  id int [pk]
  user_id 
  order_status varchar
  receipt_num int
 }
 
Table items {
  id int [pk]
  name varchar
  description varchar
  price int
 }
 Table countries {
  id int [pk]
  name varchar
  continent_name varchar
 }
 Table order_items {
  id int [pk]
  order_id int
  item_id int
  quantity int
 }
 
// Creating references
// > many-to-one; < one-to-many; - one-to-one
Ref: users.id < orders.user_id
Ref: users.country_code - countries.id
Ref: orders.id < order_items.order_id
Ref: items.id < order_items.item_id
`

export default diagramDataInitialStateInDbml;