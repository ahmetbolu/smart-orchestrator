#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Elegant terminal styling helpers
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

function logHeader(msg) {
    console.log(`\n${colors.cyan}${colors.bold}🚀 ${msg}${colors.reset}\n`);
}

function logSuccess(msg) {
    console.log(`${colors.green}✔${colors.reset} ${msg}`);
}

function logWarning(msg) {
    console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
}

function logInfo(msg) {
    console.log(`${colors.blue}ℹ${colors.reset} ${msg}`);
}

function logError(msg) {
    console.error(`${colors.red}✘${colors.reset} ${msg}`);
}

// Helper to ask user questions synchronously via readline
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => rl.question(query, (ans) => {
        rl.close();
        resolve(ans.trim());
    }));
}

// Copy directory recursively
function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Help message display
function showHelp() {
    console.log(`
${colors.cyan}${colors.bold}Smart Orchestrator CLI (v2.3.0)${colors.reset}
Autonomous AI Skill Triage and Routing initialization tool.

${colors.bold}Usage:${colors.reset}
  npx github:ahmetbolu/smart-orchestrator init [options]   (Direct from GitHub)
  npx smart-orchestrator init [options]                    (If globally linked/installed)

${colors.bold}Options:${colors.reset}
  -y, --yes, -s, --silent   Initialize automatically with smart defaults (non-interactive)
  -h, --help                Show this help message
`);
}

// English generated rules templates
function generateRules(projectType, framework, database, packageManager, enablePruning, enableLessons, enableTDD, enableCognitive) {
    let rules = `<!-- AI_RULES / AGENTS Unified Project Directives -->
# ${projectType} Project - AI Guidelines & Smart Orchestrator Rules (SOTA 2.3)

This file is designed to keep AI assistants (Antigravity, Cursor, Claude, etc.) on track, ensuring they maintain context, follow architectural standards, and avoid making regression errors while working in this project directory.

## 1. Project Identity & Technologies
- **Type:** ${projectType}
- **Framework:** ${framework}
- **Database / ORM:** ${database}
- **Package Manager:** **${packageManager}** (STRICTLY \`${packageManager}\`, do NOT use any other package managers)

## 2. Environments and Runtime Rules
- All dependency installation and command executions MUST strictly use **${packageManager}**.
`;

    if (database.toLowerCase().includes('prisma')) {
        rules += `- **Database Schema (Zero-Downtime):** After any modification to the database schema, immediately execute \`${packageManager} run db:generate\` and \`${packageManager} run db:migrate\` in the root directory. Geriye dönük uyumluluğu (backward compatibility) bozan yıkıcı değişiklikler tek seferde yapılmamalıdır.
`;
    }

    rules += `
## 3. Autonomous Skill Triage & Routing (Auto-Mechanism & Skill Triage 2.3)
As an AI assistant in this project, you are not just a "code writer," but a **"Smart Orchestrator"** operating with maximum structural rigor.

1. **Mandatory Triage:** When you receive a new, complex, or ambiguous prompt from the user, DO NOT START WRITING CODE OR PLANNING DIRECTLY.
2. **Equip Skills & Dynamic Context Pruning:**
   - First, scan the system's \`.skills/\` directory. Determine the most appropriate skills for the requested task.
`;

    if (enablePruning) {
        rules += `   - **Pruning Principle:** To keep your context window highly focused, only read the \`SKILL.md\` files of direct or immediately related skills. Avoid loading irrelevant skills.
`;
    }

    rules += `3. **Read and Execute:** Use your file reading tools to read the \`SKILL.md\` files of the determined skills and perform the task adhering completely to the best industry standards, guidelines, and best practices found within. This step cannot be skipped.
4. **Transparent Triage & SOTA Orchestration Preview:** *For any critical, complex, or ambiguous task, before moving to the planning or coding phase*, you MUST present a transparent orchestration preview report to the user using the following template:
   - **Risk & Confidence Scoring:** The risk level of the task (Low/Medium/High), the reasoning behind it, and a **Rollback Plan** in case of failure.
   - **Equipped Skills:** The list of specific \`<skills>\` selected for the task and the rationale for their use.
   - **Blast Radius Mapping:** A table showing the components affected by the change (e.g., Database, API Backend, Frontend UI), the specific file paths, and potential side effects.
   - **Active Architectural Rules:** The active project guidelines directly affecting this task.
   - **Proactive / Value-Add Recommendations:** Optional or bonus suggestions (such as security enhancements, performance tuning, rate-limiting, or fallback mechanisms) that the user might have missed but are industry standards.
   - **Advanced Orchestrated Prompt:** A technically enriched, precise reformulation of the user's initial prompt, complete with architectural constraints, input/output contracts, and E2E test scenarios.
   - **Approval Checkpoint:** Ask the user to review and explicitly approve this orchestration framework. You must wait for the user's approval before proceeding to planning and execution. This checkpoint is mandatory and cannot be bypassed.
`;

    if (enableLessons) {
        rules += `5. **Self-Improvement & Lessons Loop:**
   - Always check \`tasks/lessons.md\` before starting a task to identify previously documented error patterns and coding constraints in this repository.
   - When resolving any bug or when corrected by the user, immediately document the mistake pattern and corresponding solution inside \`tasks/lessons.md\` to prevent recurring errors.
`;
    }

    if (enableTDD) {
        rules += `6. **TDD & Spec-First Workflow:** Strictly adhere to the Spec-First development and TDD lifecycle (defining tests and specifications before writing code).
`;
    }

    if (enableCognitive) {
        rules += `7. **Cognitive Architectural Anchor:** Align all directory layering, state management, event queues, and routing rules with the single source of truth mapping (e.g., \`docs/architecture/MAP.md\`).
`;
    }

    rules += `
## 4. Core Principles
- **Simplicity First:** Make every change as simple as possible. Affect minimum code.
- **No Laziness:** Find root causes. Do not apply temporary fixes. Maintain senior developer standards.
- **Minimal Impact:** Changes should only touch necessary parts. Avoid introducing new bugs.
`;
    return rules;
}

