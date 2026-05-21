<!-- AI_RULES / AGENTS Unified Project Directives -->
# AI Guidelines & Smart Orchestrator Rules (SOTA 2.2)

This file is designed to keep AI assistants (Antigravity, Cursor, Claude, etc.) on track, ensuring they maintain context, follow architectural standards, and avoid making regression errors while working in this project directory.

## 1. Project Identity & Technologies

- **Type:** [e.g., E-Commerce / Dashboard]
- **Architecture:** [e.g., Turborepo / Monolith]
- **Frontend:** [e.g., Next.js, TailwindCSS]
- **Backend:** [e.g., Fastify, Express]
- **Database:** [e.g., PostgreSQL, Prisma]
- **Package Manager:** [e.g., pnpm]

## 2. Autonomous Skill Triage & Routing (Auto-Mechanism & Skill Triage 2.2)

As an AI assistant in this project, you are not just a "code writer," but a **"Smart Orchestrator"** operating with maximum structural rigor.

1. **Mandatory Triage:** When you receive a new, complex, or ambiguous prompt from the user, DO NOT START WRITING CODE OR PLANNING DIRECTLY.
2. **Equip Skills & Dynamic Context Pruning:** 
   - First, scan the system's `.skills/` directory. Determine the most appropriate skills for the requested task.
   - **Pruning Principle:** To keep your context window highly focused, only read the `SKILL.md` files of direct or immediately related skills. Avoid loading irrelevant skills.
3. **Read and Execute:** Use your file reading tools to read the `SKILL.md` files of the determined skills and perform the task adhering completely to the best industry standards, guidelines, and best practices found within. This step cannot be skipped.
4. **Transparent Triage & SOTA Orchestration Preview:** *For any critical, complex, or ambiguous task, before moving to the planning or coding phase*, you MUST present a transparent orchestration preview report to the user using the following template:
   - **Risk & Confidence Scoring:** The risk level of the task (Low/Medium/High), the reasoning behind it, and a **Rollback Plan** in case of failure.
   - **Equipped Skills:** The list of specific `<skills>` selected for the task and the rationale for their use.
   - **Blast Radius Mapping:** A table showing the components affected by the change (e.g., Database, API Backend, Frontend UI), the specific file paths, and potential side effects.
   - **Active Architectural Rules:** The active project guidelines directly affecting this task.
   - **Proactive / Value-Add Recommendations:** Optional or bonus suggestions (such as security enhancements, performance tuning, rate-limiting, or fallback mechanisms) that the user might have missed but are industry standards.
   - **Advanced Orchestrated Prompt:** A technically enriched, precise reformulation of the user's initial prompt, complete with architectural constraints, input/output contracts, and E2E test scenarios.
   - **Approval Checkpoint:** Ask the user to review and explicitly approve this orchestration framework. You must wait for the user's approval before proceeding to planning and execution. This checkpoint is mandatory and cannot be bypassed.
5. **Self-Improvement / Lessons Loop:**
   - Always check `tasks/lessons.md` before starting a task to identify previously documented error patterns and coding constraints in this repository.
   - When resolving any bug or when corrected by the user, immediately document the mistake pattern and corresponding solution inside `tasks/lessons.md` to prevent recurring errors.
6. **Skills Quality Check (CI/CD Linter):**
   - Ensure all skills in `.skills/` match the structural standards by running `npm run lint:skills` (or `pnpm run lint:skills`). All skills must have valid YAML frontmatter and appropriate sub-headings.
7. **TDD & Spec-First Workflow:** Strictly adhere to the Spec-First development and TDD lifecycle (defining tests and specifications before writing code).
8. **Cognitive Architectural Anchor:** Align all directory layering, state management, event queues, and routing rules with the single source of truth mapping (e.g., `docs/architecture/MAP.md`).

## 3. Core Principles

- **Simplicity First:** Make every change as simple as possible. Affect minimum code.
- **No Laziness:** Find root causes. Do not apply temporary fixes. Maintain senior developer standards.
- **Minimal Impact:** Changes should only touch necessary parts. Avoid introducing new bugs.
