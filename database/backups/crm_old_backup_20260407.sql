-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: websid23_erp
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `id_lead` int DEFAULT NULL,
  `id_colaborador` int NOT NULL,
  `razao_social` varchar(200) NOT NULL,
  `nome_fantasia` varchar(100) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `inscricao_estadual` varchar(20) DEFAULT NULL,
  `data_fundacao` date DEFAULT NULL,
  `porte_empresa` enum('ME','EPP','MED','GRANDE') NOT NULL,
  `id_status` int NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_status` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cnpj` (`cnpj`),
  UNIQUE KEY `idx_clientes_cnpj` (`cnpj`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_lead` (`id_lead`),
  KEY `id_colaborador` (`id_colaborador`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `clientes_ibfk_2` FOREIGN KEY (`id_lead`) REFERENCES `leads` (`id_lead`),
  CONSTRAINT `clientes_ibfk_3` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  CONSTRAINT `clientes_ibfk_4` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaboradores`
--

DROP TABLE IF EXISTS `colaboradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colaboradores` (
  `id_colaborador` int NOT NULL AUTO_INCREMENT,
  `id_permissao` int NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `nome_completo` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `tipo_colaborador` enum('funcionario','terceiro') NOT NULL,
  `data_admissao` date NOT NULL,
  `comissao_venda` decimal(5,2) NOT NULL DEFAULT '0.00',
  `comissao_recorrente` decimal(5,2) NOT NULL DEFAULT '0.00',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_ultimo_login` timestamp NULL DEFAULT NULL,
  `id_usuario_criacao` int NOT NULL,
  PRIMARY KEY (`id_colaborador`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `idx_colaboradores_cpf` (`cpf`),
  KEY `id_permissao` (`id_permissao`),
  CONSTRAINT `colaboradores_ibfk_1` FOREIGN KEY (`id_permissao`) REFERENCES `permissoes` (`id_permissao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaboradores`
--

LOCK TABLES `colaboradores` WRITE;
/*!40000 ALTER TABLE `colaboradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `colaboradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaboradores_departamentos`
--

DROP TABLE IF EXISTS `colaboradores_departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colaboradores_departamentos` (
  `id_vinculo` int NOT NULL AUTO_INCREMENT,
  `id_colaborador` int NOT NULL,
  `id_departamento` int NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_vinculo`),
  KEY `id_colaborador` (`id_colaborador`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `colaboradores_departamentos_ibfk_1` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  CONSTRAINT `colaboradores_departamentos_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaboradores_departamentos`
--

LOCK TABLES `colaboradores_departamentos` WRITE;
/*!40000 ALTER TABLE `colaboradores_departamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `colaboradores_departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comprovacoes`
--

DROP TABLE IF EXISTS `comprovacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprovacoes` (
  `id_comprovacao` int NOT NULL AUTO_INCREMENT,
  `id_implantacao` int NOT NULL,
  `tipo_comprovacao` enum('foto','documento','assinatura','outro') NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `arquivo_url` varchar(500) NOT NULL,
  `observacoes` text,
  `data_upload` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_upload` int NOT NULL,
  PRIMARY KEY (`id_comprovacao`),
  KEY `id_implantacao` (`id_implantacao`),
  CONSTRAINT `comprovacoes_ibfk_1` FOREIGN KEY (`id_implantacao`) REFERENCES `implantacoes` (`id_implantacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprovacoes`
--

LOCK TABLES `comprovacoes` WRITE;
/*!40000 ALTER TABLE `comprovacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comprovacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contatos`
--

DROP TABLE IF EXISTS `contatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contatos` (
  `id_contato` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `tipo_contato` enum('gestor','testemunha','financeiro','tecnico') NOT NULL,
  `nome_contato` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contato`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `contatos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contatos`
--

LOCK TABLES `contatos` WRITE;
/*!40000 ALTER TABLE `contatos` DISABLE KEYS */;
/*!40000 ALTER TABLE `contatos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contratos`
--

DROP TABLE IF EXISTS `contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contratos` (
  `id_contrato` int NOT NULL AUTO_INCREMENT,
  `numero_contrato` varchar(20) NOT NULL,
  `id_pedido` int NOT NULL,
  `id_cliente` int NOT NULL,
  `data_assinatura` date NOT NULL,
  `data_inicio_vigencia` date NOT NULL,
  `data_fim_vigencia` date NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `renovacao_automatica` tinyint(1) NOT NULL DEFAULT '0',
  `periodicidade_reajuste` enum('anual','semestral','trimestral') NOT NULL,
  `arquivo_url` varchar(500) DEFAULT NULL,
  `observacoes` text,
  `id_status` int NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contrato`),
  UNIQUE KEY `numero_contrato` (`numero_contrato`),
  UNIQUE KEY `idx_contratos_numero` (`numero_contrato`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_status` (`id_status`),
  KEY `idx_contratos_vigencia_status` (`data_fim_vigencia`,`id_status`),
  CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `contratos_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `contratos_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratos`
--

LOCK TABLES `contratos` WRITE;
/*!40000 ALTER TABLE `contratos` DISABLE KEYS */;
/*!40000 ALTER TABLE `contratos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contratos_aditivos`
--

DROP TABLE IF EXISTS `contratos_aditivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contratos_aditivos` (
  `id_aditivo` int NOT NULL AUTO_INCREMENT,
  `id_contrato` int NOT NULL,
  `numero_aditivo` varchar(20) NOT NULL,
  `descricao` text NOT NULL,
  `valor_aditivo` decimal(10,2) NOT NULL,
  `data_solicitacao` date NOT NULL,
  `data_aprovacao` date DEFAULT NULL,
  `data_efetivacao` date DEFAULT NULL,
  `arquivo_url` varchar(500) DEFAULT NULL,
  `observacoes` text,
  `id_status` int NOT NULL,
  PRIMARY KEY (`id_aditivo`),
  KEY `id_contrato` (`id_contrato`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `contratos_aditivos_ibfk_1` FOREIGN KEY (`id_contrato`) REFERENCES `contratos` (`id_contrato`),
  CONSTRAINT `contratos_aditivos_ibfk_2` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratos_aditivos`
--

LOCK TABLES `contratos_aditivos` WRITE;
/*!40000 ALTER TABLE `contratos_aditivos` DISABLE KEYS */;
/*!40000 ALTER TABLE `contratos_aditivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `id_departamento` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `codigo` varchar(10) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_departamento`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `departamentos_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(18) NOT NULL,
  `razao_social` varchar(200) NOT NULL,
  `nome_fantasia` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_empresa`),
  UNIQUE KEY `cnpj` (`cnpj`),
  UNIQUE KEY `idx_empresas_cnpj` (`cnpj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos` (
  `id_endereco` int NOT NULL AUTO_INCREMENT,
  `tipo_entidade` enum('empresa','cliente','colaborador') NOT NULL,
  `id_entidade` int NOT NULL,
  `cep` varchar(9) NOT NULL,
  `logradouro` varchar(200) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) NOT NULL,
  `municipio` varchar(100) NOT NULL,
  `uf` char(2) NOT NULL,
  `pais` varchar(50) NOT NULL DEFAULT 'Brasil',
  `tipo_endereco` enum('comercial','residencial','entrega') NOT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faturas`
--

DROP TABLE IF EXISTS `faturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faturas` (
  `id_fatura` int NOT NULL AUTO_INCREMENT,
  `id_contrato` int NOT NULL,
  `numero_fatura` varchar(20) NOT NULL,
  `data_emissao` date NOT NULL,
  `data_vencimento` date NOT NULL,
  `valor_original` decimal(10,2) NOT NULL,
  `valor_final` decimal(10,2) NOT NULL,
  `data_pagamento` date DEFAULT NULL,
  `valor_pago` decimal(10,2) DEFAULT NULL,
  `observacoes` text,
  `id_status` int NOT NULL,
  PRIMARY KEY (`id_fatura`),
  KEY `id_contrato` (`id_contrato`),
  KEY `id_status` (`id_status`),
  KEY `idx_faturas_vencimento_status` (`data_vencimento`,`id_status`),
  CONSTRAINT `faturas_ibfk_1` FOREIGN KEY (`id_contrato`) REFERENCES `contratos` (`id_contrato`),
  CONSTRAINT `faturas_ibfk_2` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faturas`
--

LOCK TABLES `faturas` WRITE;
/*!40000 ALTER TABLE `faturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `faturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `implantacoes`
--

DROP TABLE IF EXISTS `implantacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `implantacoes` (
  `id_implantacao` int NOT NULL AUTO_INCREMENT,
  `id_contrato` int NOT NULL,
  `id_colaborador` int NOT NULL,
  `data_inicio_prevista` date NOT NULL,
  `data_fim_prevista` date NOT NULL,
  `data_inicio_real` date DEFAULT NULL,
  `data_fim_real` date DEFAULT NULL,
  `percentual_conclusao` tinyint NOT NULL DEFAULT '0',
  `observacoes` text,
  `id_status` int NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_implantacao`),
  KEY `id_contrato` (`id_contrato`),
  KEY `id_colaborador` (`id_colaborador`),
  KEY `idx_implantacoes_status_fim` (`id_status`,`data_fim_prevista`),
  CONSTRAINT `implantacoes_ibfk_1` FOREIGN KEY (`id_contrato`) REFERENCES `contratos` (`id_contrato`),
  CONSTRAINT `implantacoes_ibfk_2` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  CONSTRAINT `implantacoes_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`),
  CONSTRAINT `implantacoes_chk_1` CHECK ((`percentual_conclusao` between 0 and 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `implantacoes`
--

LOCK TABLES `implantacoes` WRITE;
/*!40000 ALTER TABLE `implantacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `implantacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `id_lead` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `id_colaborador` int NOT NULL,
  `nome_empresa` varchar(200) NOT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `contato_principal` varchar(200) NOT NULL,
  `email_contato` varchar(100) NOT NULL,
  `telefone_contato` varchar(20) NOT NULL,
  `fonte_lead` varchar(50) NOT NULL,
  `probabilidade` tinyint NOT NULL,
  `valor_estimado` decimal(10,2) DEFAULT NULL,
  `id_status` int NOT NULL,
  `observacoes` text,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_conversao` date DEFAULT NULL,
  PRIMARY KEY (`id_lead`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_colaborador` (`id_colaborador`),
  KEY `idx_leads_status_criacao` (`id_status`,`data_criacao`),
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `leads_ibfk_2` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  CONSTRAINT `leads_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`),
  CONSTRAINT `leads_chk_1` CHECK ((`probabilidade` between 0 and 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id_migration` int NOT NULL AUTO_INCREMENT,
  `nome_migration` varchar(100) NOT NULL,
  `executed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_migration`),
  UNIQUE KEY `nome_migration` (`nome_migration`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'001_create_schema','2026-04-02 13:41:17');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orcamentos`
--

DROP TABLE IF EXISTS `orcamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orcamentos` (
  `id_orcamento` int NOT NULL AUTO_INCREMENT,
  `numero_orcamento` varchar(20) NOT NULL,
  `id_lead` int DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  `id_colaborador` int NOT NULL,
  `id_empresa` int NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `validade_dias` int NOT NULL,
  `observacoes` text,
  `id_status` int NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_aprovacao` date DEFAULT NULL,
  `data_validade` date NOT NULL,
  PRIMARY KEY (`id_orcamento`),
  UNIQUE KEY `numero_orcamento` (`numero_orcamento`),
  UNIQUE KEY `idx_orcamentos_numero` (`numero_orcamento`),
  KEY `id_lead` (`id_lead`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_colaborador` (`id_colaborador`),
  KEY `id_empresa` (`id_empresa`),
  KEY `idx_orcamentos_status_validade` (`id_status`,`data_validade`),
  CONSTRAINT `orcamentos_ibfk_1` FOREIGN KEY (`id_lead`) REFERENCES `leads` (`id_lead`),
  CONSTRAINT `orcamentos_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `orcamentos_ibfk_3` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  CONSTRAINT `orcamentos_ibfk_4` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `orcamentos_ibfk_5` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orcamentos`
--

LOCK TABLES `orcamentos` WRITE;
/*!40000 ALTER TABLE `orcamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `orcamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orcamentos_itens`
--

DROP TABLE IF EXISTS `orcamentos_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orcamentos_itens` (
  `id_item` int NOT NULL AUTO_INCREMENT,
  `id_orcamento` int NOT NULL,
  `id_produto` int NOT NULL,
  `descricao_item` text,
  `quantidade` decimal(10,2) NOT NULL,
  `valor_unitario` decimal(10,2) NOT NULL,
  `desconto_percentual` decimal(5,2) NOT NULL DEFAULT '0.00',
  `desconto_valor` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valor_total` decimal(10,2) NOT NULL,
  `ordem` tinyint NOT NULL,
  PRIMARY KEY (`id_item`),
  KEY `id_orcamento` (`id_orcamento`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `orcamentos_itens_ibfk_1` FOREIGN KEY (`id_orcamento`) REFERENCES `orcamentos` (`id_orcamento`),
  CONSTRAINT `orcamentos_itens_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orcamentos_itens`
--

LOCK TABLES `orcamentos_itens` WRITE;
/*!40000 ALTER TABLE `orcamentos_itens` DISABLE KEYS */;
/*!40000 ALTER TABLE `orcamentos_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametros_empresa`
--

DROP TABLE IF EXISTS `parametros_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametros_empresa` (
  `id_parametro` int NOT NULL AUTO_INCREMENT,
  `salario_minimo` decimal(10,2) NOT NULL,
  `percentual_reajuste` decimal(5,2) NOT NULL,
  `dias_vencimento_fatura` int NOT NULL,
  `taxa_juros_mora` decimal(5,2) NOT NULL,
  `data_vigencia` date NOT NULL,
  PRIMARY KEY (`id_parametro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametros_empresa`
--

LOCK TABLES `parametros_empresa` WRITE;
/*!40000 ALTER TABLE `parametros_empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametros_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `numero_pedido` varchar(20) NOT NULL,
  `id_orcamento` int DEFAULT NULL,
  `id_cliente` int NOT NULL,
  `id_colaborador` int NOT NULL,
  `id_empresa` int NOT NULL,
  `data_pedido` date NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `data_prevista_entrega` date DEFAULT NULL,
  `observacoes` text,
  `id_status` int NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `numero_pedido` (`numero_pedido`),
  UNIQUE KEY `idx_pedidos_numero` (`numero_pedido`),
  KEY `id_orcamento` (`id_orcamento`),
  KEY `id_colaborador` (`id_colaborador`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_status` (`id_status`),
  KEY `idx_pedidos_cliente_status` (`id_cliente`,`id_status`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_orcamento`) REFERENCES `orcamentos` (`id_orcamento`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`),
  CONSTRAINT `pedidos_ibfk_4` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `pedidos_ibfk_5` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_itens`
--

DROP TABLE IF EXISTS `pedidos_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos_itens` (
  `id_item` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_produto` int NOT NULL,
  `descricao_item` text,
  `quantidade` decimal(10,2) NOT NULL,
  `valor_unitario` decimal(10,2) NOT NULL,
  `desconto_percentual` decimal(5,2) NOT NULL DEFAULT '0.00',
  `valor_total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_item`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `pedidos_itens_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `pedidos_itens_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_itens`
--

LOCK TABLES `pedidos_itens` WRITE;
/*!40000 ALTER TABLE `pedidos_itens` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissoes`
--

DROP TABLE IF EXISTS `permissoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissoes` (
  `id_permissao` int NOT NULL AUTO_INCREMENT,
  `nome_perfil` varchar(50) NOT NULL,
  `descricao` text,
  `nivel_acesso` tinyint NOT NULL,
  `permissoes_json` json NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_permissao`),
  CONSTRAINT `permissoes_chk_1` CHECK ((`nivel_acesso` between 1 and 10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissoes`
--

LOCK TABLES `permissoes` WRITE;
/*!40000 ALTER TABLE `permissoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `codigo_produto` varchar(20) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `descricao` text,
  `tipo_produto` enum('produto','servico','licenca') NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `valor_base` decimal(10,2) NOT NULL,
  `unidade_medida` varchar(20) NOT NULL,
  `estoque_minimo` int DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_criacao` int NOT NULL,
  PRIMARY KEY (`id_produto`),
  UNIQUE KEY `codigo_produto` (`codigo_produto`),
  UNIQUE KEY `idx_produtos_codigo` (`codigo_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reajustes`
--

DROP TABLE IF EXISTS `reajustes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reajustes` (
  `id_reajuste` int NOT NULL AUTO_INCREMENT,
  `id_contrato` int NOT NULL,
  `id_fatura` int DEFAULT NULL,
  `percentual_reajuste` decimal(5,2) NOT NULL,
  `valor_anterior` decimal(10,2) NOT NULL,
  `valor_novo` decimal(10,2) NOT NULL,
  `data_reajuste` date NOT NULL,
  `motivo` text NOT NULL,
  `id_usuario_aprovacao` int NOT NULL,
  PRIMARY KEY (`id_reajuste`),
  KEY `id_contrato` (`id_contrato`),
  KEY `id_fatura` (`id_fatura`),
  CONSTRAINT `reajustes_ibfk_1` FOREIGN KEY (`id_contrato`) REFERENCES `contratos` (`id_contrato`),
  CONSTRAINT `reajustes_ibfk_2` FOREIGN KEY (`id_fatura`) REFERENCES `faturas` (`id_fatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reajustes`
--

LOCK TABLES `reajustes` WRITE;
/*!40000 ALTER TABLE `reajustes` DISABLE KEYS */;
/*!40000 ALTER TABLE `reajustes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `tipo_entidade` enum('cliente','pedido','contrato','implantacao','fatura','lead','aditivo','orcamento') NOT NULL,
  `codigo_status` varchar(20) NOT NULL,
  `nome_status` varchar(50) NOT NULL,
  `descricao` text,
  `ordem` tinyint NOT NULL,
  `cor_hex` varchar(7) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_status`),
  UNIQUE KEY `tipo_entidade` (`tipo_entidade`,`codigo_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id_template` int NOT NULL AUTO_INCREMENT,
  `tipo_template` enum('email','contrato','aditivo','comunicado') NOT NULL,
  `nome_template` varchar(100) NOT NULL,
  `assunto` varchar(200) DEFAULT NULL,
  `conteudo` longtext NOT NULL,
  `variaveis` json DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_criacao` int NOT NULL,
  PRIMARY KEY (`id_template`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacoes`
--

DROP TABLE IF EXISTS `transacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacoes` (
  `id_transacao` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('entrada','saida') NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `forma_pagamento` varchar(50) NOT NULL,
  `status` enum('Pago','Pendente','Atrasado') NOT NULL DEFAULT 'Pendente',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_criacao` int NOT NULL,
  PRIMARY KEY (`id_transacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacoes`
--

LOCK TABLES `transacoes` WRITE;
/*!40000 ALTER TABLE `transacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `transacoes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-07 18:27:11
