import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, TrendingUp, CreditCard, RefreshCw, Download, Filter, Plus } from 'lucide-react';

interface Transacao {
  id: string;
  tipo: string;
  descricao: string;
  valor: string;
  data: string;
  status: string;
}

const mockTransacoes: Transacao[] = [
  { id: 'T001', tipo: 'Recebimento', descricao: 'Fatura #F001 - Posto Central', valor: '+ R$ 12.500', data: '2024-10-05', status: 'Concluído' },
  { id: 'T002', tipo: 'Comissão', descricao: 'Vendedor João - 5%', valor: '- R$ 625', data: '2024-10-05', status: 'Pago' },
  { id: 'T003', tipo: 'Fatura', descricao: 'Fatura #F002 - Rede Fuel', valor: '+ R$ 28.200', data: '2024-10-06', status: 'Pendente' },
];

const mockStats = [
  { value: 'R$ 256.800', label: 'Recebido Mês', icon: DollarSign, change: '+23%', trend: 'up' },
  { value: 'R$ 45.300', label: 'Pendentes', icon: CreditCard, change: '-2%', trend: 'down' },
  { value: 'R$ 128.700', label: 'Previsto', icon: TrendingUp, change: '+15%', trend: 'up' },
  { value: '89%', label: 'Taxa Cobrança', icon: Filter, change: '+4%', trend: 'up' },
];

function StatsCard({ stat }: { stat: typeof mockStats[0] }) {
  const Icon = stat.icon;
  return (
    <Card className="hover:shadow-md transition-all border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center p-3">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
          </div>
          <Badge className={`ml-auto ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            {stat.change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono text-sm">#{row.getValue('id')}</span>,
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: ({ row }) => <span className={`font-mono font-semibold ${row.getValue('valor').startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{row.getValue('valor')}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <Badge variant={status === 'Concluído' ? 'default' : 'secondary'}>{status}</Badge>;
    },
  },
];

export default function Financeiro() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Financeiro</h1>
          <p className="text-gray-500 text-sm lg:text-base">Controle total de receitas e despesas</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Relatórios
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => (
          <StatsCard key={i} stat={stat} />
        ))}
      </div>

      {/* Chart Placeholder */}
      <Card className="shadow-sm border-gray-200 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Receita x Despesa (30 dias)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border-2 border-dashed border-indigo-200">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 text-indigo-500" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">R$ 128.700 líquidos</p>
                <p className="text-indigo-600 font-semibold">+23% vs mês anterior</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DataTable */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={mockTransacoes} 
            enableActions
            searchKey="descricao"
            onView={(id) => console.log('View transação', id)}
            onEdit={(id) => console.log('Edit transação', id)}
            onDelete={(id) => console.log('Delete transação', id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

