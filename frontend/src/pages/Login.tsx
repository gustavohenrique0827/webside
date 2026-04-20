import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    if (!email.includes('@')) {
      setError('E-mail inválido');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/gestao');
      } else {
        setError('Credenciais inválidas');
      }
    } catch {
      setError('Erro no login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="bg-[#E9EDF2] rounded-[28px] shadow-[0_20px_35px_rgba(0,0,0,0.08)] p-8">
          
          {/* Logo */}
          <div className="text-center mb-6 min-h-[70px] flex justify-center items-center">
            <img src="/logo-sigo.png" alt="SIGO" className="h-14 w-auto object-contain drop-shadow-md" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[1.35rem] font-bold bg-gradient-to-r from-[hsl(var(--brand-navy))] to-[hsl(var(--brand-blue))] bg-clip-text text-transparent mb-3 font-semibold tracking-tight">
              SIGO - Sistema Integrado para Gestão Operacional
            </h1>
            <p className="text-[#5A6E8A] text-sm">
              Acesse sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Label className="block text-sm font-medium text-[#2D3748] mb-2">
                E-mail
              </Label>
              <div className="relative">
                <i className={cn('fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors', 
                  emailFocus || email ? 'text-[hsl(var(--brand-blue))]' : 'text-[#A0AEC0]')}></i>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="pl-12 pr-4 py-3 border-2 border-[#E2E8F0] rounded-2xl bg-white focus:border-[hsl(var(--brand-blue))] focus:ring-2 focus:ring-[hsl(var(--brand-blue))]/20 transition-all hover:border-[#E2E8F0]/80 h-12 text-base"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className="block text-sm font-medium text-[#2D3748] mb-2">
                Senha
              </Label>
              <div className="relative">
                <i className={cn('fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors', 
                  passwordFocus || password ? 'text-[hsl(var(--brand-blue))]' : 'text-[#A0AEC0]')}></i>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  className="pl-12 pr-12 py-3 border-2 border-[#E2E8F0] rounded-2xl bg-white focus:border-[hsl(var(--brand-blue))] focus:ring-2 focus:ring-[hsl(var(--brand-blue))]/20 transition-all hover:border-[#E2E8F0]/80 h-12 text-base"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Link Recuperar Senha */}
            <div className="text-right">
              <button type="button" onClick={() => setError('🔐 Para demonstração, utilize a senha: admin123')} 
                className="text-sm text-[hsl(var(--brand-blue))] hover:text-[hsl(var(--brand-navy))] underline hover:no-underline transition-colors">
                <i className="far fa-question-circle mr-1"></i>Recuperar senha
              </button>
            </div>

            {/* Botão Entrar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[hsl(var(--brand-navy))] to-[hsl(var(--brand-blue))] hover:from-[hsl(var(--brand-navy)/1.1)] hover:to-[hsl(var(--brand-blue)/1.1)] text-white font-semibold rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right-to-bracket"></i>
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Mensagem de Erro/Sucesso */}
          {error && (
            <Alert className="mt-4 border-l-4 border-[hsl(var(--brand-blue))] bg-[hsl(var(--brand-blue)/0.05)]">
              <AlertDescription className="text-sm text-[#2D3748]">{error}</AlertDescription>
            </Alert>
          )}

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-white border-l-4 border-l-[hsl(var(--brand-blue))] rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-[hsl(var(--brand-blue))] text-lg mt-0.5 flex-shrink-0"></i>
              <div>
                <p className="font-semibold text-[hsl(var(--brand-navy))] text-sm mb-1">Para demonstração:</p>
                <div className="text-xs space-y-1">
                  <div className="font-mono font-bold text-[hsl(var(--brand-navy))]">admin@empresa.com</div>
                  <div className="font-mono font-bold text-[hsl(var(--brand-navy))]">admin123</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <p className="text-center mt-8 text-[0.7rem] text-[#8A99B0]">
            © 2025 - SIGO Sistemas | <a href="https://websidesistemas.com.br/sigo" target="_blank" rel="noopener noreferrer" className="underline hover:text-[hsl(var(--brand-blue))] transition-colors">websidesistemas.com.br/sigo</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

