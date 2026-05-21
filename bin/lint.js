#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

function logSuccess(msg) {
    console.log(`${colors.green}✔${colors.reset} ${msg}`);
}

function logError(msg) {
    console.error(`${colors.red}✘${colors.reset} ${msg}`);
}

function logWarning(msg) {
    console.warn(`${colors.yellow}⚠${colors.reset} ${msg}`);
}

function parseFrontmatter(content, filePath) {
    const lines = content.split(/\r?\n/);
    if (lines[0].trim() !== '---') {
        throw new Error('Missing starting frontmatter delimiter (---)');
    }

    const yamlLines = [];
    let endIdx = -1;

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            endIdx = i;
            break;
        }
        yamlLines.push(lines[i]);
    }

    if (endIdx === -1) {
        throw new Error('Missing closing frontmatter delimiter (---)');
    }

    const metadata = {};
    for (const line of yamlLines) {
        // Skip empty lines or comments
        if (!line.trim() || line.trim().startsWith('#')) continue;

        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) {
            throw new Error(`Invalid YAML format line: "${line}"`);
        }

        const key = line.substring(0, colonIdx).trim();
        let val = line.substring(colonIdx + 1).trim();

        // Remove wrapping quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.substring(1, val.length - 1);
        }

        metadata[key] = val;
    }

    const body = lines.slice(endIdx + 1).join('\n');

    return { metadata, body };
}

function validateSkillFile(filePath, dirName) {
    if (!fs.existsSync(filePath)) {
        return [`Missing SKILL.md file in folder: ${dirName}`];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];

    let parsed;
    try {
        parsed = parseFrontmatter(content, filePath);
    } catch (err) {
        return [`Frontmatter parsing failed: ${err.message}`];
    }

    const { metadata, body } = parsed;

    // Validate metadata fields
    if (!metadata.name) {
        errors.push('Missing "name" field in frontmatter.');
    } else if (metadata.name !== dirName) {
        logWarning(`Skill folder name "${dirName}" does not match name field "${metadata.name}" in metadata.`);
    }

    if (!metadata.description) {
        errors.push('Missing "description" field in frontmatter.');
    } else if (metadata.description.length < 10) {
        errors.push('Description is too short. It must be a comprehensive summary of the skill.');
    }

    if (!metadata.version) {
        errors.push('Missing "version" field in frontmatter.');
    }

    // Validate body content
    const normalizedBody = body.trim();
    if (!normalizedBody) {
        errors.push('Skill file has no content body below frontmatter.');
        return errors;
    }

    if (!normalizedBody.includes('# ')) {
        errors.push('Skill file must have at least one H1 header (# Title).');
    }

    if (!normalizedBody.includes('## ')) {
        errors.push('Skill file must have at least one subheader (## Section) detailing directives.');
    }

    return errors;
}

function run() {
    console.log(`${colors.cyan}${colors.bold}🔍 Smart Orchestrator CI/CD Skill Linter${colors.reset}\n`);

    // Target directory to lint: check CLI argument, default to current workspace .skills folder, fall back to examples
    let targetDir = process.argv[2];
    if (!targetDir) {
        const localSkills = path.join(process.cwd(), '.skills');
        const exampleSkills = path.join(process.cwd(), 'examples');

        if (fs.existsSync(localSkills)) {
            targetDir = localSkills;
        } else if (fs.existsSync(exampleSkills)) {
            targetDir = exampleSkills;
        } else {
            logError('Could not find any ".skills" or "examples" directory to lint. Please pass directory as argument.');
            process.exit(1);
        }
    }

    const absoluteTargetDir = path.resolve(targetDir);
    console.log(`Scanning skills in: ${colors.bold}${absoluteTargetDir}${colors.reset}\n`);

    if (!fs.existsSync(absoluteTargetDir)) {
        logError(`Target directory does not exist: ${absoluteTargetDir}`);
        process.exit(1);
    }

    const items = fs.readdirSync(absoluteTargetDir);
    const subDirs = items.filter(item => {
        const itemPath = path.join(absoluteTargetDir, item);
        return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    });

    if (subDirs.length === 0) {
        logWarning('No skill subdirectories found to validate.');
        process.exit(0);
    }

    let totalErrors = 0;
    let totalSkills = 0;

    for (const dirName of subDirs) {
        totalSkills++;
        const skillDir = path.join(absoluteTargetDir, dirName);
        const skillFilePath = path.join(skillDir, 'SKILL.md');

        console.log(`Checking skill: ${colors.bold}${dirName}${colors.reset}...`);
        const errors = validateSkillFile(skillFilePath, dirName);

        if (errors.length > 0) {
            totalErrors += errors.length;
            for (const error of errors) {
                logError(`  - ${error}`);
            }
            console.log(); // empty line after failures
        } else {
            logSuccess(`  Skill "${dirName}" is perfectly formatted.\n`);
        }
    }

    console.log(`${colors.bold}----------------------------------------${colors.reset}`);
    if (totalErrors > 0) {
        console.error(`${colors.red}${colors.bold}Lint Failed!${colors.reset} Found ${totalErrors} issue(s) across ${totalSkills} skill(s).`);
        process.exit(1);
    } else {
        console.log(`${colors.green}${colors.bold}Lint Passed!${colors.reset} Verified all ${totalSkills} skill(s) successfully.`);
        process.exit(0);
    }
}

run();
