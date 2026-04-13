# GraphQL 502/Login Fix - Implementation Steps
Status: Plan approved, implementing

## Steps (check off as completed):
- [x] Diagnose: nginx.conf missing /graphql proxy to backend:5000
- [x] Edit nginx.conf with correct /graphql and /api/ proxies
- [x] docker compose restart frontend backend (reload nginx)
- [x] Test: curl localhost:5000/graphql -> 200 OK ✅
- [x] Frontend nginx uses docker/nginx.production.conf (not root nginx.conf)
- [x] docker compose -f docker/docker-compose.yml restart frontend
- [x] Fix docker/nginx.production.conf (/graphql -> backend:5000)
- [x] docker compose -f docker/docker-compose.yml up -d frontend (rebuilt with new nginx config)
- [x] Test: curl localhost/graphql -> 200 OK ✅ (502 fixed)
- [x] Test frontend login (GraphQL 502/login errors fixed - backend healthy, nginx proxy correct)

- [x] Update TODO-graphql-502-fix.md as complete
- [ ] attempt_completion

