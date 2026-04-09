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
        navigate('/admin/dashboard');
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
          
          {/* Logo - 40% maior que placeholder */}

          <div className="text-center mb-6 min-h-[70px] flex justify-center items-center">
            <img src="/logo_webside.png" alt="Webside" className="h-10 w-auto object-contain drop-shadow-md" />
          </div>


          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[1.35rem] font-bold bg-gradient-to-r from-[#0F2C59] to-[#2C74B3] bg-clip-text text-transparent mb-3 font-semibold tracking-tight">
              Sistema de Gestão Empresarial
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
                  emailFocus || email ? 'text-[#2C74B3]' : 'text-[#A0AEC0]')}></i>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="pl-12 pr-4 py-3 border-2 border-[#E2E8F0] rounded-2xl bg-white focus:border-[#2C74B3] focus:ring-2 focus:ring-[#2C74B3]/20 transition-all hover:border-[#E2E8F0]/80 h-12 text-base"
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
                  passwordFocus || password ? 'text-[#2C74B3]' : 'text-[#A0AEC0]')}></i>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  className="pl-12 pr-12 py-3 border-2 border-[#E2E8F0] rounded-2xl bg-white focus:border-[#2C74B3] focus:ring-2 focus:ring-[#2C74B3]/20 transition-all hover:border-[#E2E8F0]/80 h-12 text-base"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Link Recuperar Senha */}
            <div className="text-right">
              <button type="button" onClick={() => setError('🔐 Para demonstração, utilize a senha: admin123')} 
                className="text-sm text-[#2C74B3] hover:text-[#0F2C59] underline hover:no-underline transition-colors">
                <i className="far fa-question-circle mr-1"></i>Recuperar senha
              </button>
            </div>

            {/* Botão Entrar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#0F2C59] to-[#2C74B3] hover:from-[#1a3f6e] hover:to-[#3a80bc] text-white font-semibold rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-base"
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
            <Alert className="mt-4 border-l-4 border-[#2C74B3] bg-[#E9F7EF]/50">
              <AlertDescription className="text-sm text-[#2D3748]">{error}</AlertDescription>
            </Alert>
          )}

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-white border-l-4 border-l-[#2C74B3] rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-[#2C74B3] text-lg mt-0.5 flex-shrink-0"></i>
              <div>
                <p className="font-semibold text-[#0F2C59] text-sm mb-1">Para demonstração:</p>
                <div className="text-xs space-y-1">
                  <div className="font-mono font-bold text-[#0F2C59]">admin@empresa.com</div>
                  <div className="font-mono font-bold text-[#0F2C59]">admin123</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <p className="text-center mt-8 text-[0.7rem] text-[#8A99B0]">
            © 2025 - Webside Consultoria e Sistemas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

