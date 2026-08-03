# 🔧 FixItNow - API Integration Mapping

This document outlines the connection between the **Next.js Frontend** and the **Express Backend**. The application follows a role-based access control (RBAC) system for Customers, Technicians, and Admins.

---

## 🔐 1. Authentication & Session
| Feature | Method | API Endpoint | Frontend Action/Component |
| :--- | :--- | :--- | :--- |
| User Login | `POST` | `/auth/login` | `auth/_actions/authActions.ts` |
| User Registration | `POST` | `/auth/register` | `auth/_actions/registerAction.ts` |
| Token Refresh | `POST` | `/auth/refresh-token` | `proxy.ts` (Middleware) |
| Persistent Auth | `GET` | `/auth/me` | `AuthInitializer.tsx` |
| Logout | `DELETE`| `/auth/logout` | `auth/_actions/logoutAction.ts` |

## 🛠️ 2. Services & Public Profiles
| Feature | Method | API Endpoint | Frontend Page |
| :--- | :--- | :--- | :--- |
| Featured Services | `GET` | `/services` | `app/(publicLayout)/page.tsx` |
| All Services List | `GET` | `/services?search=...` | `app/(publicLayout)/services/page.tsx` |
| Service Details | `GET` | `/services/:id` | `app/(publicLayout)/services/[id]` |
| Technician Profile | `GET` | `/technicians/:id` | `app/(publicLayout)/technicians/[id]` |

## 📅 3. Booking Management
| Feature | Method | API Endpoint | Responsible Role |
| :--- | :--- | :--- | :--- |
| Create Booking | `POST` | `/bookings` | **Customer** |
| View My Bookings | `GET` | `/bookings` | **Customer / Admin** |
| Tech Job Requests | `GET` | `/technician/bookings` | **Technician** |
| Accept/Decline Job | `PATCH` | `/technician/bookings/:id` | **Technician** |
| Job Progress Flow | `PATCH` | `/technician/bookings/:id` | **Technician** |

## 💳 4. Payment Gateway (Stripe)
| Feature | Method | API Endpoint | Frontend Page |
| :--- | :--- | :--- | :--- |
| Stripe Checkout | `POST` | `/payments/create` | `bookings/[id]/pay/page.tsx` |
| Payment Success | `GET` | `/payment?success=true` | `app/payment/page.tsx` |

## 👑 5. Administrative Controls
| Feature | Method | API Endpoint | Frontend Page |
| :--- | :--- | :--- | :--- |
| Global Stats | `GET` | `/admin/stats` | `dashboard/admin/page.tsx` |
| Manage Users | `GET` | `/users` | `dashboard/admin/users/page.tsx` |
| Ban/Unban User | `PATCH` | `/users/:id/status` | `dashboard/admin/users/page.tsx` |
| Create Category | `POST` | `/categories` | `dashboard/admin/categories/page.tsx` |

---
**Backend Base URL:** `http://localhost:8000/api`
**Tech Stack:** Next.js 15 (App Router), Redux Toolkit, RTK Query, Tailwind CSS, Zod.
