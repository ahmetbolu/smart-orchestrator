---
name: security-owasp-top10
description: "Cybersecurity rules based on OWASP Top 10 and AI safety principles."
version: 1.0.0
---

# Security & OWASP Top 10 Guidelines

This skill is invoked when handling authentication, data mutation, or exposing new external endpoints.

## Core Directives

1. **Input Sanitization & Validation (XSS & SQLi):**
   - Never trust user input unconditionally. Strip HTML entities to prevent XSS.
   - Always use parameterized queries or trusted ORMs (like Prisma) to prevent SQL Injection. No raw string concatenation in queries.

2. **Authentication & Authorization (BOLA/IDOR):**
   - Verify that the authenticated user actually owns the resource they are trying to modify. Do not rely solely on the existence of an ID in the URL.

3. **Rate Limiting & Abuse Prevention:**
   - Any public or unauthenticated endpoints (search, comments, login) MUST have strict Rate Limiting implemented at the API gateway or framework level.

4. **AI Prompt Injection Defense:**
   - When building AI-facing features, sanitize the user prompt and separate instructions from user data using delimiter patterns (e.g., `"""`).
