# Login Teste - Demo VPS
Status: Executando

## Steps
- [x] 1. Stack UP (backend:3002, frontend:80)
- [x] 2. Fixed index.js → resolversNew.js + schema.graphql (status_by_id)"
- [x] 3. GraphQL: **http://localhost:3002/graphql** ✅ 200 (seed executado)
  ```
  mutation { 
    login(input: {email:"admin@empresa.com", senha:"admin123"}) { 
      token 
      user { 
        id 
        nome 
        email 
        ativo 
      } 
    } 
  }
  ```
- [ ] 4. Test Frontend: http://localhost/login → admin@empresa.com / admin123 → /admin/dashboard
- [ ] 5. Verificar DB externa (se local): mysql -h162.241.2.103 -uwebsid23_dev -p'Web@132435*' websid23_erp -e \"SELECT * FROM colaborador WHERE email='admin@empresa.com'\"
- [ ] 6. ✅ Sucesso ou debug

Demo Creds: admin@empresa.com / admin123

