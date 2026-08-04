# AFODAN — Susu daily savings collection (PWA)

An offline-first Progressive Web App for a Ghanaian daily-savings ("susu") collection
business. Collectors register clients, record daily collections, track withdrawals and
end-of-cycle payouts, and see business profit — all on the phone, working fully offline.

**Live app:** https://darkoson.github.io/afodan/

## Features
- **Clients** with photo (in-app camera or upload), phone/contacts, business details.
- **Multiple savings plans per client** — e.g. GH₵20/day *and* GH₵50/day, each its own
  31-day card with a Card No and daily rate (mirrors the physical susu card).
- **Any-amount collections** — a lump-sum "advance" automatically covers several days
  (GH₵300 on a GH₵20/day plan = 15 days).
- **Service charge rule** — the business keeps 1 day's contribution per plan-cycle; the
  client receives the rest at payout.
- **Digital passbook** per plan (Date / Deposit / Withdrawal / Balance) with Print / Save-as-PDF,
  mirroring the paper passbook.
- **Reports** — profit (service charges), savings held, monthly chart.
- **Offline & installable** — all data stored on-device (IndexedDB); installs to the home
  screen. Backup/restore to a JSON file from the Reports tab.
- Currency: Ghanaian Cedi (GH₵).

## Run it
- **Preview:** open `index.html` in any modern browser.
- **Install on a phone:** open the live URL above and choose *Add to Home Screen* / *Install app*.

## Tech
Single-file front end (`index.html`) — vanilla JS, IndexedDB, no build step.
`service-worker.js` caches the shell for offline use; `manifest.webmanifest` makes it installable.

## Configure
In-app **⚙ Settings**: business name, collector name, business phone and location
(the last two print on the passbook).
