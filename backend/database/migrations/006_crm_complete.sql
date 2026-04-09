-- Migration: 006_crm_complete
-- Description: Completa CRM per spec: grupos econômicos, RBAC detalhado, comissões, SM histórico, lead logs, modelos contrato
-- Leads/clientes separate (Option B - existing & scalable)

-- 1. Tabelas faltantes (espec)

-- Grupo Econômico
CREATE TABLE IF NOT EXISTS grupo_economico (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    nome_grupo VARCHAR(200) NOT NULL,
    descricao TEXT,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    id_endereco INT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_endereco) REFERENCES enderecos(id_endereco)
);

-- Relacionamento cliente-grupo
CREATE TABLE IF NOT EXISTS cliente_grupo_economico (
    id_cliente INT NOT NULL,
    id_grupo INT NOT NULL,
    data_vinculo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_cliente, id_grupo),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_grupo) REFERENCES grupo_economico(id_grupo) ON DELETE CASCADE
);

-- Grupos de Produto
CREATE TABLE IF NOT EXISTS grupo_produto (
    id_grupo_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Adicionar FK grupo ao produto (existing table)
ALTER TABLE produtos ADD COLUMN id_grupo_produto INT NULL AFTER categoria;
ALTER TABLE produtos ADD FOREIGN KEY (id_grupo_produto) REFERENCES grupo_produto(id_grupo_produto);

-- Funções do Sistema (RBAC granular)
CREATE TABLE IF NOT EXISTS funcao_sistema (
    id_funcao INT AUTO_INCREMENT PRIMARY KEY,
    modulo ENUM('Cadastro','Comercial','Operacional','Financeiro','Relatorios','Configuracoes') NOT NULL,
    nome_funcao VARCHAR(100) NOT NULL,
    chave VARCHAR(50) NOT NULL UNIQUE COMMENT 'ex: CAD_CLIENTE_INCLUIR',
    tipo ENUM('botao','menu','relatorio') NOT NULL,
    descricao TEXT,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- Permissões por perfil/função
CREATE TABLE IF NOT EXISTS perfil_permissao (
    id_perfil INT NOT NULL,
    id_funcao INT NOT NULL,
    pode_visualizar TINYINT(1) NOT NULL DEFAULT 0,
    pode_incluir TINYINT(1) NOT NULL DEFAULT 0,
    pode_alterar TINYINT(1) NOT NULL DEFAULT 0,
    pode_excluir TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id_perfil, id_funcao),
    FOREIGN KEY (id_perfil) REFERENCES permissoes(id_permissao),
    FOREIGN KEY (id_funcao) REFERENCES funcao_sistema(id_funcao)
);

-- Suporte Endereço para Grupo
ALTER TABLE enderecos ADD COLUMN tipo_entidade ENUM('empresa','cliente','colaborador','grupo_economico') NOT NULL DEFAULT 'empresa' AFTER tipo_entidade;
-- Update existing (handle via app logic)

-- Comissões
CREATE TABLE IF NOT EXISTS comissao (
    id_comissao INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_colaborador INT NOT NULL,
    nome_beneficiario VARCHAR(200) NOT NULL COMMENT 'snapshot',
    valor_comissao DECIMAL(10,2) NOT NULL,
    percentual_sobre_pedido DECIMAL(5,2) NOT NULL,
    chave_pix VARCHAR(100),
    data_calculo DATE NOT NULL,
    id_status INT NOT NULL,
    data_pagamento DATE NULL,
    observacoes TEXT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_colaborador) REFERENCES colaboradores(id_colaborador),
    FOREIGN KEY (id_status) REFERENCES status(id_status)
);

-- Histórico SM por Filial
CREATE TABLE IF NOT EXISTS filial_sm_historico (
    id_sm INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    vigencia_inicio DATE NOT NULL,
    vigencia_fim DATE NULL,
    valor_sm DECIMAL(10,2) NOT NULL,
    data_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_filial_periodo (id_empresa, vigencia_inicio),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

-- Logs Consulta Endereço Lead
CREATE TABLE IF NOT EXISTS lead_log_consulta_endereco (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_lead INT NOT NULL,
    api_usada VARCHAR(50) NOT NULL,
    status_resposta VARCHAR(20) NOT NULL,
    mensagem_erro TEXT,
    data_tentativa TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_lead) REFERENCES leads(id_lead)
);

