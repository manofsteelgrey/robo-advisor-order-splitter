# Robo Advisor Order Splitter API

A production-grade NestJS-based REST API that generates buy/sell order instructions from model portfolios, with configurable precision, execution timing, and in-memory order tracking.

---

## 🚀 Tech Stack

* Node.js (>= 20.11)
* NestJS (v11)
* TypeScript
* Jest (Unit Testing)
* class-validator & class-transformer

---

## 📦 Prerequisites

* Node.js >= 20.11
* npm >= 9
* NestJS CLI

```bash
npm install -g @nestjs/cli
```

> ⚠️ Ensure compatible versions of NestJS (v10+) and RxJS (v7+) to avoid dependency conflicts.

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=3000
DECIMAL_PLACES=3
DEFAULT_STOCK_PRICE=100
```

---

## 🛠️ Setup

```bash
git clone git@github.com:manofsteelgrey/robo-advisor-order-splitter.git
cd robo-advisor-order-splitter
npm install
npm run start:dev
```

---

## 📂 Project Structure

```
src/
  orders/
    orders.controller.ts
    orders.service.ts
    orders.module.ts
    dto/
    types/
  common/
    interceptors/
  main.ts
  app.module.ts
```

---

## 📡 API Endpoints

### POST /orders

Generate order instructions.

#### Request

```json
{
  "amount": 100,
  "orderType": "BUY",
  "portfolio": [
    { "symbol": "AAPL", "weight": 0.6 },
    { "symbol": "TSLA", "weight": 0.4 }
  ],
  "prices": {
    "AAPL": 120
  }
}
```

---

### GET /orders

Returns order history (in-memory).

---

## ⚡ Features

* Portfolio-based order splitting
* BUY & SELL support
* Fractional shares with configurable precision
* Optional price overrides
* Execution timing logic (weekday/weekend)
* Order lifecycle status (PENDING)
* In-memory order storage
* DTO validation
* Performance logging (ms)

---

## ⚡ Performance

All API calls log execution time:

```
POST /orders - 5ms
```

---

## 🧪 Testing

```bash
npm run test
```

Covers:

* Order creation (BUY/SELL)
* Price overrides
* Validation errors
* Edge cases

---

## 🧠 Notes

* This API **does not execute trades**
* It only generates order instructions
* Orders are stored in memory (reset on restart)

---

## 🧩 Design Highlights

* Modular NestJS architecture
* Strong typing with interfaces
* Clean separation of concerns
* Config-driven behavior
* Extensible for future execution systems

---
