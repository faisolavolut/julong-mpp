# Gunakan image Node 22 sebagai base image
FROM node:20 AS build

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json untuk menginstall dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file proyek ke dalam container
COPY . .

# Build aplikasi Next.js untuk production
RUN npm run build
EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Copy file build dari tahap sebelumnya
COPY --from=build /app /app

# Install hanya runtime dependencies
RUN npm install --production

# Jalankan aplikasi Next.js pada container
CMD ["npm","run", "prod"]
