-- Demo data for Tarefas e Pipeline
-- Run after schema: mysql webside_crm < database/seeds/006_demo_tarefas.sql

INSERT INTO status (nome_status, tipo_entidade, cor_hex, ordem_exibicao) VALUES
('Pendente', 'tarefa', '#F59E0B', 1),
('Em Andamento', 'tarefa', '#3B82F6', 2),
('Concluída', 'tarefa', '#10B981', 3),
('Prospecção', 'orcamento', '#FCD34D', 1),
('Proposta', 'orcamento', '#3B82F6', 2),
('Negociação', 'orcamento', '#F59E0B', 3),
('Fechado', 'orcamento', '#10B981', 4);

INSERT INTO colaborador (id_filial, id_perfil, nome, email, senha_hash, ativo) VALUES
(1, 1, 'Admin Demo', 'admin@demo.com', '$2a$10$demo', 1),
(1, 2, 'Vendedor João', 'vendedor@demo.com', '$2a$10$demo', 1);

INSERT INTO tarefa (titulo, descricao, status, responsavel_id, prazo, data_criacao, prioridade, id_orcamento) VALUES
('Follow-up Lead ABC', 'Ligar para lead qualificado', 1, 2, '2024-12-15', NOW(), 'Alta', NULL),
('Reunião proposta XYZ', 'Preparar apresentação', 2, 1, '2024-12-12', NOW(), 'Média', 1),
('Aprovar contrato 123', 'Revisar documentos', 3, 1, '2024-12-10', NOW(), 'Baixa', 2);

-- Demo orcamentos for pipeline
INSERT INTO orcamento (cliente_id, valor_total, status, data_criacao) VALUES
(1, 5000.00, 1, NOW()),
(1, 25000.00, 2, NOW()),
(2, 10000.00, 3, NOW());

