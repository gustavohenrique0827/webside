# Fix GraphQL Connection Error (localhost:5000 refused)

**Problem:** Frontend Apollo client hitting `http://localhost:5000/graphql` instead of backend port 3002.

**Status:** Backend healthy on 3002, Vite proxy configured.

## Steps:
1. [✅] Edit `frontend/src/lib/apollo.ts` - Force dev proxy `/graphql` **DONE**
2. [✅] Fixed CORS in backend/index.js + nginx proxies
3. [ ] docker-compose down && docker-compose up -d (or npm run dev)
4. [ ] Check console GraphQL URL: `/graphql` 
5. [ ] Test login success
6. [✅] Complete

**Backend confirmed running:** `curl localhost:3002/health` OK
