# Plano de Correção - Login com GraphQL

## Problema
O frontend está tentando acessar `http://localhost:5000/graphql` mas:
1. O backend roda na porta 3001
2. O AuthContext usa API REST (/api/auth/login) ao invés de GraphQL

## Solução
Atualizar o AuthContext para usar GraphQL mutation para login

## Tarefas

### 1. Corrigir vite.config.ts
- [x] Alterar porta do proxy de 5000 para 3001

### 2. Atualizar AuthContext.tsx
- [x] Importar Apollo Client e mutation LOGIN
- [x] Modificar função login() para usar GraphQL ao invés de API REST

### 3. Testar
- [ ] Iniciar o backend
- [ ] Testar o login

