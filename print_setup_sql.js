// Script to print the SQL setup commands
const fs = require('fs');

// Read the SQL setup file
const sqlSetup = fs.readFileSync('./supabase_unified_setup.sql', 'utf8');

console.log('=== COPY THE FOLLOWING SQL COMMANDS TO YOUR SUPABASE DASHBOARD ===\n');
console.log(sqlSetup);
console.log('\n=== END OF SQL COMMANDS ===');