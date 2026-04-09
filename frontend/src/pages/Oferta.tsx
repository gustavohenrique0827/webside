import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const leadSchema = z.object({
  nome: z.string().min(2).max(100),
  telefone: z.string().min(10),
  email: z.string().email(),
  bandeiras: z.array(z.string()).min(1),
  outras_bandeira_desc: z.string().optional(),
  negocio: z.array(z.string()).min(1),
  outros_negocio_desc: z.string().optional(),
  cnpj: z.string().min(14),
  razaoSocial: z.string().optional(),
  nomeFantasia: z.string().optional(),
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  lgpdConsent: z.boolean()
}).refine((data) => data.bandeiras.length > 0 && data.negocio.length > 0, {
  message: 'Selecione bandeiras e negócio',
  path: ['negocio']
});

type LeadFormData = z.infer<typeof leadSchema>;

const BANDEIRAS = [
  { value: 'IPIRANGA', label: 'Ipiranga' },
  { value: 'SHELL', label: 'Shell' },
  { value: 'BR', label: 'BR / Vibra' },
  { value: 'BANDEIRA BRANCA', label: 'Bandeira Branca' },
  { value: 'OUTRAS', label: 'Outras Bandeiras' }
];

const NEGOCIOS = [
  { value: 'Pista', label: 'Pista' },
  { value: 'Loja', label: 'Loja' },
  { value: 'Troca de Óleo', label: 'Troca de Óleo' },
  { value: 'Restaurantes', label: 'Restaurantes' },
  { value: 'Outros', label: 'Outros' }
];

