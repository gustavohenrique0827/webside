import { gql } from '@apollo/client';

export const GET_CLIENTES = gql`
  query GetClientes($first: Int, $skip: Int, $search: String) {
    clientes(first: $first, skip: $skip, search: $search) {
      id_cliente
      nome
      email
      telefone
      criado_em: created_at
    }
    testConn {
      clientes
    }
  }
`;

export const GET_ORCAMENTOS = gql`
  query GetOrcamentos($first: Int, $skip: Int, $status: String, $clienteId: ID) {
    orcamentos(first: $first, skip: $skip, status: $status, clienteId: $clienteId) {
      id_orcamento
      cliente {
        id_cliente
        nome
      }
      valor
      status
      data_criacao: created_at
    }
  }
`;

export const GET_TAREFAS = gql`
  query GetTarefas($first: Int, $skip: Int) {
    tarefas(first: $first, skip: $skip) {
      id
      titulo
      responsavel
      status
      prioridade
      data
    }
  }
`;

export const GET_PIPELINE = gql`
  query GetPipeline($first: Int, $skip: Int, $etapa: String) {
    pipeline(first: $first, skip: $skip, etapa: $etapa) {
      id
      cliente
      valor
      etapa
      probabilidade
      proximo_passo
      data
    }
  }
`;

export const GET_LEADS = gql`
  query GetLeads($first: Int, $skip: Int) {
    leads(first: $first, skip: $skip) {
      id_lead
      nome
      email
      telefone
      status
    }
  }
`;

export const GET_PEDIDOS = gql`
  query GetPedidos($first: Int, $skip: Int) {
    pedidos(first: $first, skip: $skip) {
      id_pedido
      cliente {
        nome
      }
      valor
      status
      data
    }
  }
`;

export const CREATE_CLIENTE = gql`
  mutation CreateCliente($input: ClienteInput!) {
    createCliente(input: $input) {
      id_cliente
      nome
      email
      telefone
    }
  }
`;

export const CREATE_ORCAMENTO = gql`
  mutation CreateOrcamento($input: OrcamentoInput!) {
    createOrcamento(input: $input) {
      id_orcamento
      valor
      status
    }
  }
`;

export const DELETE_CLIENTE = gql`
  mutation DeleteCliente($id: ID!) {
    deleteCliente(id: $id)
  }
`;

// Dashboard aggregations (add to backend later)
export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    stats {
      receitaMes
      novosLeads
      taxaConversao
      totalFaturado
    }
  }
`;

