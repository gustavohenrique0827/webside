import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { TooltipProvider } from './components/ui/tooltip';
import { AuthProvider } from './contexts/AuthContext';
import { ApolloWebPostoProvider } from './lib/apollo-provider';
import { NotificationProvider } from './components/NotificationSystem';

import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import Privacidade from "./pages/privacidade";
import ContatosSuporte from "./pages/ContatosSuporte";

// WP Solution pages
import { SobreNos, SolucoesPage, WP_PDV, WP_PAY, WP_Autoatendimento, WP_ID, WP_Conveniencia, WP_Contagem, WP_PDV_Android, WP_Freezer, WP_Gerencial, WP_DashboardBI, WP_Frota, WP_Faturamento, WP_Conciliacao, WP_Mobile, WP_IA, WP_Pista, Chat, Suporte, Oferta } from "./pages";

// CRM imports
import Dashboard from './pages/crm/Dashboard';
import Orcamentos from './pages/crm/Orcamentos';
import Clientes from './pages/crm/Clientes';
import Leads from './pages/crm/Leads';
import Pedidos from './pages/crm/Pedidos';
import Tarefas from './pages/crm/Tarefas';
import Pipeline from './pages/crm/Pipeline';
import Financeiro from './pages/crm/Financeiro';
import Relatorios from './pages/crm/Relatorios';
import Configuracoes from './pages/crm/Configuracoes';
import Mensageria from './pages/crm/Mensageria';
import CrmLayout from './components/CrmLayout';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ApolloWebPostoProvider>
            <NotificationProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gestao" element={<Login />} />
                <Route path="/privacidade" element={<Privacidade />} />
                <Route path="/contatos-suporte" element={<ContatosSuporte />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/sobre-nos" element={<SobreNos />} />
                <Route path="/solucoes" element={<SolucoesPage />} />
                <Route path="/wp-pdv" element={<WP_PDV />} />
                <Route path="/wp-pay" element={<WP_PAY />} />
                <Route path="/wp-autoatendimento" element={<WP_Autoatendimento />} />
                <Route path="/wp-id" element={<WP_ID />} />
                <Route path="/wp-conveniencia" element={<WP_Conveniencia />} />
                <Route path="/wp-contagem" element={<WP_Contagem />} />
                <Route path="/wp-pdv-android" element={<WP_PDV_Android />} />
                <Route path="/wp-freezer" element={<WP_Freezer />} />
                <Route path="/wp-gerencial" element={<WP_Gerencial />} />
                <Route path="/wp-dashboard-bi" element={<WP_DashboardBI />} />
                <Route path="/wp-frota" element={<WP_Frota />} />
                <Route path="/wp-faturamento" element={<WP_Faturamento />} />
                <Route path="/wp-conciliacao" element={<WP_Conciliacao />} />
                <Route path="/wp-mobile" element={<WP_Mobile />} />
                <Route path="/wp-ia" element={<WP_IA />} />
                <Route path="/wp-pista" element={<WP_Pista />} />
                <Route path="/suporte" element={<Suporte />} />
                <Route path="/oferta" element={<Oferta />} />
                
                {/* CRM Private Routes */}
                <Route path="/crm/*" element={<ProtectedRoute><CrmLayout /></ProtectedRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orcamentos" element={<Orcamentos />} />
                  <Route path="clientes" element={<Clientes />} />
                  <Route path="leads" element={<Leads />} />
                  <Route path="pedidos" element={<Pedidos />} />
                  <Route path="financeiro" element={<Financeiro />} />
                  <Route path="relatorios" element={<Relatorios />} />
                  <Route path="mensageria" element={<Mensageria />} />
                  <Route path="configuracoes" element={<Configuracoes />} />
                  <Route path="pipeline" element={<Pipeline />} />
                  <Route path="tarefas" element={<Tarefas />} />
                </Route>
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </NotificationProvider>
          </ApolloWebPostoProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;

