# TODO - Melhoria Front (Landing WebPosto + Menu Suspenso)

## Objetivo
Melhorar o front da landing principal e revisar/completar o comportamento de menu suspenso, inspirado no padrão visual e de navegação do site de referência.

## Etapas

- [ ] 1) Revisar e refinar o header da landing
  - [ ] Garantir navegação clara no desktop
  - [ ] Melhorar legibilidade/contraste
  - [ ] Ajustar espaçamentos e hierarquia visual

- [x] 2) Implementar menu suspenso no mobile
  - [x] Adicionar botão hambúrguer no header
  - [x] Exibir/ocultar painel de navegação mobile
  - [x] Fechar menu ao clicar em item
  - [x] Garantir acessibilidade básica (aria-label/aria-expanded)

- [x] 3) Melhorar UX dos botões/CTAs
  - [x] Conectar CTAs principais a ações reais (âncoras/dialog)
  - [x] Corrigir inconsistências de navegação interna
  - [x] Padronizar labels e prioridade visual dos botões

- [x] 4) Refinar visual geral da landing
  - [x] Ajustar seção hero (clareza de valor, ritmo visual)
  - [x] Melhorar consistência de cards/blocos
  - [x] Revisar responsividade e espaçamento entre seções

- [ ] 5) Verificação funcional
  - [ ] Validar funcionamento do menu suspenso
  - [ ] Validar links internos e fluxo principal
  - [ ] Revisar rapidamente possíveis erros de build/lint

## Arquivo alvo principal
- `src/components/WebsideLanding.tsx`
