# FixItNow 🔧

**Your Trusted Home Service Platform (Backend API)**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

---

## 📖 Overview

**FixItNow** is a robust, highly modular backend API built for a home services marketplace. It provides the core infrastructure connecting Customers with professional Technicians for various household services (plumbing, electrical work, cleaning, etc.). 

The platform supports a comprehensive ecosystem featuring complex user roles, dynamic service categories, seamless booking workflows, integrated secure Stripe payments, and a review system—all governed by platform administrators.

---

## 🚀 Features

- **Robust Authentication:** Secure JWT-based Access & Refresh token architecture.
- **Role-Based Access Control (RBAC):** Distinct privileges for `ADMIN`, `TECHNICIAN`, and `CUSTOMER`.
- **Technician Profiles:** Professionals can establish profiles, list their specific skills, and declare their hourly rates and availability.
- **Dynamic Services & Categories:** Admins have full CRUD control over service categories and the individual services offered within them.
- **Booking Management:** Customers can book specific time slots with chosen technicians. Technicians can manage their booking statuses (`REQUESTED`, `ACCEPTED`, `COMPLETED`, etc.).
- **Stripe Integration:** Secure backend processing to generate Payment Intents for completed jobs.
- **Review System:** Customers can leave ratings and feedback for technicians upon successful job completion.
- **Centralized Error Handling:** Consistent API responses structured with a standardized `success`, `message`, `data`/`errorDetails` format.

---

## ⚙️ Tech Stack

- **Runtime:** Node.js v24+
- **Framework:** Express.js (with modular architecture)
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (with Prisma Adapter)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt for hashing
- **Payments:** Stripe API

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v24 or later)
- PostgreSQL Database
- Stripe Account (for Secret Keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arFaisal043/fixitnow.git
   cd fixitnow
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/fixitnow?sslmode=require"
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_ACCESS_EXPIRES_IN=1h
   JWT_REFRESH_EXPIRES_IN=365d
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. **Database Migration & Generation**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

---

## 📚 API Documentation

For detailed information on the request structures, responses, headers, and specific endpoints, please refer to our documentation:

👉 **[View Live Postman Collection](https://documenter.getpostman.com/view/36497799/2sBY4TpJ6R)**

👉 **[View Local API Documentation](./API_DOCUMENTATION.md)**

---

## 📁 Project Structure

This project follows the **Thin Controller, Fat Service** principle for maximum maintainability:

```text
src/
├── app/
│   ├── config/          # Environment variables & constants
│   ├── middlewares/     # Global auth, validation, and error handlers
│   ├── modules/         # Feature-based modular architecture (Auth, Admin, Booking, etc.)
│   ├── routes/          # Centralized route aggregator
│   └── utils/           # Helper functions (Prisma client, async wrappers, etc.)
├── server.ts            # Application bootstrap
└── app.ts               # Express configuration
```

---

## 🤝 Contribution Guidelines
Contributions, issues, and feature requests are welcome! 
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
*Built with passion for clean code and seamless services.*
