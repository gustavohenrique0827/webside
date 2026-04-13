import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Filter, Search } from 'lucide-react';

const Leads = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Gerencie seus leads e oportunidades</p>
        </div>
        <Button>
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Novo Lead</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nome</label>
              <Input placeholder="Nome do lead" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Telefone/WhatsApp</label>
              <Input placeholder="(34) 99999-9999" />
            </div>
          </div>
          <Button className="w-full">Salvar Lead</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <Input placeholder="Buscar leads..." className="max-w-sm" />
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg">João Silva - (34) 99912-3456 - Novo</div>
            <div className="p-4 border rounded-lg">Maria Santos - (34) 99876-5432 - Contatado</div>
            <div className="p-4 border rounded-lg bg-blue-50">Pedro Lima - (34) 99765-4321 - Reunião marcada</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;

