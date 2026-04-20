import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Lead } from '@/types/crm';
import type { ColumnDef } from '@tanstack/react-table';
import { Users, Plus, Filter } from 'lucide-react';

const mockStats = [
  { value: '24', label: 'Total Leads', icon: Users, change: '+12%', trend: 'up' },
  { value: '8', label: 'Novos', icon: Plus, change: '+3', trend: 'up' },
  { value: '12', label: 'Qualificados', icon: Users, change: '+5', trend: 'up' },
  { value: '4', label: 'Conversão', icon: Filter, change: '67%', trend: 'up' },
];

const mockLeadsData: Lead[] = [
  { id_lead: 'L001', nome: 'Posto Sol Nascente', email: 'contato@sol.com', telefone: '(11) 9999-1234', status: 'Novo' },
  { id_lead: 'L002', nome: 'Rede Fuel Pro', email: 'vendas@fuel.com', telefone: '(21) 9999-5678', status: 'Qualificado' },
  { id_lead: 'L003', nome: 'Auto Posto Turbo', email: 'gerente@turbo.com', telefone: '(31) 9999-9012', status: 'Proposta' },
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

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'nome',
    header: 'Cliente',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'telefone',
    header: 'Telefone',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variants = {
        'Novo': 'default' as const,
        'Qualificado': 'secondary' as const,
        'Proposta': 'outline' as const,
        'Fechado': 'destructive' as const,
      };
      return (
        <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
          {status}
        </Badge>
      );
    },
  },
];

export default function Leads() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Leads</h1>
          <p className="text-gray-500 text-sm lg:text-base">Gerencie seu pipeline de leads e oportunidades</p>
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
            <Users className="h-4 w-4" />
            Atualizar
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Novo Lead
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
          <CardTitle className="text-xl font-bold text-gray-900">Lista de Leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={mockLeadsData} 
            enableActions
            searchKey="nome"
            onView={(id) => console.log('View lead', id)}
            onEdit={(id) => console.log('Edit lead', id)}
            onDelete={(id) => console.log('Delete lead', id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

