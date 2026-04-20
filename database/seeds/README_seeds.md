# Seeds Usage

1. Import schema: phpMyAdmin → `crm_cpm_mensageria_schema_complete.sql`
2. Run:
   mysql -u root -p websid23_erp < seeds/005_login_demo_user.sql
   mysql -u root -p websid23_erp < seeds/001_base_data.sql 
3. Restart PM2 `pm2 restart websid23_erp`

Demo login: admin@empresa.com / admin123

