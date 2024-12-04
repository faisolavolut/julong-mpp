# Stage 1: Install dependencies
FROM node:20 AS deps
WORKDIR /app

# Salin file yang diperlukan untuk instalasi dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Stage 2: Build aplikasi
FROM node:20 AS builder
WORKDIR /app

# Salin dependencies dari stage sebelumnya
COPY --from=deps /app/node_modules ./node_modules

# Salin semua file dari project
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Stage 3: Jalankan aplikasi
FROM node:20-slim AS runner

# Salin file yang dibutuhkan untuk runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

WORKDIR /app
RUN npm run build
# Set environment variabel untuk production
ENV NODE_ENV=production

# Expose port untuk Next.js
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]
