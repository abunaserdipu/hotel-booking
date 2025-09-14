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

You’ll need **three separate terminals** for backend, frontend, and Reverb.

**Terminal 1 – Laravel Backend:**
```bash
php artisan serve
```

**Terminal 2 – Vite Frontend:**
```bash
npm run dev
```

**Terminal 3 – Reverb WebSocket Server:**
```bash
php artisan reverb:start
```

---

## 💻 Features

### ✅ Core Features

- **Hotel Booking System** – Search and book hotels.
- **Booking Confirmation** – Dedicated confirmation page after successful booking/payment.
- **Payment Flow** – Simulated payment system to confirm bookings.
- **User Authentication** – Register, log in, and manage profiles.
- **Admin Dashboard** – Overview of booking activity for administrators.

### 🎉 Optional Features

- **Real-Time Notifications (WIP)** – Admins receive instant toast notifications when a new booking is confirmed & paid, powered by Laravel Reverb.
- **Multi-Currency Support** – Hotels have base prices in USD, with support for live currency conversion (e.g., EUR, GBP).

---

## ⚠️ Known Issues

- **Real-Time Notifications (WIP):** Attempted implementation using **Laravel Reverb** to show real-time admin notifications on new bookings. Partially implemented; currently blocked by connection/auth issues.

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