SET FOREIGN_KEY_CHECKS = 0;

-- DROP ALL OLD TABLES
DROP TABLE IF EXISTS reajustes;
DROP TABLE IF EXISTS transacoes;
DROP TABLE IF EXISTS comprovacoes;
DROP TABLE IF EXISTS faturas;
DROP TABLE IF EXISTS implantacoes;
DROP TABLE IF EXISTS contratos_aditivos;
DROP TABLE IF EXISTS contratos;
DROP TABLE IF EXISTS pedidos_itens;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS orcamentos_itens;
DROP TABLE IF EXISTS orcamentos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS contatos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS enderecos;
DROP TABLE IF EXISTS templates;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS colaboradores_departamentos;
DROP TABLE IF EXISTS departamentos;
DROP TABLE IF EXISTS colaboradores;
DROP TABLE IF EXISTS permissoes;
DROP TABLE IF EXISTS parametros_empresa;
DROP TABLE IF EXISTS empresas;
DROP TABLE IF EXISTS migrations;

-- COMPLETE NEW SCHEMA FROM SPEC
-- 1. ESTRUTURA ORGANIZACIONAL E ACESSOS
CREATE TABLE endereco (
    id_endereco BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Filial', 'Lead', 'Cliente', 'Colaborador', 'GrupoEconomico') NOT NULL,
    id_referencia BIGINT,
    cep VARCHAR(10),
    tipo_logradouro VARCHAR(50),
    logradouro VARCHAR(255),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    pais VARCHAR(50) DEFAULT 'Brasil',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE filial (
    id_filial BIGINT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    razao VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    whatsapp VARCHAR(20),
    email VARCHAR(255),
    base_sm DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_endereco BIGINT,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
);

CREATE TABLE filial_sm_historico (
    id_sm BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_filial BIGINT NOT NULL,
    vigencia_inicio DATE NOT NULL,
    vigencia_fim DATE,
    valor_sm DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial)
);

CREATE TABLE perfil_acesso (
    id_perfil BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_perfil VARCHAR(100) NOT NULL,
    nivel_acesso INT NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE funcao_sistema (
    id_funcao BIGINT AUTO_INCREMENT PRIMARY KEY,
    modulo VARCHAR(100) NOT NULL,
    nome_funcao VARCHAR(100) NOT NULL,
    chave VARCHAR(100) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL,
    descricao TEXT
);

CREATE TABLE perfil_permissao (
    id_perfil BIGINT NOT NULL,
    id_funcao BIGINT NOT NULL,
    pode_visualizar BOOLEAN DEFAULT FALSE,
    pode_incluir BOOLEAN DEFAULT FALSE,
    pode_alterar BOOLEAN DEFAULT FALSE,
    pode_excluir BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id_perfil, id_funcao),
    FOREIGN KEY (id_perfil) REFERENCES perfil_acesso(id_perfil),
    FOREIGN KEY (id_funcao) REFERENCES funcao_sistema(id_funcao)
);

CREATE TABLE departamento (
    id_departamento BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_filial BIGINT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    id_responsavel BIGINT,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial)
);

CREATE TABLE colaborador (
    id_colaborador BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_filial BIGINT NOT NULL,
    id_departamento BIGINT NOT NULL,
    id_perfil BIGINT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255),
    nivel_acesso INT,
    tipo_colaborador ENUM('Funcionario', 'Comissionado') NOT NULL,
    cargo VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultimo_login DATETIME,
    id_endereco BIGINT,
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (id_departamento) REFERENCES departamento(id_departamento),
    FOREIGN KEY (id_perfil) REFERENCES perfil_acesso(id_perfil),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
);

-- Fix FK after colaborador created
ALTER TABLE departamento ADD CONSTRAINT fk_dep_responsavel FOREIGN KEY (id_responsavel) REFERENCES colaborador(id_colaborador);

-- 2. CATÁLOGO DE STATUS CENTRALIZADO
CREATE TABLE status (
    id_status BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_status VARCHAR(100) NOT NULL,
    tipo_entidade VARCHAR(50) NOT NULL,
    descricao TEXT,
    ordem_exibicao INT DEFAULT 0,
    cor VARCHAR(7),
    ativo BOOLEAN DEFAULT TRUE
);

-- 3. GRUPO ECONÔMICO, LEADS E CLIENTES
CREATE TABLE grupo_economico (
    id_grupo BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_grupo VARCHAR(255) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    id_endereco BIGINT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
);

