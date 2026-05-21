---
name: backend-clean-architecture
description: "Enterprise backend rules for APIs, domain logic, and clean architecture."
version: 1.0.0
---

# Backend Clean Architecture Guidelines

This skill is invoked for server-side logic, API development, and business domain structuring.

## Core Directives

1. **Three-Tier Architecture (N-Tier):**
   - **Routes/Controllers:** Handle only HTTP layer logic (req/res, parsing headers, validation).
   - **Services (Business Logic):** Must be unaware of the HTTP layer. Receive plain objects (DTOs) and return data/errors.
   - **Data Access (Repository/Adapter):** The only layer allowed to directly query the database or external APIs.

2. **Error Handling & Observability:**
   - No silent failures. All `catch` blocks must use a centralized logger (e.g., Winston, Pino) containing context and stack traces.
   - Never expose raw database errors or stack traces to the client. Always map to standard HTTP status codes (e.g., 400, 404, 500).

3. **Graceful Degradation & Resilience:**
   - Implement Circuit Breakers or fallback mechanisms when relying on third-party APIs (e.g., payment gateways, SMS providers). A failure in an external service must not bring down the entire system.

4. **Validation:**
   - Always validate incoming payload structures (e.g., using Zod, Joi) before the Service layer processes them.
