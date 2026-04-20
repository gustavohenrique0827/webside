import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '../../components/crm/DataTable';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart3, FileText, Calendar, Download, Filter, TrendingUp, Users, DollarSign, 
  RefreshCw, Share2, Printer, FileSpreadsheet 
} from 'lucide-react';

const mockTopClientes = [
  { nome: 'Posto Central Ltda', receita: 'R$ 45.200', orcamentos: 12 },
  { nome: 'Rede Fuel Pro', receita: 'R$ 32.100', orcamentos: 8 },
  { nome: 'Auto Posto Turbo', receita: 'R$ 28.900', orcamentos: 15 },
];

const columnsTopClientes = [
  {
    accessorKey: 'nome',
    header: 'Cliente',
  },
  {
    accessorKey: 'receita',
    header: 'Receita',
    cell: ({ row }) => <span className="font-mono font-bold">{row.getValue('receita')}</span>,
  },
  {
    accessorKey: 'orcamentos',
    header: 'Orçamentos',
  },
];

export default function Relatorios() {
  const [dateRange, setDateRange] = useState('month');
  const [activeTab, setActiveTab] = useState('vendas');

  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Relatórios</h1>
          <p className="text-gray-500 text-sm lg:text-base">Análises detalhadas e insights estratégicos</p>
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
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white border-gray-200 rounded-xl p-1 shadow-sm mb-8">
          <TabsTrigger value="vendas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-lg h-14">
            <DollarSign className="h-4 w-4 mr-2" />
            Vendas
          </TabsTrigger>
          <TabsTrigger value="clientes" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 rounded-lg h-14">
            <Users className="h-4 w-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="financeiro" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 rounded-lg h-14">
            <TrendingUp className="h-4 w-4 mr-2" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="atividade" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 rounded-lg h-14">
            <Calendar className="h-4 w-4 mr-2" />
            Atividade
          </TabsTrigger>
        </TabsList>

        {/* Vendas Tab */}
        <TabsContent value="vendas">
          <div className="grid lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-8 shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Vendas por Mês (2024)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-200 mx-2 -mt-6 -mb-6">
                  <div className="text-center">
                    <BarChart3 className="h-20 w-20 mx-auto mb-6 text-blue-500" />
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-gray-900">R$ 256.800</p>
                      <Badge className="text-lg px-4 py-2 bg-green-100 text-green-800">+23% vs anterior</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <Button variant="ghost" className="justify-start h-12 w-full rounded-xl hover:bg-gray-50">
                  <Download className="h-5 w-5 mr-3" />
                  Relatório Mensal
                </Button>
                <Button variant="ghost" className="justify-start h-12 w-full rounded-xl hover:bg-gray-50">
                  <Printer className="h-5 w-5 mr-3" />
                  Imprimir Resumo
                </Button>
                <Button variant="ghost" className="justify-start h-12 w-full rounded-xl hover:bg-gray-50">
                  <Share2 className="h-5 w-5 mr-3" />
                  Agendar Automático
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Clientes Tab */}
        <TabsContent value="clientes">
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle>Top 10 Clientes por Receita</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable 
                columns={columnsTopClientes} 
                data={mockTopClientes} 
                enableActions={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financeiro Tab */}
        <TabsContent value="financeiro">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recebimentos</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-8">
                <DollarSign className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <div className="text-3xl font-bold text-gray-900 mb-2">R$ 256K</div>
                <p className="text-green-600 font-semibold">+23% M/M</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Pendências</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-8">
                <DollarSign className="h-16 w-16 mx-auto mb-4 text-orange-500" />
                <div className="text-3xl font-bold text-gray-900 mb-2">R$ 45K</div>
                <p className="text-orange-600 font-semibold">12 faturas</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-gray-200 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Previsão</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-8">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                <div className="text-3xl font-bold text-gray-900 mb-2">R$ 89K</div>
                <p className="text-blue-600 font-semibold">Próximos 30 dias</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Atividade Tab */}
        <TabsContent value="atividade">
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle>Atividade dos Usuários (7 dias)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl flex items-center justify-center border-2 border-dashed border-purple-200">
                <div className="text-center">
                  <Calendar className="h-20 w-20 mx-auto mb-6 text-purple-500" />
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-gray-900">1.247 ações</p>
                    <Badge variant="outline" className="text-lg px-4 py-2">+15% vs semana anterior</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

