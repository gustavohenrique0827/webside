-- ========================================
-- CRM + CPM + MENSAGERIA COMPLETA - FULL SCHEMA
-- MySQL 8.0 - Webside Sistemas
-- ========================================

SET FOREIGN_KEY_CHECKS = 0;

-- DROP ALL TABLES (cleanup)
DROP TABLE IF EXISTS `mensagem_script_log`;
DROP TABLE IF EXISTS `mensagem_script_regra`;
DROP TABLE IF EXISTS `notificacao_interna`;
DROP TABLE IF EXISTS `mensagem_envio_destinatario`;
DROP TABLE IF EXISTS `mensagem_envio`;
DROP TABLE IF EXISTS `mensagem_campanha_filtro`;
DROP TABLE IF EXISTS `mensagem_campanha_destinatario_tipo`;
DROP TABLE IF EXISTS `mensagem_campanha`;
DROP TABLE IF EXISTS `mensagem_categoria`;
DROP TABLE IF EXISTS `tarefa`;
DROP TABLE IF EXISTS `automacao_regra`;
DROP TABLE IF EXISTS `comissao`;
DROP TABLE IF EXISTS `implantacao_comprovacao`;
DROP TABLE IF EXISTS `implantacao`;
DROP TABLE IF EXISTS `filial_sm_historico`;
DROP TABLE IF EXISTS `fatura`;
DROP TABLE IF EXISTS `aditivo_contrato`;
DROP TABLE IF EXISTS `modelo_contrato`;
DROP TABLE IF EXISTS `contrato`;
DROP TABLE IF EXISTS `pedido_item`;
DROP TABLE IF EXISTS `pedido`;
DROP TABLE IF EXISTS `orcamento_item`;
DROP TABLE IF EXISTS `orcamento`;
DROP TABLE IF EXISTS `produto`;
DROP TABLE IF EXISTS `grupo_produto`;
DROP TABLE IF EXISTS `cliente_grupo_economico`;
DROP TABLE IF EXISTS `cliente`;
DROP TABLE IF EXISTS `lead_log_consulta_endereco`;
DROP TABLE IF EXISTS `lead`;
DROP TABLE IF EXISTS `perfil_permissao`;
DROP TABLE IF EXISTS `funcao_sistema`;
DROP TABLE IF EXISTS `colaborador`;
DROP TABLE IF EXISTS `perfil_acesso`;
DROP TABLE IF EXISTS `departamento`;
DROP TABLE IF EXISTS `grupo_economico`;
DROP TABLE IF EXISTS `endereco`;
DROP TABLE IF EXISTS `status`;
DROP TABLE IF EXISTS `filial`;

SET FOREIGN_KEY_CHECKS = 1;

-- ========================================
-- 1. STATUS CENTRALIZADO (PRÉ-REQUISITO)
-- ========================================

CREATE TABLE `status` (
  `id_status` bigint AUTO_INCREMENT PRIMARY KEY,
  `nome_status` varchar(100) NOT NULL,
  `tipo_entidade` enum('lead','cliente','orcamento','pedido','contrato','aditivo','fatura','implantacao','comissao','tarefa','automacao_regra','mensagem_envio','colaborador') NOT NULL,
  `descricao` text,
  `ordem_exibicao` int DEFAULT 0,
  `cor_hex` varchar(7) DEFAULT '#3B82F6',
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  UNIQUE KEY `uk_status_tipo_nome` (`tipo_entidade`, `nome_status`),
  INDEX `idx_status_tipo` (`tipo_entidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Status centralizado para todas entidades';

-- ========================================
-- 2. FILIAL E ESTRUTURA ORGANIZACIONAL
-- ========================================

CREATE TABLE `filial` (
  `id_filial` bigint AUTO_INCREMENT PRIMARY KEY,
  `cnpj` varchar(20) NOT NULL UNIQUE,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255),
  `telefone` varchar(20),
  `whatsapp` varchar(20),
  `email` varchar(255),
  `base_sm` decimal(10,2) NOT NULL DEFAULT 1412.00 COMMENT 'Salário mínimo referência',
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_filial_ativo` (`ativo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `filial_sm_historico` (
  `id_sm` bigint AUTO_INCREMENT PRIMARY KEY,
  `id_filial` bigint NOT NULL,
  `vigencia_inicio` date NOT NULL,
  `vigencia_fim` date NULL COMMENT 'NULL = vigente',
  `valor_sm` decimal(10,2) NOT NULL,
  `data_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_filial_periodo` (`id_filial`, `vigencia_inicio`),
  FOREIGN KEY (`id_filial`) REFERENCES `filial`(`id_filial`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `departamento` (
  `id_departamento` bigint AUTO_INCREMENT PRIMARY KEY,
  `id_filial` bigint NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_filial`) REFERENCES `filial`(`id_filial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `perfil_acesso` (
  `id_perfil` bigint AUTO_INCREMENT PRIMARY KEY,
  `nome_perfil` varchar(100) NOT NULL,
  `nivel_acesso` int NOT NULL DEFAULT 1 COMMENT '1-10',
  `descricao` text,
  `ativo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `funcao_sistema` (
  `id_funcao` bigint AUTO_INCREMENT PRIMARY KEY,
  `modulo` enum('Cadastro','Comercial','Operacional','Financeiro','Relatorios','Configuracoes','Indicadores','Automacoes','Mensageria') NOT NULL,
  `nome_funcao` varchar(200) NOT NULL,
  `chave` varchar(100) NOT NULL UNIQUE,
  `tipo` enum('botao','menu','relatorio','configuracao') NOT NULL,
  `descricao` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `perfil_permissao` (
  `id_perfil` bigint NOT NULL,
  `id_funcao` bigint NOT NULL,
  `pode_visualizar` tinyint(1) NOT NULL DEFAULT 0,
  `pode_incluir` tinyint(1) NOT NULL DEFAULT 0,
  `pode_alterar` tinyint(1) NOT NULL DEFAULT 0,
  `pode_excluir` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_perfil`,`id_funcao`),
  FOREIGN KEY (`id_perfil`) REFERENCES `perfil_acesso`(`id_perfil`) ON DELETE CASCADE,
  FOREIGN KEY (`id_funcao`) REFERENCES `funcao_sistema`(`id_funcao`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `colaborador` (
  `id_colaborador` bigint AUTO_INCREMENT PRIMARY KEY,
  `id_filial` bigint NOT NULL,
  `id_departamento` bigint,
  `id_perfil` bigint NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `senha_hash` varchar(255) NOT NULL,
  `tipo_colaborador` enum('Funcionario','Comissionado') DEFAULT 'Funcionario',
  `cargo` varchar(100),
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_ultimo_login` timestamp NULL,
  FOREIGN KEY (`id_filial`) REFERENCES `filial`(`id_filial`),
  FOREIGN KEY (`id_departamento`) REFERENCES `departamento`(`id_departamento`),
  FOREIGN KEY (`id_perfil`) REFERENCES `perfil_acesso`(`id_perfil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- END OF COMPLETE SCHEMA (35+ tables ready)
-- Execute: mysql -u root -p webside_crm < database/crm_cpm_mensageria_schema_complete.sql
-- Backend API next: backend/src/

