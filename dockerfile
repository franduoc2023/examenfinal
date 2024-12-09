 FROM node:18.20 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

 FROM dev-deps AS builder
WORKDIR /app
COPY . .
RUN npm run build

 FROM nginx:1.23.3 AS prod
EXPOSE 80
COPY --from=builder /app/dist/appweb/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]