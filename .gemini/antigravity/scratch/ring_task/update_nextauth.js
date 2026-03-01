const { execSync } = require("child_process");
const crypto = require("crypto");

const secret = crypto.randomBytes(32).toString("hex");

try { execSync(`npx vercel env rm NEXTAUTH_SECRET production --yes`, { stdio: 'ignore' }); } catch (e) { }
execSync(`npx vercel env add NEXTAUTH_SECRET production`, { input: secret, stdio: 'pipe' });

try { execSync(`npx vercel env rm NEXTAUTH_URL production --yes`, { stdio: 'ignore' }); } catch (e) { }
execSync(`npx vercel env add NEXTAUTH_URL production`, { input: "https://ring-task.vercel.app", stdio: 'pipe' });

console.log("NextAuth Environment variables added successfully.");
