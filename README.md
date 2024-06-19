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
| `/base/cart/remove` | DELETE | remove cart item by item id provided as record every item in cart has id | { "recordId":1   } A                                                |
| `/api/posts`     | GET    | Get all posts                         | N/A                                                |
| `/api/posts/:id` | GET    | Get post by ID                        | N/A                                                |
| `/api/posts`     | POST   | Create a new post                     | `{ "title": "New Post", "content": "Lorem ipsum..." }` |
| `/api/posts/:id` | PUT    | Update post details by ID             | `{ "title": "Updated Post" }`                      |
| `/api/posts/:id` | DELETE | Delete post by ID                     | N/A                                                



## License

Nest is [MIT licensed](LICENSE).