const OfertaPage = () => {

  const [isCnpjLoading, setIsCnpjLoading] = useState(false);
  const [lastCnpj, setLastCnpj] = useState('');

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      bandeiras: [],
      negocio: [],
      lgpdConsent: false
    }
  });

  const APIS_CNPJ = [
    {
      name: 'CNPJ.ws',
      url: (cnpj: string) => `https://publica.cnpj.ws/cnpj/${cnpj}`,
      parse: (data: any) => ({
        razao_social: data.razao_social || '',
        nome_fantasia: data.estabelecimento?.nome_fantasia || data.nome_fantasia || '',
        cep: data.estabelecimento?.cep || data.cep || '',
        logradouro: data.estabelecimento?.logradouro || data.logradouro || '',
        numero: data.estabelecimento?.numero || data.numero || '',
        bairro: data.estabelecimento?.bairro || data.bairro || '',
        cidade: data.estabelecimento?.cidade?.nome || data.municipio || data.cidade || '',
      })
    },
    {
      name: 'BrasilAPI',
      url: (cnpj: string) => `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
      parse: (data: any) => ({
        razao_social: data.razao_social || '',
        nome_fantasia: data.nome_fantasia || '',
        cep: data.cep || '',
        logradouro: data.logradouro || '',
        numero: data.numero || '',
        bairro: data.bairro || '',
        cidade: data.municipio || '',
      })
    },
    {
      name: 'MinhaReceita',
      url: (cnpj: string) => `https://minhareceita.org/${cnpj}`,
      parse: (data: any) => ({
        razao_social: data.razao_social || '',
        nome_fantasia: data.nome_fantasia || '',
        cep: data.cep || '',
        logradouro: data.logradouro || '',
        numero: data.numero || '',
        bairro: data.bairro || '',
        cidade: data.municipio || '',
      })
    },
    {
      name: 'ReceitaWS',
      url: (cnpj: string) => `https://receitaws.com.br/v1/cnpj/${cnpj}`,
      parse: (data: any) => ({
        razao_social: data.nome || '',
        nome_fantasia: data.fantasia || '',
        cep: data.cep || '',
        logradouro: data.logradouro || '',
        numero: data.numero || '',
        bairro: data.bairro || '',
        cidade: data.municipio || '',
      })
    }
  ];

  const cnpjMutation = useMutation({
    mutationFn: async (cnpjNums: string): Promise<any> => {
      for (const api of APIS_CNPJ) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          const response = await fetch(api.url(cnpjNums), { signal: controller.signal });
          clearTimeout(timeoutId);
          if (!response.ok) continue;
          const data = await response.json();
          return api.parse(data);
        } catch (error) {
          console.warn(`Falha ${api.name}:`, error);
        }
      }
      throw new Error('Todas APIs falharam');
    },
    onSuccess: (data) => {
      form.setValue('razaoSocial', data.razao_social || data.nome || '');
      form.setValue('nomeFantasia', data.nome_fantasia || data.fantasia || '');
      form.setValue('cep', data.cep ? data.cep.replace(/(\d{5})(\d{1,})/, '$1-$2') : '');
      form.setValue('logradouro', data.logradouro || '');
      form.setValue('numero', data.numero || '');
      form.setValue('bairro', data.bairro || '');
      form.setValue('cidade', data.municipio || data.cidade || '');
      setIsCnpjLoading(false);
      toast({
        title: "CNPJ carregado",
        description: "Dados preenchidos automaticamente."
      });
    },
    onError: () => {
      ['razaoSocial', 'nomeFantasia', 'cep', 'logradouro', 'numero', 'bairro', 'cidade'].forEach(key => {
        form.setValue(key as keyof LeadFormData, '');
      });
      setIsCnpjLoading(false);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao consultar CNPJ."
      });
    }
  });

  const leadMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const cleanPhone = data.telefone.replace(/\D/g, '');
      const cleanCnpj = data.cnpj.replace(/\D/g, '');
      const leadData = {
        nome_empresa: data.razaoSocial || data.nomeFantasia || 'Posto de Combustível',
        cnpj: cleanCnpj,
        contato_principal: data.nome,
        email_contato: data.email,
        telefone_contato: cleanPhone,
        telefone_whatsapp: cleanPhone,
        fonte_lead: 'Oferta Incrível Web',
        probabilidade: 30,
        observacoes: `Bandeiras: ${data.bandeiras.join(', ')}; Negócio: ${data.negocio.join(', ')}; ${data.outras_bandeira_desc || ''} ${data.outros_negocio_desc || ''}`.trim()
      };
      const response = await fetch('/api/leads/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Erro no envio');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Oferta enviada!",
        description: "Em breve entraremos em contato."
      });
      form.reset();
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: err.message || 'Falha no envio'
      });
    }
  });

  const maskPhone = (v: string) => {
    let n = v.replace(/\D/g, '');
    if (n.length <= 2) return `(${n}`;
    if (n.length <= 6) return `(${n.slice(0,2)}) ${n.slice(2)}`;
    if (n.length <= 10) return `(${n.slice(0,2)}) ${n.slice(2,6)}-${n.slice(6,10)}`;
    return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7,11)}`;
  };

  const maskCnpj = (v: string) => {
    let n = v.replace(/\D/g, '');
    if (n.length <= 2) return n;
    if (n.length <= 5) return `${n.slice(0,2)}.${n.slice(2)}`;
    if (n.length <= 8) return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5)}`;
    if (n.length <= 12) return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5,8)}/${n.slice(8)}`;
    return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5,8)}/${n.slice(8,12)}-${n.slice(12,14)}`;
  };

  const maskCep = (v: string) => v.replace(/(\d{5})(\d{1,})/, '$1-$2');

  const consultarCnpj = () => {
    const rawCnpj = form.watch('cnpj')?.replace(/\D/g, '') || '';
    if (rawCnpj.length === 14 && rawCnpj !== lastCnpj) {
      setIsCnpjLoading(true);
      setLastCnpj(rawCnpj);
      cnpjMutation.mutate(rawCnpj);
    }
  };

  const onSubmit = (data: LeadFormData) => leadMutation.mutate(data);

  const watchedFields = form.watch();

  const progressValue = (() => {
    const nome = !!watchedFields.nome?.trim();
    const telefone = !!watchedFields.telefone?.trim();
    const email = !!watchedFields.email?.trim();
    const bandeiras = (watchedFields.bandeiras?.length || 0) > 0;
    const negocio = (watchedFields.negocio?.length || 0) > 0;
    const cnpj = watchedFields.cnpj?.replace(/\D/g, '')?.length === 14;
    const lgpdConsent = !!watchedFields.lgpdConsent;
    const completed = [nome, telefone, email, bandeiras, negocio, cnpj, lgpdConsent].filter(Boolean).length;
    return Math.round((completed / 7) * 100);
  })();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 pt-20">
        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 text-center">
              <h1 className="text-2xl md:text-4xl font-black flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                <i className="fas fa-gem text-3xl" />
                  <img src="/wb-oferta.png" alt="Oferta Webside" className="w-24 h-24 md:w-32 md:h-32 shadow-2xl drop-shadow-2xl brightness-110" />      
                  <span>RECEBA UMA OFERTA INCRÍVEL!</span>
                <i className="fas fa-bolt text-3xl" />
              </h1>
              <div className="text-center mt-4">
                <Badge className="bg-white/20 text-white text-center block mx-auto">
                  <i className="fas fa-check-circle mr-2" />
                  Dados reais garantem oferta personalizada
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-end mb-8">
                  <Progress value={progressValue} className="w-full md:w-64 h-2 [&>div]:bg-blue-600" />
                </div>
