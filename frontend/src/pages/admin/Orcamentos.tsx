import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Orcamentos = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-muted-foreground">Gerencie orçamentos e propostas</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Orçamento
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Orçamentos Recentes</CardTitle>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Input placeholder="Buscar..." className="h-9 w-64" />
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-lg hover:bg-accent">
              <FileText className="h-8 w-8 text-primary mr-4" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">Orçamento #123</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aprovado</span>
                </div>
                <p className="text-sm text-muted-foreground">Cliente XYZ Ltda • R$ 15.800</p>
              </div>
              <Button variant="ghost" size="sm">Ver</Button>
            </div>
            <div className="flex items-center p-4 border rounded-lg hover:bg-accent">
              <FileText className="h-8 w-8 text-primary mr-4" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">Orçamento #122</h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pendente</span>
                </div>
                <p className="text-sm text-muted-foreground">Cliente ABC Posto • R$ 28.500</p>
              </div>
              <Button variant="ghost" size="sm">Editar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orcamentos;

