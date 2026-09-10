\# My API – Node.js REST API

A production-ready REST API built with Node.js, Express, MongoDB Atlas, and JWT authentication.
## 🚀 API Demo

This REST API has been tested successfully using Postman.

### Authentication
- User Registration
- User Login
- JWT Access Token
- Refresh Token
- Secure Logout
- Current User Profile

### User Management
- Create User
- Get All Users
- Get User by ID
- Update User
- Delete User

### Security
- JWT-based authentication
- Protected API routes
- User-specific data access
- Password hashing with bcrypt
- Refresh token validation
- Unauthorized request protection

### Deployment
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Hosting: Render
- API Testing: Postman

\## 🚀 Live API

https://my-api-v7q6.onrender.com

\## 🛠️ Technologies

\- Node.js

\- Express.js

\- MongoDB Atlas

\- Mongoose

\- JWT Authentication

\- bcryptjs

\- REST API

\- Render

\- GitHub

\## 🔐 Authentication

The API uses JWT access tokens to protect private endpoints.

Authentication endpoints:

| Method | Endpoint | Description |

|---|---|---|

| POST | `/api/auth/register` | Register a new user |

| POST | `/api/auth/login` | Login |

| POST | `/api/auth/refresh` | Refresh access token |

| POST | `/api/auth/logout` | Logout |

| GET | `/api/auth/me` | Get current user |

\## 👤 User Management

All user-management endpoints require authentication.

| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/users` | Get all users |

| POST | `/api/users` | Create user |

| GET | `/api/users/:id` | Get one user |

| PUT | `/api/users/:id` | Update user |

| DELETE | `/api/users/:id` | Delete user |

**## 📝 Register**

\### Request

```json

{

&#x20; "name": "John Doe",

&#x20; "email": "john@example.com",

&#x20; "password": "Password123"

}

Response

{
&#x20; "message": "User registered successfully"

}
**>>>Login**

Request

{

&#x20; "email": "john@example.com",

&#x20; "password": "Password123"

}

Response

{

&#x20; "message": "Login successful",

&#x20; "token": "ACCESS\_TOKEN",

&#x20; "refreshToken": "REFRESH\_TOKEN"

}



Use the access token in protected requests:



Authorization: Bearer ACCESS\_TOKEN

👤 **Create User**

Request

{

&#x20; "name": "API Test User",

&#x20; "email": "apitest@example.com"

}

Response

{

&#x20; "\_id": "USER\_ID",

&#x20; "name": "API Test User",

&#x20; "email": "apitest@example.com",

&#x20; "owner": "OWNER\_ID"

}

✏️ **Update User**

PUT /api/users/:id



Request:



{

&#x20; "name": "Updated User",

&#x20; "email": "updated@example.com"

}

🗑️ **Delete User**

DELETE /api/users/:id



Response:



{

&#x20; "message": "User deleted successfully"

}

🔒 **Security Features**

Password hashing with bcrypt

JWT authentication

Refresh token support

Protected API routes

User ownership validation

MongoDB validation

Duplicate email protection

Authorization header validation

Environment variables for secrets

⚙️ **Environment Variables**



Create a .env file:



MONGO\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secret

PORT=3000



Never commit .env to GitHub.



💻 **Local Installation**



Clone the repository:



git clone https://github.com/fizaios2016-ios/my-api.git



Enter the project:



cd my-api



Install dependencies:



npm install



Start the server:



node server.js



The API will run on:



http://localhost:3000

🧪 API Testing



The API has been tested using Postman for:



Registration

Login

JWT authentication

Current user

Create user

Get users

Update user

Delete user

Unauthorized access protection

📂 Project Structure

my-api/

│

├── middleware/

│   └── authMiddleware.js

│

├── models/

│   ├── Auth.js

│   ├── RefreshToken.js

│   └── User.js

│

├── routes/

│   ├── authRoutes.js

│   └── userRoutes.js

│

├── public/

│   └── index.html

│

├── server.js

├── package.json

├── .gitignore

└── README.md

👨‍💻 Author



Fiza Waqas



Software Developer | iOS \& Backend Development



⭐ If you find this project useful, consider giving it a star.



