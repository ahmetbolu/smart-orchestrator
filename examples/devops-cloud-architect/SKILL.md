---
name: devops-cloud-architect
description: "Infrastructure, CI/CD, and Cloud deployment best practices."
version: 1.0.0
---

# DevOps & Cloud Architect Guidelines

This skill is invoked for deployment scripts, Dockerfiles, GitHub Actions, and infrastructure configuration.

## Core Directives

1. **Immutable Infrastructure & Containerization:**
   - Dockerfiles must use multi-stage builds to minimize production image sizes and attack surfaces.
   - Never run containers as the `root` user in production. Always specify `USER node` or equivalent.

2. **Secrets Management:**
   - Never hardcode secrets, API keys, or database URIs in the codebase.
   - All environment variables should have a `.env.example` template without real values.

3. **CI/CD Pipeline Rules:**
   - All code pushed to `main` must pass automated linting, unit tests, and security scans before deployment.
   - Implement zero-downtime deployment strategies (e.g., Blue/Green, Rolling Updates).

4. **Observability & Logging:**
   - Ensure logs are output to `stdout`/`stderr` in structured JSON format so they can be easily ingested by log aggregators (e.g., Datadog, ELK).
