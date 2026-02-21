# LMS Platform

## ⭐ Learning Management System

A **modern and scalable LMS** built with **TypeScript and NestJS**.
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
* Node.js (NestJS)
* PostgreSQL
* TypeORM / Prisma
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
