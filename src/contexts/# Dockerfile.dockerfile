# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install          # instala dependências no container

COPY . .
RUN npm run build         # gera dist/

EXPOSE 4000
CMD ["node", "dist/server.js"]