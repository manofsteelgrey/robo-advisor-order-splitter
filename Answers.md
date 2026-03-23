# ANSWERS

## 1. Approach

The application is designed as a modular NestJS-based REST API following a feature-driven architecture.

The core workflow is:

* Validate incoming request using DTOs
* Split the total investment amount based on portfolio weights
* Determine stock prices (provided or default)
* Calculate number of shares with configurable precision
* Generate order instructions
* Store results in memory for retrieval

The controller handles API interaction, while the service encapsulates all business logic.

---

## 2. Design Decisions

### Modular Architecture

A feature-based structure (`orders/`) was used to ensure scalability, maintainability, and clear separation of concerns.

### DTO Validation

Used `class-validator` and `class-transformer` to enforce strict input validation at the API boundary.

### Config-Driven Design

Key parameters such as decimal precision and default stock price are externalized via environment variables for flexibility.

### In-Memory Storage

Orders are stored in memory as persistence was not required. This keeps the implementation lightweight and performant.

### Order Lifecycle

Introduced an order status (`PENDING`) to represent the current stage of an order, enabling future extension into execution workflows.

### Separation of Concerns

Refactored the service into smaller methods (validation, calculation, order building) to improve readability and maintainability.

---

## 3. Requirement Clarifications & Assumptions

During implementation, several ambiguities were identified and resolved through assumptions:

### Portfolio & Ownership

* The portfolio is provided by the partner via API input
* The system does not generate or modify portfolios

### Stock Allocation

* Fractional shares are supported
* Allocation is determined by weight distribution

### Stock Selection

* The system does not maintain a predefined list of stocks
* Stock selection is fully partner-driven

### Investment Strategy

* No internal strategy (e.g., optimization or rebalancing) is applied
* The system strictly follows input portfolio weights

### Order Execution Timing

* Execution timing is simulated based on day of week
* Weekdays → immediate execution
* Weekends → next market open

### Buy vs Sell Orders

* Buy and sell orders are independent
* No validation against past orders or holdings

### Approval Workflow

* No approval process is implemented
* The system only generates order instructions

### Data Storage

* Data is stored in memory
* No persistence across application restarts

---

## 4. Performance Considerations

* Implemented a global interceptor to log API response times in milliseconds
* Used in-memory storage for minimal latency
* Avoided unnecessary external dependencies

---

## 5. Security Practices

* Input validation using DTOs
* ValidationPipe with whitelisting and transformation
* Defensive checks in service layer (e.g., weights, prices)

---

## 6. Challenges

### Requirement Ambiguity

Several aspects of the problem required interpretation before implementation:

* Understanding the role of the partner vs system responsibilities
* Clarifying whether the system should enforce portfolio or strategy logic
* Deciding how buy and sell orders should relate (or remain independent)
* Interpreting “temporary storage” as in-memory data

### Technical Challenges

* Handling dependency conflicts (NestJS + RxJS versions)
* Ensuring clean separation between validation and business logic
* Designing a flexible yet simple order structure
* Maintaining type safety while keeping implementation lightweight

---

## 7. Production Improvements

If extended to production, the following enhancements would be implemented:

* Persistent storage (e.g., PostgreSQL or MongoDB)
* Authentication and authorization
* Order execution pipeline using queues (e.g., BullMQ)
* Integration with real-time market price APIs
* Retry and failure handling mechanisms
* Pagination and filtering for order history
* Structured logging and monitoring (e.g., Prometheus, ELK stack)

---

## 8. Testing Strategy

Unit tests focus on service-level validation and business logic:

* Order creation (BUY and SELL)
* Price overrides and default fallback
* Portfolio weight validation
* Edge cases (invalid inputs, precision handling)

This ensures correctness of core logic independent of the controller layer.

---

## 9. LLM Usage

LLM tools were used to:

* Assist with project structuring
* Debug dependency and setup issues
* Improve code readability and documentation

All final decisions and implementations were reviewed and adapted manually.

---
