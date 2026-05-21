---
name: postgres-patterns-demo
description: "Demo PostgreSQL database patterns for query optimization, schema design, and indexing."
version: 1.0.0
---

# Postgres Patterns Demo

This is an example `SKILL.md` file meant to demonstrate how to structure a specific technical capability for the Smart Orchestrator. When the AI scans its skills and decides this applies (e.g., for database optimization tasks), it will read this file.

## Core Directives

1. **Indexing Strategy**: Always prefer covering indexes for frequent read patterns. Never use sequential scans for large tables.
2. **Transactions**: Any mutation involving multiple tables MUST be wrapped in an atomic transaction (e.g., using `$transaction` in Prisma).
3. **Soft Deletes**: Never `DELETE` records permanently. Add a `deletedAt` DateTime field and filter by `deletedAt IS NULL`.

## How the AI Should Use This

If the user says: "Optimize the user search query."
The AI will read this file and realize it needs to recommend and implement indexing strategies rather than just rewriting the code blindly.
