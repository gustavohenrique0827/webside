# Correção Configuração Banco de Dados (.env)

## 📁 Arquivo Correto
**`backend/.env`** (na raiz do backend)

## 🔍 Status Atual
- ✅ `.env` existe em `backend/` 
- ✅ `.env.example` disponível como template (VSCode aberto)
- Backend usa `dotenv.config()` e lê vars em `src/config/database.js`

## ⚙️ Variáveis Necessárias (MySQL)
```
DB_HOST=162.241.2.103  # Seu host Hostgator/cPanel
DB_PORT=3306
DB_USER=websid23_dev   # ← ALTERAR para real do cPanel
DB_PASSWORD=Web@132435* # ← ALTERAR para real (NUNCA usar default!)
DB_NAME=websid23_erp   # ← Seu banco real

# Outras obrigatórias
JWT_SECRET=seu-jwt-super-seguro-aqui
NODE_ENV=production
FRONTEND_URL=https://seudominio.com
LOG_LEVEL=info
```

## 🚀 Passos para Configurar

### 1. Editar .env
```bash
cd backend
nano .env  # ou VSCode: code .env
```

Copie o template acima e **substitua** credenciais pelos dados reais do **cPanel → MySQL Databases**.

### 2. Testar Conexão Local
```bash
cd backend
npm install
node src/index.js
```
✅ Procure no log: `✅ Conexão com banco de dados estabelecida com sucesso!`

### 3. Docker (Recomendado)
```bash
cd /var/www/meuapp/webside/docker
docker compose up -d backend db
docker compose logs backend
```

### 4. Rodar Migrations
```bash
docker compose exec backend node src/database/migrationManager.js migrate
```

## 🔒 Segurança Importante
- **NUNCA commit .env**: Adicione `.env` ao `.gitignore`
- Use `.env.example` como template para outros devs
- Em prod: Use vars do servidor ou Docker secrets

## 🐛 Problemas Comuns
| Erro | Causa | Solução |
|------|-------|---------|
| `ER_ACCESS_DENIED` | Credenciais erradas | Verificar cPanel MySQL |
| `ECONNREFUSED` | Host/porta errados | `DB_HOST=localhost:3306` ou IP correto |
| `Unknown database` | DB_NAME errado | Criar banco no cPanel |

## ✅ Checklist
- [ ] Credenciais atualizadas em `backend/.env`
- [ ] `node src/index.js` conecta OK
- [ ] `docker compose up` roda sem erros DB
- [ ] Migrations executadas

**Executar agora?** Copie os comandos acima no terminal!

