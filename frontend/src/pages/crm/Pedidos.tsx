import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Pedido } from '@/types/crm';
import type { ColumnDef } from '@tanstack/react-table';
import { Package, Truck, Plus, Download } from 'lucide-react';

const mockStats = [
  { value: '15', label: 'Total Pedidos', icon: Package, change: '+5', trend: 'up' },
  { value: 'R$ 156.200', label: 'Valor Total', icon: Truck, change: '+18%', trend: 'up' },
  { value: '8', label: 'Entregues', icon: Package, change: '+2', trend: 'up' },
  { value: '3', label: 'Pendentes', icon: Truck, change: '-1', trend: 'down' },
];

const mockPedidosData: Pedido[] = [
  { id_pedido: 'P001', cliente: 'Posto Central', valor: '12500', status_nome: 'Enviado', data: '2024-10-05' },
  { id_pedido: 'P002', cliente: 'Rede Fuel Pro', valor: '28200', status_nome: 'Entregue', data: '2024-10-04' },
  { id_pedido: 'P003', cliente: 'Auto Posto BR', valor: '8900', status_nome: 'Pendente', data: '2024-10-06' },
];

function StatsCard({ stat }: { stat: typeof mockStats[0] }) {
  const Icon = stat.icon;
  return (
    <Card className="hover:shadow-md transition-all border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center p-3">
              <Icon className="h-6 w-6 text-emerald-600" />
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

const columns: ColumnDef<Pedido>[] = [
  {
    accessorKey: 'id_pedido',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono text-sm">#{row.getValue('id_pedido')}</span>,
  },
  {
    accessorKey: 'cliente',
    header: 'Cliente',
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: ({ row }) => (
      <div className="font-mono font-semibold">R$ {parseFloat(row.getValue('valor') as string).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: 'status_nome',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status_nome') as string;
      return (
        <Badge variant={status === 'Entregue' ? 'default' : status === 'Pendente' ? 'secondary' : 'outline'}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => {
      const date = new Date(row.getValue('data') as string);
      return date.toLocaleDateString('pt-BR');
    },
  },
];

export default function Pedidos() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Pedidos</h1>
          <p className="text-gray-500 text-sm lg:text-base">Gerencie entregas e logística</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Package className="h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => <StatsCard key={i} stat={stat} />)}
      </div>

      {/* DataTable */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900">Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={mockPedidosData} 
            enableActions
            searchKey="cliente"
            onView={(id) => console.log('View pedido', id)}
            onEdit={(id) => console.log('Edit pedido', id)}
            onDelete={(id) => console.log('Delete pedido', id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