CREATE TABLE lead (
    id_lead BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_colaborador BIGINT,
    id_filial BIGINT NOT NULL,
    nome_empresa_lead VARCHAR(255) NOT NULL,
    nome_cliente_lead VARCHAR(255),
    cnpj_lead VARCHAR(20),
    email_lead VARCHAR(255),
    telefone_lead VARCHAR(20),
    origem VARCHAR(100),
    regiao VARCHAR(50),
    status_id BIGINT NOT NULL,
    motivo_perda TEXT,
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conversao DATETIME,
    bandeira_dist VARCHAR(100),
    modalidade_negocio VARCHAR(100),
    id_endereco BIGINT,
    flag_classificado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (status_id) REFERENCES status(id_status),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
);

CREATE TABLE lead_log_consulta_endereco (
    id_log BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_lead BIGINT NOT NULL,
    api_usada VARCHAR(100),
    status_resposta VARCHAR(50),
    mensagem_erro TEXT,
    data_tentativa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_lead) REFERENCES lead(id_lead)
);

CREATE TABLE cliente (
    id_cliente BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_filial BIGINT NOT NULL,
    id_colaborador BIGINT,
    id_grupo BIGINT,
    nome_empresa VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    ie VARCHAR(50),
    contato_gestor VARCHAR(100),
    contato_testemunha VARCHAR(100),
    contato_financeiro VARCHAR(100),
    email_gestor VARCHAR(255),
    email_testemunha VARCHAR(255),
    email_financeiro VARCHAR(255),
    telefone_gestor VARCHAR(20),
    telefone_testemunha VARCHAR(20),
    telefone_financeiro VARCHAR(20),
    regiao VARCHAR(50),
    status_id BIGINT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_status DATETIME,
    id_endereco BIGINT,
    id_lead_origem BIGINT,
    outras_informacoes TEXT,
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (id_grupo) REFERENCES grupo_economico(id_grupo),
    FOREIGN KEY (status_id) REFERENCES status(id_status),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco),
    FOREIGN KEY (id_lead_origem) REFERENCES lead(id_lead)
);

CREATE TABLE cliente_grupo_economico (
    id_cliente BIGINT NOT NULL,
    id_grupo BIGINT NOT NULL,
    PRIMARY KEY (id_cliente, id_grupo),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_grupo) REFERENCES grupo_economico(id_grupo)
);

-- 4. PRODUTOS E GRUPO DE PRODUTOS
CREATE TABLE grupo_produto (
    id_grupo_produto BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE produto (
    id_produto BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_grupo_produto BIGINT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL,
    valor_base DECIMAL(10,2) NOT NULL,
    unidade VARCHAR(50) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_grupo_produto) REFERENCES grupo_produto(id_grupo_produto)
);

-- 5. ORÇAMENTOS E PEDIDOS
CREATE TABLE orcamento (
    id_orcamento BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_lead BIGINT,
    id_cliente BIGINT,
    id_colaborador BIGINT NOT NULL,
    id_filial BIGINT NOT NULL,
    numero_orcamento VARCHAR(50) NOT NULL UNIQUE,
    status_id BIGINT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_validade DATETIME,
    observacoes TEXT,
    flag_convertido_pedido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_lead) REFERENCES lead(id_lead),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

CREATE TABLE orcamento_item (
    id_orcamento_item BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_orcamento BIGINT NOT NULL,
    id_produto BIGINT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    desconto_percentual DECIMAL(5,2) DEFAULT 0,
    desconto_valor DECIMAL(10,2) DEFAULT 0,
    sm_percentual DECIMAL(5,2) DEFAULT 0,
    valor_final DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_orcamento) REFERENCES orcamento(id_orcamento),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

