<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Login | WebPosto - Sistema de Gestão Empresarial</title>
    <!-- Google Fonts + Font Awesome 6 (ícones) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
        }

        .login-container {
            width: 100%;
            max-width: 460px;
            animation: fadeUp 0.6s ease-out;
        }

        .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 28px;
            box-shadow: 0 25px 45px -15px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08);
            padding: 2.5rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .login-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 35px 60px -20px rgba(0, 0, 0, 0.25);
        }

        .logo-area {
            text-align: center;
            margin-bottom: 2rem;
            min-height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .logo-placeholder {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: white;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .login-header h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.8rem;
            font-weight: 600;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: -0.5px;
            margin-bottom: 0.75rem;
        }

        .login-header p {
            color: #64748b;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
        }

        .form-group {
            margin-bottom: 1.75rem;
            position: relative;
        }

        .form-group label {
            display: block;
            font-size: 0.9rem;
            font-weight: 500;
            color: #334155;
            margin-bottom: 0.75rem;
            letter-spacing: -0.25px;
        }

        .input-icon {
            position: relative;
            display: flex;
            align-items: center;
        }

        .input-icon i {
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 1.2rem;
            transition: all 0.25s ease;
            z-index: 2;
        }

        .input-icon input {
            width: 100%;
            padding: 1.1rem 1.25rem 1.1rem 3.2rem;
            font-size: 1rem;
            font-family: 'Inter', sans-serif;
            border: 2px solid #e2e8f0;
            border-radius: 20px;
            background-color: #ffffff;
            transition: all 0.3s ease;
            outline: none;
            color: #1e293b;
            font-weight: 400;
        }

        .input-icon input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
            transform: translateY(-1px);
        }

        .input-icon input:focus + i,
        .input-icon input:not(:placeholder-shown) + i {
            color: #667eea;
            font-size: 1.25rem;
        }

        .extra-options {
            display: flex;
            justify-content: flex-end;
            margin-top: -0.75rem;
            margin-bottom: 2rem;
        }

        .forgot-link {
            font-size: 0.875rem;
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .forgot-link:hover {
            color: #764ba2;
            text-decoration: underline;
        }

        .btn-login {
            width: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            padding: 1.1rem 1.5rem;
            border-radius: 25px;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1.05rem;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
            position: relative;
            overflow: hidden;
        }

        .btn-login::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }

        .btn-login:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.5);
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }

        .btn-login:hover::before {
            left: 100%;
        }

        .btn-login:active {
            transform: translateY(-1px);
        }

        .btn-login i {
            transition: transform 0.25s ease;
        }

        .btn-login:hover i {
            transform: scale(1.1);
        }

        .demo-info {
            background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.8));
            border-left: 5px solid #667eea;
            border-radius: 20px;
            padding: 1.25rem;
            margin-top: 2rem;
            font-size: 0.9rem;
            color: #334155;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            backdrop-filter: blur(10px);
        }

        .demo-info i {
            color: #667eea;
            font-size: 1.25rem;
            margin-top: 0.125rem;
            flex-shrink: 0;
        }

        .demo-info strong {
            color: #1e293b;
            font-weight: 600;
        }

        .demo-text {
            line-height: 1.6;
            flex: 1;
        }

        .feedback-message {
            margin-top: 1.5rem;
            font-size: 0.9rem;
            text-align: center;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            transition: all 0.3s ease;
            font-weight: 500;
            border: 2px solid transparent;
        }

        .feedback-message.success {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .feedback-message.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }

        .footer-note {
            text-align: center;
            margin-top: 2.5rem;
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 400;
        }

        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(25px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 500px) {
            body {
                padding: 1rem;
            }
            .login-card {
                padding: 2rem 1.75rem;
            }
            .login-header h1 {
                font-size: 1.6rem;
            }
            .logo-area {
                min-height: 70px;
                margin-bottom: 1.5rem;
            }
        }

        @media (max-width: 400px) {
            .demo-info {
                flex-direction: column;
                text-align: center;
                gap: 0.75rem;
            }
        }
    </style>
