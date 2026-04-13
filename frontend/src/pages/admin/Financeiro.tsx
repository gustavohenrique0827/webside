import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Download, CreditCard } from 'lucide-react';

const Financeiro = () => {
  const stats = [
    { title: 'Receita Total', value: 'R$ 247.892', change: '+12%', icon: DollarSign },
    { title: 'Despesas', value: 'R$ 89.400', change: '-3%', icon: TrendingUp },
    { title: 'Lucro Líquido', value: 'R$ 158.492', change: '+18%', icon: DollarSign },
    { title: 'Recebíveis', value: 'R$ 45.200', change: '+5%', icon: CreditCard },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Relatório PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <stat.icon className="h-8 w-8 text-primary" />
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-destructive'}`}>
                {stat.change} que mês passado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Fluxo de Caixa - Últimos 30 dias</CardTitle>
        </CardHeader>
        <CardContent className="h-80 bg-gradient-to-r from-muted to-background/60 rounded-xl flex items-center justify-center">
          <p>Gráfico de fluxo de caixa (em desenvolvimento)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financeiro;


