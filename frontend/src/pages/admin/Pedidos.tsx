import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const Pedidos = () => {
  const pedidos = [
    { id: '#001', cliente: 'Posto XYZ', status: 'Entregue', data: '2024-01-15', valor: 'R$ 12.400' },
    { id: '#002', cliente: 'Posto ABC', status: 'Em trânsito', data: '2024-01-14', valor: 'R$ 8.900' },
    { id: '#003', cliente: 'Auto Posto Ltda', status: 'Processando', data: '2024-01-14', valor: 'R$ 23.100' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="flex items-center p-6 border rounded-xl hover:shadow-md transition-all">
                <Package className="h-12 w-12 text-primary mr-6 flex-shrink-0" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ID</p>
                    <p className="font-semibold">{pedido.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                    <p className="font-medium">{pedido.cliente}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pedido.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                      pedido.status === 'Em trânsito' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pedido.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">Valor</p>
                    <p className="font-bold text-lg">{pedido.valor}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Detalhes</Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Truck className="mr-2 h-4 w-4" />
                    Rastrear
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

export default Pedidos;

