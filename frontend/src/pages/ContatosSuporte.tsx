import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContatosSuporte: React.FC<{}> = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen font-['Inter'] bg-gradient-to-br from-[#f2f6fc] to-[#e9f0f8] text-[#1a2b3c]">
        <style>{`
          :root {
            --primary: #0a2a44;
            --primary-light: #1e3a5f;
            --accent: #1e90ff;
            --accent-dark: #0d6bc7;
            --success: #25D366;
            --success-dark: #20b859;
            --gray-bg: #f8fafd;
            --border-light: #e2e8f0;
            --text-dark: #1a2b3c;
            --text-medium: #2d3f57;
            --shadow-sm: 0 4px 12px rgba(0, 20, 40, 0.08);
            --shadow-md: 0 8px 24px rgba(0, 35, 70, 0.12);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 32px;
            box-shadow: 0 8px 24px rgba(0, 35, 70, 0.12);
            overflow: hidden;
            padding: 48px 56px;
            border: 1px solid rgba(255,255,255,0.5);
            backdrop-filter: blur(2px);
          }

          .h1 {
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--primary);
            margin-bottom: 32px;
            border-left: 6px solid var(--accent);
            padding-left: 24px;
            line-height: 1.2;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .h1-icon {
            font-size: 2.2rem;
            background: rgba(30,144,255,0.1);
            padding: 8px;
            border-radius: 60px;
          }

          .section {
            margin-bottom: 40px;
            padding: 28px 32px;
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid var(--border-light);
            box-shadow: var(--shadow-sm);
            transition: box-shadow 0.2s ease;
          }

          .section:hover {
            box-shadow: var(--shadow-md);
          }

          .section-h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: var(--primary-light);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 2px solid var(--border-light);
            padding-bottom: 16px;
          }

          .section-h2-icon {
            font-size: 2rem;
            background: rgba(30,144,255,0.08);
            padding: 8px;
            border-radius: 16px;
          }

          .section-p {
            font-size: 1.1rem;
            color: var(--text-medium);
            margin-bottom: 16px;
          }

          .icon-list {
            list-style: none;
            margin: 20px 0 16px;
          }

          .icon-list li {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
            font-size: 1.1rem;
          }

          .emoji-big {
            font-size: 2rem;
            min-width: 44px;
            text-align: center;
          }

          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 24px 0 8px;
          }

          .contact-item {
            background: var(--gray-bg);
            padding: 16px 24px;
            border-radius: 60px;
            border: 1px solid var(--border-light);
            font-size: 1.15rem;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.02);
            flex: 1 1 auto;
          }

          .contact-strong {
            color: var(--primary);
            font-weight: 600;
          }

          .whatsapp-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            background: linear-gradient(105deg, var(--success) 0%, #34c759 100%);
            color: white;
            padding: 16px 36px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.2rem;
            margin-top: 16px;
            cursor: pointer;
            box-shadow: 0 12px 28px -8px rgba(37, 211, 102, 0.4);
            transition: all 0.2s ease;
            width: fit-content;
            border: none;
          }

          .whatsapp-link:hover {
            background: linear-gradient(105deg, var(--success-dark) 0%, #2db14d 100%);
            transform: scale(1.02) translateY(-2px);
            box-shadow: 0 18px 32px -8px rgba(37, 211, 102, 0.5);
          }

          .whatsapp-link-secondary {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: white;
            color: var(--primary);
            padding: 14px 32px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            border: 2px solid var(--primary-light);
            margin-top: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            width: fit-content;
          }

          .whatsapp-link-secondary:hover {
            background: var(--primary-light);
            color: white;
            border-color: var(--primary-light);
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(10,42,68,0.2);
          }

          .ead-link {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(105deg, var(--accent) 0%, #3b7bff 100%);
            color: white;
            padding: 16px 36px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.2rem;
            margin-top: 20px;
            cursor: pointer;
            box-shadow: 0 12px 28px -8px rgba(30,144,255,0.5);
            transition: all 0.2s ease;
            width: fit-content;
            border: none;
          }

          .ead-link:hover {
            background: linear-gradient(105deg, var(--accent-dark) 0%, #1e5fd9 100%);
            transform: scale(1.02) translateY(-2px);
            box-shadow: 0 18px 32px -8px rgba(30,144,255,0.6);
          }

          .material-list li {
            margin-bottom: 20px;
            padding-left: 36px;
            background-size: 24px;
            background-repeat: no-repeat;
            background-position: left 2px;
          }

          .highlight {
            background: #fcee9f;
            padding: 4px 12px;
            border-radius: 30px;
            font-weight: 700;
            color: #3a2c0f;
            display: inline-block;
          }

          @media (max-width: 700px) {
            .container { padding: 24px 20px; }
            .h1 { font-size: 2rem; }
            .section { padding: 20px; }
          }
        `}</style>

<div className="container">
          <h1 className="h1">
            <span className="h1-icon">🛠️</span>
            Suporte Técnico Completo
          </h1>
          
          <div className="section">
            <h2 className="section-h2"><span className="section-h2-icon">💬</span> Atendimento via WhatsApp</h2>
            <p className="section-p">Nosso atendimento via WhatsApp funciona em horário comercial:</p>
            <ul className="icon-list">
              <li><span className="emoji-big">🕗</span> Segunda a Sexta: <strong>08h – 18h</strong></li>
              <li><span className="emoji-big">🕛</span> Sábado: <strong>08h – 12h</strong></li>
            </ul>
            <a 
              href="https://wa.me/5534992990408?text=Ol%C3%A1%20Webside%2C%20preciso%20de%20ajuda." 
              target="_blank" 
              rel="noreferrer"
              className="whatsapp-link"
            >
              <span>📲</span> Chamar no WhatsApp
            </a>
          </div>

          <div className="section">
            <h2 className="section-h2"><span className="section-h2-icon">⚡</span> Telefones fixo e Plantão 24h</h2>
            <p className="section-p">Fora do horário comercial e em feriados, em caso de emergência, nosso plantão técnico irá te ajudar pelo telefone:</p>
            <div className="contact-row">
              <div className="contact-item">
                <span>📞</span> <strong className="contact-strong">Minas Gerais:</strong> (34) 3199-9131
              </div>
              <div className="contact-item">
                <span>📞</span> <strong className="contact-strong">São Paulo:</strong> (11) 5199-6177
              </div>
              <div className="contact-item">
                <span>📞</span> <strong className="contact-strong">Goiás:</strong> (62) 3602-2258
              </div>
            </div>
            <div className="trust-badge">
              <span>🛡️</span> Plantão técnico 24h – Emergências
            </div>
          </div>

          <div className="section">
            <h2 className="section-h2"><span className="section-h2-icon">📚</span> Materiais extras para apoio ao cliente</h2>
            <ul className="material-list">
              <li>
                <strong>Atalhos de funções para uso do WebPostoPDV (Caixa):</strong>
                <a href="https://websidesistemas.com.br/imagens/atalhos_pdv.pdf" target="_blank" rel="noreferrer">📄 atalhos_pdv.pdf</a>
              </li>
              <li>
                <strong>Planilha para identificar quadros elétricos:</strong>
                <a href="https://websidesistemas.com.br/imagens/quadro-eletrico.xlsx" target="_blank" rel="noreferrer">📊 quadro-eletrico.xlsx</a>
              </li>
              <li>
                <strong>Técnica para vendas de produtos da pista (A.I.D.A):</strong>
                <a href="https://websidesistemas.com.br/imagens/AIDA%20-%20Modelos.pdf" target="_blank" rel="noreferrer">📈 AIDA - Modelos.pdf</a>
                <br />
                <span>Oferecido por Jonathan Rocha – Instagram: <a href="https://www.instagram.com/orocha.jonathan/" target="_blank" rel="noreferrer">@orocha.jonathan</a></span>
              </li>
            </ul>
          </div>

          <div className="section">
            <h2 className="section-h2"><span className="section-h2-icon">🚀</span> Sucesso do Cliente</h2>
            <p className="section-p" style={{ fontSize: '1.2rem' }}>Precisa de treinamento, suporte ou consultoria?</p>
            <p className="section-p">
              Fale com nosso setor de <span className="highlight">Sucesso do Cliente</span> pelo WhatsApp ou pelo email:
            </p>
            <p className="section-p" style={{ margin: '20px 0 10px', fontSize: '1.2rem' }}>
              📧 <a href="mailto:relacionamento@websidesistemas.com.br" style={{ color: 'var(--accent-dark)' }}>relacionamento@websidesistemas.com.br</a>
            </p>
            <a 
              href="https://wa.me/5534992990408?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20setor%20de%20Sucesso%20do%20Cliente." 
              target="_blank" 
              rel="noreferrer"
              className="whatsapp-link-secondary"
            >
              <span>💬</span> Falar com Sucesso do Cliente no WhatsApp
            </a>
          </div>

          <div className="section">
            <h2 className="section-h2"><span className="section-h2-icon">🎓</span> EAD Webside</h2>
            <p className="section-p" style={{ fontSize: '1.2rem', fontWeight: '500' }}>Conhecimento que te apoia no dia a dia.</p>
            <p className="section-p">Vídeo aulas simples e curtas, para foco na dúvida diária. Acesse nossa plataforma de ensino e aprenda no seu ritmo.</p>
            <a 
              href="https://app.tiflux.com/r/externals/knowledges/list/5730" 
              target="_blank" 
              rel="noreferrer"
              className="ead-link"
            >
              <span>▶️</span> Acessar videoaulas agora
            </a>
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default ContatosSuporte;

