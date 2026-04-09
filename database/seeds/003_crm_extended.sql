-- Seed: 003_crm_extended
-- Samples for full CRM flow

-- Empresa/Filial exemplo (SP)
INSERT IGNORE INTO empresas (id_empresa, cnpj, razao_social, nome_fantasia, telefone, email) VALUES
(1, '12.345.678/0001-99', 'Webside Sistemas Ltda', 'Webside Sistemas', '(11) 99999-9999', 'contato@websidesistemas.com.br');

-- Endereço filial
INSERT IGNORE INTO enderecos (tipo_entidade, id_entidade, cep, logradouro, numero, bairro, municipio, uf, pais, tipo_endereco) VALUES
(1, 1, '01234-567', 'Rua Exemplo', '123', 'Centro', 'São Paulo', 'SP', 'Brasil', 'comercial');

-- Grupo Econômico exemplo
INSERT IGNORE INTO grupo_economico (id_grupo, nome_grupo, id_endereco) VALUES (1, 'Rede Postos Sul', 2);

-- Lead → Cliente chain
INSERT IGNORE INTO leads (id_lead, id_empresa, id_colaborador, nome_empresa, cnpj, contato_principal, email_contato, telefone_contato, fonte_lead, id_status, cliente_ideia) VALUES
(1, 1, 1, 'Posto ABC Ltda', '98.765.432/0001-10', 'João Silva', 'joao@postoabc.com', '(11) 98888-8888', 'Formulário', 1, 'Posto bandeira BR, 2 bombas, precisa PDV');

INSERT IGNORE INTO clientes (id_cliente, id_empresa, id_lead, id_colaborador, razao_social, nome_fantasia, cnpj, porte_empresa, id_status, telefone_whatsapp) VALUES
(1, 1, 1, 1, 'Posto ABC Ltda', 'Posto ABC', '98.765.432/0001-10', 'ME', 2, '(11) 98888-8888');

INSERT IGNORE INTO cliente_grupo_economico (id_cliente, id_grupo) VALUES (1, 1);

-- Produto exemplo
INSERT IGNORE INTO produtos (id_produto, codigo_produto, nome, tipo_produto, categoria, valor_base, id_grupo_produto) VALUES
(1, 'WP-PDV', 'WebPosto PDV', 'licenca', 'PDV', 1500.00, 1);

-- Orcamento → Pedido → Contrato → Implantação → Fatura → Comissão
-- (abbreviated for seed; full chain ~20 inserts)

-- Comissionado (sem login)
INSERT IGNORE INTO colaboradores (id_colaborador, id_permissao, cpf, nome_completo, tipo_colaborador, comissao_venda) VALUES
(2, 3, '123.456.789-00', 'Vendedor Externo ABC', 'terceiro', 5.00);

-- Comissão exemplo
INSERT IGNORE INTO comissao (id_comissao, id_pedido, id_colaborador, nome_beneficiario, valor_comissao, percentual_sobre_pedido, chave_pix, data_calculo) VALUES
(1, 1, 2, 'Vendedor Externo ABC', 75.00, 5.00, 'abc@pix.com', '2025-01-15');

