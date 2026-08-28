/*
 * AFODAN — admin password reset tool
 * Resets any user's password using Firebase Admin privileges.
 * Runs on the admin's computer only; needs serviceAccountKey.json alongside it.
 *
 *   List users:   node reset-password.js
 *   Reset one:    node reset-password.js <username> <newPassword>
 *   Example:      node reset-password.js daniel Daniel#2026
 *
 * See README.md for one-time setup.
 */
'use strict';

let admin, key;
try { admin = require('firebase-admin'); }
catch (e) { console.error('\n✗ firebase-admin is not installed.\n  Run this once in this folder:  npm install\n'); process.exit(1); }
try { key = require('./serviceAccountKey.json'); }
catch (e) { console.error('\n✗ serviceAccountKey.json not found in this folder.\n  Download it from the Firebase console (see README.md, step 2) and save it here.\n'); process.exit(1); }

admin.initializeApp({ credential: admin.credential.cert(key) });
const auth = admin.auth();
const DOMAIN = '@afodan.app';
const [, , username, newPassword] = process.argv;

(async () => {
  // No args -> list existing users so the admin can see valid usernames
  if (!username) {
    const res = await auth.listUsers(1000);
    console.log('\nUsers in AFODAN:');
    res.users
      .map(u => (u.email || '').replace(DOMAIN, ''))
      .filter(Boolean)
      .sort()
      .forEach(name => console.log('  • ' + name));
    console.log('\nTo reset a password:  node reset-password.js <username> <newPassword>\n');
    process.exit(0);
  }

  if (!newPassword) { console.error('\n✗ Missing new password.\n  Usage: node reset-password.js <username> <newPassword>\n'); process.exit(1); }
  if (newPassword.length < 6) { console.error('\n✗ Password must be at least 6 characters.\n'); process.exit(1); }

  const email = username.toLowerCase() + DOMAIN;
  try {
    const user = await auth.getUserByEmail(email);
    await auth.updateUser(user.uid, { password: newPassword });
    console.log(`\n✓ Password reset for "${username}".`);
    console.log(`  They can log in now with username "${username}" and the new password.`);
    console.log(`  Ask them to change it in Settings after logging in.\n`);
  } catch (e) {
    if (e.code === 'auth/user-not-found') console.error(`\n✗ No user with username "${username}". Run  node reset-password.js  to list usernames.\n`);
    else console.error('\n✗ Error:', e.message, '\n');
    process.exit(1);
  }
  process.exit(0);
})().catch(e => { console.error('\n✗ Unexpected error:', e.message, '\n'); process.exit(1); });
