// Script to set build time as environment variable
const fs = require('fs');
const path = require('path');

const buildTime = new Date().toISOString();
const envPath = path.join(__dirname, '..', '.env.local');

// Read existing .env.local or create new
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

// Update or add NEXT_PUBLIC_BUILD_TIME
const buildTimeRegex = /NEXT_PUBLIC_BUILD_TIME=.*/;
if (buildTimeRegex.test(envContent)) {
    envContent = envContent.replace(buildTimeRegex, `NEXT_PUBLIC_BUILD_TIME=${buildTime}`);
} else {
    envContent += `\nNEXT_PUBLIC_BUILD_TIME=${buildTime}\n`;
}

fs.writeFileSync(envPath, envContent);
console.log(`✓ Build time set to: ${buildTime}`);
