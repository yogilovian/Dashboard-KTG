# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build Vite frontend dan bundle server.ts ke dist/server.cjs
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
# Hanya install production dependencies jika diperlukan
RUN npm ci --omit=dev

# Salin hasil build dist
COPY --from=builder /app/dist ./dist
# Salin folder data dan file yang dibutuhkan saat runtime
COPY --from=builder /app/data ./data
COPY --from=builder /app/images ./images
COPY --from=builder /app/data_dinas.csv ./data_dinas.csv
COPY --from=builder /app/firebase-applet-config.json ./firebase-applet-config.json
COPY --from=builder /app/firestore.rules ./firestore.rules

# Port Cloud Run disuntikkan lewat environment variable PORT (default 8080/3000)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/server.cjs"]
