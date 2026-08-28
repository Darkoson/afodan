# AFODAN — Admin password reset tool

A small command-line tool that lets the **administrator** reset any user's password
when they forget it. It runs on the admin's computer only, using a Firebase
service-account key that stays on that computer. Free — no Firebase billing needed.

> ⚠️ The `serviceAccountKey.json` is a **master key** to your whole Firebase project.
> Keep it private. Never email it, never commit it to Git, never put it on a public
> server. If it ever leaks, delete it in the Firebase console and generate a new one.

---

## One-time setup (about 5 minutes)

**1. Install Node.js** (if you don't have it): https://nodejs.org (the "LTS" version).

**2. Download your service-account key:**
   - Firebase console → your project → **gear ⚙ → Project settings**.
   - **Service accounts** tab → **Generate new private key** → confirm → a `.json` file downloads.
   - Rename it to **`serviceAccountKey.json`** and put it in **this `admin-tools` folder**
     (next to `reset-password.js`).

**3. Install the tool's dependency:** open a terminal **in this folder** and run:
   ```
   npm install
   ```
   (Do this once. It creates a `node_modules` folder.)

That's it — setup is done.

---

## Using it

Open a terminal in this `admin-tools` folder.

**See all usernames:**
```
node reset-password.js
```

**Reset a user's password:**
```
node reset-password.js <username> <newPassword>
```
Example:
```
node reset-password.js daniel Daniel#2026
```

The password takes effect immediately. Tell the user their new password, and ask them
to change it themselves in **Settings → Change my password** after they log in.

Passwords must be at least 6 characters.

---

## Notes
- This tool only resets passwords. Adding users, blocking them, and changing roles are
  all done **inside the app** by the admin — you don't need this tool for those.
- Works from anywhere with internet; it talks to your Firebase project directly.
