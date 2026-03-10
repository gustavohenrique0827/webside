import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, Facebook, Instagram, Linkedin, Menu, MessageCircle, X, Check } from "lucide-react";

type SolutionItem = { emoji: string; title: string; desc: string; tag: string };

const solutions: SolutionItem[] = [
  { emoji: "📊", title: "WP Gerencial", desc: "Controle total com relatórios gerenciais e visão estratégica.", tag: "Gestão" },
  { emoji: "📋", title: "WP Comanda", desc: "Atendimento rápido na mesa, integração com cozinha e caixas.", tag: "Restaurante" },
  { emoji: "🍽️", title: "WP Restaurante", desc: "Pedidos automatizados, combos e promoções.", tag: "Food" },
  { emoji: "🛒", title: "WP Conveniência", desc: "Tela intuitiva, cupom fiscal e controle de estoque pelo celular.", tag: "PDV" },
  { emoji: "📦", title: "WP Contagem", desc: "Inventário ágil com câmera do celular e impressão de etiquetas.", tag: "Estoque" },
  { emoji: "📺", title: "WP Display", desc: "Tela espelho, ofertas, QR Code e pesquisa de satisfação.", tag: "Marketing" },
  { emoji: "🔧", title: "WP Oil", desc: "Troca de óleo com informações técnicas e ordens de serviço.", tag: "Serviços" },
  { emoji: "📱", title: "WP PDV Android", desc: "Múltiplos pagamentos e integração com impressoras/leitores.", tag: "PDV" },
  { emoji: "🚛", title: "WP Frota", desc: "Gestão completa de frotas, relatórios e controle de motoristas.", tag: "Frota" },
  { emoji: "📈", title: "WP Dashboard & BI", desc: "Gráficos em tempo real e análises personalizadas.", tag: "Analytics" },
  { emoji: "🧊", title: "WP Freezer", desc: "Geladeira inteligente com débito automático no cartão.", tag: "Inovação" },
  { emoji: "⚡", title: "WP PIX", desc: "Pagamentos instantâneos e seguros via PIX.", tag: "Pagamento" },
  { emoji: "📄", title: "WP Faturamento", desc: "Emissão de boletos e NF-e em poucos passos.", tag: "Fiscal" },
  { emoji: "🔄", title: "WP Conciliação", desc: "Processos automáticos via EDI e OFX (cartão e bancária).", tag: "Financeiro" },
  { emoji: "📚", title: "WP Portal Contábil", desc: "Acesso facilitado para contadores.", tag: "Contabilidade" },
  { emoji: "⛽", title: "WP PDV", desc: "Integração com bombas, cofres, carteiras digitais e fidelidade.", tag: "PDV Premium" },
  { emoji: "🏎️", title: "WP PAY", desc: "Mobilidade na pista, emissão de notas e cupons.", tag: "Pagamento" },
  { emoji: "🤖", title: "WP Autoatendimento", desc: "Pagamento direto pelo cliente, sem filas.", tag: "Self-Service" },
  { emoji: "📲", title: "WP Mobile", desc: "Gestão na palma da mão, indicadores e controle financeiro.", tag: "Mobile" },
  { emoji: "🔔", title: "WP Gerente Eletrônico", desc: "Alertas inteligentes para gestão eficiente.", tag: "Alertas" },
  { emoji: "🔍", title: "WP ID", desc: "Identifica placa, reconhece combustível correto, bloqueia erros.", tag: "Segurança" },
  { emoji: "🧠", title: "WP I.A", desc: "IA integrada: pergunte e obtenha respostas sobre o WebPosto.", tag: "IA" },
];

const maps = {
  mg: "https://maps.app.goo.gl/1S21EcYTbVNEjmji7",
  sp: "https://maps.app.goo.gl/9ADGAFwHmsJ9DT997",
  go: "https://maps.app.goo.gl/1GwBqHWqea23T9Vt8",
};

