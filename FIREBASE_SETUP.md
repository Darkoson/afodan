# AFODAN — Firebase Phase 2 setup (what YOU do in the console)

This connects AFODAN to a real backend so **each person uses their own phone** and data
syncs live, with roles and the "no-delete-after-approval" rule enforced on the **server**
(not just in the app). It still works offline — Firestore keeps a local cache and syncs
when back online.

You only need to do the steps below **once**. When you finish, paste the **config object**
(step 4) and the **admin UID** (step 5) back to me, and I'll wire the app and test it.

---

## The plan (so you know what's happening)
- **Firebase Authentication (Email/Password)** handles login. Usernames map to a hidden
  email like `daniel@afodan.app` — you and the collectors still type just a username.
- **Cloud Firestore** stores clients, plans, collections, withdrawals, daily closures, and
  user profiles/roles.
- **Security rules** (I provide them) enforce: only signed-in staff can read/write; each
  collector sees only their own clients; managers/admin see all; **collections in an
  approved day can never be edited or deleted**; only the admin manages user accounts.
- The admin creates Daniel & Afoako **inside the app** after setup — you only hand-create
  the very first admin.

---

## Your checklist

### 1. Create the project
1. Go to https://console.firebase.google.com and click **Add project**.
2. Name it `afodan` (or anything). Google Analytics: you can **turn it off**. Create.

### 2. Turn on Email/Password login
1. Left menu → **Build → Authentication → Get started**.
2. **Sign-in method** tab → click **Email/Password** → toggle **Enable** (top one only) → **Save**.

### 3. Create the database
1. Left menu → **Build → Firestore Database → Create database**.
2. Choose **Start in production mode** → **Next**.
3. Pick a location close to Ghana (e.g. `eur3 (europe-west)`) → **Enable**.

### 4. Register the web app and copy the config
1. Click the **gear icon (⚙) → Project settings**.
2. Scroll to **Your apps** → click the **web icon `</>`**.
3. Nickname: `afodan-web`. **Do NOT** tick "Firebase Hosting". Click **Register app**.
4. You'll see a `const firebaseConfig = { ... }` block. **Copy the whole object** — it looks like:
   ```js
   const firebaseConfig = {
     apiKey: "AIza......",
     authDomain: "afodan-xxxx.firebaseapp.com",
     projectId: "afodan-xxxx",
     storageBucket: "afodan-xxxx.appspot.com",
     messagingSenderId: "0000000000",
     appId: "1:0000:web:abcdef"
   };
   ```
   👉 **Paste this back to me.** (These values are safe to share — they're public client keys;
   your data is protected by the security rules, not by hiding these.)

### 5. Create the first admin account
1. **Authentication → Users → Add user.**
   - Email: `admin@afodan.app`
   - Password: choose one you'll remember (this is the admin's login password).
   - Add user. Then **copy that user's "User UID"** (the long string in the row).
2. **Firestore Database → Start collection.**
   - Collection ID: `users`
   - Document ID: **paste the admin User UID** from above.
   - Add these fields (all type *string* except where noted):
     - `name` = `Administrator`
     - `username` = `admin`
     - `role` = `admin`
     - `status` = `active`
   - Save.
   👉 **Paste the admin UID back to me** (so I can double-check the wiring).

### 6. Paste the security rules
1. **Firestore Database → Rules** tab.
2. Delete what's there and paste the contents of **`firestore.rules`** (in this folder) → **Publish**.

---

## What to send me back
1. The `firebaseConfig` object (step 4).
2. The admin **User UID** (step 5).
3. Confirmation that Email/Password is enabled, Firestore is created, and the rules are published.

Once I have those, I'll: swap the app's storage to Firestore + Auth, keep the same login
screen (username → email behind the scenes), make the admin able to create Daniel/Afoako and
other users in-app, enable offline sync, and test the whole approval + locking flow against
your project. Then we push and it's live on all phones.

## Cost
This fits comfortably in Firebase's **free (Spark) tier** for a business of this size —
no card required. If you ever outgrow it, the paid tier is pay-as-you-go.
