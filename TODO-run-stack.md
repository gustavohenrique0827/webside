# Run Frontend + Backend Fix Plan
Status: In Progress

## Steps:
- [x] Diagnosis: GraphQL schema duplicates (index.js merge)
- [x] Edit backend/src/index.js (use resolversNew.js only)
- [x] Edit backend/src/graphql/schema.graphql (remove duplicate fields)
- [x] docker compose -f docker/docker-compose.dev.yml down && up -d --build (rebuild)
- [x] Verify logs + health

- [ ] Test GraphQL + frontend
- [ ] attempt_completion

Current: Editing index.js

