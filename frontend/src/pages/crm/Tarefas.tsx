import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Clock, Plus, RefreshCw, Filter, CheckCircle, AlertCircle, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TAREGAS_QUERY } from '@/graphql/tarefaQueries';
import { Skeleton } from '@/components/ui/skeleton';

interface Tarefa {
  id_tarefa: string;
  titulo: string;
  status_nome: string;
  responsavel_nome: string;
  prioridade: 'baixa' | 'media' | 'alta';
  prazo: string;
}

const mockStats = [
  { value: '47', label: 'Total Tarefas', icon: Clock, change: '+8%', trend: 'up' },
  { value: '12', label: 'Pendentes', icon: Clock, change: '+2', trend: 'up' },
  { value: '25', label: 'Em Progresso', icon: User, change: '-1', trend: 'down' },
  { value: '10', label: 'Concluídas', icon: CheckCircle, change: '+5', trend: 'up' },
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

export default function Tarefas() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const { data, loading, error, refetch } = useQuery(TAREGAS_QUERY);

  useEffect(() => {
    if (data) {
      setTarefas(data.tarefas || []);
    }
  }, [data]);

  const columns = [
    {
      accessorKey: 'id_tarefa',
      header: 'ID',
      cell: ({ row }: any) => <span className="font-mono text-sm">#T{row.original.id_tarefa}</span>,
    },
    {
      accessorKey: 'titulo',
      header: 'Título',
    },
    {
      accessorKey: 'responsavel_nome',
      header: 'Responsável',
    },
    {
      accessorKey: 'status_nome',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status_nome === 'Concluída' ? 'default' : 'secondary'}>
          {row.original.status_nome}
        </Badge>
      ),
    },
    {
      accessorKey: 'prioridade',
      header: 'Prioridade',
      cell: ({ row }: any) => {
        const prio = row.original.prioridade;
        const variant = prio === 'alta' ? 'destructive' : prio === 'media' ? 'default' : 'secondary';
        return <Badge variant={variant}>{prio.toUpperCase()}</Badge>;
      },
    },
    {
      accessorKey: 'prazo',
      header: 'Prazo',
    },
  ];

  const filteredTarefas = tarefas.filter(t => filterStatus === 'all' || t.status_nome === filterStatus);

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Tarefas</h1>
          <p className="text-gray-500 text-sm lg:text-base">Gerencie e acompanhe todas as tarefas da equipe</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Em Progresso">Em Progresso</SelectItem>
              <SelectItem value="Concluída">Concluída</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Tarefa</DialogTitle>
              </DialogHeader>
              <p>Formulário de nova tarefa aqui</p>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => <StatsCard key={i} stat={stat} />)}
      </div>

      {/* Table */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900">Lista de Tarefas ({filteredTarefas.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 space-y-4">
              <Skeleton className="h-64 w-full" />
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-lg text-gray-500 mb-4">Erro ao carregar tarefas</p>
              <Button onClick={() => refetch()}>Tentar novamente</Button>
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredTarefas} 
              enableActions
              searchKey="titulo"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

