import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Cliente } from '@/types/crm';
import type { ColumnDef } from '@tanstack/react-table';
import { Users, Plus, RefreshCw, Download, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ClienteForm } from './ClienteForm';

const mockStats = [
  { value: '127', label: 'Total Clientes', icon: Users, change: '+12%', trend: 'up' },
  { value: '89', label: 'Ativos', icon: Users, change: '+5', trend: 'up' },
  { value: '38', label: 'Novos', icon: Plus, change: '+8', trend: 'up' },
  { value: '95%', label: 'Retenção', icon: Filter, change: '+2%', trend: 'up' },
];

const mockClientesData: Cliente[] = [
  { id_cliente: 'C001', nome: 'Posto Central Ltda', email: 'contato@postocentral.com', telefone: '(11) 9999-1234' },
  { id_cliente: 'C002', nome: 'Rede Combustível', email: 'faturamento@redecomb.com', telefone: '(21) 9999-5678' },
  { id_cliente: 'C003', nome: 'Auto Posto BR', email: 'gerencia@autopostobr.com', telefone: '(31) 9999-9012' },
  { id_cliente: 'C004', nome: 'Posto Sol Nascente', email: 'contato@sol.com', telefone: '(41) 9999-3456' },
];

function StatsCard({ stat }: { stat: typeof mockStats[0] }) {
  const Icon = stat.icon;
  return (
    <Card className="hover:shadow-md transition-all border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center p-3">
              <Icon className="h-6 w-6 text-blue-600" />
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

const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: 'id_cliente',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono text-sm">#{row.getValue('id_cliente')}</span>,
  },
  {
    accessorKey: 'nome',
    header: 'Nome/Razão Social',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'telefone',
    header: 'Telefone',
  },
];

export default function Clientes() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Clientes</h1>
          <p className="text-gray-500 text-sm lg:text-base">Gerencie sua base completa de clientes</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Novo Cliente</DialogTitle>
                <DialogDescription>Grupo Econômico obrigatório. Preencha os dados essenciais.</DialogDescription>
              </DialogHeader>
              <ClienteForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => <StatsCard key={i} stat={stat} />)}
      </div>

      {/* DataTable */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={mockClientesData} 
            enableActions
            searchKey="nome"
            onView={(id) => console.log('View cliente', id)}
            onEdit={(id) => console.log('Edit cliente', id)}
            onDelete={(id) => console.log('Delete cliente', id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