CREATE TABLE pedido (
    id_pedido BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_pedido VARCHAR(50) NOT NULL UNIQUE,
    id_cliente BIGINT NOT NULL,
    id_colaborador BIGINT NOT NULL,
    id_filial BIGINT NOT NULL,
    id_orcamento BIGINT,
    data_pedido DATETIME NOT NULL,
    status_id BIGINT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    data_prevista_entrega DATETIME,
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (id_orcamento) REFERENCES orcamento(id_orcamento),
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

CREATE TABLE pedido_item (
    id_item BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    id_produto BIGINT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    desconto DECIMAL(10,2) DEFAULT 0,
    valor_total DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

-- 6. CONTRATOS, ADITIVOS E FATURAMENTO
CREATE TABLE modelo_contrato (
    id_modelo BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_modelo VARCHAR(255) NOT NULL,
    conteudo_html TEXT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE contrato (
    id_contrato BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_contrato VARCHAR(50) NOT NULL UNIQUE,
    id_pedido BIGINT NOT NULL,
    id_cliente BIGINT NOT NULL,
    data_assinatura DATETIME,
    data_inicio_vigencia DATETIME NOT NULL,
    data_fim_vigencia DATETIME,
    status_id BIGINT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    arquivo_url VARCHAR(500),
    renovacao_automatica BOOLEAN DEFAULT FALSE,
    observacoes TEXT,
    modelo_contrato_id BIGINT,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (status_id) REFERENCES status(id_status),
    FOREIGN KEY (modelo_contrato_id) REFERENCES modelo_contrato(id_modelo)
);

CREATE TABLE aditivo_contrato (
    id_aditivo BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_contrato BIGINT NOT NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_solicitacao DATETIME NOT NULL,
    data_aprovacao DATETIME,
    status_id BIGINT NOT NULL,
    arquivo_url VARCHAR(500),
    FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato),
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

CREATE TABLE cliente_produto_contratado (
    id_cliente_prod BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_cliente BIGINT NOT NULL,
    id_contrato BIGINT NOT NULL,
    id_aditivo BIGINT,
    id_produto BIGINT NOT NULL,
    descricao_produto VARCHAR(255),
    valor_cobrado DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato),
    FOREIGN KEY (id_aditivo) REFERENCES aditivo_contrato(id_aditivo),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

CREATE TABLE fatura (
    id_fatura BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_contrato BIGINT NOT NULL,
    id_cliente BIGINT NOT NULL,
    numero_fatura VARCHAR(50) NOT NULL UNIQUE,
    data_emissao DATETIME NOT NULL,
    data_vencimento DATETIME NOT NULL,
    valor_original DECIMAL(10,2) NOT NULL,
    valor_atual DECIMAL(10,2) NOT NULL,
    status_id BIGINT NOT NULL,
    data_pagamento DATETIME,
    observacoes TEXT,
    FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

-- 7. IMPLANTAÇÃO E COMPROVAÇÕES
CREATE TABLE implantacao (
    id_implantacao BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_contrato BIGINT NOT NULL,
    id_colaborador BIGINT NOT NULL,
    data_inicio DATETIME,
    data_fim DATETIME,
    status_id BIGINT NOT NULL,
    percentual_conclusao DECIMAL(5,2) DEFAULT 0,
    observacoes TEXT,
    FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato),
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

CREATE TABLE implantacao_comprovacao (
    id_comprovacao BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_implantacao BIGINT NOT NULL,
    tipo_comprovacao VARCHAR(50) NOT NULL,
    arquivo VARCHAR(500) NOT NULL,
    observacoes TEXT,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_implantacao) REFERENCES implantacao(id_implantacao)
);

-- 8. COMISSÕES
CREATE TABLE comissao (
    id_comissao BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    id_colaborador BIGINT NOT NULL,
    nome_beneficiario VARCHAR(255) NOT NULL,
    valor_comissao DECIMAL(10,2) NOT NULL,
    percentual_sobre_pedido DECIMAL(5,2) NOT NULL,
    chave_pix VARCHAR(255),
    data_calculo DATETIME NOT NULL,
    status_pagamento ENUM('Pendente', 'Pago', 'Cancelado') DEFAULT 'Pendente',
    data_pagamento DATETIME,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador)
);

-- 9. MÓDULO DE AUTOMAÇÃO E WORKFLOW
CREATE TABLE automacao_regra (
    id_regra BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    evento VARCHAR(100) NOT NULL,
    condicoes_json TEXT,
    acoes_json TEXT,
    status_id BIGINT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

CREATE TABLE tarefa (
    id_tarefa BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    id_responsavel BIGINT,
    id_departamento BIGINT,
    prioridade ENUM('baixa', 'media', 'alta') DEFAULT 'media',
    data_inicio DATETIME,
    data_prevista DATETIME,
    data_conclusao DATETIME,
    status_id BIGINT NOT NULL,
    entidade_tipo VARCHAR(50),
    entidade_id BIGINT,
    FOREIGN KEY (id_responsavel) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (id_departamento) REFERENCES departamento(id_departamento),
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

-- 10. MÓDULO DE MENSAGERIA AGENDADA (FULL)
CREATE TABLE mensagem_categoria (
    id_categoria BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE mensagem_campanha (
    id_campanha BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_campanha VARCHAR(255) NOT NULL,
    descricao TEXT,
    canal ENUM('email', 'whatsapp', 'notificacao_interna') NOT NULL,
    id_categoria BIGINT NOT NULL,
    tipo_envio ENUM('imediato', 'agendado', 'recorrente') NOT NULL,
    data_agendada DATETIME,
    recorrencia_regra TEXT,
    data_inicio DATETIME,
    data_fim DATETIME,
    timezone VARCHAR(64) DEFAULT 'America/Sao_Paulo',
    assunto VARCHAR(255),
    corpo_html TEXT,
    corpo_texto TEXT,
    template_whatsapp_id VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE,
    criado_por BIGINT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_execucao DATETIME,
    FOREIGN KEY (id_categoria) REFERENCES mensagem_categoria(id_categoria),
    FOREIGN KEY (criado_por) REFERENCES colaborador(id_colaborador)
);

CREATE TABLE mensagem_campanha_destinatario_tipo (
    id_campanha BIGINT NOT NULL,
    entidade ENUM('colaborador', 'cliente', 'lead', 'grupo_economico') NOT NULL,
    PRIMARY KEY (id_campanha, entidade),
    FOREIGN KEY (id_campanha) REFERENCES mensagem_campanha(id_campanha)
);

CREATE TABLE mensagem_campanha_filtro (
    id_filtro BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_campanha BIGINT NOT NULL,
    entidade ENUM('colaborador', 'cliente', 'lead', 'grupo_economico') NOT NULL,
    campo VARCHAR(100) NOT NULL,
    operador ENUM('=', '!=', '>', '>=', '<', '<=', 'LIKE', 'IN', 'BETWEEN') NOT NULL,
    valor TEXT NOT NULL,
    valor_extra TEXT,
    condicao_logica ENUM('AND', 'OR') DEFAULT 'AND',
    FOREIGN KEY (id_campanha) REFERENCES mensagem_campanha(id_campanha)
);

CREATE TABLE mensagem_envio (
    id_envio BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_campanha BIGINT NOT NULL,
    data_disparo_prevista DATETIME NOT NULL,
    data_disparo_inicio DATETIME,
    data_disparo_fim DATETIME,
    status ENUM('pendente', 'em_execucao', 'concluido', 'cancelado', 'erro') DEFAULT 'pendente',
    total_destinatarios_previsto INT DEFAULT 0,
    total_sucesso INT DEFAULT 0,
    total_erro INT DEFAULT 0,
    mensagem_erro_geral TEXT,
    FOREIGN KEY (id_campanha) REFERENCES mensagem_campanha(id_campanha)
);

CREATE TABLE mensagem_envio_destinatario (
    id_envio_dest BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_envio BIGINT NOT NULL,
    entidade ENUM('colaborador', 'cliente', 'lead', 'grupo_economico') NOT NULL,
    id_entidade BIGINT NOT NULL,
    email_destino VARCHAR(255),
    telefone_destino VARCHAR(20),
    canal ENUM('email', 'whatsapp', 'notificacao_interna') NOT NULL,
    status ENUM('pendente', 'enfileirado', 'enviado', 'erro') DEFAULT 'pendente',
    data_envio DATETIME,
    codigo_retorno VARCHAR(100),
    mensagem_erro TEXT,
    FOREIGN KEY (id_envio) REFERENCES mensagem_envio(id_envio)
);

CREATE TABLE notificacao_interna (
    id_notificacao BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_colaborador BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    id_campanha BIGINT,
    id_envio_dest BIGINT,
    lida BOOLEAN DEFAULT FALSE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_leitura DATETIME,
    entidade_relacionada VARCHAR(50),
    id_entidade_relacionada BIGINT,
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (id_campanha) REFERENCES mensagem_campanha(id_campanha),
    FOREIGN KEY (id_envio_dest) REFERENCES mensagem_envio_destinatario(id_envio_dest)
);

CREATE TABLE mensagem_script_regra (
    id_script BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_script VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo_ativacao ENUM('scheduler', 'gatilho_banco') NOT NULL,
    intervalo_execucao VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE,
    entidade_alvo ENUM('lead', 'cliente', 'colaborador', 'fatura', 'contrato', 'generico') NOT NULL,
    definicao_condicao TEXT NOT NULL,
    id_campanha_padrao BIGINT,
    canal_padrao ENUM('email', 'whatsapp', 'notificacao_interna'),
    parametros TEXT,
    data_ultima_execucao DATETIME,
    data_proxima_execucao DATETIME,
    FOREIGN KEY (id_campanha_padrao) REFERENCES mensagem_campanha(id_campanha)
);

CREATE TABLE mensagem_script_log (
    id_script_log BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_script BIGINT NOT NULL,
    data_execucao_inicio DATETIME NOT NULL,
    data_execucao_fim DATETIME,
    status ENUM('sucesso', 'erro_parcial', 'erro') NOT NULL,
    total_registros_afetados INT DEFAULT 0,
    mensagem_erro TEXT,
    FOREIGN KEY (id_script) REFERENCES mensagem_script_regra(id_script)
);

SET FOREIGN_KEY_CHECKS = 1;

-- Create migrations table if not exists
CREATE TABLE IF NOT EXISTS migrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO migrations (name) VALUES ('009_crm_cpm_mensageria_final');

-- Indexes for performance
CREATE INDEX idx_colaborador_filial ON colaborador(id_filial);
CREATE INDEX idx_lead_filial_status ON lead(id_filial, status_id);
CREATE INDEX idx_cliente_filial_status ON cliente(id_filial, status_id);
CREATE INDEX idx_orcamento_colaborador ON orcamento(id_colaborador);
-- Add more as needed

