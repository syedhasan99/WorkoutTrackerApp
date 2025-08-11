# Workout Tracker App Backend
A backend REST API for a workout tracker application where users can sign up, log in, create workout plans, schedule them, and track their progress.  
The system uses **JWT authentication**, **MongoDB**, and includes a seeder to populate the database with predefined exercises.

**📌 Project URL:** [https://roadmap.sh/projects/fitness-workout-tracker](https://roadmap.sh/projects/fitness-workout-tracker)

---

## 📋 Features

- **User Authentication**
  - Sign up, log in, and log out with secure password hashing (bcrypt)
  - JWT-based authentication stored in HTTP-only cookies
  - Authorization middleware ensures users can only access their own data

- **Exercise Data**
  - Predefined exercises with `name`, `description`, and `category/muscleGroup`
  - Seeder script to populate exercises into the database

- **Workout Plans**
  - Create a workout plan containing multiple exercises
  - Each exercise can have sets, reps, and weight
  - Schedule workouts for specific dates/times
  - Update and delete workout plans
  - List all user’s workout plans sorted by date
  - View a single workout plan by ID

---

## 🛠 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables
- **cookie-parser** for reading cookies

---

## 📂 Project Structure

```
├── controllers/
│ ├── authControllers.js
│ └── workoutPlanControllers.js
├── middlewares/
│ └── auth.js
├── models/
│ ├── Exercise.js
│ ├── User.js
│ └── WorkoutPlan.js
├── routes/
│ ├── authRoutes.js
│ ├── workoutPlanRoutes.js
│ └── exerciseRoutes.js
├── seed/
│ └── exercises.js
├── .env
├── server.js
└── package.json
```
---

## 🗄 Database Schema Overview

### **User**
```js
{
  username: String,
  email: String,
  password: String
}
```
Exercise
```js
{
  name: String,
  description: String,
  category: String // e.g., cardio, strength, legs, chest
}
```
WorkoutPlan
```js
{
  userId: ObjectId, // Reference to User
  name: String,
  exercises: [
    {
      _id: ObjectId, // Reference to Exercise
      sets: Number,
      reps: Number,
      weight: Number
    }
  ],
  scheduledAt: Date,
  comments: String,
  status: { type: String, enum: ['Pending', 'Completed'] }
}
```
## 🔑 API Endpoints
### Auth
| Method	| Endpoint	| Description	| Auth Required |
|---|:---:|:---:|:---:|
| POST | /api/auth/register	| Register a new user	| No |
| POST	| /api/auth/login	| Log in a user	| No |
| POST	| /api/auth/logout	| Log out user	| Yes |

### Exercises
| Method	| Endpoint | Description	| Auth Required |
|---|:---:|:---:|:---:|
| GET	| /api/exercises	| List all exercises	| Yes |

### Workout Plans
| Method	| Endpoint	| Description	| Auth Required |
|---|:---:|:---:|:---:|
| POST	| /api/workouts	| Create a workout plan	| Yes |
| GET	| /api/workouts	| Get all workout plans	| Yes |
| GET	| /api/workouts/:id	| Get a workout plan by ID	| Yes |
| PUT	| /api/workouts/:id	| Update a workout plan	| Yes |
| DELETE	| /api/workouts/:id	| Delete a workout plan	| Yes |


## 🚀 Getting Started
### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/workout-tracker-backend.git
cd workout-tracker-backend
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Environment Variables
Create a `.env` file in the root and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/workout_tracker
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```
### 4️⃣ Seed the Database
To populate the exercises collection with predefined data:

```bash
node seed/exercises.js
```
This will insert the default exercises into your MongoDB database.
### 5️⃣ Run the Server
```bash
npm run dev
```
Server runs on http://localhost:3000 by default.

## 🔐 Authentication Flow
1. **Register** a new user → returns JWT in HTTP-only cookie.
2. **Login** → sets JWT cookie.
3. Use the JWT cookie for all authenticated requests.
4. **Logout** → clears JWT cookie.

