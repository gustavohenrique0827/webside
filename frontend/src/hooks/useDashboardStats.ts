import { useState, useEffect, useCallback } from 'react';
import { apolloClient } from '../lib/apollo';
import { gql } from '@apollo/client';

const GET_DASHBOARD_STATS = gql`
  query DashboardStats {
    leadsCount: leads {
      id
    }
    orcamentosCount: orcamentos {
      id
    }
    pedidosCount: pedidos {
      id
    }
    clientesCount: clientes {
      id
    }
    receitaMensal: transacoes(where: { data: { gte: "2024-10-01" } }) {
      valor
    }
  }
`;

export interface DashboardStats {
  leadsCount: number;
  orcamentosCount: number;
  pedidosCount: number;
  clientesCount: number;
  receitaMensal: number;
}

export function useDashboardStats() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apolloClient.query({
        query: GET_DASHBOARD_STATS,
        fetchPolicy: 'network-only' as const,
      });

      const stats = result.data as any;
      setData({
        leadsCount: stats.leadsCount?.length || 0,
        orcamentosCount: stats.orcamentosCount?.length || 0,
        pedidosCount: stats.pedidosCount?.length || 0,
        clientesCount: stats.clientesCount?.length || 0,
        receitaMensal: stats.receitaMensal?.reduce((sum: number, t: any) => sum + (parseFloat(t.valor) || 0), 0) || 0,
      });
    } catch (err) {
      setError(err as Error);
      console.error('Dashboard stats error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = fetchData;

  return { data, loading, error, refetch };
}

