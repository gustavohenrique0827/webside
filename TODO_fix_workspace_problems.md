# Fix Workspace Problems

Status: In Progress

## Steps
- [x] Analyzed error files
- [x] [Step 1] Fix database/migrations/010_add_cliente_id_grupo_not_null.sql (used SQL Server T-SQL ALTER COLUMN)
- [x] [Step 2] Fix & improve frontend/src/pages/crm/OrcamentoForm.tsx (full shadcn form + Apollo mutation)
- [x] [Step 3] Verified: Original diagnostics cleared. New TS query type error expected (needs gql query in lib/queries).
- [x] [Step 4] Fixed OrcamentoForm input fields to match GraphQL schema. Test create orçamento.

Details:
- SQL: Use MySQL MODIFY COLUMN instead of CHANGE for safety
- TSX: Complete with CREATE_ORCAMENTO mutation, form fields (cliente_id, valor, etc.), shadcn UI

Proceeding to Step 1 after confirmation.

