.PHONY: dev-up dev-down prod-up prod-down logs clean build

# Development
dev-up:
	docker compose -f docker/docker-compose.dev.yml up -d

dev-down:
	docker compose -f docker/docker-compose.dev.yml down

dev-logs:
	docker compose -f docker/docker-compose.dev.yml logs -f

# Production
prod-up:
	docker compose -f docker/docker-compose.prod.yml up -d --build

prod-down:
	docker compose -f docker/docker-compose.prod.yml down

prod-logs:
	docker compose -f docker/docker-compose.prod.yml logs -f

# Utils
build:
	docker compose -f docker/docker-compose.dev.yml build

clean:
	docker compose -f docker/docker-compose.dev.yml down -v
	docker compose -f docker/docker-compose.prod.yml down -v
	docker system prune -f

db-migrate:
	docker exec -it $$(docker ps -qf "name=^docker-compose-dev-db-1$$") psql -U postgres -d meuapp -f /docker-entrypoint-initdb.d/*.sql
