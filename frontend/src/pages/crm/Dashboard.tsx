import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

const mockStats = [
  { value: "R$ 256k", label: "Receita", icon: DollarSign, change: "+23%" },
  { value: "1.247", label: "Leads", icon: Users, change: "+15%" },
  { value: "89%", label: "Conversão", icon: TrendingUp, change: "+4%" },
  { value: "R$ 3.2M", label: "Total", icon: LayoutDashboard, change: "+12%" }
];

const mockRecent = [
  { id: 1, type: 'Orçamento', cliente: 'João Silva', value: 'R$ 5.200', status: 'Aprovado' },
  { id: 2, type: 'Lead', cliente: 'Maria Santos', status: 'Novo' },
  { id: 3, type: 'Pedido', cliente: 'Empresa XYZ', value: 'R$ 12.500', status: 'Pendente' },
];

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("month");
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Visão geral do CRM</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mês</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={refreshData} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[hsl(var(--brand-blue)/0.1)] rounded-lg flex items-center justify-center p-3">
                      <Icon className="h-6 w-6 text-[hsl(var(--brand-blue))]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                  <Badge className="text-xs bg-[hsl(var(--brand-blue)/0.1)] text-[hsl(var(--brand-blue))]">{stat.change}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pipeline */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 h-32 p-4 border rounded-lg">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Novo (12)</span>
              <div className="h-16 bg-gray-100 rounded p-2 text-xs text-gray-500">Leads</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Proposta (5)</span>
              <div className="h-16 bg-gray-100 rounded p-2 text-xs text-gray-500">Orcamentos</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Fechado (23)</span>
              <div className="h-20 bg-gray-100 rounded p-2 text-xs text-gray-500">Vendas</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Pipeline (8)</span>
              <div className="h-16 bg-gray-100 rounded p-2 text-xs text-gray-500">Em análise</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRecent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-gray-900">{item.type}</TableCell>
                  <TableCell>{item.cliente}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
