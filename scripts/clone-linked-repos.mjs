#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const manifestPath = path.join(rootDir, 'repos.manifest.json');
const dryRun = process.argv.includes('--dry-run');

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest not found: repos.manifest.json');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const baseDirectory = manifest.baseDirectory || 'repos';
const repositories = manifest.repositories || [];
const reposDir = path.join(rootDir, baseDirectory);

fs.mkdirSync(reposDir, { recursive: true });

function run(command, cwd) {
  if (dryRun) {
    console.log(`[dry-run] (${cwd}) ${command}`);
    return;
  }
  execSync(command, { cwd, stdio: 'inherit' });
}

for (const repo of repositories) {
  const name = repo.name;
  const url = repo.url;
  const branch = repo.branch || 'main';
  const targetPath = path.join(reposDir, name);
  const gitDir = path.join(targetPath, '.git');

  if (!name || !url) {
    console.warn('Skipping invalid manifest entry:', repo);
    continue;
  }

  if (fs.existsSync(gitDir)) {
    console.log(`Updating ${name}...`);
    run('git fetch --all --prune', targetPath);
    run(`git checkout ${branch}`, targetPath);
    run(`git pull origin ${branch}`, targetPath);
    continue;
  }

  if (fs.existsSync(targetPath) && !fs.existsSync(gitDir)) {
    console.warn(`Skipping ${name}: target exists but is not a git repo (${targetPath})`);
    continue;
  }

  console.log(`Cloning ${name}...`);
  run(`git clone --branch ${branch} "${url}" "${targetPath}"`, rootDir);
}

console.log(
  `\n${dryRun ? 'Dry run complete. ' : ''}Linked repositories are available in: ${reposDir}`,
);
