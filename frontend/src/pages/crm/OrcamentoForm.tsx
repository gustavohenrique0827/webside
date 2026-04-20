import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, gql } from '@apollo/client';
import { useToast } from '@/components/ui/use-toast';

const CREATE_ORCAMENTO = gql`
  mutation CreateOrcamento($input: OrcamentoInput!) {
    createOrcamento(input: $input) {
      id_orcamento
      cliente_id
      valor_total
      status
    }
  }
`;

export function OrcamentoForm() {
  const [formData, setFormData] = React.useState({
    cliente_id: '1',
    valor_total: '1000',
    id_filial: '1',
    id_colaborador: '1',
    validade: '2024-12-31',
  });
  const [createOrcamento, { loading }] = useMutation(CREATE_ORCAMENTO);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createOrcamento({ 
        variables: { 
          input: {
            ...formData,
            valor_total: parseFloat(formData.valor_total),
          } 
        } 
      });
      toast({ title: 'Sucesso', description: 'Orçamento criado com sucesso!' });
      setFormData({
        cliente_id: '1',
        valor_total: '1000',
        id_filial: '1',
        id_colaborador: '1',
        validade: '2024-12-31',
      });
    } catch (error: any) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    }
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof typeof formData) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Cliente</Label>
        <Select value={formData.cliente_id} onValueChange={handleSelectChange('cliente_id')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Cliente Demo 1</SelectItem>
            <SelectItem value="2">Cliente Demo 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Valor Total (R$)</Label>
        <Input 
          type="number" 
          step="0.01"
          value={formData.valor_total} 
          onChange={handleChange('valor_total')} 
          placeholder="1000.00" 
        />
      </div>
      <div className="space-y-2">
        <Label>Filial</Label>
        <Select value={formData.id_filial} onValueChange={handleSelectChange('id_filial')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione filial" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Demo Filial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Colaborador</Label>
        <Select value={formData.id_colaborador} onValueChange={handleSelectChange('id_colaborador')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione colaborador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Admin Demo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Validade</Label>
        <Input type="date" value={formData.validade} onChange={handleChange('validade')} />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Criando...' : 'Criar Orçamento'}
        </Button>
        <Button type="button" variant="outline">Limpar</Button>
      </div>
    </form>
  );
}

