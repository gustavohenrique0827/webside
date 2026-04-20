import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from '@apollo/client';
import { CREATE_CLIENTE } from '@/lib/queries';
import { useToast } from '@/components/ui/use-toast';

export function ClienteForm() {
  const [formData, setFormData] = React.useState({
    nome: '',
    email: '',
    telefone: '',
    id_grupo: '',
    id_filial: '',
  });
  const [createCliente, { loading }] = useMutation(CREATE_CLIENTE);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.id_grupo) {
      toast({ title: 'Erro', description: 'Grupo Econômico é obrigatório!', variant: 'destructive' });
      return;
    }
    try {
      await createCliente({ variables: { input: formData } });
      toast({ title: 'Sucesso', description: 'Cliente criado!' });
      window.location.reload();
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome / Razão Social *</Label>
        <Input id="nome" value={formData.nome} onChange={handleChange('nome')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={formData.email} onChange={handleChange('email')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input id="telefone" value={formData.telefone} onChange={handleChange('telefone')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="id_grupo">Grupo Econômico *</Label>
        <Select value={formData.id_grupo} onValueChange={(v) => setFormData({ ...formData, id_grupo: v })} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o grupo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Grupo Demo 1</SelectItem>
            <SelectItem value="2">Grupo Demo 2</SelectItem>
            <SelectItem value="3">Postos Independentes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="id_filial">Filial (opcional)</Label>
        <Input id="id_filial" value={formData.id_filial} onChange={handleChange('id_filial')} placeholder="1" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Criando...' : 'Criar Cliente'}
        </Button>
        <Button type="button" variant="outline">Cancelar</Button>
      </div>
    </form>
  );
}

