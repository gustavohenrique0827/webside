

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Client {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: 'Ativo' | 'Novo' | 'Inativo';
  cnpj?: string;
}

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Client>) => void;
  client?: Client | null;
  loading?: boolean;
}

export default function ClientFormDialog({ open, onOpenChange, onSubmit, client, loading = false }: ClientFormDialogProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    status: 'Novo' as 'Ativo' | 'Novo' | 'Inativo',
    cnpj: '',
  });

  useEffect(() => {
    if (client) {
      setFormData({
        nome: client.nome,
        email: client.email,
        telefone: client.telefone,
        status: client.status,
        cnpj: client.cnpj || '',
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        status: 'Novo',
        cnpj: '',
      });
    }
  }, [client, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-0">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-6 rounded-t-lg border-b">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-bold text-white">
              {client ? 'Editar Cliente' : 'Novo Cliente'}
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-sm">
              {client ? 'Atualize as informações do cliente.' : 'Preencha os dados do novo cliente.'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="nome" className="text-foreground font-medium mb-2 block">
                Nome/Razão Social *
              </Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="h-12 rounded-xl"
                placeholder="Digite o nome do cliente"
                required
              />
            </div>

            <div>
              <Label htmlFor="cnpj" className="text-foreground font-medium mb-2 block">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                className="h-12 rounded-xl"
                placeholder="00.000.000/0001-00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email" className="text-foreground font-medium mb-2 block">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 rounded-xl"
                placeholder="contato@empresa.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefone" className="text-foreground font-medium mb-2 block">
                Telefone/WhatsApp *
              </Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="h-12 rounded-xl"
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status" className="text-foreground font-medium mb-2 block">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Novo">Novo</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-3 pt-6 mt-6 border-t bg-muted/30">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-12 px-6">
              Cancelar
            </Button>
            <Button type="submit" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 font-semibold shadow-lg" disabled={loading}>
              {loading ? 'Salvando...' : client ? 'Atualizar Cliente' : 'Criar Cliente'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
