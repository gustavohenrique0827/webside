const { pool } = require('../config/database');
const { logger } = require('../config/logger');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'webside-super-secret-2024';

const resolvers = {
  Query: {
    clientes: async (_, args) => {
      try {
        const [rows] = await pool.promise().query('SELECT * FROM cliente LIMIT 10');
        return rows;
      } catch (error) {
        logger.error('Error fetching clientes:', error.message);
        return []; // Mock empty
      }
    },
    testConn: async () => {
      try {
        const [rows] = await pool.promise().query('SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = DATABASE()');
        const [clienteRows] = await pool.promise().query('SELECT COUNT(*) as count FROM cliente');
        const [orcamentoRows] = await pool.promise().query('SELECT COUNT(*) as count FROM orcamento');
        return {
          tables: rows[0].count || 0,
          clientes: clienteRows[0].count || 0,
          orcamentos: orcamentoRows[0].count || 0
        };
      } catch (error) {
        logger.error('Test conn error:', error);
        return { tables: 0, clientes: 0, orcamentos: 0 }; // Mock
      }
    },
    orcamentos: async (_, args) => {
      try {
        let query = 'SELECT * FROM orcamento WHERE 1=1';
        const params = [];
        if (args.status) {
          query += ' AND status = ?';
          params.push(args.status);
        }
        if (args.clienteId) {
          query += ' AND cliente_id = ?';
          params.push(args.clienteId);
        }
        query += ' LIMIT ? OFFSET ?';
        params.push(args.first || 10, args.skip || 0);
        const [rows] = await pool.promise().query(query, params);
        return rows;
      } catch (error) {
        logger.error('Error fetching orcamentos:', error.message);
        return []; // Mock empty
      }
    },
    filiais: async () => [
      { id_filial: '1', cnpj: '00.000.000/0001-00', razao_social: 'Demo Filial Ltda', nome_fantasia: 'Demo', telefone: '(11) 99999-0001', whatsapp: '5511999990001', email: 'financeiro@demo.com.br', base_sm: 1412.00, ativo: true }
    ],
    leads: async () => [
      { id_lead: '1', nome: 'Lead Teste', email: 'lead@test.com', telefone: '(11) 99999-2222' }
    ],
    colaborador: async (_, { id }) => {
      return { id_colaborador: id, nome: 'Admin Demo', email: 'admin@empresa.com', cargo: 'Administrador', ativo: true };
    },
    tarefas: async (_, args) => {
      try {
        const [rows] = await pool.promise().query(`
          SELECT t.*, c.nome as responsavel_nome, s.nome_status as status_nome
          FROM tarefa t
          LEFT JOIN colaborador c ON t.responsavel_id = c.id_colaborador
          LEFT JOIN status s ON t.status = s.id_status
          ORDER BY t.data_criacao DESC LIMIT 20
        `);
        return rows.length ? rows : [
          { id_tarefa: '1', titulo: 'Follow-up Lead Demo', descricao: 'Contato pós-orçamento', status: 'Pendente', status_nome: 'Pendente', responsavel_nome: 'Vendedor Demo', prazo: '2024-12-15', data_criacao: '2024-12-01', prioridade: 'Alta', id_orcamento: '1' },
          { id_tarefa: '2', titulo: 'Reunião Cliente Novo', descricao: 'Apresentação proposta', status: 'Em Andamento', status_nome: 'Em Andamento', responsavel_nome: 'Admin Demo', prazo: '2024-12-10', data_criacao: '2024-12-01', prioridade: 'Média', id_orcamento: '2' },
          { id_tarefa: '3', titulo: 'Aprovar Implantação', descricao: 'Verificar comprovantes', status: 'Concluída', status_nome: 'Concluída', responsavel_nome: 'Admin Demo', prazo: '2024-12-05', data_criacao: '2024-11-28', prioridade: 'Baixa', id_orcamento: null }
        ];
      } catch (error) {
        logger.error('Error fetching tarefas:', error.message);
        return [
          { id_tarefa: 'demo1', titulo: 'Demo Tarefa 1', status: 'Pendente', status_nome: 'Pendente', responsavel_nome: 'Admin', prazo: '2024-12-15', data_criacao: '2024-12-01T10:00:00Z', prioridade: 'Alta' },
          { id_tarefa: 'demo2', titulo: 'Demo Tarefa 2', status: 'Em Andamento', status_nome: 'Em Andamento', responsavel_nome: 'Vendedor', prazo: '2024-12-20', data_criacao: '2024-12-01T12:00:00Z', prioridade: 'Média' }
        ];
      }
    },
    pipeline: async (_, args) => {
      try {
        const [rows] = await pool.promise().query(`
          SELECT 
            s.nome_status as etapa,
            COUNT(o.id_orcamento) as count,
            COALESCE(SUM(o.valor_total), 0) as valor_total,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id_orcamento', o.id_orcamento,
                'cliente_nome', cl.nome_empresa,
                'valor_total', o.valor_total,
                'status_nome', s.nome_status
              )
            ) as orcamentos_json
          FROM orcamento o
          LEFT JOIN status s ON o.status = s.id_status
          LEFT JOIN cliente cl ON o.cliente_id = cl.id_cliente
          GROUP BY s.id_status, s.nome_status
          ORDER BY s.ordem_exibicao
        `);
        return rows.map(row => ({
          ...row,
          orcamentos: row.orcamentos_json ? JSON.parse(row.orcamentos_json) : []
        }));
      } catch (error) {
        logger.error('Error fetching pipeline:', error.message);
        return [
          { etapa: 'Prospecção', count: 3, valor_total: 15000.00, orcamentos: [{id_orcamento:1, cliente_nome:'Demo Ltda', valor_total:5000, status_nome:'Prospecção'}] },
          { etapa: 'Proposta', count: 2, valor_total: 25000.00, orcamentos: [{id_orcamento:2, cliente_nome:'Cliente Novo', valor_total:25000, status_nome:'Proposta'}] },
          { etapa: 'Negociação', count: 1, valor_total: 10000.00, orcamentos: [] }
        ];
      }
    },
    // Demo user for login test (no DB)
    me: (parent, args, context) => context.user || null,
  },
  Mutation: {
login: async (_, { input: { email, senha } }) => {
      // Mock login - no DB dependency
      const demoUsers = [
        { id: 1, email: 'admin@empresa.com', senha: 'admin123', nome: 'Admin Demo', perfil: 'Admin' },
        { id: 2, email: 'vendedor@empresa.com', senha: 'vendedor123', nome: 'Vendedor Demo', perfil: 'Vendedor' }
      ];
      
      const user = demoUsers.find(u => u.email === email && u.senha === senha);
      if (!user) {
        throw new Error('Credenciais inválidas');
      }
      
      const token = jwt.sign({ id: user.id, email: user.email, nome: user.nome, perfil: user.perfil }, JWT_SECRET, { expiresIn: '7d' });
      
      logger.info(`Mock login success: ${user.nome}`);
      return { token, user };
    },
    createCliente: async (_, args) => {
      try {
        const { nome, email, telefone, id_grupo, id_filial } = args.input;
        if (!id_grupo) {
          throw new Error('Grupo Econômico (id_grupo) é obrigatório!');
        }
        const [result] = await pool.query(
          'INSERT INTO cliente (nome, email, telefone, id_grupo, id_filial) VALUES (?, ?, ?, ?, ?)',
          [nome, email, telefone, id_grupo, id_filial || null]
        );
        const [newCliente] = await pool.query('SELECT * FROM cliente WHERE id_cliente = LAST_INSERT_ID()');
        return newCliente[0];
      } catch (error) {
        logger.error('Error creating cliente', error);
        throw new Error(error.message || 'Erro ao criar cliente');
      }
    },
    createOrcamento: async (_, args) => {
      try {
        const { cliente_id, valor_total, id_filial, id_colaborador, validade } = args.input;
        if (!id_filial || !id_colaborador) {
          throw new Error('Filial (id_filial) e Colaborador (id_colaborador) são obrigatórios!');
        }
        const [result] = await pool.query(
          'INSERT INTO orcamento (cliente_id, valor_total, id_filial, id_colaborador, validade, status) VALUES (?, ?, ?, ?, ?, "Pendente")',
          [cliente_id, valor_total, id_filial, id_colaborador, validade || null]
        );
        const [newOrcamento] = await pool.query('SELECT * FROM orcamento WHERE id_orcamento = LAST_INSERT_ID()');
        return newOrcamento[0];
      } catch (error) {
        logger.error('Error creating orcamento', error);
        throw new Error(error.message || 'Erro ao criar orçamento');
      }
    },
    createLead: async (_, { input }) => {
      logger.info('Creating lead', input);
      return { id_lead: 'new', ...input };
    },
  },
};

module.exports = resolvers;
