#  Plinko Fairness Game

##  Live Links

* Frontend: https://plinko-lab-seven.vercel.app/
* Backend: https://plinko-lab-e6j3.onrender.com
* Verifier: https://plinko-lab-seven.vercel.app/verify
* Example Round: https://plinko-lab-seven.vercel.app/?roundId=123

---

##  How to Run Locally

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://...
```

---

##  Architecture Overview

* **Frontend**: React + Tailwind (UI, animation)
* **Backend**: Express.js
* **Database**: PostgreSQL with Prisma (deployed on Neon DB)
* **Flow**:

  1. Commit → serverSeed hashed
  2. Start → combinedSeed generated
  3. Engine → peg map + path
  4. Reveal → serverSeed shown
  5. Verify → recompute deterministically

---

##  Fairness Specification

### Commit-Reveal

* Server generates `serverSeed`
* Stores `commitHex = SHA256(serverSeed + nonce)`
* Reveals serverSeed after round

### Combined Seed

```text
combinedSeed = SHA256(serverSeed + ":" + clientSeed + ":" + nonce)
```

### PRNG

* Algorithm: xorshift32
* Seed: first 4 bytes (big-endian) of combinedSeed
* Deterministic sequence

### Peg Map

* Generated row-wise using PRNG
* Each peg value = random between ~0.4–0.6

### Path Logic

* For each row:

  * If rand < peg → Left
  * Else → Right

### Final Bin

* Count of "Right" moves

---

##  AI Usage

I used AI (ChatGPT) to:

* Understand commit-reveal fairness model
* Implement deterministic PRNG (xorshift32)
* Debug seed mismatch issues
* Structure backend APIs and frontend animation

### What I changed manually:

* Fixed PRNG 32-bit handling (`>>> 0`)
* Corrected seed extraction using `readUInt32BE`
* Adjusted animation to match triangular grid

---

##  Time Log

| Task               | Time  |
| ------------------ | ----- |
| Engine + PRNG      | 2 hrs |
| Backend APIs       | 2 hrs |
| Frontend UI        | 2 hrs |
| Animation + polish | 2 hrs |

Total: ~8 hours

---

##  What I would improve

* Add real physics-based animation
* Add authentication + user balance
* Improve UI with better graphics
* Add game history + analytics

---

##  Tests

* Deterministic PRNG test
* Replay test (same seed → same result)
* Assignment test vector validation

---

##  Summary

This project demonstrates:

* Deterministic systems
* Provable fairness
* Full-stack integration
* Interactive UI with animation
