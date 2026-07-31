# FixItNow API Documentation & Testing Guide

This document outlines all the available API endpoints for the FixItNow platform, including the required headers, sample input data, and expected output data.

**Base URL**: `http://localhost:5000/api`

---

## 1. Auth Module (`/api/auth`)

### 1.1 Register User
- **URL**: `POST /auth/register`
- **Description**: Register a new customer or technician.
- **Headers**: `Content-Type: application/json`
- **Input Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER" // Or "TECHNICIAN"
}
```
- **Output Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 1.2 Login User
- **URL**: `POST /auth/login`
- **Description**: Login an existing user and get a JWT token.
- **Headers**: `Content-Type: application/json`
- **Input Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Output Response (200 OK)**:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "role": "CUSTOMER" },
    "token": "eyJhbGci..."
  }
}
```

### 1.3 Get Current User (Me)
- **URL**: `GET /auth/me`
- **Description**: Fetch the currently logged-in user details.
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Output Response (200 OK)**:
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "user": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "role": "CUSTOMER" }
  }
}
```

---

## 2. User Module (Admin Only) (`/api/admin/users`)

### 2.1 Get All Users
- **URL**: `GET /admin/users`
- **Description**: Fetch all users in the system.
- **Headers**: `Authorization: Bearer <admin_jwt_token>`
- **Output Response (200 OK)**:
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Jane Technician",
      "email": "jane@example.com",
      "role": "TECHNICIAN",
      "isBanned": false,
      "createdAt": "2023-10-10T12:00:00.000Z"
    }
  ]
}
```

### 2.2 Update User Status (Ban/Unban)
- **URL**: `PATCH /admin/users/:id/status`
- **Description**: Ban or unban a user.
- **Headers**: `Authorization: Bearer <admin_jwt_token>`
- **Input Body**:
```json
{
  "isBanned": true
}
```
- **Output Response (200 OK)**:
```json
{
  "success": true,
  "message": "User status updated successfully",
  "data": { "id": "uuid", "name": "Jane", "email": "jane@example.com", "role": "TECHNICIAN", "isBanned": true }
}
```

---

## 3. Category Module (`/api/categories`)

### 3.1 Get All Categories
- **URL**: `GET /categories`
- **Description**: Fetch all service categories.
- **Headers**: None (Public)
- **Output Response (200 OK)**:
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    { "id": "uuid", "name": "Plumbing", "description": "All plumbing related services", "createdAt": "..." }
  ]
}
```

### 3.2 Create Category
- **URL**: `POST /categories`
- **Description**: Create a new category.
- **Headers**: `Authorization: Bearer <admin_jwt_token>`
- **Input Body**:
```json
{
  "name": "Electrical",
  "description": "Wiring and electrical repairs"
}
```

---

## 4. Service Module (`/api/services`)

### 4.1 Get All Services
- **URL**: `GET /services`
- **Description**: Fetch all available services.
- **Headers**: None (Public)
- **Output Response (200 OK)**:
```json
{
  "success": true,
  "message": "Services fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Fix Leaking Pipe",
      "description": "Fix minor pipe leaks",
      "price": 50.0,
      "categoryId": "uuid",
      "technicianId": "uuid"
    }
  ]
}
```

### 4.2 Create Service
- **URL**: `POST /services`
- **Description**: Create a new service offering (Technician only).
- **Headers**: `Authorization: Bearer <technician_jwt_token>`
- **Input Body**:
```json
{
  "name": "Fix Leaking Pipe",
  "description": "Fix minor pipe leaks",
  "price": 50.0,
  "categoryId": "<category_uuid>"
}
```

---

## 5. Technician Module (`/api/technicians`)

### 5.1 Get All Technicians
- **URL**: `GET /technicians`
- **Description**: Fetch all technicians and their profiles.
- **Headers**: None (Public)

### 5.2 Update Technician Profile
- **URL**: `PUT /technicians/profile`
- **Description**: Update skills and experience.
- **Headers**: `Authorization: Bearer <technician_jwt_token>`
- **Input Body**:
```json
{
  "skills": ["Plumbing", "Pipe Fitting"],
  "experience": 5,
  "hourlyRate": 30.5
}
```

### 5.3 Update Availability
- **URL**: `PUT /technicians/availability`
- **Description**: Update technician working hours/availability.
- **Headers**: `Authorization: Bearer <technician_jwt_token>`
- **Input Body**:
```json
{
  "availability": ["Monday 9AM-5PM", "Tuesday 9AM-5PM"]
}
```

---

## 6. Booking Module (`/api/bookings`)

### 6.1 Create Booking
- **URL**: `POST /bookings`
- **Description**: Customer requests a booking.
- **Headers**: `Authorization: Bearer <customer_jwt_token>`
- **Input Body**:
```json
{
  "technicianId": "<user_uuid_of_technician>",
  "serviceId": "<service_uuid>",
  "date": "2023-11-20T10:00:00.000Z",
  "timeSlot": "Morning"
}
```
- **Output Response (201 Created)**:
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": { "id": "uuid", "status": "REQUESTED", ... }
}
```

### 6.2 Get My Bookings
- **URL**: `GET /bookings`
- **Description**: Get bookings for the logged-in user (Customer or Technician).
- **Headers**: `Authorization: Bearer <your_jwt_token>`

### 6.3 Update Booking Status
- **URL**: `PATCH /bookings/:id/status`
- **Description**: Technician accepts/rejects a booking.
- **Headers**: `Authorization: Bearer <technician_jwt_token>`
- **Input Body**:
```json
{
  "status": "ACCEPTED" // Or "REJECTED", "COMPLETED"
}
```

---

## 7. Payment Module (Stripe) (`/api/payments`)

### 7.1 Create Payment Intent
- **URL**: `POST /payments/create-intent`
- **Description**: Initiates a payment for an ACCEPTED booking.
- **Headers**: `Authorization: Bearer <customer_jwt_token>`
- **Input Body**:
```json
{
  "bookingId": "<booking_uuid>"
}
```
- **Output Response (201 Created)**:
```json
{
  "success": true,
  "message": "Payment intent created",
  "data": {
    "clientSecret": "pi_3O...",
    "paymentId": "uuid"
  }
}
```

### 7.2 Stripe Webhook
- **URL**: `POST /payments/webhook`
- **Description**: Automated webhook called directly by Stripe servers to confirm payment.
- **Headers**: `stripe-signature: <signature>`
- **Input Body**: Raw buffer from Stripe.

---

## 8. Review Module (`/api/reviews`)

### 8.1 Submit Review
- **URL**: `POST /reviews`
- **Description**: Customer reviews a COMPLETED booking.
- **Headers**: `Authorization: Bearer <customer_jwt_token>`
- **Input Body**:
```json
{
  "bookingId": "<booking_uuid>",
  "rating": 5,
  "comment": "Excellent and fast service!"
}
```
- **Output Response (201 Created)**:
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": { "id": "uuid", "rating": 5, "comment": "Excellent and fast service!", ... }
}
```
