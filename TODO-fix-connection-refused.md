# Fix Connection Refused (ERR_CONNECTION_REFUSED)

Status: Approved - fixing nginx SSL crash.

## Steps
- [x] Diagnosed: nginx restart loop due to missing SSL certs
- [x] Created HTTP-only nginx.conf
- [ ] docker compose -f docker-compose.prod.yml down & up -d 
- [ ] Verify ports/docker ps
- [ ] Test site
- [ ] Optional: Add SSL certs later


