-- Migration 009: websid23_erp Full Schema Verification
-- Execute in phpMyAdmin after importing crm_cpm_mensageria_schema_complete.sql

USE websid23_erp;

SELECT 'TABLE_COUNT' as check_type, COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'websid23_erp'
UNION ALL
SELECT 'filial', COUNT(*) FROM filial
UNION ALL
SELECT 'cliente', COUNT(*) FROM cliente
UNION ALL
SELECT 'orcamento', COUNT(*) FROM orcamento
UNION ALL
SELECT 'contrato', COUNT(*) FROM contrato;

-- Expected: 35+ tables after full schema
