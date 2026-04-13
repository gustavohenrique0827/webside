import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { TooltipProvider } from './components/ui/tooltip';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/NotificationSystem';
import ProtectedRoute from './components/ProtectedRoute';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import Privacidade from "./pages/privacidade";
import ContatosSuporte from "./pages/ContatosSuporte";

// WP Solution pages (keeping these)
import { SobreNos, SolucoesPage, WP_PDV, WP_PAY, WP_Autoatendimento, WP_ID, WP_Conveniencia, WP_Contagem, WP_PDV_Android, WP_Freezer, WP_Gerencial, WP_DashboardBI, WP_Frota, WP_Faturamento, WP_Conciliacao, WP_Mobile, WP_IA, WP_Pista, Chat } from "./pages";

// Admin/CRM pages (all complete)
import AdminDashboard from './pages/admin/AdminDashboard';
import Orcamentos from './pages/admin/Orcamentos';
import Pedidos from './pages/admin/Pedidos';
import Financeiro from './pages/admin/Financeiro';
import Clientes from './pages/admin/Clientes';
import Relatorios from './pages/admin/Relatorios';
import Configuracoes from './pages/admin/Configuracoes';
import Perfil from './pages/admin/Perfil';
import DashboardPrincipal from './pages/crm/DashboardPrincipal';
import Leads from './pages/crm/Leads';
import Mensageria from './pages/crm/Mensageria';





// Global Tiflux Hide Component
const AppContent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<Index />} />

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
              <Route path="/login" element={<Login />} />

              {/* Full Admin/CRM Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/orcamentos" element={<ProtectedRoute><Orcamentos /></ProtectedRoute>} />
              <Route path="/admin/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
              <Route path="/admin/financeiro" element={<ProtectedRoute><Financeiro /></ProtectedRoute>} />
              <Route path="/admin/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
              <Route path="/admin/relatorios" element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
              <Route path="/admin/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
              <Route path="/admin/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
              
              {/* CRM Routes */}
              <Route path="/crm/dashboard" element={<ProtectedRoute><DashboardPrincipal /></ProtectedRoute>} />
              <Route path="/crm/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
              <Route path="/crm/mensageria" element={<ProtectedRoute><Mensageria /></ProtectedRoute>} />
              
              <Route path="/gestao" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationProvider>
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
