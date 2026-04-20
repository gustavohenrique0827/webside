import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  clientName: string;
}

export default function DeleteConfirmDialog({ open, onOpenChange, onConfirm, clientName }: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-destructive/20">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">Confirmar Exclusão</DialogTitle>
          <DialogDescription className="text-lg text-center leading-relaxed">
            Tem certeza que deseja excluir o cliente <span className="font-semibold text-destructive">"{clientName}"</span>? 
            <br />
            <span className="text-sm text-muted-foreground mt-2 block">
              Esta ação não pode ser desfeita. Orçamentos e histórico associados serão perdidos.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm}
            className="flex-1 h-12 bg-destructive hover:bg-destructive/90 font-semibold shadow-lg flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Sim, Excluir Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
