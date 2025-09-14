# 🏨 Hotel Booking System

A **full-stack hotel booking system** built with **Laravel**, **Inertia.js**, and **React**.  
Enjoy a seamless booking flow, real-time admin notifications, and a clean, user-friendly interface.

---

## 📋 Prerequisites

Ensure you have the following installed:

- **PHP** (v8.2+)
- **Composer**
- **Node.js** (v18+)
- **npm**
- **MySQL**
- **Docker**
- **Terminal / Command Prompt**

---

## 🚀 Local Setup & Installation

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone <repository_url>
cd <project_directory>
```

### 2️⃣ Install Dependencies

```bash
composer install
npm install
```

### 3️⃣ Configure the Environment

Copy the example environment file and generate an application key:

```bash
cp .env.example .env
php artisan key:generate
```

Edit your `.env` file with your database and Reverb configuration:

```env
DB_CONNECTION=mysql
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

# Elasticsearch (Laravel Scout)
SCOUT_DRIVER=elastic
SCOUT_ELASTIC_HOSTS=http://127.0.0.1:9200

# Reverb (Real-time notifications)
BROADCAST_DRIVER=reverb
REVERB_APP_ID=123456
REVERB_APP_KEY=your_reverb_key
REVERB_APP_SECRET=your_reverb_secret
REVERB_HOST=127.0.0.1
REVERB_PORT=8080
REVERB_SCHEME=http

# Frontend Reverb settings
VITE_REVERB_APP_KEY=${REVERB_APP_KEY}
VITE_REVERB_HOST=${REVERB_HOST}
VITE_REVERB_PORT=${REVERB_PORT}
VITE_REVERB_SCHEME=${REVERB_SCHEME}
```

### 4️⃣ Start Elasticsearch with Docker

Run Elasticsearch in a separate terminal window:

```bash
docker run -p 9200:9200 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  elasticsearch:8.10.2
```

### 5️⃣ Database Setup

Run migrations and seed the database:

```bash
php artisan migrate --seed
```

### 6️⃣ Start the Servers

You’ll need **two separate terminals** for Vite and Reverb.

**Terminal 1 – Vite Frontend:**

```bash
composer run dev
```

**Terminal 2 – Reverb WebSocket Server:**

```bash
php artisan reverb:start
```

---

## 💻 Core Features

### 🏁 Project Foundation

- **Official Laravel React Starter Kit:**  
  The project is built on the official Laravel React Starter Kit for a robust and modern foundation.

### 👥 User Roles & Authentication

- **Admin:**  
  Access to a dashboard for hotel and booking management (CRUD operations).
- **User:**  
  Can browse hotels, make bookings, and manage their own bookings.
- **Guest:**  
  Can browse hotels and make bookings without creating an account.

### 🔎 Hotel Search

- **Powered by Elasticsearch via Laravel Scout:**  
  Search hotels by name, location (city, country), and description for fast and relevant results.

### 📝 Guest Booking

- **No Registration Required:**  
  Guests can complete bookings by providing essential details (name, email, phone).
- **Booking Confirmation:**  
  Guests receive a confirmation email with a booking reference and a unique link to access their booking.

### 📱 Responsive Design

- **Mobile & Desktop Ready:**  
  Fully responsive UI using Tailwind CSS for a seamless experience on any device.

### 🧑‍💻 Code Quality

- **Best Practices:**
    - Follows Laravel conventions (Eloquent, relationships, form requests, policies, seeders).
    - Applies SOLID principles and design patterns (Service Classes, DTOs, Repository Pattern where appropriate).
    - Clean, well-commented, and well-structured codebase.

---

## 🎉 Additional Features

- **Multi-Currency Support:**  
  Hotels have base prices in USD, with live currency conversion (e.g., EUR, GBP).
- **Simulated Payment System:**  
  Not a real-time payment—just a payment system simulation that leads you to a payment confirmation page.
- **Real-Time Notifications (WIP):**  
  Admins receive instant notifications for new bookings (powered by Laravel Reverb).

---

## ⚠️ Known Issues

- **Real-Time Notifications (WIP):**  
  Implementation using Laravel Reverb is in progress; currently blocked by connection/auth issues.

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Acknowledgements

- [Laravel](https://laravel.com/)
- [Inertia.js](https://inertiajs.com/)
- [React](https://react.dev/)
- [Elasticsearch](https://www.elastic.co/elasticsearch/)
- [Laravel Reverb](https://laravel.com/docs/10.x/broadcasting#reverb-driver)
