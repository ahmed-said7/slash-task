## Installation

npm install

## Running the app

npm run start

## base url is 
base => http://localhost:5000/api

# API Routes and Request Body Specifications

| Endpoint         | Method | Description                           | Request Body (JSON) Example                        |
|------------------|--------|---------------------------------------|----------------------------------------------------|
| `base/users/login`     | Post    | login                         | {"email":"ahmed@gmail.com",password:"12345678"}/A                                                |
| `base/users/signup` | Post    | signup                        | {name:"ahmed",email:"ahmed@gmail.com","password":"12345678","role":"admin or user"}/A                                                |
| `base/users/:userId/orders`     | Get   | get user orders         
| `base/cart/add` | Post    | add product to cart |  { "productId":1 }              |
| `/base/cart/remove` | DELETE | remove cart item by item id provided as record id in request body and each cart has an array of items | { "recordId":1   } A                                                |
| `base/cart/update`     | Put    | update item quantity | { "quantity":5,"recordId":1 } A                                                |
| `base/cart/:userId` | GET    | Get user cart                        | N/A                                                |
| `base/product`     | POST   | Create a product                     | `{ "name": "labtop","stock":30,"price":59, "description": "Lorem ipsum..." }` |
| `base/coupon` | Post    | create coupon             | `{ "name": "Updated Post","couponExpiresIn":"03/22/2025","discount":80 }` |
| `base/cart/update`     | Put    | update item quantity | { "quantity":5,"recordId":1 } A                                                |
| `base/orders` | Post    | create order                        | N/A                                                |
| `base/users/:userId/orders`     | Get   | get user orders  |
| `base/orders/apply-coupon` | Post    | apply coupon to order   | `{ "name": "coupon name" , "orderId":1 } `
| `base/orders/:orderId`     | Get   | get one order  |
| `base/orders/:orderId/status` | Put    | apply coupon to order   | `{ "status":"cancelled or paid"} `



## License

Nest is [MIT licensed](LICENSE).
