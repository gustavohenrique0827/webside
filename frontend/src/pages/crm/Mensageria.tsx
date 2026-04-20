import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Phone, Mail, Send, RefreshCw, Plus, Download } from 'lucide-react';

interface Mensagem {
  id: string;
  cliente: string;
  tipo: string;
  assunto: string;
  ultimaMsg: string;
  data: string;
  status: string;
}

const mockMensagens: Mensagem[] = [
  { id: 'M001', cliente: 'Posto Central', tipo: 'WhatsApp', assunto: 'Orçamento aprovado', ultimaMsg: 'Obrigado pela aprovação!', data: '2024-10-05 14:32', status: 'Aberta' },
  { id: 'M002', cliente: 'Rede Fuel Pro', tipo: 'Email', assunto: 'Fatura #F002', ultimaMsg: 'Fatura enviada com sucesso', data: '2024-10-05 09:15', status: 'Lida' },
  { id: 'M003', cliente: 'Auto Posto Turbo', tipo: 'WhatsApp', assunto: 'Dúvida sobre instalação', ultimaMsg: 'Preciso de mais detalhes...', data: '2024-10-04 18:45', status: 'Pendente' },
];

const mockStats = [
  { value: '1.247', label: 'WhatsApp/mês', icon: Phone, change: '+15%', trend: 'up' },
  { value: '892', label: 'Emails abertos', icon: Mail, change: '+8%', trend: 'up' },
  { value: '247', label: 'Conversas hoje', icon: MessageCircle, change: '+23', trend: 'up' },
  { value: '95%', label: 'Taxa resposta', icon: Send, change: '+2%', trend: 'up' },
];

function StatsCard({ stat }: { stat: typeof mockStats[0] }) {
  const Icon = stat.icon;
  return (
    <Card className="hover:shadow-md transition-all border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center p-3">
              <Icon className="h-6 w-6 text-purple-600" />
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
    accessorKey: 'cliente',
    header: 'Cliente',
  },
  {
    accessorKey: 'tipo',
    header: 'Canal',
    cell: ({ row }) => (
      <Badge variant="outline" className="px-3 py-1">
        {row.getValue('tipo')}
      </Badge>
    ),
  },
  {
    accessorKey: 'assunto',
    header: 'Assunto',
  },
  {
    accessorKey: 'ultimaMsg',
    header: 'Última Mensagem',
    cell: ({ row }) => <span className="text-sm max-w-[200px] truncate">{row.getValue('ultimaMsg')}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <Badge variant={status === 'Aberta' ? 'default' : 'secondary'}>{status}</Badge>;
    },
  },
];

export default function Mensageria() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Mensageria</h1>
          <p className="text-gray-500 text-sm lg:text-base">WhatsApp, Email e SMS automatizados</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => (
          <StatsCard key={i} stat={stat} />
        ))}
      </div>

      {/* Inbox DataTable */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900">Caixa de Entrada</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={mockMensagens} 
            enableActions
            searchKey="cliente"
            onView={(id) => console.log('Abrir conversa', id)}
            onEdit={(id) => console.log('Responder', id)}
            onDelete={(id) => console.log('Arquivar', id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

