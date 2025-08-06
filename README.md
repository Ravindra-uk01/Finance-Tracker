# 💰 Personal Finance Tracker

A **full-stack web application** for managing income and expense
transactions with powerful analytics, **role-based access control
(RBAC)**, and optimized performance features.

------------------------------------------------------------------------

## Credentials
1. For Admin
   email - admin@gmail.com
   password - Admin@123

2. For User
   email - rohan@gmail.com
   password - Rohan@123

3. Read-only user
   email - testuser3@gmail.com
   password - Test@123

## ✨ Features

### 1. **User Authentication**

-   **JWT-based authentication** for secure login and registration.
-   **Protected routes** on both frontend and backend.
-   **Role-Based Access Control (RBAC)** with three roles:
    -   **Admin** -- Full access, including user and data management.
    -   **User** -- Can manage their own transactions and analytics.
    -   **Read-only** -- Can only view data, cannot add/edit/delete.
-   **Frontend conditional rendering** -- e.g., disabling buttons for
    read-only users.

### 2. **Transaction Management**

-   Add, edit, and delete transactions (**admin & user** only).
-   Categorize transactions (Food, Transport, Entertainment, etc.).
-   Search and filter transactions.
-   Read-only users can **view only**.

### 3. **Dashboard with Analytics**

-   Monthly/yearly spending overview.
-   Category-wise expense breakdown.
-   Income vs Expense trends.
-   Interactive charts (Pie, Line, Bar).

### 4. **Performance Features**

-   **Lazy loading** for faster page load.
-   **Pagination** for large transaction lists.
-   **Caching** with Redis for frequently accessed data.
-   **Rate limiting** to protect API endpoints.

------------------------------------------------------------------------

## 🛠 Tech Stack

-   **Frontend:** React, Context API, React Router, Chart.js / Recharts\
-   **Backend:** Node.js, Express.js, Prisma (PostgreSQL), Redis\
-   **Authentication:** JWT (JSON Web Tokens)\
-   **Deployment:** Render

------------------------------------------------------------------------

## 🔒 Role-Based Access Control (RBAC)

  **Role**        **Access Level**
  --------------- -------------------------------------------------
  **Admin**       Full access, including user and data management
  **User**        Manage own transactions and analytics
  **Read-only**   View-only access, no add/edit/delete

**Example Route Protections:** - `GET /api/transactions` → Accessible to
all roles\
- `POST/PUT/DELETE /api/transactions` → **Admin & User only**\
- `GET /api/analytics` → Accessible to all roles\
- `GET /api/users` → **Admin only**

------------------------------------------------------------------------

## 📂 Project Structure

``` plaintext
finance-tracker/
│
├── backend/
│   ├── prisma/          # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Auth & RBAC middlewares
│   │   ├── routes/      # Express routes
│   │   ├── utils/       # Utility functions
│   │   └── index.js     # App entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React Context API (auth, theme)
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Pages for routes
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

------------------------------------------------------------------------

## ⚡ Technical Highlights

### **Frontend**

-   `useContext` → Global auth and theme state management.
-   `useCallback` → Prevent unnecessary re-renders.
-   `useMemo` → Optimize expensive calculations.
-   **Lazy Loading** → `React.lazy()` + `Suspense` for route splitting.
-   **Charts:** Pie, Line, Bar using Chart.js/Recharts.

### **Backend**

-   **Caching:** Redis for analytics and category lists.
-   **Rate Limiting:** `express-rate-limit` with different limits per
    endpoint.
-   **Security:** XSS prevention, SQL injection protection, JWT-based
    auth.
-   **RBAC Middleware:** Enforces role permissions from JWT claims.

------------------------------------------------------------------------

## 🚀 Setup Instructions for Local Development

### **Prerequisites**

-   Node.js (\>=16)\
-   PostgreSQL (\>=13)\
-   Redis\
-   Git

------------------------------------------------------------------------

### **1. Clone the Repository**

``` bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
```

------------------------------------------------------------------------

### **2. Setup Backend**

``` bash
cd backend
```

**Install dependencies:**

``` bash
npm install
```

**Create `.env` file:**

    DATABASE_URL=
    JWT_SECRET=
    FRONTEND_URL=
    REDIS_URL=
    NODE_ENV=

**Run database migrations:**

``` bash
npx prisma migrate dev
```

**Start backend server:**

``` bash
npm run dev
```

> Backend runs at `http://localhost:5000` (or as configured)

------------------------------------------------------------------------

### **3. Setup Frontend**

``` bash
cd ../frontend
```

**Install dependencies:**

``` bash
npm install
```

**Create `.env` file:**

    VITE_API_URL=

**Start frontend server:**

``` bash
npm run dev
```

> Frontend runs at `http://localhost:5173` (default Vite port)

------------------------------------------------------------------------

### **4. Run Redis (for caching)**

Ensure Redis server is running locally:

``` bash
redis-server
```

------------------------------------------------------------------------

### **5. Default Roles**

By default, new users are assigned the role `user`.

To create an admin, update the role in the database:

``` sql
UPDATE users SET role='ADMIN' WHERE email='admin@example.com';
```

------------------------------------------------------------------------

## 📜 Available Scripts

**Backend** - `npm run dev` → Start development server\
- `npm run build` → Build for production\
- `npm start` → Start production server

**Frontend** - `npm run dev` → Start development server\
- `npm run build` → Build for production\
- `npm run preview` → Preview production build

------------------------------------------------------------------------

## 📄 License

MIT License -- Free to use and modify.

------------------------------------------------------------------------

## 👨‍💻 Author

Made with ❤️ by [Ravindra Singh Rayal](https://github.com/Ravindra-uk01)
