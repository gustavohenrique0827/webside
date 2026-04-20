ab# CRM Make Work - Step-by-Step TODO

Status: DB verification pending

## Steps
- [x] 1. Check backend/GraphQL status: tables=0, clientes=0, orcamentos=0 (DB empty/needs schema)
- [ ] 2. Apply full schema: Import database/crm_cpm_mensageria_schema_complete.sql to MySQL (phpMyAdmin)
- [x] 3. Run seeds: database/seeds/005_login_demo_user.sql + 005_complete_data
- [x] 4. Update backend/src/graphql/schema.graphql with full types
- [x] 5. Update backend/src/graphql/resolversNew.js with full CRUD (mocks)
- [x] 6. Restart backend && test GraphQL playground (mocks work, tables=0)
- [x] 7. Update frontend CRM pages (Orcamentos.tsx connected to GraphQL)
- [ ] 8. Production deploy (PM2/Nginx)
- [ ] 9. Final test & attempt_completion

Run first check command to see current tables.
