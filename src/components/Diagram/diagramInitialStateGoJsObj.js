export const nodeDataArrayInitialState = [
    {
      key: "users",
      items: [
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
    },
    {
      key: "orders",
      items: [
        {
          name: "id",
          isKey: true,
          type: "int",
        },
        {
          name: "user_id",
          isKey: false,
          type: "int",
          portId: "userID",
        },
        {
          name: "order_status",
          isKey: false,
          type: "varchar",
        },
        {
          name: "receipt_num",
          isKey: false,
          type: "int",
        }
      ]
    },
    {
      key: "items",
      items: [
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
          name: "description",
          isKey: false,
          type: "varchar",
        },
        {
          name: "price",
          isKey: false,
          type: "int",
        }
      ]
    },
    {
      key: "order_items",
      items: [
        {
          name: "id",
          isKey: true,
          type: "int",
        },
        {
          name: "order_id",
          isKey: false,
          type: "int",
        },
        {
          name: "item_id",
          isKey: false,
          type: "int",
        },
        {
          name: "quantity",
          isKey: false,
          type: "int",
        }
      ]
    }
  ]

export const linkDataArrayInitialState = [
    { from: "users", fromPort: "id", to: "orders", toPort: "user_id", text: "O", toText: "M" },

    { from: "orders", fromPort: "id", to: "order_items", toPort: "order_id", text: "O", toText: "M" },
    
    { from: "items", fromPort: "id", to: "order_items", toPort: "item_id", text: "O", toText: "M" },

  ];