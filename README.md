# flynest-backend


Its a simple school management system,


**Video Documentation:**

---

## 📃 Documentation

- **Backend Live API:** [Flynest backend server](https://backend-flynest.vercel.app/)
- **Admin Data:** - admin@example.com password: admin123
- **Teacher Data:** - teacher1@example.com password: teacher123

---

## 🚀 Tech Stack

- **Node.js + Express.js** – Backend Framework
- **PostgreSQL** – Relational Database
- **Prisma ORM** – Database Modeling & Querying
- **JWT** – Authentication
- **RESTful API** – Routing and Endpoint Management
- **Class Validator** - 

---

## ✨ Features

-  User Registration, Login (JWT-based)
- Role-based Access Control (ADMIN / STUDENT / TEACHER)
- Create New student by ADMIN
- List all student ADMIN and TEACHER can view 
- Get Single student its open route 

---
## End points 
| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `api/auth/signup`        | Register new user    |
| POST   | `api/auth/login`         | Login user           |
| POST   | `api/auth/refresh-token` | Get new access token |
| GET    | `api/users/me`           | Get logged-in user   |
| GET    | `api/users`              | Get all users        |
| POST   | `api/students`           | create students      |
| GET    | `api/students`           | Get all students     |
| GET    | `api/studetns/id`        | Get single students  |
| POST   | `api/classes`            | Create new classes   |
| POST   | `api/classes/class_id/enroll`| enroll new student in a classs  |
| GET    | `api/classes/class_id/students`| Get all students in a class       |

## structure
```
📦src
 ┣ 📂app
 ┃ ┣ 📂DB
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📜createClass.dto.ts
 ┃ ┃ ┣ 📜createStudent.dto.ts
 ┃ ┃ ┣ 📜createUser.dto.ts
 ┃ ┃ ┣ 📜enrollStudent.dto.ts
 ┃ ┃ ┗ 📜login.dto.ts
 ┃ ┣ 📂error
 ┃ ┃ ┣ 📜AppError.ts
 ┃ ┃ ┣ 📜AuthError.ts
 ┃ ┃ ┣ 📜DuplicateError.ts
 ┃ ┃ ┣ 📜NotFoundError.ts
 ┃ ┃ ┣ 📜handleAppError.ts
 ┃ ┃ ┣ 📜handleAuthError.ts
 ┃ ┃ ┗ 📜handleNotFoundError.ts
 ┃ ┣ 📂interface
 ┃ ┃ ┣ 📜common.ts
 ┃ ┃ ┣ 📜error.ts
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜NotFound.ts
 ┃ ┃ ┣ 📜authMiddleware.ts
 ┃ ┃ ┗ 📜globalErrorHandler.ts
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┃ ┣ 📜auth.route.ts
 ┃ ┃ ┃ ┗ 📜auth.service.ts
 ┃ ┃ ┣ 📂class
 ┃ ┃ ┃ ┣ 📜class.controller.ts
 ┃ ┃ ┃ ┣ 📜class.route.ts
 ┃ ┃ ┃ ┗ 📜class.service.ts
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┣ 📜home.controller.ts
 ┃ ┃ ┃ ┗ 📜home.route.ts
 ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┣ 📜student.controller.ts
 ┃ ┃ ┃ ┣ 📜student.route.ts
 ┃ ┃ ┃ ┗ 📜student.service.ts
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📜user.controller.ts
 ┃ ┃ ┃ ┣ 📜user.route.ts
 ┃ ┃ ┃ ┗ 📜user.service.ts
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂shared
 ┃ ┃ ┗ 📜prisma.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜catchAsync.ts
 ┃ ┃ ┣ 📜generateToken.ts
 ┃ ┃ ┣ 📜sendResponse.ts
 ┃ ┃ ┣ 📜validateRequest.ts
 ┃ ┃ ┗ 📜verifyToken.ts
 ┗ 📜server.ts
```

## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/alamshuvo/flynest-backend.git
cd flynest-backend

Project Setup
1 Clone the Repository
https://github.com/alamshuvo/flynest-backend.git

cd flynest-backend

2 Install Dependencies
npm install

3 Configure Environment
Create a .env file in root or to see more checkout the .env.example file .

4.Database url
PORT=5000;

5 Start the server
npm run dev


```