import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Clock, User } from 'lucide-react';

const Mensageria = () => {
  const [messages, setMessages] = useState([
    { id: 1, client: 'João Silva', status: 'Enviada', time: '14:32', type: 'WhatsApp' },
    { id: 2, client: 'Maria Santos', status: 'Lida', time: '14:28', type: 'SMS' },
    { id: 3, client: 'Pedro Lima', status: 'Respondida', time: '14:15', type: 'WhatsApp' },
  ]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mensageria</h1>
          <p className="text-muted-foreground">Campanhas e comunicações automatizadas</p>
        </div>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mensagens Recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <MessageCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium truncate">{msg.client}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">{msg.type}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{msg.status}</span>
                  <span>{msg.time}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Mensageria;

