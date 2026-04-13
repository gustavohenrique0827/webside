import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Clientes = () => {
  const clientes = [
    { nome: 'Posto XYZ Ltda', cnpj: '12.345.678/0001-99', status: 'Ativo', contato: '(34) 99912-3456' },
    { nome: 'Auto Posto ABC', cnpj: '98.765.432/0001-10', status: 'Ativo', contato: '(34) 99876-5432' },
    { nome: 'Combustíveis Lima', cnpj: '11.222.333/0001-44', status: 'Inativo', contato: '(34) 99765-4321' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie sua base de clientes</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader className="flex row items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>Todos os Clientes</CardTitle>
          </div>
          <Input placeholder="Buscar cliente..." className="w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clientes.map((cliente, index) => (
              <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-accent">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{cliente.nome}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'
                    }`}>
                      {cliente.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">CNPJ: {cliente.cnpj}</p>
                  <p className="text-sm text-primary font-medium">{cliente.contato}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Mail className="mr-1 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="mr-1 h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clientes;

