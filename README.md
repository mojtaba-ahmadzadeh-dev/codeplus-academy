# LMS Platform

## ⭐ Learning Management System

A **modern and scalable LMS** built with **TypeScript and Node.js (Express.js)**.  
This project is designed for **online education, course management, and user learning progress tracking** with a clean and modular architecture.

---

## 🚀 Features

* 🔐 Authentication & Authorization (JWT)
* 🧑‍🎓 Role-Based Access Control (Student, Teacher, Admin)
* 📚 Course Management (Create, Update, Delete)
* 🎥 Lesson & Video Management
* 📝 Quizzes & Assignments
* 📊 User Progress Tracking
* 💬 Comments & Discussions
* 🏆 Certificates
* 📩 Notifications
* 📤 File Uploads
* ⚙ API Documentation (Swagger)
* 🛡 Secure and Scalable Architecture

---

## 🛠 Tech Stack

* TypeScript
* Node.js (Express)
* Mysql
* srqulize
* JWT Authentication
* Swagger (API Docs)
* Multer (File Upload)
* Class Validator (Validation)
* RBAC (Role Based Access Control)

---

## 📂 Project Structure

```bash
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── courses/
│   ├── lessons/
│   ├── category/
│   ├── course-comment/
│   ├── order/
│   ├── RBAC/
│   ├── ticket/
│   ├── capture/
│   ├── blog-comment/
│   ├── blog/
│   ├── basket/
│   ├── department/
│   └── notifications/
├── middleware/
│   ├── guards/
│   ├── rbacGuard/
│   ├── interceptors/
│   └── utils/
├── configs/
├── database/
└── main.ts
```

🔐 Roles & Permissions

ADMIN

TEACHER

STUDENT

RBAC is implemented using:

Roles

Permissions

Protected Routes

## 📖 API Documentation

Swagger documentation is available.

After running the project, open:
```bash
http://localhost:3000/api-docs/
```

## ⚙️ Environment Variables

Create a .env file based on .env.example:
```bash
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=lms_db

# JWT
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```
