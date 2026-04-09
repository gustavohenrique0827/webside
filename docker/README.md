# Docker Setup - Clean & Fixed

## Development
```bash
cd /var/www/meuapp/webside
make dev-up
```
- Access: http://localhost (nginx proxies frontend dev + backend API)
- Frontend dev: http://localhost:5173
- Backend: http://localhost:3001
- DB: localhost:5432 (postgres/password@meuapp)

## Production
```bash
make prod-up
```
- Nginx serves built frontend + proxies API

## Commands
- `make dev-down`, `make prod-down`
- `make dev-logs`, `make prod-logs`
- `make clean` - remove volumes

## Notes
- DB auto-migrates with ./database/migrations/*.sql
- Dev: Frontend hot reload volumes, backend src volume
- Prod: Multi-stage builds optimized
- Ports: Avoid conflicts (backend 3001 external)
