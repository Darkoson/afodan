SUSU COLLECT — Offline PWA for daily savings collection
========================================================

WHAT IT DOES
- Register clients (name, photo, phone/contact, business).
- Each client can hold MULTIPLE savings plans (e.g. GH₵20/day AND GH₵50/day),
  each with its own 31-day card, Card No and daily rate.
- Record daily collections. Any amount is allowed — a lump sum (an "advance")
  automatically covers several days (e.g. GH₵300 on a GH₵20/day plan = 15 days).
- Track withdrawals and end-of-cycle payout. The business keeps 1 day's
  contribution per plan as its service charge; the client receives the rest.
- Digital passbook per plan (Date / Deposit / Withdrawal / Balance) that mirrors
  the paper book, with Print / Save-as-PDF.
- Profit reports (service charges), savings held, and monthly charts.
- Works fully OFFLINE. All data is stored privately on the device (IndexedDB).
  Backup / restore to a JSON file from the Reports tab.

HOW TO RUN
1) Quick preview: open index.html in any modern browser (Chrome, Safari, Edge).
   (Data saving and offline use work; app "install to home screen" needs step 2.)

2) Install as a phone app (recommended): host the whole folder on any static
   HTTPS host — e.g. GitHub Pages, Netlify, Vercel, or Firebase Hosting (all
   have free tiers). Then open the URL on the phone and choose
   "Add to Home Screen" / "Install app". It then runs offline like a native app.

FILES
  index.html              the whole app (UI + logic)
  manifest.webmanifest    PWA metadata (name, icons, colors)
  service-worker.js       offline caching
  icons/                  app icons

NOTES
- To change the business name, collector name, phone and location, use the
  gear (⚙) → Settings inside the app. These appear on the printed passbook.
- Currency is Ghanaian Cedi (GH₵).
