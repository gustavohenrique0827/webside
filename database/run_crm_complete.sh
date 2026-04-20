#!/bin/bash
# Complete CRM/CPM/Mensageria setup script
# Run: bash database/run_crm_complete.sh

set -e

echo "🚀 Starting CRM Complete Setup..."

# 1. Ensure prod stack running
echo "📦 Checking Docker stack..."
docker compose -f docker-compose.prod.yml ps | grep -q Up || {
  echo "Starting prod stack..."
  docker compose -f docker-compose.prod.yml up -d --build
  sleep 30
}

# 2. Copy schema to mysql init dir
echo "📁 Copying schema to mysql..."
CONTAINER=$(docker ps --filter name=mysql --format "{{.Names}}")
docker cp database/crm_cpm_mensageria_schema_complete.sql $CONTAINER:/var/lib/mysql-files/

# 3. Run migration 009
echo "🔄 Running migration 009..."
bash database/migrations/009_full_complete.sql

# 4. Run seeds
echo "🌱 Running seeds..."
docker exec $CONTAINER mysql -u root -pwebside_crm webside_crm < database/seeds/005_complete_data.sql

# 5. Restart backend
echo "🔄 Restarting backend..."
docker compose -f docker-compose.prod.yml restart backend

# 6. Verify
echo "✅ Verification:"
docker ps --format "table {{.Names}}\t{{.Status}}"
docker exec $CONTAINER mysql -u root -pwebside_crm -e "USE webside_crm; SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'webside_crm'; SELECT COUNT(*) as leads FROM lead; SELECT COUNT(*) as clientes FROM cliente;"
curl -I http://localhost/graphql || echo "GraphQL endpoint check failed"

echo "🎉 CRM/CPM/Mensageria COMPLETE! Test: http://localhost/graphql"