async function main() {
    const args = process.argv.slice(2);
    
    // Help routing
    if (args.includes('-h') || args.includes('--help')) {
        showHelp();
        process.exit(0);
    }

    const isSilent = args.includes('-y') || args.includes('--yes') || args.includes('-s') || args.includes('--silent');

    logHeader('Welcome to Smart Orchestrator 2.3.0 Initialization!');
    console.log('Let\'s customize your AI Agent rules and scaffold your Skill Standard Library.\n');

    let projectType = 'E-Commerce';
    let framework = 'Next.js';
    let database = 'PostgreSQL + Prisma';
    let packageManager = 'pnpm';
    let enableLessons = true;
    let enablePruning = true;
    let enableTDD = true;
    let enableCognitive = true;
    let ides = ['AGENTS.md', '.cursorrules', '.windsurfrules', 'CLAUDE.md'];
    let chosenSkills = [];

    const examplesDir = path.join(__dirname, '..', 'examples');
    const availableSkills = fs.existsSync(examplesDir) 
        ? fs.readdirSync(examplesDir).filter(item => fs.statSync(path.join(examplesDir, item)).isDirectory() && !item.startsWith('.'))
        : [];

    if (isSilent) {
        logInfo('Silent mode detected. Initializing with optimal smart defaults (English rules, all IDE rule files, and all available standard library skills)...');
        chosenSkills = availableSkills;
    } else {
        // Interactive Questionnaire
        // 1. Tech Stack
        projectType = await askQuestion('📦 Project Type (e.g., E-Commerce, Dashboard, Mobile App): [E-Commerce] ') || 'E-Commerce';
        framework = await askQuestion('🌐 Frontend/Backend Framework (e.g., Next.js, Express, Spring Boot): [Next.js] ') || 'Next.js';
        database = await askQuestion('🗄️ Database & ORM (e.g., PostgreSQL + Prisma, Drizzle + MySQL, None): [PostgreSQL + Prisma] ') || 'PostgreSQL + Prisma';
        packageManager = await askQuestion('🛠️ Package Manager (pnpm, npm, yarn, bun): [pnpm] ') || 'pnpm';

        // 2. Cognitive / SOTA features
        logHeader('Advanced SOTA AI Orchestration Features');
        const pruneChoice = await askQuestion('✂️ Enable Dynamic Context Pruning? (Y/n): ') || 'Y';
        enablePruning = pruneChoice.toLowerCase() === 'y';

        const lessonsChoice = await askQuestion('🔄 Enable Self-Improvement & Lessons Loop? (Y/n): ') || 'Y';
        enableLessons = lessonsChoice.toLowerCase() === 'y';

        const tddChoice = await askQuestion('🧪 Enable TDD & Spec-First Workflow? (Y/n): ') || 'Y';
        enableTDD = tddChoice.toLowerCase() === 'y';

        const cogChoice = await askQuestion('🗺️ Enable Cognitive Architectural Anchor (MAP.md)? (Y/n): ') || 'Y';
        enableCognitive = cogChoice.toLowerCase() === 'y';

        // 3. IDE configurations selection
        logHeader('Target AI IDEs / Rules Configuration Files');
        console.log('Select files to generate (Press Enter to generate rules for ALL, or comma-separated numbers):');
        console.log('  1) AGENTS.md (Unified Rules - Highly Recommended)');
        console.log('  2) .cursorrules (Cursor IDE)');
        console.log('  3) .windsurfrules (Windsurf IDE)');
        console.log('  4) CLAUDE.md (Claude Code CLI)');
        console.log('  5) .vscode/settings.json (VSCode global custom rules)');

        const ideChoice = await askQuestion('Select IDEs [All]: ') || '1,2,3,4,5';
        const ideIndices = ideChoice.split(',').map(s => s.trim());
        ides = [];
        if (ideIndices.includes('1')) ides.push('AGENTS.md');
        if (ideIndices.includes('2')) ides.push('.cursorrules');
        if (ideIndices.includes('3')) ides.push('.windsurfrules');
        if (ideIndices.includes('4')) ides.push('CLAUDE.md');
        if (ideIndices.includes('5')) ides.push('.vscode/settings.json');

        // 4. Skills Library Scaffolder selection
        logHeader('Scaffold Skill Standard Library Templates');
        if (availableSkills.length === 0) {
            logWarning('No pre-bundled standard library skill templates found.');
        } else {
            console.log('Choose skill scaffolding option:');
            console.log('  1) Install ALL 8 industry-standard skills (Recommended)');
            console.log('  2) Interactive selection (Choose specific skills to copy)');
            console.log('  3) Do not install any skills');

            const skillOpt = await askQuestion('Select option (1-3): [1] ') || '1';
            if (skillOpt === '1') {
                chosenSkills = availableSkills;
            } else if (skillOpt === '2') {
                console.log('\nAvailable Skills:');
                availableSkills.forEach((skill, index) => {
                    console.log(`  ${index + 1}) ${skill}`);
                });
                const skillSel = await askQuestion('\nEnter comma-separated numbers of skills to install (e.g. 1,3,4): ');
                const selectedIndices = skillSel.split(',').map(s => parseInt(s.trim(), 10) - 1);
                chosenSkills = availableSkills.filter((_, idx) => selectedIndices.includes(idx));
            }
        }
    }

    // Execution phase
    logHeader('Executing Orchestrator Blueprint Instantiation...');

    // Generate Rules Content
    const finalRulesContent = generateRules(projectType, framework, database, packageManager, enablePruning, enableLessons, enableTDD, enableCognitive);

    // Create target workspace folders & files
    const cwd = process.cwd();

    // 1. AGENTS.md
    if (ides.includes('AGENTS.md')) {
        fs.writeFileSync(path.join(cwd, 'AGENTS.md'), finalRulesContent, 'utf8');
        logSuccess('Generated AGENTS.md rules file.');
    }

    // 2. .cursorrules
    if (ides.includes('.cursorrules')) {
        const cursorRulesContent = JSON.stringify({
            instruction: `Always read the AGENTS.md instructions first before starting any work. Adopt the "Smart Orchestrator" persona. Always triage the prompt, equip relevant skills in .skills/, and present the Transparent SOTA Orchestration Preview report for user approval before proposing or writing code. Directives in AGENTS.md are strict rules.`
        }, null, 2);
        
        fs.writeFileSync(path.join(cwd, '.cursorrules'), cursorRulesContent, 'utf8');
        logSuccess('Generated .cursorrules file.');
    }

    // 3. .windsurfrules
    if (ides.includes('.windsurfrules')) {
        const windsurfRulesContent = `Always read the AGENTS.md instructions first before starting any work. Adopt the "Smart Orchestrator" persona. Always triage the prompt, equip relevant skills in .skills/, and present the Transparent SOTA Orchestration Preview report for user approval before writing code. Directives in AGENTS.md are strict rules.`;
        
        fs.writeFileSync(path.join(cwd, '.windsurfrules'), windsurfRulesContent, 'utf8');
        logSuccess('Generated .windsurfrules file.');
    }

    // 4. CLAUDE.md
    if (ides.includes('CLAUDE.md')) {
        fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), finalRulesContent, 'utf8');
        logSuccess('Generated CLAUDE.md instructions file.');
    }

    // 5. .vscode/settings.json
    if (ides.includes('.vscode/settings.json')) {
        const vscodeDir = path.join(cwd, '.vscode');
        if (!fs.existsSync(vscodeDir)) {
            fs.mkdirSync(vscodeDir, { recursive: true });
        }
        const settingsPath = path.join(vscodeDir, 'settings.json');
        let currentSettings = {};
        if (fs.existsSync(settingsPath)) {
            try {
                currentSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
            } catch (e) {
                // fall back to clean object if JSON is invalid
            }
        }
        
        currentSettings['copilot.instructions.file'] = 'AGENTS.md';
        currentSettings['github.copilot.chat.customInstructions'] = 'Please act as a SOTA Smart Orchestrator. Adhere strictly to the guidelines defined in AGENTS.md and equip relevant expert skills located in .skills/.';
        
        fs.writeFileSync(settingsPath, JSON.stringify(currentSettings, null, 2), 'utf8');
        logSuccess('Configured .vscode/settings.json with custom prompt instructions.');
    }

    // 6. Scaffolding dynamic skills
    const targetSkillsDir = path.join(cwd, '.skills');
    if (chosenSkills.length > 0) {
        if (!fs.existsSync(targetSkillsDir)) {
            fs.mkdirSync(targetSkillsDir, { recursive: true });
        }
        for (const skill of chosenSkills) {
            const srcPath = path.join(examplesDir, skill);
            const destPath = path.join(targetSkillsDir, skill);
            if (fs.existsSync(srcPath)) {
                try {
                    copyDirRecursive(srcPath, destPath);
                    logSuccess(`Scaffolded skill template: ${colors.bold}${skill}${colors.reset}`);
                } catch (e) {
                    logError(`Failed to copy skill: ${skill} (${e.message})`);
                }
            }
        }
    }

    // 7. Auto-scaffold lessons.md stub
    if (enableLessons) {
        const tasksDir = path.join(cwd, 'tasks');
        const lessonsPath = path.join(tasksDir, 'lessons.md');
        if (!fs.existsSync(tasksDir)) {
            fs.mkdirSync(tasksDir, { recursive: true });
        }
        if (!fs.existsSync(lessonsPath)) {
            const lessonsContent = `# Repository Lessons & AI Learnings

This file is a living log used by AI assistants to document and prevent recurring error patterns, anti-patterns, and coding regressions in this repository.

> [!IMPORTANT]
> **Instructions for the AI:** Always consult this file before starting any task to check for lessons learned. Always append new findings when fixing bugs or after a user correction.

## 🧠 Documented Lessons

### Template Pattern
*   **Description of Mistake:** [Brief description of what went wrong]
*   **Root Cause Analysis:** [Why the bug/failure occurred]
*   **Robust Solution:** [How it was fixed and what pattern to use going forward to prevent it]
`;
            fs.writeFileSync(lessonsPath, lessonsContent, 'utf8');
            logSuccess('Generated lessons loop task stub at tasks/lessons.md');
        }
    }

    // 8. Auto-scaffold MAP.md stub
    if (enableCognitive) {
        const archDir = path.join(cwd, 'docs', 'architecture');
        const mapPath = path.join(archDir, 'MAP.md');
        if (!fs.existsSync(archDir)) {
            fs.mkdirSync(archDir, { recursive: true });
        }
        if (!fs.existsSync(mapPath)) {
            const mapContent = `# Cognitive Architectural Map

This document acts as the single source of truth (SSOT) mapping the files, directory hierarchies, and state boundaries across this repository.

## 🗺️ Workspace Blueprint

\`\`\`
├── src/                  # Main source directory
├── .skills/              # Smart Orchestrator expert skills
├── tasks/                # Tasks and Lessons logs
└── docs/                 # General documentation
\`\`\`

## 🔄 Boundary Mapping
- **UI & Routing State:** Strictly decoupled from business logic layers.
- **Cache Layers:** Outlined explicitly below.
`;
            fs.writeFileSync(mapPath, mapContent, 'utf8');
            logSuccess('Generated cognitive map stub at docs/architecture/MAP.md');
        }
    }

    logHeader('Smart Orchestrator Successfully Configured!');
    console.log(`✨ Instantiation complete! Your AI is now fully configured to act as a SOTA ${colors.bold}Smart Orchestrator${colors.reset}.`);
    console.log(`To validate your skills at any time, run: ${colors.cyan}pnpm run lint:skills${colors.reset}\n`);
}

main().catch((err) => {
    logError(`Initialization encountered an unexpected error: ${err.message}`);
    process.exit(1);
});
