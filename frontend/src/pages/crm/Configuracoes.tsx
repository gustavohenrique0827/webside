import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Users,CheckCircle, Bell, Shield, Plug, Key, Briefcase, GitFork, Package, Activity, Settings, Save, Database, 
  Target
} from 'lucide-react';

export default function Configuracoes() {
  return (
    <div className="space-y-8 p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Configurações</h1>
          <p className="text-gray-500 text-sm lg:text-lg max-w-2xl">Gerencie todos os módulos do CRM com interface intuitiva de cards interativos</p>
        </div>
        </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Perfil */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-[hsl(var(--brand-navy))] transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[hsl(var(--brand-blue)/0.1)] rounded-xl flex items-center justify-center group-hover:bg-[hsl(var(--brand-blue)/0.2)] transition-colors">
                <User className="h-6 w-6 text-[hsl(var(--brand-blue))]" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Perfil</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Gerencie seu perfil pessoal e configurações da conta</p>
            <Button variant="outline" className="w-full group-hover:bg-[hsl(var(--brand-blue)/0.05)] border-gray-300 hover:border-[hsl(var(--brand-blue))] hover:text-[hsl(var(--brand-blue))] transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Cadastro de Usuário */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Cadastro de Usuário</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie e gerencie usuários do sistema com diferentes níveis de acesso</p>
            <Button variant="outline" className="w-full group-hover:bg-green-50 border-gray-300 hover:border-green-300 hover:text-green-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Metas */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-600 lucide lucide-target">
<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="6.62" y1="6.62" x2="17.38" y2="17.38"></line></svg>
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Metas</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Defina metas de vendas, metas de equipe e acompanhe progresso</p>
            <Button variant="outline" className="w-full group-hover:bg-purple-50 border-gray-300 hover:border-purple-300 hover:text-purple-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Checklists */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Checklists</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie checklists personalizados para processos e tarefas</p>
            <Button variant="outline" className="w-full group-hover:bg-indigo-50 border-gray-300 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Notificações</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Configure notificações por email, WhatsApp e push</p>
            <Button variant="outline" className="w-full group-hover:bg-orange-50 border-gray-300 hover:border-orange-300 hover:text-orange-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-red-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Segurança</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Controles de acesso, backups e autenticação avançada</p>
            <Button variant="outline" className="w-full group-hover:bg-red-50 border-gray-300 hover:border-red-300 hover:text-red-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Integrações */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <Plug className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Integrações</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Conecte com WhatsApp, Google Drive, bancos e ERPs</p>
            <Button variant="outline" className="w-full group-hover:bg-emerald-50 border-gray-300 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Permissões */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <Key className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Permissões</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Defina permissões granulares por função e usuário</p>
            <Button variant="outline" className="w-full group-hover:bg-amber-50 border-gray-300 hover:border-amber-300 hover:text-amber-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Cargos */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                <Briefcase className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Cargos</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Crie cargos e associe permissões específicas</p>
            <Button variant="outline" className="w-full group-hover:bg-cyan-50 border-gray-300 hover:border-cyan-300 hover:text-cyan-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Pipelines */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-violet-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                <GitFork className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Pipelines</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Personalize fluxos de vendas e processos personalizados</p>
            <Button variant="outline" className="w-full group-hover:bg-violet-50 border-gray-300 hover:border-violet-300 hover:text-violet-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Categorias de Produto */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <Package className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Categorias de Produto</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Organize produtos por categorias e subcategorias</p>
            <Button variant="outline" className="w-full group-hover:bg-pink-50 border-gray-300 hover:border-pink-300 hover:text-pink-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>

        {/* Atividade */}
        <Card className="group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <Activity className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">Atividade</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Monitore atividades, logs e histórico do sistema</p>
            <Button variant="outline" className="w-full group-hover:bg-gray-50 border-gray-300 hover:border-gray-300 hover:text-gray-600 transition-colors">
              Gerenciar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Database Stats Card */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Database className="h-5 w-5 text-blue-600" />
            Status do Banco
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
        <div className="text-3xl font-bold text-[hsl(var(--brand-blue))] mb-2">35</div>
            <p className="text-sm text-gray-600 font-medium">Tabelas</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">1.2M</div>
            <p className="text-sm text-gray-600 font-medium">Registros</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">256 MB</div>
            <p className="text-sm text-gray-600 font-medium">Espaço usado</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

