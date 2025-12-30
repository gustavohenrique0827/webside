const db = require('../config/database');

class Orcamento {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM orcamentos');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM orcamentos WHERE id_orcamento = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { numero_orcamento, id_lead, id_cliente, id_colaborador, id_empresa, valor_total, validade_dias, observacoes, id_status, data_criacao, data_aprovacao, data_validade } = data;
    const [result] = await db.execute(
      'INSERT INTO orcamentos (numero_orcamento, id_lead, id_cliente, id_colaborador, id_empresa, valor_total, validade_dias, observacoes, id_status, data_criacao, data_aprovacao, data_validade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [numero_orcamento, id_lead, id_cliente, id_colaborador, id_empresa, valor_total, validade_dias, observacoes, id_status, data_criacao, data_aprovacao, data_validade]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { numero_orcamento, id_lead, id_cliente, id_colaborador, id_empresa, valor_total, validade_dias, observacoes, id_status, data_aprovacao, data_validade } = data;
    await db.execute(
      'UPDATE orcamentos SET numero_orcamento = ?, id_lead = ?, id_cliente = ?, id_colaborador = ?, id_empresa = ?, valor_total = ?, validade_dias = ?, observacoes = ?, id_status = ?, data_aprovacao = ?, data_validade = ? WHERE id_orcamento = ?',
      [numero_orcamento, id_lead, id_cliente, id_colaborador, id_empresa, valor_total, validade_dias, observacoes, id_status, data_aprovacao, data_validade, id]
    );
  }

  static async delete(id) {
    await db.execute('DELETE FROM orcamentos WHERE id_orcamento = ?', [id]);
  }
}

module.exports = Orcamento;
