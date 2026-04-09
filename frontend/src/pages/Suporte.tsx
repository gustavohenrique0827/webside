import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GraduationCap, Play, MessageCircle, Phone, Mail, Clock, Download, Zap } from "lucide-react";

const Suporte: React.FC = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-300/20 to-green-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-blue-300/10 rounded-full blur-3xl animate-ping" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 py-24 lg:py-32 bg-gradient-to-b from-slate-50/80 via-white to-blue-50/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Hero */}
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 rounded-full text-white font-bold text-lg mb-8 shadow-2xl ring-4 ring-blue-100/50">
                <Zap className="w-5 h-5" />
                Suporte Rápido e Eficiente 24h
              </div>
              <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
                Seus canais de{' '}
                <span className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">suporte</span>
                <br />
                sempre disponíveis
              </h1>
              <p className="text-xl lg:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
                WhatsApp comercial • Plantão 24h • Materiais exclusivos • EAD • Sucesso do Cliente
              </p>
            </div>

            {/* Primary Cards Grid */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
              {/* WhatsApp Card */}
              <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 lg:p-14 border border-white/50 shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 hover:border-emerald-300 overflow-hidden">
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-3xl blur-xl -z-10 group-hover:scale-110 transition-transform duration-700" />
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-emerald-200/50 group-hover:ring-emerald-300/70 transition-all duration-500">
                      <MessageCircle className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-xl shadow-lg flex items-center justify-center animate-bounce">
                      <Clock className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
                      WhatsApp
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">Atendimento humanizado durante horário comercial</p>
                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 shadow-sm">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🕗</span>
                        </div>
                        <div>
                          <div className="font-bold text-xl text-slate-900">Seg-Sex</div>
                          <div className="text-emerald-700 font-bold text-lg">08h às 18h</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 shadow-sm">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🕛</span>
                        </div>
                        <div>
                          <div className="font-bold text-xl text-slate-900">Sábado</div>
                          <div className="text-emerald-700 font-bold text-lg">08h às 12h</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a 
                  href="https://wa.me/5534992990408?text=Olá Webside, preciso de ajuda!" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group/btn w-full flex items-center justify-center gap-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black py-5 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 ring-8 ring-emerald-200/50 hover:ring-emerald-400/70 backdrop-blur-sm"
                >
                  <Phone className="w-6 h-6 group-hover:scale-110 transition-all duration-300" />
                  <span>Iniciar Chat</span>
                  <div className="w-3 h-3 bg-white/80 rounded-full animate-ping ml-2" />
                </a>
              </div>

              {/* Plantão 24h Card */}
              <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 lg:p-14 border border-white/50 shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 hover:border-red-300 overflow-hidden">
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-3xl blur-xl -z-10 group-hover:scale-110 transition-transform duration-700" />
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-orange-200/50 group-hover:ring-orange-300/70 transition-all duration-500">
                      <Phone className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/90 rounded-2xl shadow-lg flex items-center justify-center animate-pulse">
                      <span className="text-xl font-bold text-red-600">24h</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
                      Emergência
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">Plantão técnico 24 horas para situações críticas</p>
                    <div className="space-y-3 mb-10">
                      <div className="group/phone flex items-center gap-4 p-5 bg-gradient-to-r from-orange-50 to-red-50/70 rounded-2xl border-2 border-orange-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 shadow-lg">
                        <div className="w-14 h-14 bg-red-100/80 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                          <span className="text-xl font-mono font-bold text-red-700">MG</span>
                        </div>
                        <div className="font-mono text-xl font-bold text-red-800 tracking-wide">(34) 3199-9131</div>
                      </div>
                      <div className="group/phone flex items-center gap-4 p-5 bg-gradient-to-r from-orange-50 to-red-50/70 rounded-2xl border-2 border-orange-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 shadow-lg">
                        <div className="w-14 h-14 bg-red-100/80 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                          <span className="text-xl font-mono font-bold text-red-700">SP</span>
                        </div>
                        <div className="font-mono text-xl font-bold text-red-800 tracking-wide">(11) 5199-6177</div>
                      </div>
                      <div className="group/phone flex items-center gap-4 p-5 bg-gradient-to-r from-orange-50 to-red-50/70 rounded-2xl border-2 border-orange-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 shadow-lg">
                        <div className="w-14 h-14 bg-red-100/80 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                          <span className="text-xl font-mono font-bold text-red-700">GO</span>
                        </div>
                        <div className="font-mono text-xl font-bold text-red-800 tracking-wide">(62) 3602-2258</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Content Grid */}
            <div className="grid xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Materiais Card */}
              <div className="xl:col-span-2 group relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 lg:p-12 border border-slate-200 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700 overflow-hidden">
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-3xl blur-xl group-hover:rotate-12 transition-all duration-1000 -z-10" />
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-purple-200/50">
                      <Download className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">📚 Materiais Exclusivos</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">Recursos práticos para o dia a dia</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <a href="https://websidesistemas.com.br/imagens/atalhos_pdv.pdf" target="_blank" rel="noreferrer" className="group/link flex items-center gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-2xl border-2 border-indigo-200 hover:border-purple-500 hover:bg-gradient-to-br from-indigo-100 to-purple-100 hover:shadow-xl hover:-translate-x-2 transition-all duration-400 backdrop-blur-sm">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors">Atalhos PDV</div>
                      <div className="text-sm text-slate-600">Caixa rápido</div>
                    </div>
                  </a>
                  <a href="https://websidesistemas.com.br/imagens/quadro-eletrico.xlsx" target="_blank" rel="noreferrer" className="group/link flex items-center gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-2xl border-2 border-indigo-200 hover:border-purple-500 hover:bg-gradient-to-br from-indigo-100 to-purple-100 hover:shadow-xl hover:-translate-x-2 transition-all duration-400 backdrop-blur-sm">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors">Quadros Elétricos</div>
                      <div className="text-sm text-slate-600">Identificação</div>
                    </div>
                  </a>
                  <a href="https://websidesistemas.com.br/imagens/AIDA%20-%20Modelos.pdf" target="_blank" rel="noreferrer" className="group/link flex items-center gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-2xl border-2 border-indigo-200 hover:border-purple-500 hover:bg-gradient-to-br from-indigo-100 to-purple-100 hover:shadow-xl hover:-translate-x-2 transition-all duration-400 backdrop-blur-sm">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors">Técnica AIDA</div>
                      <div className="text-sm text-slate-600">Jonathan Rocha</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Sucesso Cliente */}
              <div className="group relative bg-gradient-to-br from-emerald-50/90 to-green-50/80 backdrop-blur-xl rounded-3xl p-10 border border-emerald-200/50 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700">
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-emerald-200/50">
                      <Mail className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">🚀 Sucesso Cliente</h3>
                    <p className="text-lg text-slate-600 mb-6">Treinamento e consultoria personalizada</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-white/80 rounded-2xl border border-emerald-200 backdrop-blur-sm shadow-sm">
                    <div className="text-xl font-bold text-emerald-800 break-all">relacionamento@websidesistemas.com.br</div>
                  </div>
                </div>
                <a href="https://wa.me/5534992990408?text=Olá,%20gostaria%20de%20falar%20com%20Sucesso%20do%20Cliente!" target="_blank" rel="noreferrer" className="group/btn w-full flex items-center justify-center gap-4 bg-white shadow-2xl border-2 border-emerald-500 hover:border-emerald-600 text-emerald-800 font-bold py-4 px-8 rounded-2xl hover:bg-emerald-50 hover:shadow-3xl hover:-translate-y-1 transition-all duration-400 ring-4 ring-emerald-100/50">
                  💬 WhatsApp Sucesso Cliente
                </a>
              </div>

              {/* EAD Card - WIDER VERSION */}
              <div className="group xl:col-span-3 relative bg-gradient-to-br from-blue-50/95 to-indigo-50/85 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-blue-200/60 shadow-2xl hover:shadow-4xl hover:-translate-y-4 transition-all duration-1000 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/5 to-purple-400/10 rounded-3xl blur-xl group-hover:scale-105 transition-transform duration-1000 -z-10" />
                <div className="absolute top-6 left-6 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-3xl blur-xl animate-pulse" />
                <div className="relative z-10">
                  <div className="flex items-start gap-8 mb-10">
                    <div className="relative flex-shrink-0 pt-4">
                      <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-3xl ring-8 ring-blue-200/60 group-hover:ring-purple-400/80 transition-all duration-700">
                        <GraduationCap className="w-14 h-14 text-white drop-shadow-2xl" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center ring-2 ring-blue-300/50">
                        <Play className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text mb-4 leading-tight">
                        🎓 EAD Webside
                      </h3>
                      <p className="text-xl text-slate-700 mb-6 leading-relaxed max-w-2xl">
                        Plataforma exclusiva com videoaulas curtas e práticas para suas dúvidas do dia a dia
                      </p>
                      <div className="inline-flex items-center gap-3 bg-white/80 px-6 py-3 rounded-2xl border-2 border-blue-200 shadow-lg backdrop-blur-sm font-bold text-lg text-blue-800">
                        <Clock className="w-5 h-5" />
                        Aulas disponíveis 24/7
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-8 border-t border-blue-200/50">
                    <p className="text-lg text-slate-700 mb-10 leading-relaxed max-w-4xl mx-auto">
                      Aprenda no seu ritmo com conteúdo direto ao ponto. Aulas gravadas pelos nossos especialistas.
                    </p>
                    <a 
                      href="https://app.tiflux.com/r/externals/knowledges/list/5730" 
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn w-full max-w-2xl mx-auto inline-flex items-center justify-center gap-5 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-800 text-white font-black py-6 px-12 rounded-3xl text-xl shadow-3xl hover:shadow-4xl hover:-translate-y-3 transition-all duration-700 ring-8 ring-blue-200/60 hover:ring-purple-500/80 backdrop-blur-xl"
                    >
                      <Play className="w-8 h-8 group-hover:scale-110 transition-all duration-400" />
                      <span className="tracking-wide">▶️ ACESSAR PLATAFORMA EAD</span>
                      <div className="w-4 h-4 bg-white/90 rounded-full animate-ping ml-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Suporte;

