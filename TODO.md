# Backend Port Fix Plan (Approved - Proceeding)

Status: User confirmed to proceed (same error persists)

## Approved Plan Steps:
1. [x] Kill process using port 5000
2. [ ] Edit backend/src/index.js - change default PORT from 5000 → 3002
3. [ ] Update backend/package.json dev script to PORT=3002 node src/index.js
4. [ ] Test npm run dev
5. [ ] Update frontend GraphQL endpoint if needed

## Next Step
Change port in code to 3002 (available per previous standardization)

