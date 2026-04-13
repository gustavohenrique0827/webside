import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mail, Phone, User } from 'lucide-react';

const Perfil = () => {
  const [nome, setNome] = useState('João Silva');
  const [email, setEmail] = useState('joao@webside.com.br');
  const [telefone, setTelefone] = useState('(34) 99999-9999');

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Meu Perfil</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" className="mt-2">
                <Camera className="mr-2 h-4 w-4" />
                Alterar foto
              </Button>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium mb-2">Nome completo</label>
                <Input value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefone/WhatsApp</label>
                <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1">Salvar Alterações</Button>
            <Button variant="outline" className="flex-1">Alterar Senha</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Notificações
              </h3>
              <p className="text-sm text-muted-foreground">Receber notificações por email e WhatsApp</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Perfil;


