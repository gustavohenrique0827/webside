import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, DollarSign, BarChart3, Settings, MessageCircle, CheckSquare, Layers, User, ChevronDown, GitBranch } from "lucide-react";

const navItems = [
  { href: "/crm/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/crm/leads", icon: Users, label: "Leads" },
  { href: "/crm/clientes", icon: Users, label: "Clientes" },
  { href: "/crm/tarefas", icon: CheckSquare, label: "Tarefas" },
  { href: "/crm/pipeline", icon: GitBranch, label: "Pipeline" },
  { href: "/crm/orcamentos", icon: FileText, label: "Orçamentos" },
  { href: "/crm/pedidos", icon: FileText, label: "Pedidos" },
  { href: "/crm/financeiro", icon: DollarSign, label: "Financeiro" },
  { href: "/crm/relatorios", icon: BarChart3, label: "Relatórios" },
  { href: "/crm/mensageria", icon: MessageCircle, label: "Mensageria" },
  { href: "/crm/configuracoes", icon: Settings, label: "Configurações" },
];

export default function CrmSidebar() {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-xl font-bold text-[hsl(var(--brand-navy))]">
          CRM SIGO
        </h2>
        <p className="text-sm text-gray-500 mt-1">Gestão Completa</p>
      </div>
      
      <nav className="p-4 space-y-1 flex-1 overflow-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.href || (item.href === '/crm/dashboard' && location.pathname === '/crm');
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[hsl(var(--sidebar-accent))] ${
                active ? 'bg-[hsl(var(--sidebar-accent))] border-r-2 border-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary))] font-semibold' : 'text-sidebar-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-[hsl(var(--sidebar-primary))]' : 'text-muted-foreground hover:text-foreground'}`} />
              <span className={`font-medium`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <div className="w-8 h-8 bg-[hsl(var(--brand-blue)/0.1)] rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-[hsl(var(--brand-blue))]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm text-gray-900 truncate">Admin Demo</p>
            <p className="text-xs text-gray-500 truncate">admin@webside.com</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
        </div>
        {userMenuOpen && (
          <div className="mt-2 space-y-1 pt-2 border-t border-gray-200">
            <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 text-gray-900">Perfil</button>
            <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 text-gray-900">Configurações</button>
            <button className="w-full text-left px-3 py-2 text-sm text-red-600 rounded hover:bg-gray-50 font-medium">Sair</button>
          </div>
        )}
      </div>
    </div>
  );
}