-- Modelo Contrato (subset templates)
CREATE TABLE IF NOT EXISTS modelo_contrato (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    nome_modelo VARCHAR(100) NOT NULL,
    conteudo_html LONGTEXT NOT NULL COMMENT 'tags: {{cliente_nome}}, {{produtos}} etc.',
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- SM % nos itens orçamento/pedido
ALTER TABLE orcamentos_itens ADD COLUMN sm_percentual DECIMAL(6,2) NULL COMMENT '(valor_total / filial_sm) * 100';
ALTER TABLE pedidos_itens ADD COLUMN sm_percentual DECIMAL(6,2) NULL COMMENT '(valor_total / filial_sm) * 100';

-- 2. Indexes performance
CREATE INDEX idx_grupo_cliente ON cliente_grupo_economico(id_cliente);
CREATE INDEX idx_perfil_funcao ON perfil_permissao(id_perfil);
CREATE INDEX idx_comissao_status ON comissao(id_status, data_pagamento);
CREATE INDEX idx_sm_historico_empresa ON filial_sm_historico(id_empresa, vigencia_inicio);
CREATE INDEX idx_lead_log_lead ON lead_log_consulta_endereco(id_lead);

-- 3. Seeds (per spec)

-- Departamentos padrão
INSERT IGNORE INTO departamentos (id_empresa, nome, descricao, codigo) VALUES
(1, 'Comercial', 'Departamento Comercial', 'COM'),
(1, 'Suporte', 'Suporte ao Cliente', 'SUP'),
(1, 'Implantação', 'Implantação de Sistemas', 'IMP'),
(1, 'Financeiro', 'Gestão Financeira', 'FIN'),
(1, 'Sucesso do Cliente', 'Sucesso do Cliente', 'CSC');

-- Perfis de acesso expandidos
INSERT IGNORE INTO permissoes (nome_perfil, nivel_acesso) VALUES
('Administrador', 10),
('Gerente Comercial', 8),
('Vendedor', 5),
('Analista Operacional', 4),
('Consulta', 1);

-- Funções sistema (~exemplos, full 50+ in prod)
INSERT IGNORE INTO funcao_sistema (modulo, nome_funcao, chave, tipo) VALUES
('Cadastro', 'Incluir Cliente', 'CAD_CLIENTE_INCLUIR', 'botao'),
('Comercial', 'Converter Lead', 'COM_LEAD_CONVERTER', 'botao'),
('Operacional', 'Iniciar Implantação', 'OP_IMPLANTACAO_INICIAR', 'botao'),
('Financeiro', 'Emitir Fatura', 'FIN_FATURA_EMITIR', 'botao'),
('Relatorios', 'Relatório Vendas', 'REL_VENDAS_VISUALIZAR', 'menu');

-- Permissões default Admin full
INSERT IGNORE INTO perfil_permissao (id_perfil, id_funcao, pode_visualizar, pode_incluir, pode_alterar, pode_excluir)
SELECT 1, id_funcao, 1,1,1,1 FROM funcao_sistema;  -- Admin full access

-- SM Histórico exemplo (filial 1)
INSERT IGNORE INTO filial_sm_historico (id_empresa, vigencia_inicio, vigencia_fim, valor_sm) VALUES
(1, '2024-01-01', '2024-12-31', 1412.00),
(1, '2025-01-01', NULL, 1450.00);

-- Grupos produtos
INSERT IGNORE INTO grupo_produto (nome, descricao) VALUES
('Softwares', 'Sistemas Web/Cloud'),
('Serviços', 'Implantação/Suporte');

-- Modelo Contrato exemplo
INSERT INTO modelo_contrato (nome_modelo, conteudo_html) VALUES
('Padrão SaaS', '<h1>Contrato {{cliente_nome}} - {{numero_contrato}}</h1><p>Produtos: {{produtos_list}}</p><p>Valor: R$ {{valor_total}}</p>');

-- Status adicionais se faltando (leads/orcamento etc. already seeded)

-- Registrar
INSERT INTO migrations (nome_migration) VALUES ('006_crm_complete');