</head>
<body>

<div class="login-container">
    <div class="login-card">
        <div class="logo-area">
            <div class="logo-placeholder">
                <i class="fas fa-gas-pump"></i>
            </div>
        </div>

        <div class="login-header">
            <h1>WebPosto</h1>
            <p>Sistema de Gestão Empresarial</p>
            <p>Acesse sua conta para continuar</p>
        </div>

        <form id="loginForm" action="#" method="post">
            <div class="form-group">
                <label for="email">E-mail Corporativo</label>
                <div class="input-icon">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="email" name="email" placeholder="admin@empresa.com" autocomplete="email" required>
                </div>
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <div class="input-icon">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="password" name="password" placeholder="••••••••" autocomplete="current-password" required>
                </div>
            </div>

            <div class="extra-options">
                <a href="#" class="forgot-link" id="forgotLink">
                    <i class="fas fa-question-circle"></i>
                    Recuperar acesso
                </a>
            </div>

            <button type="submit" class="btn-login" id="loginBtn">
                <i class="fas fa-sign-in-alt"></i>
                Entrar no Sistema
            </button>

            <div id="feedback" class="feedback-message"></div>
        </form>

        <div class="demo-info">
            <i class="fas fa-lightbulb"></i>
            <div class="demo-text">
                <strong>Para demonstração:</strong><br>
                E-mail: <strong>admin@empresa.com</strong><br>
                Senha: <strong>admin123</strong>
            </div>
        </div>

        <div class="footer-note">
            © 2025 WebPosto - Webside Consultoria e Sistemas
        </div>
    </div>
</div>

<script>
    (function() {
        const form = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const loginBtn = document.getElementById('loginBtn');
        const feedbackDiv = document.getElementById('feedback');

        const DEMO_EMAIL = 'admin@empresa.com';
        const DEMO_PASSWORD = 'admin123';

        function showMessage(message, isError = true) {
            feedbackDiv.textContent = message;
            feedbackDiv.className = 'feedback-message ' + (isError ? 'error' : 'success');
            
            if (!isError) {
                setTimeout(() => {
                    if (feedbackDiv.textContent === message) {
                        feedbackDiv.style.opacity = '0';
                        setTimeout(() => {
                            feedbackDiv.textContent = '';
                            feedbackDiv.className = 'feedback-message';
                            feedbackDiv.style.opacity = '1';
                        }, 300);
                    }
                }, 4500);
            }
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                showMessage('Por favor, preencha todos os campos.', true);
                return;
            }

            const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showMessage('Por favor, digite um e-mail válido.', true);
                return;
            }

            // Simulação de loading
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            loginBtn.disabled = true;

            // Simula delay de autenticação
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                showMessage('✅ Login realizado com sucesso! Redirecionando...', false);
                // Simula redirecionamento
                setTimeout(() => {
                    // Em produção, redireciona para dashboard
                    window.location.href = '/admin/dashboard';
                }, 1200);
            } else {
                showMessage('❌ Credenciais inválidas. Verifique os dados de demonstração.', true);
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar no Sistema';
                loginBtn.disabled = false;
            }
        });

        const forgotLink = document.getElementById('forgotLink');
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('🔐 Para demonstração, utilize: admin@empresa.com / admin123', false);
        });

        // Enhanced input focus effects
        const inputs = document.querySelectorAll('.input-icon input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const icon = input.parentElement.querySelector('i');
                icon.style.color = '#667eea';
                icon.style.transform = 'translateY(-50%) scale(1.1)';
            });
            input.addEventListener('blur', () => {
                const icon = input.parentElement.querySelector('i');
                if (!input.value.trim()) {
                    icon.style.color = '#94a3b8';
                    icon.style.transform = 'translateY(-50%) scale(1)';
                }
            });
        });

        // Auto-focus primeiro input
        emailInput.focus();
    })();
</script>
</body>
</html>
