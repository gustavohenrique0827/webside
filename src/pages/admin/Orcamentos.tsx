
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Search, Calendar, DollarSign, MoreHorizontal, FileText, User, Building2, Phone, Mail, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Orcamento {
  id: string;
  cliente: string;
  valor: number;
  data: string;
  validade: string;
  status: string;
}

const orcamentosData: Orcamento[] = [
  { id: 'ORC-001', cliente: 'Posto Central', valor: 45000, data: '2024-01-15', validade: '2024-02-15', status: 'Aguardando' },
  { id: 'ORC-002', cliente: 'Rede Combustível', valor: 128000, data: '2024-01-12', validade: '2024-02-12', status: 'Aprovado' },
  { id: 'ORC-003', cliente: 'Auto Posto BR', valor: 67500, data: '2024-01-10', validade: '2024-02-10', status: 'Revisão' },
  { id: 'ORC-004', cliente: 'Posto Shell', valor: 89000, data: '2024-01-08', validade: '2024-02-08', status: 'Aguardando' },
  { id: 'ORC-005', cliente: 'Grupo Ipiranga', valor: 234000, data: '2024-01-05', validade: '2024-02-05', status: 'Recusado' },
];

const statusColors: Record<string, string> = {
  'Aguardando': 'bg-yellow-100 text-yellow-800',
  'Aprovado': 'bg-green-100 text-green-800',
  'Revisão': 'bg-blue-100 text-blue-800',
  'Recusado': 'bg-red-100 text-red-800',
};

