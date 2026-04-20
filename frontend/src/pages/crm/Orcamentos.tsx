import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, DollarSign, Users, RefreshCw, Download, Plus } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_ORCAMENTOS } from '@/lib/queries';
import { Orcamento } from '@/types/crm';
import type { ColumnDef } from '@tanstack/react-table';

const mockStats = [
  { value: '12', label: 'Total', icon: FileText, change: '+2', trend: 'up' },
  { value: 'R$ 256.800', label: 'Valor Total', icon: DollarSign, change: '+23%', trend: 'up' },
  { value: '3', label: 'Aguardando', icon: Users, change: '+1', trend: 'up' },
  { value: '5', label: 'Aprovados', icon: Users, change: '+2', trend: 'up' },
];

function StatsCard({ stat }: { stat: typeof mockStats[0] }) {
  const Icon = stat.icon;
  return (
    <Card className="hover:shadow-md transition-shadow border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
          </div>
          <Badge className={`ml-auto ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {stat.change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

const columns: ColumnDef<Orcamento>[] = [
  {
    accessorKey: 'cliente.nome',
    header: 'Cliente',
  },
  {
    accessorKey: 'valor_total',
    header: 'Valor',
    cell: ({ row }) => (
      <div className="font-medium">R$ {row.getValue('valor_total')}</div>
    ),
  },
  {
    accessorKey: 'status_nome',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status_nome') as string;
      return (
        <Badge variant={status === 'Aprovado' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'data_criacao',
    header: 'Data',
    cell: ({ row }) => {
      const date = new Date(row.getValue('data_criacao') as string);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: 'validade',
    header: 'Validade',
    cell: ({ row }) => {
      const date = new Date(row.getValue('validade') as string);
      return date.toLocaleDateString();
    },
  },
];

export default function Orcamentos() {
  const [dateRange, setDateRange] = React.useState("month");
  const { data, loading, error, refetch } = useQuery(GET_ORCAMENTOS, {
    variables: { first: 20 },
  });

  const orcamentos = data?.orcamentos || [];
  const [openCreate, setOpenCreate] = React.useState(false);

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500">Erro ao carregar orçamentos: {error.message}</p>
        <Button onClick={() => refetch() } className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Orçamentos</h1>
          <p className="text-sm text-gray-500">Gerencie todos os orçamentos dos clientes</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Novo Orçamento
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {loading ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
        ) : (
          mockStats.map((stat, i) => <StatsCard key={i} stat={stat} />)
        )}
      </div>

      {/* DataTable */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Lista de Orçamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8">
              <Skeleton className="h-96 w-full" />
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={orcamentos} 
              enableActions
              searchKey="cliente"
              onView={(id) => console.log('View', id)}
              onEdit={(id) => console.log('Edit', id)}
              onDelete={(id) => console.log('Delete', id)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

