# Robo Advisor Order Splitter API

A production-grade NestJS-based REST API that generates buy/sell order instructions from model portfolios, supporting configurable precision, execution timing, and in-memory order tracking.

---

## 🚀 Tech Stack

* **Node.js** (>= 20.11)
* **NestJS** (>= 10 / 11)
* **TypeScript**
* **Jest** (for testing)
* **class-validator & class-transformer**

---

## 📦 Prerequisites

Make sure you have the following installed:

* Node.js >= 20.11
* npm >= 9
* NestJS CLI

Install NestJS CLI globally:

```bash
npm install -g @nestjs/cli
```

> ⚠️ Ensure compatible versions of NestJS (v10+) and RxJS (v7+) are used to avoid dependency conflicts.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DECIMAL_PLACES=3
DEFAULT_STOCK_PRICE=100
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository

Using SSH:

```bash
git clone git@github.com:manofsteelgrey/robo-advisor-order-splitter.git
```

Using HTTPS:

```bash
git clone https://github.com/manofsteelgrey/robo-advisor-order-splitter.git
```

```bash
cd robo-advisor-order-splitter
```

---

### 2. Install dependencies

```bash
npm install
```

If you face dependency issues, try a clean install:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 3. Run the application

```bash
npm run start:dev
```

---

### 4. Access the API

```
http://localhost:3000
```

---

## 📂 Project Structure

```
src/
  orders/
    orders.module.ts
    orders.controller.ts
    orders.service.ts
    dto/
    models/
  main.ts
  app.module.ts
```

---

## 📡 API Endpoints

### POST /orders

Creates a buy/sell order plan based on portfolio allocation.

#### Sample Request

```json
{
  "amount": 100,
  "orderType": "BUY",
  "portfolio": [
    { "symbol": "AAPL", "weight": 0.6 },
    { "symbol": "TSLA", "weight": 0.4 }
  ],
  "prices": {
    "AAPL": 120,
    "TSLA": 200
  }
}
```

---

### GET /orders

Returns all previously generated (in-memory) order history.

---

## ⚡ Features

* Portfolio-based order splitting
* Supports BUY and SELL orders
* Fractional share support (configurable precision)
* Execution timing logic (market open days)
* In-memory order storage
* DTO-based validation using class-validator
* Performance logging (response time in ms)

---

## ⚡ Performance

API response times are measured and logged in milliseconds to ensure performance visibility.

---

## 🔐 Validation & Error Handling

* Input validation using `ValidationPipe`
* Ensures correct request structure
* Handles invalid inputs gracefully with proper HTTP responses

---

## 🧩 Dependency Management

The project uses aligned versions of NestJS (v11) and RxJS (v7) to ensure compatibility and avoid peer dependency conflicts.

---

## 🧠 Notes

* This API does **not execute real trades**
* It only generates order instructions
* Data is stored in memory and will reset on application restart

---

## Expected request payload

{
  "amount": 100,
  "orderType": "BUY",
  "portfolio": [
    { "symbol": "AAPL", "weight": 0.6 },
    { "symbol": "TSLA", "weight": 0.4 }
  ]
}
