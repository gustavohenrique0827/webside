import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Edit3, Trash2, Phone, Mail, MapPin, Building } from 'lucide-react';

interface Client {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: 'Ativo' | 'Novo' | 'Inativo';
  cnpj?: string;
  endereco?: string;
}

interface ClientViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClientViewDialog({ open, onOpenChange, client, onEdit, onDelete }: ClientViewDialogProps) {
  if (!client) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 px-6 py-6 border-b">
          <DialogHeader className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-white">
                  {client.nome}
                </DialogTitle>
                <Badge className={`mt-2 px-3 py-1 ${client.status === 'Ativo' ? 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30' : client.status === 'Novo' ? 'bg-blue-400/20 text-blue-400 border-blue-400/30' : 'bg-red-400/20 text-red-400 border-red-400/30'}`}>
                  {client.status}
                </Badge>
              </div>
              {client.cnpj && (
                <Badge variant="outline" className="border-white/50 text-white/80">
                  CNPJ
                </Badge>
              )}
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl flex items-center gap-2 text-foreground">
              <Mail className="h-5 w-5" />
              Contato
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-xl group hover:bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">{client.email}</p>
                  <button
                    onClick={() => copyToClipboard(client.email)}
                    className="text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 mt-1"
                  >
                    Copiar
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-xl group hover:bg-muted">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">{client.telefone}</p>
                  <button
                    onClick={() => copyToClipboard(client.telefone)}
                    className="text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 mt-1"
                  >
                    Copiar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {client.cnpj && (
            <div className="space-y-4">
              <h3 className="font-bold text-xl flex items-center gap-2 text-foreground">
                <Building className="h-5 w-5" />
                Dados Fiscais
              </h3>
              <div className="p-4 bg-muted/20 rounded-xl">
                <p className="font-mono text-sm opacity-80 break-all">{client.cnpj}</p>
              </div>
            </div>
          )}

          {client.endereco && (
            <div className="space-y-4">
              <h3 className="font-bold text-xl flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5" />
                Endereço
              </h3>
              <div className="p-4 bg-muted/20 rounded-xl">
                <p className="text-sm leading-relaxed">{client.endereco}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <DialogFooter className="px-6 py-4 border-t bg-muted/30 gap-3">
          <Button
            variant="outline"
            onClick={() => copyToClipboard(JSON.stringify(client, null, 2))}
            className="flex items-center gap-2"
          >
            Exportar JSON
          </Button>
          <Button variant="outline" onClick={onEdit} className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete} className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Remover Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
