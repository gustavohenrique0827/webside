import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, FileText, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Relatorios = () => {
  const [periodo, setPeriodo] = useState('mes');

  const relatorios = [
    { title: 'Vendas por Cliente', tipo: 'pdf', data: '01/01/2024' },
    { title: 'Lucratividade por Produto', tipo: 'excel', data: '15/12/2023' },
    { title: 'Relatório Mensal', tipo: 'pdf', data: '01/01/2024' },
    { title: 'Análise de Estoque', tipo: 'excel', data: '10/01/2024' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <div className="flex gap-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dia">Hoje</SelectItem>
              <SelectItem value="semana">Esta semana</SelectItem>
              <SelectItem value="mes">Este mês</SelectItem>
              <SelectItem value="ano">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Período Personalizado
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatorios.map((relatorio, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <h3 className="font-semibold">{relatorio.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{relatorio.data}</span>
                    <span className="px-2 py-1 bg-muted rounded-full text-xs capitalize">{relatorio.tipo}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar {relatorio.tipo.toUpperCase()}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;

