const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Colaborador {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM colaboradores WHERE ativo = 1');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM colaboradores WHERE id_colaborador = ? AND ativo = 1', [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM colaboradores WHERE email = ? AND ativo = 1', [email]);
    return rows[0];
  }

  static async create(data) {
    const { cpf, nome_completo, email, senha, telefone, tipo_colaborador, data_admissao, comissao_venda, comissao_recorrente, id_permissao, id_usuario_criacao } = data;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const [result] = await db.execute(
      'INSERT INTO colaboradores (cpf, nome_completo, email, senha_hash, telefone, tipo_colaborador, data_admissao, comissao_venda, comissao_recorrente, id_permissao, id_usuario_criacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [cpf, nome_completo, email, hashedPassword, telefone, tipo_colaborador, data_admissao, comissao_venda, comissao_recorrente, id_permissao, id_usuario_criacao]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { cpf, nome_completo, email, telefone, tipo_colaborador, data_admissao, comissao_venda, comissao_recorrente, id_permissao, ativo } = data;
    await db.execute(
      'UPDATE colaboradores SET cpf = ?, nome_completo = ?, email = ?, telefone = ?, tipo_colaborador = ?, data_admissao = ?, comissao_venda = ?, comissao_recorrente = ?, id_permissao = ?, ativo = ?, data_ultimo_login = CURRENT_TIMESTAMP WHERE id_colaborador = ?',
      [cpf, nome_completo, email, telefone, tipo_colaborador, data_admissao, comissao_venda, comissao_recorrente, id_permissao, ativo, id]
    );
  }

  static async updateLastLogin(id) {
    await db.execute('UPDATE colaboradores SET data_ultimo_login = CURRENT_TIMESTAMP WHERE id_colaborador = ?', [id]);
  }

  static async delete(id) {
    await db.execute('UPDATE colaboradores SET ativo = 0 WHERE id_colaborador = ?', [id]);
  }
}

module.exports = Colaborador;
