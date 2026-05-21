---
name: qa-e2e-testing
description: "Quality Assurance, TDD, and non-flaky E2E testing guidelines."
version: 1.0.0
---

# QA & E2E Testing Guidelines

This skill is invoked when writing automated tests (Unit, Integration, E2E) using Jest, Cypress, or Playwright.

## Core Directives

1. **Non-Flaky Selectors (E2E):**
   - Never select elements by CSS classes or generic tags (e.g., `.submit-btn`).
   - Always use `data-testid` attributes or semantic accessible locators (e.g., `getByRole('button', { name: 'Submit' })`).

2. **Test Isolation & State Management:**
   - Each test must run in complete isolation. Do not depend on the state left by a previous test.
   - Always clear cookies, local storage, and database state (or use a mock DB) before starting a test.

3. **Waiting & Assertions:**
   - Avoid hardcoded sleeps (e.g., `wait(5000)`). Use framework-specific auto-waiting assertions (e.g., `waitFor`, `expect().toBeVisible()`).

4. **Coverage Focus:**
   - Prioritize testing the "Critical Paths" (e.g., Checkout flow, Authentication, Payment) over trivial UI elements.
