const { execSync } = require("child_process");

const dbUrl = "postgresql://postgres.qdutfgaugtlinubmgedf:Random%402020%23database@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";
const directUrl = "postgresql://postgres.qdutfgaugtlinubmgedf:Random%402020%23database@aws-1-us-east-1.pooler.supabase.com:5432/postgres";

try { execSync("npx vercel env rm DATABASE_URL production --yes", { stdio: 'ignore' }); } catch (e) { }
execSync("npx vercel env add DATABASE_URL production", { input: dbUrl, stdio: 'pipe' });

try { execSync("npx vercel env rm DIRECT_URL production --yes", { stdio: 'ignore' }); } catch (e) { }
execSync("npx vercel env add DIRECT_URL production", { input: directUrl, stdio: 'pipe' });

console.log("Environment variables added successfully via Node.js");