const whatsappLink = "https://wa.me/5511988934345?text=Venho%20pelo%20site%20da%20WEBSIDE%20e%20possuo%20o%20cupom%20promocional%20SITE170387";

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}
function maskCnpj(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

export default function WebsideLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cnpj: "", cidade: "", accepted: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const onScroll = () => {
      const y = window.scrollY;
      setShowTopButton(y > 400);
      setHeaderScrolled(y > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const footerYearText = useMemo(
    () => "Copyright © 2011-2026 | Webside Consultoria e Sistemas Ltda — Todos os direitos reservados — CNPJ: 35.277.090/0001-47",
    []
  );

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe o nome completo.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Informe um e-mail válido.";
    if (form.telefone.replace(/\D/g, "").length !== 11) e.telefone = "Informe um telefone válido com DDD.";
    if (form.cnpj && form.cnpj.replace(/\D/g, "").length !== 14) e.cnpj = "CNPJ inválido.";
    if (!form.cidade.trim()) e.cidade = "Informe a cidade.";
    if (!form.accepted) e.accepted = "É necessário aceitar a Política de Privacidade.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateForm()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen text-[#020234] bg-white">
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-[#020234] ${headerScrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.35)]" : "shadow-sm"}`}>
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" aria-label="Ir para Home"><img src="/webside-cabecalho.png" alt="Logo Webside Sistemas" className="h-11 w-auto object-contain" /></Link>
          <nav className="hidden md:flex items-center gap-6 text-white">
            <button onClick={() => handleAnchorClick("#home")}>Home</button>
            <button onClick={() => handleAnchorClick("#solucoes")}>Soluções</button>
            <Link to="/sobre-nos">Sobre Nós</Link>
            <button onClick={() => handleAnchorClick("#suporte")}>Suporte</button>
            <button onClick={() => handleAnchorClick("#contato")} className="rounded-full bg-[#04A6F9] px-5 py-2">Fale com Especialista</button>
          </nav>
          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Abrir menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 text-white bg-[#020234] border-t border-white/10">
            <div className="flex flex-col gap-2 pt-3">
              <button onClick={() => handleAnchorClick("#home")} className="text-left py-2">Home</button>
              <button onClick={() => handleAnchorClick("#solucoes")} className="text-left py-2">Soluções</button>
              <Link onClick={() => setMobileOpen(false)} to="/sobre-nos" className="py-2">Sobre Nós</Link>
              <button onClick={() => handleAnchorClick("#suporte")} className="text-left py-2">Suporte</button>
              <button onClick={() => handleAnchorClick("#contato")} className="rounded-full bg-[#04A6F9] px-4 py-2 mt-2">Fale com Especialista</button>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="min-h-[92vh] bg-gradient-to-br from-[#020234] to-[#04176b] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block rounded-full border border-[#04A6F9] px-4 py-1 text-sm">Software Líder de Mercado</span>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">WEBPOSTO <br /><span className="text-[#04A6F9]">Tecnologia que transforma postos.</span></h1>
            <p className="mt-5 text-white/85 text-lg">Desenvolvido por especialistas para impulsionar seu controle e produtividade. A Webside Sistemas é o seu parceiro completo em implementação, treinamento e consultoria.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => handleAnchorClick("#contato")} className="rounded-full bg-[#04A6F9] px-6 py-3 font-semibold">Fale com Especialista</button>
              <button onClick={() => handleAnchorClick("#solucoes")} className="rounded-full border border-[#04A6F9] px-6 py-3 font-semibold">Conhecer Soluções</button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
              <div><p className="text-2xl font-bold">+14</p><p className="text-white/80">Anos de experiência</p></div>
              <div><p className="text-2xl font-bold">3</p><p className="text-white/80">Filiais no Brasil</p></div>
              <div><p className="text-2xl font-bold">+20</p><p className="text-white/80">Módulos disponíveis</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-4 shadow-2xl">
            {!imgError ? <img src="/telas-webposto-home.png" alt="Telas do sistema WebPosto" className="w-full rounded-xl" onError={() => setImgError(true)} /> : <div className="h-[320px] rounded-xl bg-gradient-to-br from-[#020234] to-[#04A6F9] flex items-center justify-center" />}
          </div>
        </div>
      </section>

      <section id="solucoes" className="bg-[#f0f4f8] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Conheça as Soluções WebPosto</h2>
          <p className="mt-3 text-[#020234]/75 max-w-3xl">Um ecossistema completo de módulos integrados para otimizar cada processo do seu posto de combustíveis.</p>
          <div className="mt-8 grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {solutions.map((item) => (
              <article key={item.title} className="group rounded-xl bg-white p-5 shadow-sm hover:shadow-xl transition-all border border-[#e7ebef] relative overflow-hidden">
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#04A6F9] transition-all duration-300 group-hover:w-full" />
                <div className="text-3xl">{item.emoji}</div><h3 className="mt-3 font-bold text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-[#020234]/70">{item.desc}</p><span className="inline-block mt-3 rounded-full bg-[#04A6F9]/10 text-[#0284c7] text-xs px-3 py-1">{item.tag}</span>
              </article>
            ))}
            <article className="rounded-xl bg-[#020234] p-6 border border-[#04A6F9] text-white flex flex-col justify-between">
              <div><div className="text-2xl">✨</div><h3 className="mt-3 text-xl font-bold">Tem muito mais! Você precisa conhecer.</h3></div>
              <button onClick={() => handleAnchorClick("#contato")} className="mt-6 rounded-full bg-[#04A6F9] px-5 py-2 font-semibold">Quero conhecer</button>
            </article>
          </div>
        </div>
      </section>

      <section id="sobre" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-[#020234] p-8 text-white"><p className="text-6xl font-black text-[#04A6F9]">+14</p><p className="mt-2 text-lg">Anos de Excelência</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">{["🚀 Implementação","🎓 Treinamento","💡 Consultoria","🛡️ Suporte"].map(i => <div key={i} className="rounded-lg border border-white/15 p-3 bg-white/5">{i}</div>)}</div>
          </div>
          <div>
            <span className="inline-block rounded-full bg-[#04A6F9]/10 text-[#0284c7] px-3 py-1 text-sm">Sobre Nós</span>
            <h3 className="mt-4 text-3xl font-bold">Quem é a Webside Sistemas?</h3>
            <p className="mt-4 text-[#020234]/75">Desde 2011 atuando no setor de postos de combustíveis...</p>
            <ul className="mt-4 space-y-2 text-[#020234]/85">
              <li>✓ Equipe altamente capacitada em implementação e treinamento</li><li>✓ Consultoria especializada no setor de postos de combustíveis</li><li>✓ Soluções personalizadas com foco em resultados reais</li><li>✓ Parceiro oficial do WebPosto — software líder de mercado</li><li>✓ Filiais em MG, SP e GO para atendimento regional ágil</li>
            </ul>
            <Link to="/sobre-nos" className="inline-block mt-6 rounded-full bg-[#020234] text-white px-5 py-3">Conheça Nossa História</Link>
          </div>
        </div>
      </section>

      <section id="suporte" className="py-16 bg-gradient-to-br from-[#020234] to-[#04176b] text-white">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
          <div>
            <span className="inline-block rounded-full border border-[#04A6F9] px-3 py-1 text-sm">Suporte</span>
            <h3 className="mt-4 text-3xl font-bold">Atendimento quando você precisa</h3>
            <p className="mt-3 text-white/70">Nossa equipe acompanha sua operação de ponta a ponta.</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-xl bg-white/10 p-4">💬 Suporte via WhatsApp — Atendimento rápido pelo canal que você já usa.</div>
              <div className="rounded-xl bg-white/10 p-4">🎓 Treinamento Personalizado — Capacitamos sua equipe para o WebPosto.</div>
              <div className="rounded-xl bg-white/10 p-4">🚀 Implantação Completa — Configuramos e acompanhamos sua operação.</div>
            </div>
          </div>
          <div className="rounded-xl bg-white text-[#020234] p-6">
            <h4 className="text-xl font-bold">Filiais em 3 Estados</h4>
            <ul className="mt-4 space-y-3">
              <li><a target="_blank" rel="noreferrer" href={maps.mg}>📍 Filial Minas Gerais</a></li><li><a target="_blank" rel="noreferrer" href={maps.sp}>📍 Filial São Paulo</a></li><li><a target="_blank" rel="noreferrer" href={maps.go}>📍 Filial Goiás</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contato" className="py-16 bg-[#f0f4f8]">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-3xl font-bold">Vamos crescer juntos?</h3>
            <p className="mt-3 text-[#020234]/75">Deixe seus dados e em breve um especialista entrará em contato.</p>
            <div className="mt-6 rounded-xl bg-[#25d366] p-5 text-white">
              <p>Você pode também entrar em contato e falar com nosso time de especialistas.</p>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-block mt-4 rounded-full bg-white text-[#128c7e] px-5 py-2 font-semibold">Iniciar conversa no WhatsApp</a>
            </div>
            <ul className="mt-6 space-y-2">
              <li><a target="_blank" rel="noreferrer" href={maps.mg}>📍 Filial Minas Gerais — ver no mapa</a></li>
              <li><a target="_blank" rel="noreferrer" href={maps.sp}>📍 Filial São Paulo — ver no mapa</a></li>
              <li><a target="_blank" rel="noreferrer" href={maps.go}>📍 Filial Goiás — ver no mapa</a></li>
            </ul>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            {!submitted ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <div><label className="block text-sm mb-1">Nome completo *</label><input className="w-full border rounded-lg px-3 py-2" value={form.nome} onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))} />{errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome}</p>}</div>
                <div><label className="block text-sm mb-1">E-mail *</label><input type="email" className="w-full border rounded-lg px-3 py-2" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />{errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}</div>
                <div><label className="block text-sm mb-1">Telefone/WhatsApp *</label><input className="w-full border rounded-lg px-3 py-2" value={form.telefone} onChange={(e) => setForm((p) => ({ ...p, telefone: maskPhone(e.target.value) }))} />{errors.telefone && <p className="text-red-600 text-xs mt-1">{errors.telefone}</p>}</div>
                <div><label className="block text-sm mb-1">CNPJ da empresa</label><input className="w-full border rounded-lg px-3 py-2" value={form.cnpj} onChange={(e) => setForm((p) => ({ ...p, cnpj: maskCnpj(e.target.value) }))} />{errors.cnpj && <p className="text-red-600 text-xs mt-1">{errors.cnpj}</p>}</div>
                <div><label className="block text-sm mb-1">Cidade *</label><input className="w-full border rounded-lg px-3 py-2" value={form.cidade} onChange={(e) => setForm((p) => ({ ...p, cidade: e.target.value }))} />{errors.cidade && <p className="text-red-600 text-xs mt-1">{errors.cidade}</p>}</div>
                <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={form.accepted} onChange={(e) => setForm((p) => ({ ...p, accepted: e.target.checked }))} /><span>Ao informar meus dados, eu concordo com a <Link to="/politica-de-privacidade" target="_blank" className="underline">Política de Privacidade</Link>.</span></label>
                {errors.accepted && <p className="text-red-600 text-xs -mt-2">{errors.accepted}</p>}
                <button className="w-full rounded-lg bg-[#020234] text-white py-3 hover:bg-[#04A6F9]">Enviar Solicitação</button>
              </form>
            ) : (
              <div className="rounded-xl bg-[#ecfeff] border border-[#67e8f9] p-5"><h4 className="font-bold text-lg flex items-center gap-2"><Check size={18} />Solicitação enviada com sucesso!</h4><p className="mt-2 text-[#164e63]">Obrigado pelo contato. Um especialista falará com você em breve.</p></div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#020234] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-2xl font-bold"><span>WEB</span><span className="text-[#04A6F9]">SIDE</span></h4>
            <p className="mt-3 text-white/80">Especialistas em tecnologia para postos de combustíveis.</p>
            <div className="mt-4 flex gap-3">
              <a href="https://www.instagram.com/websidesistemas/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/websidesistemas" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="https://www.linkedin.com/company/websidesistemas" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://wa.me/5534992990408?text=Venho%20pelo%20site%2C%20quero%20saber%20mais" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={20} /></a>
            </div>
          </div>
          <div><h5 className="font-semibold mb-3">Navegação</h5><ul className="space-y-2 text-white/85"><li><button onClick={() => handleAnchorClick("#home")}>Home</button></li><li><button onClick={() => handleAnchorClick("#solucoes")}>Soluções</button></li><li><Link to="/sobre-nos">Sobre Nós</Link></li><li><button onClick={() => handleAnchorClick("#suporte")}>Suporte</button></li><li><button onClick={() => handleAnchorClick("#contato")}>Contato</button></li></ul></div>
          <div><h5 className="font-semibold mb-3">Soluções</h5><ul className="space-y-2 text-white/85"><li>WP PDV</li><li>WP Mobile</li><li>WP Frota</li><li>WP Dashboard</li><li>WP PIX</li><li>WP I.A</li></ul></div>
          <div><h5 className="font-semibold mb-3">Filiais + Legal</h5><ul className="space-y-2 text-white/85"><li><a target="_blank" rel="noreferrer" href={maps.mg}>📍 Filial Minas Gerais</a></li><li><a target="_blank" rel="noreferrer" href={maps.sp}>📍 Filial São Paulo</a></li><li><a target="_blank" rel="noreferrer" href={maps.go}>📍 Filial Goiás</a></li><li><Link to="/politica-de-privacidade">Política de Privacidade</Link></li></ul></div>
        </div>
        <div className="text-center py-5 border-t border-white/10 text-sm text-white/70">{footerYearText}</div>
      </footer>

      {showTopButton && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 h-11 w-11 rounded-full bg-[#04A6F9] text-white shadow-lg flex items-center justify-center" aria-label="Voltar ao topo">
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
}
