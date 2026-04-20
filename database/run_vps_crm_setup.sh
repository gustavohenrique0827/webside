#!/bin/bash
# VPS Direct CRM Setup (no Docker)

set -e

echo \"🚀 VPS CRM Complete Setup...\"

# 1. Start MySQL
systemctl start mysql
sleep 5
mysqladmin -u root ping || echo \"MySQL ready\"

# 2. Create DB and user (using backend default creds)
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS webside_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'websid23_dev'@'localhost' IDENTIFIED BY 'Web@132435*';
GRANT ALL PRIVILEGES ON webside_crm.* TO 'websid23_dev'@'localhost';
FLUSH PRIVILEGES;
USE webside_crm;
EOF

# 3. Run full schema
echo \"📦 Running full CRM schema...\"
mysql -u websid23_dev -p'Web@132435*' webside_crm < database/crm_cpm_mensageria_schema_complete.sql

# 4. Run seeds
echo \"🌱 Running seeds...\"
mysql -u websid23_dev -p'Web@132435*' webside_crm < database/seeds/001_base_data.sql
mysql -u websid23_dev -p'Web@132435*' webside_crm < database/seeds/002_sample_data.sql
mysql -u websid23_dev -p'Web@132435*' webside_crm < database/seeds/005_login_demo_user.sql

# 5. Verify
echo \"✅ Verification:\"
mysql -u websid23_dev -p'Web@132435*' -e \"USE webside_crm; SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'webside_crm'; SELECT COUNT(*) as leads FROM lead; SELECT COUNT(*) as clientes FROM cliente; SELECT COUNT(*) as orcamentos FROM orcamento;\"

echo \"🎉 CRM DB READY!\"

