# Etapa de desarrollo
FROM node:18.20 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

# Etapa de compilación
FROM dev-deps AS builder
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.23.3 AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80