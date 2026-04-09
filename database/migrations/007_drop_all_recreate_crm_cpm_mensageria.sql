-- Migration: 007_drop_all_recreate_crm_cpm_mensageria.sql
-- DROPS ALL existing tables and recreates COMPLETE schema per spec
-- filiais (was empresas), full RBAC, CPM (tarefas, metas), FULL MENSAGERIA

-- 1. Backup migrations table (if exists)
CREATE TABLE IF NOT EXISTS migrations_backup AS SELECT * FROM migrations;
DROP TABLE IF EXISTS migrations;

-- 2. DROP ALL tables in reverse dependency order
DROP TABLE IF EXISTS mensagem_script_log;
DROP TABLE IF EXISTS mensagem_script_regra;
DROP TABLE IF EXISTS notificacao_interna;
DROP TABLE IF EXISTS mensagem_envio_destinatario;
DROP TABLE IF EXISTS mensagem_envio;
DROP TABLE IF EXISTS mensagem_campanha_filtro;
DROP TABLE IF EXISTS mensagem_campanha_destinatario_tipo;
DROP TABLE IF EXISTS mensagem_campanha;
DROP TABLE IF EXISTS mensagem_categoria;
DROP TABLE IF EXISTS tarefas;
DROP TABLE IF EXISTS metas_kpi;
DROP TABLE IF EXISTS automacao_regra;
DROP TABLE IF EXISTS cliente_grupo_economico;
DROP TABLE IF EXISTS lead_log_consulta_endereco;
DROP TABLE IF EXISTS filial_sm_historico;
DROP TABLE IF EXISTS comissao;
DROP TABLE IF EXISTS perfil_permissao;
DROP TABLE IF EXISTS funcao_sistema;
DROP TABLE IF EXISTS comprovacoes;
DROP TABLE IF EXISTS reajustes;
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
DROP TABLE IF EXISTS grupo_produto;
DROP TABLE IF EXISTS grupo_economico;
DROP TABLE IF EXISTS modelo_contrato;
DROP TABLE IF EXISTS transacoes;

-- 3. CREATE COMPLETE NEW SCHEMA

