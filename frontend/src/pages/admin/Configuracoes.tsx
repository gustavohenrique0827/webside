import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Mail, Phone, Database, Shield, Download } from 'lucide-react';

const Configuracoes = () => {
  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6" />
              <div>
                <CardTitle>Geral</CardTitle>
                <CardDescription>Configurações principais do sistema</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Notificações por email</h3>
                <p className="text-sm text-muted-foreground">Receber alertas importantes</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Backup automático</h3>
                <p className="text-sm text-muted-foreground">Backup diário às 2h</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6" />
              <div>
                <CardTitle>Email</CardTitle>
                <CardDescription>Configurar emails do sistema</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email remetente</label>
              <Input placeholder="noreply@webside.com.br" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SMTP Host</label>
              <Input placeholder="smtp.gmail.com" />
            </div>
            <Button className="w-full">Testar Configuração</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6" />
              <div>
                <CardTitle>Segurança & Backup</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="w-full">
                <Database className="mr-2 h-4 w-4" />
                Backup Agora
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Backup
              </Button>
              <Button className="w-full">
                Usuários & Permissões
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;


