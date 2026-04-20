# CRM/CPM Priority Fixes - Implementation TODO

Status: In Progress

## Breakdown Steps from Approved Plan

### Phase 1: DB & Schema (Critical)
- [ ] Step 1.1: Create new migration for cliente.id_grupo NOT NULL
- [ ] Step 1.2: Update backend/prisma/schema.prisma with Cliente model incl. id_grupo relation
- [ ] Step 1.3: Update backend/src/graphql/schema.graphql with Grupo model/type

### Phase 2: Backend GraphQL
- [ ] Step 2.1: Edit resolversNew.js - Add id_grupo, id_filial to createCliente; validate required
- [ ] Step 2.2: Add createOrcamento resolver with id_filial, id_colaborador required/validate
- [ ] Step 2.3: Update orcamentos query to filter by auth user filial/colaborador

### Phase 3: Frontend Forms & Mutations
- [x] Step 3.1: Edit Clientes.tsx - Add Dialog form for Novo Cliente w/ Grupo Econômico select (required)
- [ ] Step 3.2: Edit Orcamentos.tsx - Add Dialog form w/ filial/colaborador selects (required)
- [ ] Step 3.3: Update queries.ts with updated mutation vars

### Phase 4: Test & Followup
- [ ] Run prisma migrate && prisma generate
- [ ] npm run build (backend/frontend)
- [ ] Test create Cliente (requires grupo, no error), Orcamentos (no 400)
- [ ] Restart servers if needed

Completed: None yet
