import { gql } from '@apollo/client';

export const TAREGAS_QUERY = gql`
  query Tarefas {
    tarefas {
      id_tarefa
      titulo
      descricao
      status_nome
      responsavel_nome
      prazo
      data_criacao
      prioridade
      id_orcamento
    }
  }
`;

export const PIPELINE_QUERY = gql`
  query Pipeline {
    pipeline {
      etapa
      count
      valor_total
      orcamentos {
        id_orcamento
        cliente_nome
        valor_total
        status_nome
      }
    }
  }
`;

