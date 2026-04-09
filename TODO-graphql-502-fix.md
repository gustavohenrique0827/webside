# GraphQL 502 Bad Gateway / Login Fix
Status: Port alignment

Steps (check off):
- [x] Confirmed port mismatch (backend 3002 vs proxy 5000)
- [x] Edit docker-compose.yml (PORT=5000, ports:5000)
- [x] docker compose down & up -d backend
- [x] docker logs backend (confirm PORT=5000 startup, schema syntax errors fixed)
- [ ] docker compose restart backend
- [ ] curl test localhost:5000/graphql
- [ ] Login test
- [ ] Login test
- [ ] Complete
