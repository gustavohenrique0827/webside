import React from 'react';
import { Link } from 'react-router-dom';

const maps = {
  mg: "https://maps.app.goo.gl/1S21EcYTbVNEjmji7",
  sp: "https://maps.app.goo.gl/9ADGAFwHmsJ9DT997",
  go: "https://maps.app.goo.gl/1GwBqHWqea23T9Vt8",
};

const footerYearText = "Copyright © 2011-2026 | Webside Consultoria e Sistemas Ltda — Todos os direitos reservados — CNPJ: 35.277.090/0001-47";

interface FooterProps {
  hideOnAdmin?: boolean;
}

export default function Footer({ hideOnAdmin = false }: FooterProps) {
  if (hideOnAdmin) return null;

  const handleAnchorClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-[#020234] text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <img src="/webside-logo-rodape.png" alt="Webside Logo" className="w-48 h-auto mb-4" />
            <p className="text-gray-300 mb-6 leading-relaxed">Especialistas em tecnologia para postos de combustíveis. Revendemos, implantamos, treinamos e oferecemos consultoria em WebPosto.</p>

          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Navegação</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">Home</Link></li>
              <li><Link to="/solucoes" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">Soluções</Link></li>
              <li><Link to="/sobre-nos" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">Sobre Nós</Link></li>
              <li><Link to="/suporte" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">Suporte</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Soluções</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/wp-pdv" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">WP PDV</Link></li>
              <li><Link to="/wp-mobile" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">WP Mobile</Link></li>
              <li><Link to="/wp-frota" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">WP Frota</Link></li>
              <li><Link to="/wp-dashboardbi" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">WP Dashboard</Link></li>
              <li><Link to="/wp-pix" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">WP PIX</Link></li>
              <li><Link to="/wp-ia" className="hover:text-white transition-colors" target="_blank" rel="noreferrer">WP I.A</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Filiais</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to={maps.mg} target="_blank" className="flex items-center gap-2 hover:text-white transition-colors" rel="noreferrer">📍 Filial MG</Link></li>
              <li><Link to={maps.sp} target="_blank" className="flex items-center gap-2 hover:text-white transition-colors" rel="noreferrer">📍 Filial SP</Link></li>
              <li><Link to={maps.go} target="_blank" className="flex items-center gap-2 hover:text-white transition-colors" rel="noreferrer">📍 Filial GO</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <Link to="/privacidade" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noreferrer">Política de Privacidade</Link>
          </div>

        </div>



        <p className="border-t border-white/10 pt-8 text-sm text-gray-400 text-center mt-12">{footerYearText}</p>


      </div>
    </footer>
  );
}

