# Gunakan image Node 22 sebagai base image
FROM node:22 AS build

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

# Tentukan port yang akan digunakan aplikasi
EXPOSE 3000

# Gunakan image Node 22 untuk menjalankan aplikasi
FROM node:22

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Copy file build dari tahap sebelumnya
COPY --from=build /app /app

# Install hanya runtime dependencies
RUN npm install --production

# Jalankan aplikasi Next.js pada container
CMD ["npm", "start"]
