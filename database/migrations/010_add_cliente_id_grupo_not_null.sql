-- Migration 010: Make cliente.id_grupo NOT NULL (CRM Business Rule)
-- WARNING: Ensure ALL existing cliente records have id_grupo populated first!

-- Step 1: Update NULLs to default if needed (adjust default_grupo_id as needed)
UPDATE cliente SET id_grupo = 1 WHERE id_grupo IS NULL;

-- Step 2: Alter column to NOT NULL (SQL Server T-SQL)
ALTER TABLE cliente ALTER COLUMN id_grupo BIGINT NOT NULL;

-- Step 3: Add index for performance
CREATE INDEX idx_cliente_id_grupo ON cliente(id_grupo);

-- Verify no NULLs remain
SELECT COUNT(*) AS null_count FROM cliente WHERE id_grupo IS NULL;
-- Expected: 0
