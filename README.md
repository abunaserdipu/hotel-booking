# 🏨 Hotel Booking System

A full-stack hotel booking system built with **Laravel**, **Inertia.js**, and **React**.  
It provides a smooth booking flow, real-time notifications for administrators, and a clean, user-friendly interface.

---

## 📋 Prerequisites

Make sure the following are installed on your machine:

- **PHP** (v8.2 or higher)
- **Composer**
- **Node.js** (v18 or higher) & **npm**
- **MySQL**
- **Docker**
- **Terminal / Command Prompt**

---

## 🚀 Local Setup & Installation

Follow these steps to get the project running locally.

### 1️⃣ Clone the Repository

```bash
git clone <repository_url>
cd <project_directory>
2️⃣ Install Dependencies
composer install
npm install

3️⃣ Configure the Environment

Copy the example .env file and generate an application key:

cp .env.example .env
php artisan key:generate


Edit your .env file with database and Reverb configuration:

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

4️⃣ Start Elasticsearch with Docker

Run Elasticsearch in a separate terminal window:

docker run -p 9200:9200 \
-e "discovery.type=single-node" \
-e "xpack.security.enabled=false" \
elasticsearch:8.10.2

5️⃣ Database Setup

Run migrations and seed the database:

php artisan migrate --seed

6️⃣ Start the Servers

You’ll need three separate terminals for backend, frontend, and Reverb.

Terminal 1 – Laravel Backend:

php artisan serve


Terminal 2 – Vite Frontend:

npm run dev


Terminal 3 – Reverb WebSocket Server:

php artisan reverb:start
```
