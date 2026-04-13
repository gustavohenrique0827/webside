import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, DollarSign, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Clientes', value: '247', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Receita Mensal', value: 'R$ 47.892', change: '+8%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Leads Novos', value: '89', change: '+4%', icon: TrendingUp, color: 'text-emerald-600' },
    { title: 'Tickets Abertos', value: '12', change: '-2%', icon: Clock, color: 'text-orange-600' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs {stat.change > 0 ? 'text-green-600' : 'text-destructive'}">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            Gráfico em desenvolvimento
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Novo cliente adicionado</li>
              <li>Orçamento aprovado #123</li>
              <li>Relatório gerado</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

