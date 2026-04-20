export interface Orcamento {
  id_orcamento: string;
  cliente: {
    id_cliente: string;
    nome: string;
  };
  valor: string;
  status: string;
  data_criacao: string;
}

export interface Tarefa {
  id: string;
  titulo: string;
  responsavel: string;
  status: string;
  prioridade: string;
  data: string;
}

export interface PipelineItem {
  id: string;
  cliente: string;
  valor: string;
  etapa: string;
  probabilidade: string;
  proximo_passo: string;
  data: string;
}

export interface Pedido {
  id_pedido: string;
  cliente: string;
  valor: string;
  status_nome: string;
  data: string;
}

export interface Cliente {
  id_cliente: string;
  nome: string;
  email: string;
  telefone: string;
}

export interface Lead {
  id_lead: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
}

