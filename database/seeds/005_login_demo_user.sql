-- Add demo login user for frontend
-- bcrypt hash for 'admin123' ($2a$10$Wj8jVPr4f7G4g3S0r8kX/.jXv5y2Qz3p6K0mN4o5n8p2Q3r5t7u9v)

INSERT IGNORE INTO colaborador (
  id_filial, id_departamento, id_perfil, nome, email, senha_hash, tipo_colaborador, cargo, ativo, data_cadastro
) VALUES (
  1, 1, 1, 'Admin Demo', 'admin@empresa.com', '$2a$10$Wj8jVPr4f7G4g3S0r8kX/.jXv5y2Qz3p6K0mN4o5n8p2Q3r5t7u9v', 'Funcionario', 'Administrador', 1, NOW()
) ON DUPLICATE KEY UPDATE 
  senha_hash = VALUES(senha_hash), ativo = 1;

-- Create basic FK refs if missing (id_filial=1 etc)
INSERT IGNORE INTO filial (id_filial, cnpj, razao, nome, base_sm) VALUES (1, '00.000.000/0001-00', 'Demo Filial', 'Demo', 1000.00);
INSERT IGNORE INTO departamento (id_departamento, id_filial, nome) VALUES (1, 1, 'Admin');
INSERT IGNORE INTO perfil_acesso (id_perfil, nome_perfil, nivel_acesso) VALUES (1, 'Admin', 1);
