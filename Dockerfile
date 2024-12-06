# Stage 1: Install dependencies
FROM node:20-slim AS deps
WORKDIR /app

# Salin file yang diperlukan untuk instalasi dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Stage 2: Build aplikasi
FROM node:20-slim AS builder
WORKDIR /app

# Salin dependencies dari stage sebelumnya
COPY --from=deps /app/node_modules ./node_modules

# Salin semua file dari project
COPY . .

# Deklarasikan ARG untuk build time
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NODE_ENV


# Deklarasikan ENV untuk runtime
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NODE_ENV=${NODE_ENV}

# Debugging untuk melihat nilai ARG
RUN echo "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}" && \
    echo "NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}" && \
    echo "NODE_ENV=${NODE_ENV}"


# Debugging untuk memastikan ENV tersedia
RUN echo "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}" > .env && \
echo "NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}" >> .env && \
echo "NODE_ENV=${NODE_ENV}" >> .env

# Debug: Tampilkan isi file .env
RUN cat .env

# Build aplikasi
RUN npm run build

# Stage 3: Jalankan aplikasi
FROM node:20-slim AS runner

WORKDIR /app

# Salin file yang dibutuhkan untuk runtime
COPY --from=builder /app ./
# Buat file .env
RUN echo "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}" > .env && \
    echo "NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}" >> .env && \
    echo "NODE_ENV=${NODE_ENV}" >> .env

# Debug: Tampilkan isi file .env
RUN cat .env

# Expose port untuk Next.js
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]
