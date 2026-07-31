# FixItNow Complete API Documentation

Base URL: `http://localhost:5000/api`

---
Admin Credintials:
Email: admin@fixitnow.com
Password: admin123

---

## 1. Auth Module

### Register a User
- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Headers:** None
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER" // or "TECHNICIAN"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

### Login a User
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Headers:** None
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  }
}
```

### Get My Profile
- **Method:** `GET`
- **Endpoint:** `/auth/me`
- **Headers:** `Authorization: <token>`
- **Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

---

## 2. Category Module

### Get All Categories
- **Method:** `GET`
- **Endpoint:** `/categories`
- **Headers:** None
- **Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Plumbing",
      "description": "All plumbing related tasks"
    }
  ]
}
```

### Create Category (Admin Only)
- **Method:** `POST`
- **Endpoint:** `/categories`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "name": "Electrical",
  "description": "Wiring and electrical repairs"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Category created successfully",
  "data": { ... }
}
```

---

## 3. Service Module

### Get All Services
- **Method:** `GET`
- **Endpoint:** `/services`
- **Headers:** None
- **Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Services fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Sink Repair",
      "description": "Fix leaking sinks",
      "price": 50,
      "categoryId": "uuid",
      "technicianId": "uuid"
    }
  ]
}
```

### Create Service (Technician Only)
- **Method:** `POST`
- **Endpoint:** `/services`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "name": "Sink Repair",
  "description": "Fix leaking sinks",
  "price": 50,
  "categoryId": "uuid_of_category"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Service created successfully",
  "data": { ... }
}
```

---

## 4. Technician Module

### Get All Technicians
- **Method:** `GET`
- **Endpoint:** `/technicians`
- **Headers:** None
- **Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Technicians fetched successfully",
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "bio": "Experienced plumber",
      "isAvailable": true,
      "user": {
        "name": "Tech Bob",
        "email": "bob@example.com"
      }
    }
  ]
}
```

### Get Technician Details
- **Method:** `GET`
- **Endpoint:** `/technicians/:id`
- **Headers:** None
- **Response (200 OK):** (Includes their offered services & reviews)

### Update Profile (Technician Only)
- **Method:** `PATCH`
- **Endpoint:** `/technicians/profile`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "bio": "Expert electrician with 10 years experience",
  "experience": "10 Years"
}
```

### Update Availability (Technician Only)
- **Method:** `PATCH`
- **Endpoint:** `/technicians/availability`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "isAvailable": false
}
```

---

## 5. Booking Module

### Create Booking (Customer Only)
- **Method:** `POST`
- **Endpoint:** `/bookings`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "technicianId": "uuid_of_technician",
  "serviceId": "uuid_of_service",
  "date": "2024-05-10",
  "timeSlot": "10:00 AM"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Booking created successfully",
  "data": {
    "id": "uuid",
    "status": "REQUESTED",
    ...
  }
}
```

### Get My Bookings (Customer/Technician)
- **Method:** `GET`
- **Endpoint:** `/bookings`
- **Headers:** `Authorization: <token>`
- **Response (200 OK):** Array of bookings related to the logged-in user.

### Update Booking Status (Technician Only)
- **Method:** `PATCH`
- **Endpoint:** `/bookings/:id/status`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "status": "ACCEPTED" // REQUESTED, ACCEPTED, DECLINED, PAID, IN_PROGRESS, COMPLETED
}
```

---

## 6. Payment Module

### Create Payment Intent (Customer Only)
- **Method:** `POST`
- **Endpoint:** `/payments/create-intent`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "bookingId": "uuid_of_booking"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Payment intent created",
  "data": {
    "clientSecret": "pi_3..._secret_...",
    "paymentId": "uuid"
  }
}
```

---

## 7. Review Module

### Submit a Review (Customer Only)
- **Method:** `POST`
- **Endpoint:** `/reviews`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "bookingId": "uuid_of_booking",
  "rating": 5,
  "comment": "Excellent service!"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Review submitted successfully",
  "data": { ... }
}
```

---

## 8. Admin Module

### Get All Users (Admin Only)
- **Method:** `GET`
- **Endpoint:** `/admin/users`
- **Headers:** `Authorization: <token>`
- **Response (200 OK):** Array of all users in the system.

### Ban / Unban User (Admin Only)
- **Method:** `PATCH`
- **Endpoint:** `/admin/users/:id/status`
- **Headers:** `Authorization: <token>`
- **Body:**
```json
{
  "isBanned": true
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User status updated successfully",
  "data": { ... }
}
```
