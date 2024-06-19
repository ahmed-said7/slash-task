## Installation

npm install

## Running the app

npm run start

# API Routes and Request Body Specifications

| Endpoint         | Method | Description                           | Request Body (JSON) Example                        |
|------------------|--------|---------------------------------------|----------------------------------------------------|
| `/api/users`     | GET    | Get all users                         | N/A                                                |
| `/api/users/:id` | GET    | Get user by ID                        | N/A                                                |
| `/api/users`     | POST   | Create a new user                     | `{ "username": "john_doe", "email": "john@example.com", "password": "password123" }` |
| `/api/users/:id` | PUT    | Update user details by ID             | `{ "username": "john_doe_updated" }`               |
| `/api/users/:id` | DELETE | Delete user by ID                     | N/A                                                |
| `/api/posts`     | GET    | Get all posts                         | N/A                                                |
| `/api/posts/:id` | GET    | Get post by ID                        | N/A                                                |
| `/api/posts`     | POST   | Create a new post                     | `{ "title": "New Post", "content": "Lorem ipsum..." }` |
| `/api/posts/:id` | PUT    | Update post details by ID             | `{ "title": "Updated Post" }`                      |
| `/api/posts/:id` | DELETE | Delete post by ID                     | N/A                                                

## base url is 
http://localhost:5000/api

## License

Nest is [MIT licensed](LICENSE).
