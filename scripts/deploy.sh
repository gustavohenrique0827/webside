#!/bin/bash

echo "🚀 Deploy Webside CRM Production..."

# Pull latest
git pull origin main

# Stop containers
docker compose -f docker-compose.prod.yml down

# Build & up
docker compose -f docker-compose.prod.yml up -d --build

# Backend migrations
docker compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy

# Backend seed
docker compose -f docker-compose.prod.yml exec backend npm run seed

echo "✅ Deploy complete!"
echo "🌐 Frontend: https://yourdomain.com"
echo "🔧 Backend API: http://localhost:3001"
echo "📊 MySQL: localhost:3306/webside_crm"

# Health check
sleep 10
curl -f http://localhost:3001/health || echo "⚠️ Backend health check failed"