<div className="mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 pb-4 border-b border-blue-200">
                      <i className="fas fa-user-circle text-blue-600" />
                      Me fale sobre você
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nome">Nome completo <span className="text-red-500">*</span></Label>
                        <Input {...form.register('nome')} className={cn(form.formState.errors.nome && 'border-red-500')} />
                        {form.formState.errors.nome && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.nome.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone/WhatsApp <span className="text-red-500">*</span></Label>
                        <Input
                          {...form.register('telefone')}
                          onChange={(e) => form.setValue('telefone', maskPhone(e.target.value))}
                          placeholder="(11) 98765-4321"
                        />
                        {form.formState.errors.telefone && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.telefone.message}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">E-mail corporativo <span className="text-red-500">*</span></Label>
                        <Input type="email" {...form.register('email')} />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
<div className="mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 pb-4 border-b border-blue-200">
                      <i className="fas fa-gas-pump text-blue-600" />
                      Bandeiras de atuação <span className="text-red-500">*</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {BANDEIRAS.map((b, idx) => (
                        <div key={b.value} className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-blue-50 cursor-pointer transition-all">
                            <Switch 
                              id={`bandeira-${idx}`}
                              checked={form.watch('bandeiras')?.includes(b.value)}
                              onCheckedChange={(checked: boolean) => {
                                const current = form.getValues('bandeiras') || [];
                                if (checked) {
                                  form.setValue('bandeiras', [...current, b.value]);
                                } else {
                                  form.setValue('bandeiras', current.filter((v: string) => v !== b.value));
                                }
                              }} />
                          <Label htmlFor={`bandeira-${idx}`} className="cursor-pointer font-medium">{b.label}</Label>
                        </div>
                      ))}
                    </div>
                    {form.formState.errors.bandeiras && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.bandeiras.message}</p>
                    )}
                    {form.watch('bandeiras')?.includes('OUTRAS') && (
                      <div className="mt-6">
                        <Label htmlFor="outras_bandeira_desc">Qual outra bandeira?</Label>
                        <Input {...form.register('outras_bandeira_desc')} />
                      </div>
                    )}
                  </div>
<div className="mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 pb-4 border-b border-blue-200">
                      <i className="fas fa-store text-blue-600" />
                      Tipo de negócio <span className="text-red-500">*</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {NEGOCIOS.map((n, idx) => (
                        <div key={n.value} className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-blue-50 cursor-pointer">
                          <Switch 
                            id={`negocio-${idx}`}
                            checked={form.watch('negocio')?.includes(n.value)}
                            onCheckedChange={(checked: boolean) => {
                              const current = form.getValues('negocio') || [];
                              if (checked) {
                                form.setValue('negocio', [...current, n.value]);
                              } else {
                                form.setValue('negocio', current.filter((v: string) => v !== n.value));
                              }
                            }} />
                          <Label htmlFor={`negocio-${idx}`} className="cursor-pointer font-medium">{n.label}</Label>
                        </div>
                      ))}
                    </div>
                    {form.formState.errors.negocio && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.negocio.message}</p>
                    )}
                    {form.watch('negocio')?.includes('Outros') && (
                      <div className="mt-6">
                        <Label htmlFor="outros_negocio_desc">Especifique</Label>
                        <Input {...form.register('outros_negocio_desc')} />
                      </div>
                    )}
                  </div>
<div className="mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 pb-4 border-b border-blue-200">
                      <i className="fas fa-building text-blue-600" />
                      Dados da empresa <span className="text-red-500">*</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                          <Label htmlFor="cnpj">CNPJ <span className="text-red-500">*</span></Label>
                          <Input
                            id="cnpj"
                            {...form.register('cnpj')}
                            onChange={(e) => form.setValue('cnpj', maskCnpj(e.target.value))}
                            onBlur={consultarCnpj}
                            placeholder="00.000.000/0001-00"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={consultarCnpj}
                          disabled={isCnpjLoading || cnpjMutation.isPending}
                          className="whitespace-nowrap h-[44px]"
                        >
                          {isCnpjLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : (
                            <i className="fas fa-search mr-2" />
                          )}
                          CONSULTAR
                        </Button>
                      </div>
                      {form.formState.errors.cnpj && (
                        <p className="text-red-500 text-sm">{form.formState.errors.cnpj.message}</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input id="razaoSocial" {...form.register('razaoSocial')} placeholder="Razão Social" disabled />
                        <Input id="nomeFantasia" {...form.register('nomeFantasia')} placeholder="Nome Fantasia" disabled />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          id="cep"
                          {...form.register('cep')}
                          onChange={(e) => form.setValue('cep', maskCep(e.target.value))}
                          placeholder="00000-000"
                        />
                        <Input id="logradouro" {...form.register('logradouro')} placeholder="Rua/Avenida" />
                        <Input id="numero" {...form.register('numero')} placeholder="Nº" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input id="bairro" {...form.register('bairro')} placeholder="Bairro" />
                        <Input id="cidade" {...form.register('cidade')} placeholder="Cidade" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl mb-8">
                    <div className="flex items-start gap-3">
                      <Switch id="lgpdConsent" {...form.register('lgpdConsent')} />
                      <Label htmlFor="lgpdConsent" className="text-sm leading-relaxed cursor-pointer flex-1">
                        <i className="fas fa-shield-alt text-blue-600 mr-2" />
                        Autorizo o uso dos meus dados para contato e envio da oferta, conforme
                        <a href="/privacidade" className="text-blue-600 hover:underline font-medium ml-1">Política de Privacidade</a> (LGPD).
                      </Label>
                    </div>
                    {form.formState.errors.lgpdConsent && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.lgpdConsent.message}</p>
                    )}
                  </div>
                <Button
                      type="submit"
                      disabled={leadMutation.isPending || !form.formState.isValid}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-bold py-8 rounded-2xl shadow-lg"
                    >
                      {leadMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-3" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-gift mr-3" />
                          CONCLUIR E GARANTIR OFERTA
                          <i className="fas fa-arrow-right ml-3" />
                        </>
                      )}
                    </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        </div>
      </>
    );
  };

export default OfertaPage;

