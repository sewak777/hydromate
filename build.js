#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  // Build frontend from client directory
  console.log('Building frontend...');
  process.chdir(path.join(__dirname, 'client'));
  execSync('npx vite build --outDir ../dist/public', { stdio: 'inherit' });
  
  // Build backend
  console.log('Building backend...');
  process.chdir(__dirname);
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}