const Orcamentos: React.FC = () => {
  const [search, setSearch] = useState('');
  const [orcamentos, setOrcamentos] = useState(orcamentosData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewingOrcamento, setViewingOrcamento] = useState<Orcamento | null>(null);
  const [newOrcamento, setNewOrcamento] = useState({
    origem: 'lead', // 'lead' or 'cliente'
    leadId: '',
    clienteId: '',
    // Company data
    empresa: '',
    cnpj: '',
    contato: '',
    telefone: '',
    email: '',
    // Header
    vendedor: '',
    filial: '',
    validade: 30,
    // Items
    itens: [{ produto: '', descricao: '', quantidade: 1, valorUnitario: 0, descontoPercentual: 0, descontoValor: 0 }],
    // Values
    descontoGeral: 0,
    parcelas: 1,
    observacoes: ''
  });

  const filteredOrcamentos = orcamentos.filter(orc =>
    orc.cliente.toLowerCase().includes(search.toLowerCase()) ||
    orc.id.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleView = (orcamento: Orcamento) => {
    setViewingOrcamento(orcamento);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (orcamento: Orcamento) => {
    setViewingOrcamento(orcamento);
    setNewOrcamento({
      origem: 'cliente',
      leadId: '',
      clienteId: '',
      empresa: orcamento.cliente,
      cnpj: '',
      contato: '',
      telefone: '',
      email: '',
      vendedor: '',
      filial: '',
      validade: 30,
      itens: [{ produto: '', descricao: '', quantidade: 1, valorUnitario: orcamento.valor, descontoPercentual: 0, descontoValor: 0 }],
      descontoGeral: 0,
      parcelas: 1,
      observacoes: ''
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setOrcamentos(orcamentos.filter(orc => orc.id !== id));
  };

  const handleStatusChange = (orcamento: Orcamento, newStatus: string) => {
    setOrcamentos(orcamentos.map(orc =>
      orc.id === orcamento.id
        ? { ...orc, status: newStatus }
        : orc
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      // Update existing orcamento
      setOrcamentos(orcamentos.map(orc =>
        orc.id === viewingOrcamento.id
          ? { ...orc, cliente: newOrcamento.empresa, valor: newOrcamento.itens[0]?.valorUnitario || orc.valor }
          : orc
      ));
      setIsEditMode(false);
    } else {
      // Add new orcamento
      const newId = `ORC-${String(orcamentos.length + 1).padStart(3, '0')}`;
      const newOrc = {
        id: newId,
        cliente: newOrcamento.empresa,
        valor: newOrcamento.itens[0]?.valorUnitario || 0,
        data: new Date().toISOString().split('T')[0],
        validade: new Date(Date.now() + newOrcamento.validade * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Aguardando'
      };
      setOrcamentos([...orcamentos, newOrc]);
    }
    setNewOrcamento({
      origem: 'lead',
      leadId: '',
      clienteId: '',
      empresa: '',
      cnpj: '',
      contato: '',
      telefone: '',
      email: '',
      vendedor: '',
      filial: '',
      validade: 30,
      itens: [{ produto: '', descricao: '', quantidade: 1, valorUnitario: 0, descontoPercentual: 0, descontoValor: 0 }],
      descontoGeral: 0,
      parcelas: 1,
      observacoes: ''
    });
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout title="Orçamentos">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orçamentos</h1>
            <p className="text-muted-foreground">Gerencie propostas comerciais</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Novo Orçamento
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Criar Novo Orçamento
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Origem */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Origem do Orçamento</Label>
                  <Select value={newOrcamento.origem} onValueChange={(value) => setNewOrcamento({ ...newOrcamento, origem: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="cliente">Cliente Existente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Data */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dados da Empresa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="empresa" className="text-sm font-medium">
                        Empresa *
                      </Label>
                      <div className="relative">
                        <Input
                          id="empresa"
                          placeholder="Nome da empresa"
                          value={newOrcamento.empresa}
                          onChange={(e) => setNewOrcamento({ ...newOrcamento, empresa: e.target.value })}
                          className="pl-10"
                          required
                        />
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj" className="text-sm font-medium">
                        CNPJ
                      </Label>
                      <Input
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        value={newOrcamento.cnpj}
                        onChange={(e) => setNewOrcamento({ ...newOrcamento, cnpj: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contato" className="text-sm font-medium">
                        Contato
                      </Label>
                      <div className="relative">
                        <Input
                          id="contato"
                          placeholder="Nome do contato"
                          value={newOrcamento.contato}
                          onChange={(e) => setNewOrcamento({ ...newOrcamento, contato: e.target.value })}
                          className="pl-10"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-sm font-medium">
                        Telefone
                      </Label>
                      <div className="relative">
                        <Input
                          id="telefone"
                          placeholder="(11) 99999-9999"
                          value={newOrcamento.telefone}
                          onChange={(e) => setNewOrcamento({ ...newOrcamento, telefone: e.target.value })}
                          className="pl-10"
                        />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="contato@empresa.com"
                          value={newOrcamento.email}
                          onChange={(e) => setNewOrcamento({ ...newOrcamento, email: e.target.value })}
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cabeçalho do Orçamento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendedor" className="text-sm font-medium">
                        Vendedor *
                      </Label>
                      <Input
                        id="vendedor"
                        placeholder="Nome do vendedor"
                        value={newOrcamento.vendedor}
                        onChange={(e) => setNewOrcamento({ ...newOrcamento, vendedor: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filial" className="text-sm font-medium">
                        Filial
                      </Label>
                      <Input
                        id="filial"
                        placeholder="Filial responsável"
                        value={newOrcamento.filial}
                        onChange={(e) => setNewOrcamento({ ...newOrcamento, filial: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validade" className="text-sm font-medium">
                        Validade (dias)
                      </Label>
                      <Input
                        id="validade"
                        type="number"
                        min="1"
                        value={newOrcamento.validade}
                        onChange={(e) => setNewOrcamento({ ...newOrcamento, validade: parseInt(e.target.value) || 30 })}
                      />
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Itens do Orçamento</h3>
                  {newOrcamento.itens.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Produto/Serviço *</Label>
                          <Input
                            placeholder="Nome do produto/serviço"
                            value={item.produto}
                            onChange={(e) => {
                              const newItens = [...newOrcamento.itens];
                              newItens[index].produto = e.target.value;
                              setNewOrcamento({ ...newOrcamento, itens: newItens });
                            }}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Descrição</Label>
                          <Input
                            placeholder="Descrição detalhada"
                            value={item.descricao}
                            onChange={(e) => {
                              const newItens = [...newOrcamento.itens];
                              newItens[index].descricao = e.target.value;
                              setNewOrcamento({ ...newOrcamento, itens: newItens });
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Quantidade *</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantidade}
                            onChange={(e) => {
                              const newItens = [...newOrcamento.itens];
                              newItens[index].quantidade = parseInt(e.target.value) || 1;
                              setNewOrcamento({ ...newOrcamento, itens: newItens });
                            }}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Valor Unitário *</Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            value={item.valorUnitario}
                            onChange={(e) => {
                              const newItens = [...newOrcamento.itens];
                              newItens[index].valorUnitario = parseFloat(e.target.value) || 0;
                              setNewOrcamento({ ...newOrcamento, itens: newItens });
                            }}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Desconto (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={item.descontoPercentual}
                            onChange={(e) => {
                              const newItens = [...newOrcamento.itens];
                              newItens[index].descontoPercentual = parseFloat(e.target.value) || 0;
                              setNewOrcamento({ ...newOrcamento, itens: newItens });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Desconto (R$)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.descontoValor}
                            onChange={(e) => {
                              const newItens = [...newOrcamento.itens];
                              newItens[index].descontoValor = parseFloat(e.target.value) || 0;
                              setNewOrcamento({ ...newOrcamento, itens: newItens });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setNewOrcamento({
                      ...newOrcamento,
                      itens: [...newOrcamento.itens, { produto: '', descricao: '', quantidade: 1, valorUnitario: 0, descontoPercentual: 0, descontoValor: 0 }]
                    })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>

                {/* Values */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Valores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="descontoGeral" className="text-sm font-medium">
                        Desconto Geral (%)
                      </Label>
                      <Input
                        id="descontoGeral"
                        type="number"
                        min="0"
                        max="100"
                        value={newOrcamento.descontoGeral}
                        onChange={(e) => setNewOrcamento({ ...newOrcamento, descontoGeral: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parcelas" className="text-sm font-medium">
                        Parcelas
                      </Label>
                      <Input
                        id="parcelas"
                        type="number"
                        min="1"
                        value={newOrcamento.parcelas}
                        onChange={(e) => setNewOrcamento({ ...newOrcamento, parcelas: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-sm font-medium">
                    Observações
                  </Label>
                  <Input
                    id="observacoes"
                    placeholder="Observações adicionais"
                    value={newOrcamento.observacoes}
                    onChange={(e) => setNewOrcamento({ ...newOrcamento, observacoes: e.target.value })}
                  />
                </div>

                <DialogFooter className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setIsDialogOpen(false);
                    setIsEditMode(false);
                  }}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-accent hover:bg-accent/90">
                    {isEditMode ? (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Atualizar Orçamento
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Orçamento
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* View Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Detalhes do Orçamento
                </DialogTitle>
              </DialogHeader>
              {viewingOrcamento && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">ID</Label>
                      <p className="font-mono text-sm">{viewingOrcamento.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge className={statusColors[viewingOrcamento.status]}>{viewingOrcamento.status}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Cliente</Label>
                      <p>{viewingOrcamento.cliente}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Valor</Label>
                      <p className="font-semibold text-lg">{formatCurrency(viewingOrcamento.valor)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Data</Label>
                      <p>{viewingOrcamento.data}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Validade</Label>
                      <p>{viewingOrcamento.validade}</p>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-accent">18</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <p className="text-sm text-muted-foreground">Aguardando</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-600">6</div>
              <p className="text-sm text-muted-foreground">Aprovados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-foreground">R$ 563k</div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar orçamentos..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Orcamentos Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Orçamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrcamentos.map((orc) => (
                  <TableRow key={orc.id}>
                    <TableCell className="font-mono text-sm">{orc.id}</TableCell>
                    <TableCell className="font-medium">{orc.cliente}</TableCell>
                    <TableCell>{formatCurrency(orc.valor)}</TableCell>
                    <TableCell>{orc.data}</TableCell>
                    <TableCell>{orc.validade}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[orc.status]}>{orc.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(orc)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(orc)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <FileText className="h-4 w-4 mr-2" />
                                Alterar Status
                              </DropdownMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start">
                              <DropdownMenuItem onClick={() => handleStatusChange(orc, 'Aguardando')}>
                                <Badge className="bg-yellow-100 text-yellow-800 mr-2">Aguardando</Badge>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(orc, 'Aprovado')}>
                                <Badge className="bg-green-100 text-green-800 mr-2">Aprovado</Badge>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(orc, 'Revisão')}>
                                <Badge className="bg-blue-100 text-blue-800 mr-2">Revisão</Badge>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(orc, 'Recusado')}>
                                <Badge className="bg-red-100 text-red-800 mr-2">Recusado</Badge>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DropdownMenuItem
                            onClick={() => handleDelete(orc.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Orcamentos;