-- ========================================
-- 4.1 ESTRUTURA ORGANIZACIONAL
-- ========================================
CREATE TABLE filial (
    id_filial INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL,
    razao_social VARCHAR(200) NOT NULL,
    nome_fantasia VARCHAR(100),
    telefone VARCHAR(20),
    whatsapp VARCHAR(20),
    email VARCHAR(100),
    base_sm DECIMAL(10,2),
    ativo TINYINT(1) DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE departamento (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    id_filial INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    id_responsavel INT,
    ativo TINYINT(1) DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (id_responsavel) REFERENCES colaborador(id_colaborador)
) ENGINE=InnoDB;

CREATE TABLE perfil_acesso (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    nome_perfil VARCHAR(100) NOT NULL,
    nivel_acesso TINYINT CHECK (nivel_acesso BETWEEN 1 AND 10),
    descricao TEXT,
    ativo TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE funcao_sistema (
    id_funcao INT AUTO_INCREMENT PRIMARY KEY,
    modulo ENUM('Cadastro','Comercial','Operacional','Financeiro','Relatorios','Configuracoes','Indicadores','Automacoes','Mensageria') NOT NULL,
    nome_funcao VARCHAR(100) NOT NULL,
    chave VARCHAR(50) NOT NULL UNIQUE,
    tipo ENUM('botao','menu','relatorio','configuracao') NOT NULL,
    descricao TEXT,
    ativo TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE perfil_permissao (
    id_perfil INT,
    id_funcao INT,
    pode_visualizar TINYINT(1) DEFAULT 0,
    pode_incluir TINYINT(1) DEFAULT 0,
    pode_alterar TINYINT(1) DEFAULT 0,
    pode_excluir TINYINT(1) DEFAULT 0,
    PRIMARY KEY (id_perfil, id_funcao),
    FOREIGN KEY (id_perfil) REFERENCES perfil_acesso(id_perfil),
    FOREIGN KEY (id_funcao) REFERENCES funcao_sistema(id_funcao)
) ENGINE=InnoDB;

CREATE TABLE colaborador (
    id_colaborador INT AUTO_INCREMENT PRIMARY KEY,
    id_filial INT,
    id_departamento INT,
    id_perfil INT NOT NULL,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(100),
    senha_hash VARCHAR(255),
    nivel_acesso TINYINT,
    tipo_colaborador ENUM('Funcionario','Comissionado'),
    cargo VARCHAR(100),
    ativo TINYINT(1) DEFAULT 1,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultimo_login TIMESTAMP NULL,
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
    FOREIGN KEY (id_departamento) REFERENCES departamento(id_departamento),
    FOREIGN KEY (id_perfil) REFERENCES perfil_acesso(id_perfil)
) ENGINE=InnoDB;

-- ========================================
-- 4.2 ENDEREÇO CENTRAL
-- ========================================
CREATE TABLE endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Filial','Lead','Cliente','Colaborador','GrupoEconomico') NOT NULL,
    id_referencia BIGINT NOT NULL,
    cep VARCHAR(9),
    tipo_logradouro VARCHAR(50),
    logradouro VARCHAR(200),
    numero VARCHAR(10),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado CHAR(2),
    pais VARCHAR(50) DEFAULT 'Brasil',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_tipo_ref (tipo, id_referencia)
) ENGINE=InnoDB;

-- ========================================
-- 4.3 GRUPO ECONÔMICO
-- ========================================
CREATE TABLE grupo_economico (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    nome_grupo VARCHAR(200) NOT NULL,
    descricao TEXT,
    ativo TINYINT(1) DEFAULT 1,
    id_endereco INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
) ENGINE=InnoDB;

CREATE TABLE cliente_grupo_economico (
    id_cliente INT,
    id_grupo INT,
    PRIMARY KEY (id_cliente, id_grupo),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_grupo) REFERENCES grupo_economico(id_grupo)
) ENGINE=InnoDB;

-- ========================================
-- 4.4 STATUS CENTRALIZADO
-- ========================================
CREATE TABLE status (
    id_status INT AUTO_INCREMENT PRIMARY KEY,
    nome_status VARCHAR(50) NOT NULL,
    tipo_entidade ENUM('cliente','pedido','contrato','implantacao','fatura','lead','colaborador','aditivo','orcamento','tarefa','automacao_regra','mensagem_envio') NOT NULL,
    descricao TEXT,
    ordem_exibicao TINYINT,
    cor VARCHAR(7),
    ativo TINYINT(1) DEFAULT 1,
UNIQUE KEY unique_tipo_nome (tipo_entidade, nome_status)
) ENGINE=InnoDB;

-- ========================================
-- 4.5 LEADS E CLIENTES
-- ========================================
CREATE TABLE lead (
    id_lead INT AUTO_INCREMENT PRIMARY KEY,
    id_colaborador INT NOT NULL,
    id_filial INT NOT NULL,
    nome_empresa_lead VARCHAR(200) NOT NULL,
    nome_cliente_lead VARCHAR(200),
    cnpj_lead VARCHAR(18),
    email_lead VARCHAR(100),
    telefone_lead VARCHAR(20),
    origem ENUM('Formulário','Indicação','Campanha','Rede Social','Evento','Feiras','Outros'),
    regiao VARCHAR(50),
    status_id INT NOT NULL,
    motivo_perda VARCHAR(200),
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conversao TIMESTAMP NULL,
    bandeira_dist TINYINT(1) DEFAULT 0,
    modalidade_negocio VARCHAR(100),
    id_endereco INT,
    flag_classificado TINYINT(1) DEFAULT 0,
    cliente_ideia TEXT,
    FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador),
    FOREIGN KEY (id_filial) REFERENCES filial(id_filial),
FOREIGN KEY (status_id) REFERENCES status(id_status),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
) ENGINE=InnoDB;


    email_gestor VARCHAR(100),
    email_testemunha VARCHAR(100),
    email_financeiro VARCHAR(100),
    telefone_gestor VARCHAR(20),
    telefone_testemunha VARCHAR(20),
    telefone_financeiro VARCHAR(20),
    regiao VARCHAR(50),
    status_id INT NOT NULL,
data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
data_status TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_endereco INT NOT NULL,
    id_lead

